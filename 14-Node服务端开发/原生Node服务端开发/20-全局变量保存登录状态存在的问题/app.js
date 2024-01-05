/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require('querystring');
const goodsRouterHandle = require('./router/goods');
const userRouterHandle = require('./router/user');
const staticServer = require('./utils/staticServer');
const path = require('path');
const rootPath = path.join(__dirname, 'public');
/*
1.当前服务端存储存在的问题
- 操作系统会给每一个应用程序分配一块存储空间,
  在32位操作系统上,这块空间的大小是1.6G左右
  在64位操作系统上,这块空间的大小是3G左右
    + 当前的Session是一个全局变量, 全局变量使用的就是当前应用程序分配到的存储空间
      所以当前的这种服务端存储登录状态的方式也会出'现存不下'的情况
    + 当前的Session是一个全局变量, 全局变量的特点是应用程序启动时分配存储空间,
      应用程序关闭时释放存储空间, 所以全局变量中存储的数据会随着服务端应用程序的重启而消失
      而在企业开发中, 我们每次对项目进行更新都需要重启, 运维人员日常运维也可能会经常重启
      这样就会导致频繁的要求用户登录, 带来'不好的用户体验'
- 现在的服务器性能都比较优越, 内存比较大, CPU也是多核多任务的,
  所以如果一台机器上如果只运行一个NodeJS进程会对资源造成极大的浪费
  所以在企业开发中我们会在一台机器上跑多个NodeJS进程,来提升效率和使用率
  但是每个进程之间的内存是相互隔离的,所以就会导致在登录状态'无法共享'

2.如何解决当前Session的问题?
- 要想解决当前Session的问题, 首先我们要知道Session有哪些特点
    + 数据量不会太大, 存储的都是一些常用信息
    + 访问频率极高, 对性能要求极高, 每次操作都会验证Session
    + 不害怕丢失, 丢失之后再次登录即可
- 如何满足如上特点的同时解决存在的问题?
    + Redis可以搭建集群突破内存限制
    + 只要Redis不重启数据就不会消失
    + 存储在Redis中的数据, 无论哪个NodeJS进程都可以访问
    + Redis性能极好, 速度极快
* */
// 定义变量作为session的容器
const SESSION_CONTAINER = {};
/**
 * 生成Cookie过期时间
 * @returns {*}
 */
const getCookieExpires = () =>{
    let date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    return date.toUTCString();
}
/**
 * 准备各种请求参数
 * @param req 请求对象
 * @param res 响应对象
 * @returns {Promise<any>}
 */
const initParams = (req, res) =>{
    // 准备 请求方式 / 请求路径 / 请求参数
    // 1.处理请求方式
    req.method = req.method.toLowerCase();
    // 2.处理请求路径
    req.path = req.url.split('?')[0];
    // 5.处理请求参数
    return new Promise((resolve, reject)=>{
        if(req.method === 'get'){
            let params = req.url.split('?')[1];
            req.query = queryString.parse(params);
            resolve();
        }else if(req.method === 'post'){
            let params = '';
            req.on('data', (chunk)=>{
                params += chunk;
            });
            req.on('end', ()=>{
                console.log(params);
                req.body = queryString.parse(params);
                resolve();
            });
        }
    });
}
/**
 * 初始化Cookie和Session
 * @param req 请求对象
 * @param res 响应对象
 */
const initCookieSession = (req, res) =>{
    // 1.处理Cookie
    req.cookie = {};
    if(req.headers.cookie){
        req.headers.cookie.split(';').forEach((item)=>{
            let keyValue = item.split('=');
            req.cookie[keyValue[0]] = keyValue[1];
        });
    }
    // 2.获取用户的唯一标识
    req.userId = req.cookie.userId;
    if(!req.userId){
        req.userId = `${Date.now()}_${Math.random()}_it666`;
        // 给当前用户分配容器
        SESSION_CONTAINER[req.userId] = {};
        res.setHeader('Set-Cookie',`userId=${req.userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
    }
    if(!SESSION_CONTAINER[req.userId]){
        // 给当前用户分配容器
        SESSION_CONTAINER[req.userId] = {};
    }
    req.session = SESSION_CONTAINER[req.userId];
    console.log(req.session);
}
/**
 * 封装返回数据方法
 * @param res  响应对象
 * @param data 返回的数据
 */
const setEnd = (res, data) =>{
    res.writeHead(200, {
        'Content-Type':'application/json; charset=utf-8;'
    });
    res.end(JSON.stringify(data));
}
// 处理各种请求
const serverHandle = async (req, res)=>{
    // 0.准备cookie和session
    initCookieSession(req, res);
    // 1.返回静态网页
    await staticServer.readFile(req, res, rootPath);
    // 2.处理API请求
    res.setEnd = setEnd;
    // 1.准备各种请求参数
    initParams(req, res).then( async ()=>{
        // 2.处理各种路由
        // 2.1处理商品相关路由
        let goodsData = goodsRouterHandle(req, res);
        if(goodsData){
            res.setEnd(res, goodsData);
            return
        }
        // 2.2处理用户相关路由
        let userData = await userRouterHandle(req, res);
        if(userData){
            res.setEnd(res, userData);
            return
        }
        // 2.3没有匹配到任何路由
        res.writeHead(404, {
            'Content-Type':'text/plain; charset=utf-8;'
        });
        res.end('404 Not Found');
    });
};
module.exports = serverHandle;

/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require('querystring');
const userRouterHandle = require('./router/user');
const staticServer = require('./utils/staticServer');
const path = require('path');
const rootPath = path.join(__dirname, 'public');

// 准备各种请求参数
const initParams = (req) =>{
    // 准备 请求方式 / 请求路径 / 请求参数
    // 1.处理请求方式
    req.method = req.method.toLowerCase();
    // 2.处理请求路径
    req.path = req.url.split('?')[0];
    // 3.处理请求参数
    return new Promise((resolve)=>{
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
/*
1.什么是JSON Schema?
- JSON Schema定义了JSON格式的规范
- 在企业开发中通常都是多人团队开发, 所以为了提升开发效率
  我们就需要制定各种标准, 而JSON Schema就是专门用于制定JSON的标准的

2.什么是Ajv
- 虽然开发之前我们就制定了标准, 但是无论是前端开发人员还是后端开发人员
  都不能盲目的相信对方, 所以在开发过程中我们还需要对制定的规范进行校验
- 在NodeJS中我们可以通过Ajv来校验前端传递过来的JSON数据是否符合我们制定的JSON Schema规范
https://www.npmjs.com/package/ajv
* */
// 处理各种请求
const serverHandle = async (req, res)=>{
    // 1.返回静态网页
    await staticServer.readFile(req, res, rootPath);
    // 2.处理API请求
    res.writeHead(200, {
        'Content-Type':'application/json; charset=utf-8;'
    });
    // 1.准备各种请求参数
    initParams(req).then(()=>{
        // 2.处理各种路由
        // 2.1处理商品相关路由
        // 2.2处理用户相关路由
        let userData = userRouterHandle(req, res);
        if(userData){
            res.end(JSON.stringify(userData));
            return
        }
        // 2.3没有匹配到任何路由
        res.writeHead(404, {
            'Content-Type':'text/plain; charset=utf-8;'
        });
        res.end('404 Not Found');
    })
};
module.exports = serverHandle;

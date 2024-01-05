/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require('querystring');

const initParams = (req) =>{
    // 准备 请求方式 / 请求路径 / 请求参数
    // 1.处理请求方式
    req.method = req.method.toLowerCase();
    // 2.处理请求路径
    req.path = req.url.split('?')[0];
    // 3.处理请求参数
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
                req.body = queryString.parse(params);
                resolve();
            });
        }
    });
}

const serverHandle = (req, res)=>{
    /*
    如何处理各种请求
    处理各种请求我们需要知道
    请求方式 / 请求路径 / 请求参数
    * */
    initParams(req).then(()=>{
        console.log(req.method);
        console.log(req.path);
        console.log(req.query);
        console.log(req.body);
    })
};
module.exports = serverHandle;
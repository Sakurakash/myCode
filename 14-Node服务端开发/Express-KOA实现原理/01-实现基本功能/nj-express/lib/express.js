const http  = require('http');

function createApplication() {
    let _handler = (req, res)=>{
        res.end(`Cannot ${req.method} ${req.url}`);
    };
    const router = [{path:'*', method:"*", handler: _handler}];
    return {
        get(path, handler){
            router.push({path:path, method:'get', handler: handler})
        },
        listen(){
            let server = http.createServer();
            server.on('request', (req, res)=>{
                router.forEach(item=>{
                    const requestPath = req.url;
                    const requestMethod = req.method.toLowerCase();
                    if(item.path === requestPath && item.method === requestMethod){
                        item.handler(req, res)
                    }
                });
                router[0].handler(req, res);
            });
            server.listen(...arguments)
        }
    }
}
module.exports = createApplication;
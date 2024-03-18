const http  = require('http');
const Router = require('./router/index');

function Application() {
    this.router = new Router();
}
Application.prototype.get = function(path, handler){
    this.router.get(path, handler);
};
Application.prototype.listen = function(){
    let server = http.createServer();
    let _handler = (req, res)=>{
        res.end(`Cannot ${req.method} ${req.url}`);
    };
    server.on('request', (req, res)=>{
        this.router.handler(req, res, _handler);
    });
    server.listen(...arguments);
}
module.exports = Application;
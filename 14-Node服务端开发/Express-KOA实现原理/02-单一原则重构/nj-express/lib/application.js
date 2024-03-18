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
    server.on('request', (req, res)=>{
        this.router.handler(req, res);
    });
    server.listen(...arguments);
}
module.exports = Application;
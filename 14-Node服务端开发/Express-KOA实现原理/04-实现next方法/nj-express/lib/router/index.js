const Layer = require('./layer');
const Route = require('./route');

function Router() {
    this.stack = [];
}
Router.prototype.get = function (path, handlers) {
    let route = new Route();
    route.get(path, handlers);
    // 每次调用get就创建一大层
    // 注意: 大层的handler是Route中的dispatch方法
    let layer = new Layer(path, 'get', route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
};
Router.prototype.handler = function (req, res, out) {
    /*
    this.stack.forEach(layer=>{
        const requestPath = req.url;
        const requestMethod = req.method.toLowerCase();
        if(layer.match(requestPath, requestMethod)){
            layer.handler_request(req, res);
        }
    });
    out(req, res);
     */
    const requestPath = req.url;
    const requestMethod = req.method.toLowerCase();
    let idx = 0;
    let next = ()=>{ // next方法的作用, 就是取出一大层
        if(idx === this.stack.length){ // 如果所有大层都取完了都没有匹配到, 那么就返回Cannot xxx
            out(req, res);
            return;
        }
        let layer = this.stack[idx++];
        if(layer.match(requestPath, requestMethod)){
            // 匹配到了就调用route.dispatch取出小层来执行
            layer.handler_request(req, res, next);
        }else{
            // 如果没有匹配到, 就继续取出下面一大层
            next();
        }
    }
    next();
};
module.exports = Router;
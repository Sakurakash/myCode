const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods');

function Router() {
    this.stack = [];
}
Router.prototype.use = function(path, handler){
    if(typeof path === "function"){
        handler = path;
        path = '/';
    }
    // 创建一大层保存中间件
    let layer = new Layer(path, '*', handler);
    layer.route = undefined; // 是中间件就没有route
    this.stack.push(layer);
}
methods.forEach(method =>{
    Router.prototype[method] = function (path, handlers) {
        let route = new Route();
        route[method](path, handlers);
        // 每次调用get就创建一大层
        // 注意: 大层的handler是Route中的dispatch方法
        let layer = new Layer(path, method, route.dispatch.bind(route));
        layer.route = route;
        this.stack.push(layer);
    };
});
Router.prototype.handler = function (req, res, out) {
    const requestPath = req.url;
    const requestMethod = req.method.toLowerCase();
    let idx = 0;
    let next = ()=>{ // next方法的作用, 就是取出一大层
        if(idx === this.stack.length){ // 如果所有大层都取完了都没有匹配到, 那么就返回Cannot xxx
            out(req, res);
            return;
        }
        let layer = this.stack[idx++];
        if(layer.matchPath(requestPath)){
            if(!layer.route){
                // 是中间件
                layer.handler_request(req, res, next);
            }else{
                // 是get/post
                if(layer.match(requestPath, requestMethod)){
                    // 匹配到了就调用route.dispatch取出小层来执行
                    layer.handler_request(req, res, next);
                }else{
                    // 如果没有匹配到, 就继续取出下面一大层
                    next();
                }
            }
        }
        /*
        if(layer.match(requestPath, requestMethod)){
            // 匹配到了就调用route.dispatch取出小层来执行
            layer.handler_request(req, res, next);
        }else{
            // 如果没有匹配到, 就继续取出下面一大层
            next();
        }
         */
    };
    next();
};
module.exports = Router;
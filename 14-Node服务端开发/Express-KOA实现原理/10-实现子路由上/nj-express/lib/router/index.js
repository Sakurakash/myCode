const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods');

function Router() {
    // this.stack = [];
    let router = function (req, res, next) {

    };
    /*
    注意点: 这个Router将来有两种使用方式, 第一种是直接调用, 第二种是通过new来创建
            但是现在这个方法中返回了一个中间件, 所以将来通过new创建之后拿到的并不是创建的那个对象
            而是我们返回的这个中间件, 所以我们通过new创建之后是不能使用Router上的方法的
    * */
    router.stack = [];
    router.__proto__ = proto;
    return router;
}
let proto = {};
proto.use = function(path, handler){
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
    proto[method] = function (path, handlers) {
        let route = new Route();
        route[method](path, handlers);
        // 每次调用get就创建一大层
        // 注意: 大层的handler是Route中的dispatch方法
        let layer = new Layer(path, method, route.dispatch.bind(route));
        layer.route = route;
        this.stack.push(layer);
    };
});
proto.handler = function (req, res, out) {
    const requestPath = req.url;
    const requestMethod = req.method.toLowerCase();
    let idx = 0;
    let next = (err)=>{ // next方法的作用, 就是取出一大层
        if(idx === this.stack.length){ // 如果所有大层都取完了都没有匹配到, 那么就返回Cannot xxx
            out(req, res);
            return;
        }
        let layer = this.stack[idx++];
        if(err){
            if(!layer.route){
                // 如果是中间件, 那么有可能是处理错误的中间件, 我们需要执行
                layer.handler_error(err, req, res, next);
            }else{
                // 如果是不中间件, 那么就跳过所有
                next(err);
            }
        }else{
            if(layer.matchPath(requestPath)){
                if(!layer.route){
                    // 是中间件
                    layer.handler_request(req, res, next);
                }else{
                    // 是get/post
                    if(layer.matchMethod(requestMethod)){
                        req.params = layer.params;
                        // 匹配到了就调用route.dispatch取出小层来执行
                        layer.handler_request(req, res, next);
                    }else{
                        // 如果没有匹配到, 就继续取出下面一大层
                        next();
                    }
                }
            }
        }
    };
    next();
};
module.exports = Router;
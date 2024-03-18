const Layer = require('./layer');
function Route() {
    this.stack = [];
}
Route.prototype.get = function(path, handlers){
    handlers.forEach(handler =>{
        // 遍历到一个handler就需要创建一小层
        let layer = new Layer(path, 'get', handler);
        this.stack.push(layer);
    });
};
// 专门用于遍历取出所有小层的方法
Route.prototype.dispatch = function(req, res, out){
    const requestPath = req.url;
    const requestMethod = req.method.toLowerCase();
    let idx = 0;
    let next = ()=>{ // next方法的作用, 就是取出一小层
        if(idx === this.stack.length){
            out();
            return;
        }
        let layer = this.stack[idx++]; // 取去每一小层
        if(layer.match(requestPath, requestMethod)){
            // 如果匹配就执行实际的回调函数
            layer.handler_request(req, res, next);
        }else{
            // 如果不匹配就再取出下面一小层
            next();
        }
    }
    next();
}
module.exports = Route;

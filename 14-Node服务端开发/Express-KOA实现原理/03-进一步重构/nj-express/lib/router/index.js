const Layer = require('./layer');

function Router() {
    // let _handler = (req, res)=>{
    //     res.end(`Cannot ${req.method} ${req.url}`);
    // };
    // this.stack = [{path:'*', method:"*", handler: _handler}];
    this.stack = [];
}
Router.prototype.get = function (path, handler) {
    // this.stack.push({path:path, method:'get', handler: handler});
    let layer = new Layer(path, 'get', handler);
    this.stack.push(layer);
};
Router.prototype.handler = function (req, res, out) {
    this.stack.forEach(layer=>{
        const requestPath = req.url;
        const requestMethod = req.method.toLowerCase();
        // if(item.path === requestPath && item.method === requestMethod){
        //     item.handler(req, res)
        // }
        if(layer.match(requestPath, requestMethod)){
            layer.handler_request(req, res);
        }
    });
    // this.stack[0].handler(req, res);
    out(req, res);
};
module.exports = Router;
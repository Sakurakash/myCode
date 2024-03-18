function Router() {
    let _handler = (req, res)=>{
        res.end(`Cannot ${req.method} ${req.url}`);
    };
    this.stack = [{path:'*', method:"*", handler: _handler}];
}
Router.prototype.get = function (path, handler) {
    this.stack.push({path:path, method:'get', handler: handler});
};
Router.prototype.handler = function (req, res) {
    this.stack.forEach(item=>{
        const requestPath = req.url;
        const requestMethod = req.method.toLowerCase();
        if(item.path === requestPath && item.method === requestMethod){
            item.handler(req, res)
        }
    });
    this.stack[0].handler(req, res);
};
module.exports = Router;
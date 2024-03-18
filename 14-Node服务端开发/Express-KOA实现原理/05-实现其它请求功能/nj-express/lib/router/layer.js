function Layer(path, method, handler) {
    this.path = path;
    this.method = method;
    this.handler = handler;
}
Layer.prototype.match = function(path, method){
    if(path === this.path && method === this.method){
        return true;
    }
    return false;
};
Layer.prototype.handler_request = function(req, res, next){
    this.handler(req, res, next);
};
module.exports = Layer;
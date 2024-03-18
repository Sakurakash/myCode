function Layer(path, method, handler) {
    this.path = path;
    this.method = method;
    this.handler = handler;
}
Layer.prototype.match = function(path, method){
    return path === this.path && method === this.method;

};
Layer.prototype.handler_request = function(req, res, next){
    this.handler(req, res, next);
};
module.exports = Layer;

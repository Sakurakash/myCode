function Layer(path, method, handler) {
    this.path = path;
    this.method = method;
    this.handler = handler;
}
Layer.prototype.matchPath = function(path){
    // 请求的地址和保存的地址相同直接返回即可
    if(path === this.path){
        return true;
    }
    // 请求的地址和保存的地址不相同, 那么我们还需要判断一下前缀是否相同
    if(!this.route){
        if(this.path === '/'){
            return true;
        }
        /*
        当前请求的地址是: /aa/b
        当前中间件的地址是: /a/
        * */
        return path.startsWith(this.path+'/');
    }
};
Layer.prototype.match = function(path, method){
    return path === this.path && method === this.method;

};
Layer.prototype.handler_request = function(req, res, next){
    this.handler(req, res, next);
};
Layer.prototype.handler_error = function(err, req, res, next){
    // 判断当前的中间件的回调函数是否有4个参数, 如果有就执行, 如果没有就继续往后取
    if(this.handler.length === 4){
        this.handler(err, req, res, next);
    }else{
        next(err); // 不是处理错误的中间件, 就继续往后取
    }
}
module.exports = Layer;

function obj2str(obj){
    let res = [];
    for (let key in obj){
        res.push(key + "=" + obj[key]);
    }
    return res.join("&");
}
function ajax(option) {
    return new Promise(function (resolve, reject) {
        // 1.创建异步对象;
        let str = obj2str(option.data);
        let xhr = new XMLHttpRequest();
        let timerId = null;
        // 2.设置请求方式和请求地址;
        if (option.type.toLowerCase() === "get"){
            xhr.open(option.type, option.url+"?"+str, true);
            // 3.发送请求;
            xhr.send();
        }else {
            xhr.open(option.type, option.url+"?"+str, true);
            // 3.发送请求;
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
            xhr.send(str);
        }
        // 4.监听状态的变化;
        xhr.onreadystatechange = function () {
            // 5.处理返回的结果;
            clearInterval(timerId);
            if (xhr.readyState === 4){
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    resolve(xhr);
                }else {
                    reject(xhr);
                }
            }
        };
        if (option.timeout){
            timerId = setInterval(function () {
                xhr.abort();
                console.log("中断");
                clearInterval(timerId);
            }, option.timeout);
        }
    });
}

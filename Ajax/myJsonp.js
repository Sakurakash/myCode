// $.ajax({
//     url: "http://127.0.0.1/project/Ajax/15-jsonp.php",
//     data: {teacher: "zs", age: 33},
//     dataType: "jsonp",
//     jsonp: "cb",
//     success: function (msg) {
//         console.log(msg);
//     },
//     error: function () {
//         alert("请求失败");
//     }
// });
/*
http://127.0.0.1/project/Ajax/15-jsonp.php?
cb=lnj&teacher=zs&age=33&_=1677171674163

http://127.0.0.1/project/Ajax/15-jsonp.php?
callback=jQuery112409910276531225375_1677172346441&teacher=zs&age=33&_=1677172346442

http://127.0.0.1/project/Ajax/15-jsonp.php?
callback=jQuery112417486042425146242_1677172854511&teacher=zs&age=33&_=31723228499474576
*/
function obj2str(obj) {
    let res = []
    for (let key in obj){
        res.push(`${key}=${encodeURI(obj[key])}`);//encodeURI防止出现中文;
    }
    res = res.join("&");
    return res;
}
function myJSONP(options){
    // 1.获取url;
    options = options || {};
    let url = options.url;
    if (options.jsonp){
        url += `?${options.jsonp}=`;
    }else {
        url += `?callback=`;
    }
    let callbackName;
    if (options.jsonpCallback){
        callbackName = options.jsonpCallback;
        url += `${callbackName}&`;
    }else {
        let t = Math.random().toString().replace(".", "");
        callbackName = `jQuery1124${t}_${new Date().valueOf()}`;
        url += `${callbackName}&`;
    }
    if (options.data){
        let str = obj2str(options.data);
        url += str + "&";
    }
    let t = Math.random().toString().replace(".", "");
    url += `_=${t}`;
    
    let oScript = document.createElement("script");
    oScript.src = url;
    document.body.appendChild(oScript);
    
    window[callbackName] = function (data) {
        options.success(data);
    }
}

let http = require("http");
let url = require("url");

/*let str = "https://user:pass@www.it666.com:2000/index.html?name=zs&age=33#99";
let obj = url.parse(str, true);
console.log(obj);*/
/*Url {
    protocol: 'https:',
        slashes: true,
        auth: 'user:pass',
        host: 'www.it666.com:2000',
        port: '2000',
        hostname: 'www.it666.com',
        hash: '#99',
        search: '?name=zs&age=33',
        query: [Object: null prototype] { name: 'zs', age: '33' },
        pathname: '/index.html',
        path: '/index.html?name=zs&age=33',
        href: 'https://user:pass@www.it666.com:2000/index.html?name=zs&age=33#99'
}*/


http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    let obj = url.parse(req.url);
    let str = JSON.stringify(obj);
    res.write(str);
    res.end();
}).listen(2000);


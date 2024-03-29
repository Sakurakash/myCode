const http = require('http');

/*
1.如何上线Node编写的项目?
上线项目需要考虑的几个问题
1.1 服务稳定性, 不会因为程序的某个错误或异常导致项目停止服务
1.2 线上日志记录, 除了记录访问日志以外, 我们还需要记录错误日志和自定义日志
1.3 充分利用服务器资源, Node是单线程的, 服务器是多核的, 一台服务器只运行一个Node程序太浪费资源

2.如何解决上述问题?
通过PM2
2.1 PM2的进程守护可以在程序崩溃后自动重启
2.2 PM2自带日志记录的功能, 可以很方便的记录错误日志和自定义日志
2.3 PM2能够启动多个Node进程, 充分利用服务器资源

3.PM2使用
npm install pm2 -g
pm2 --version
pm2 start app.js
* */
/*
1.常用命令
pm2 start app.js|config     // 启动应用程序
pm2 list                    // 列出启动的所有的应用程序
pm2 restart appName|appId   // 重启应用程序
pm2 info appName|appId      // 查看应用程序详细信息
pm2 log appName|appId       // 显示指定应用程序的日志
pm2 monit appName|appId     // 监控应用程序
pm2 stop appName|appId      // 停止应用程序
pm2 delete appName|appId    // 关闭并删除所有应用
* */
// 2.通过http模块创建服务对象
const server = http.createServer();
// 3.通过服务对象监听用户请求
server.on('request', (req, res)=>{
  console.log('接收到请求');
  // 1.获取请求类型
  let method = req.method.toLowerCase();
  // 2.获取请求路径
  let url = req.url;
  let path = url.split('?')[0];
  // 3.处理请求
  if(method === 'get'){
    // 3.处理路由
    // if(path === '/login'){
    // }
  }
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8;'
  });
  res.end('it666.com');
});
// 4.指定监听的端口号
server.listen(3000);
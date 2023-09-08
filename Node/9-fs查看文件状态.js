/*
1.文件模块(fs)
封装了各种文件相关的操作

2.查看文件状态
fs.stat(path[, options], callback)
fs.statSync(path[, options])
*/
let fs = require("fs");
console.log(__dirname);
console.log(__filename);
fs.stat("a/c/d", function (err, stats) {
    // console.log(err);
   /* [Error: ENOENT: no such file or directory, stat 'D:\myCode\Node\a\c\d'] {
        errno: -4058,
        code: 'ENOENT',
        syscall: 'stat',
        path: 'D:\\myCode\\Node\\a\\c\\d'
}*/
});
// fs.stat(__dirname, function (err, stats) {
fs.stat(__filename, function (err, stats) {
    console.log(err); //null
    // console.log(stats);
    if (stats.isFile()){
        console.log("这是一个文件");
    }else if (stats.isDirectory()){
        console.log("这是一个文件夹");
    }
});

// stat是异步的, statSync是同步的;
let stats = fs.statSync(__dirname);
console.log(stats.isDirectory());

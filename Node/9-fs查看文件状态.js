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

const ejs = require('ejs');

function renderHTML(req, res, fileName) {
    ejs.renderFile(fileName, req.data, function(err, str){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8;'
        });
        res.end(str);
    });
}
module.exports = {
    renderHTML
}
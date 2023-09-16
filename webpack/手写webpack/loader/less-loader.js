const less = require('less');

module.exports = function (source) {
    let css = '';
    less.render(source, function (err, obj) {
        css = obj.css;
    });
    return css;
};

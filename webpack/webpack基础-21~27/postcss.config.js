const path = require('path');
module.exports = {
    plugins: {
        'postcss-sprites': {
            // 告诉webpack合并之后的图片保存到什么地方
            spritePath: './bundle/images',
            groupBy: function(image) {
                const name = path.dirname(image.url);
                return Promise.resolve(name);
            },
            // 告诉webpack合并图片的时候如何筛选
            filterBy: function(image) {
                const name = image.url;
                if (!/\.png$/.test(name)) {
                    return Promise.reject();
                }
                return Promise.resolve();
            }
        }
    }
};

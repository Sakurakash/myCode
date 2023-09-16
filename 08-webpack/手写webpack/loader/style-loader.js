module.exports = function(source) {
    // 注意点: 在loader中返回的数据必须是字符串类型或者是二进制类型
    return `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
    `;
};

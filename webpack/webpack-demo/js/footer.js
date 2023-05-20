function addFooter() {
    let oDiv = document.createElement("div");
    oDiv.innerText = "我是底部";
    document.body.append(oDiv);
}
exports.addFooter = addFooter;
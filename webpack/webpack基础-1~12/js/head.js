function addHead() {
    let oDiv = document.createElement("div");
    oDiv.innerText = "我是头部";
    document.body.append(oDiv);
}
exports.addHead = addHead;
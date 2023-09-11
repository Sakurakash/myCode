function addContent() {
    let oDiv = document.createElement("div");
    oDiv.innerText = "我是内容";
    document.body.append(oDiv);
}
exports.addContent = addContent;
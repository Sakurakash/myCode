import icon from "../封面.jpg";
function addImg() {
    let oImg = document.createElement("img");
    oImg.src = icon;
    oImg.className = "size";
    document.body.appendChild(oImg);
}
export {addImg};


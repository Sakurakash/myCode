import "../font/iconfont.css";
import "../css/index.css";
import icon from "../images/封面.jpg"
// import icon from "../bdlogo.png"
import $ from "jquery";
document.body.innerHTML += "<i class='iconfont icon-icon' style='font-size: 100px'></i>";
let oImg = document.createElement("img");
oImg.src = icon;
oImg.className = "size";
document.body.appendChild(oImg);

$.get("/user", function (res) {
    console.log(res);
});
$.get("/login", function (res) {
    console.log(res);
});

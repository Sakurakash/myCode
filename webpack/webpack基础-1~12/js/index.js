const head = require("./head.js");
const content = require("./content.js");
const footer = require("./footer.js");
import {addImg} from "./custom";
import icon from "../封面.jpg";
import cssModule from "../css/index.css";
// import "../less/index.less";
// import "../sass/index.scss";

head.addHead();
content.addContent();
let oImg = document.createElement("img");
oImg.src = icon;
oImg.className = cssModule.size;
document.body.appendChild(oImg);
addImg();
footer.addFooter();
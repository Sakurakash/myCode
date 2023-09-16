/* /!* import $ from 'jquery';

const oBtn = document.querySelector('button');
oBtn.onclick = function() {
    const $div = getComponent();
    document.body.appendChild($div[0]);
};
function getComponent() {
    return $('<div>我是div</div>');
} *!/

const oBtn = document.querySelector('button');
oBtn.onclick = function() {
    getComponent().then(($div) => {
        document.body.appendChild($div[0]);
    });
};
/!* function getComponent() {
    return import('jquery').then(({ default: $ }) => {
        return $('<div>我是div</div>');
    });
} *!/
async function getComponent() {
    const { default: $ } = await import(/!* webpackPrefetch: true *!//!* webpackChunkName: "jquery" *!/'jquery');
    return $('<div>我是div</div>');
} */

import icon from '../images/lnj.jpg';
import '../css/index.css';
import addBorder from './custom.js';
const oImg = document.createElement('img');
oImg.src = icon;
document.body.appendChild(oImg);

$('div').css({ width: '300px', height: '300px', background: 'blue' });
addBorder();

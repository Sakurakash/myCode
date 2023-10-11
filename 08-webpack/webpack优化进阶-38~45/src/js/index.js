import { add } from './custom';
import 'bootstrapCss';
import moment from 'moment';
import 'moment/locale/zh-cn.js';
import $ from 'jquery';
import _ from 'lodash';
import FastClick from 'fastclick';
document.body.innerHTML += '<button class="bg-danger">我是按钮</button>';

console.log(add(10, 20));
FastClick.attach(document.body);
moment.locale('zh-cn');
const time = moment('20111031', 'YYYYMMDD').fromNow();
console.log(time);
const $div = $('<div></div>');
$div.text(_.join(['1', '2', '3'], '+'));
$('body').append($div);

import icon from '../images/ldh.jpg';
import '../css/index.css';
// import "../css/sprite.css";
import addSpan from './test.js';

const oImg = document.createElement('img');
oImg.src = icon;
oImg.style.width = '300px';
document.body.appendChild(oImg);

const btn = document.createElement('button');
btn.innerText = '添加内容';
document.body.appendChild(btn);

let index = 0;
btn.onclick = function() {
    const p = document.createElement('p');
    p.innerText = '我是第' + index + '个段落';
    index++;
    document.body.appendChild(p);
};

addSpan();

const say = () => {
    console.log('hi');
};
say();
Promise.resolve().then(function() {
    console.log('promise');
});
// 判断当前有没有开启热更新
if (module.hot) {
    // 告诉热更新需要监听哪一个JS模块的变化
    module.hot.accept('./test.js', function() {
        const oSpan = document.querySelector('span');
        document.body.removeChild(oSpan);
        addSpan();
    });
}

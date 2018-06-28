var container = document.getElementsByClassName('con-banner')[0];
var list = document.getElementsByClassName('list')[0];
var buttons = container.getElementsByTagName('span');
var prepic = document.getElementsByClassName('prepic')[0];
var nextpic = document.getElementsByClassName('nextpic')[0];
var index = 1;
var timer;

// 运动函数
function animate (offset) {
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';
    if (newLeft > -660) {
        list.style.left = -3300 + 'px';
    }
    if (newLeft < -3300) {
        list.style.left = -660 + 'px';
    }
}

// 重复定时器
function play() {
    timer = setInterval(function () {
        nextpic.onclick();
    },5000)
}

// 定时器关闭
function stop() {
    clearInterval(timer);
}

// 小圆点样式改变
function buttonsShow() {
    for(var i = 0; i < buttons.length; i++){
        // if (buttons[i].className == "on"){
            buttons[i].className = "";
        // }
    }
    buttons[index - 1].className = 'on'; 
}

// 上一张图片点击事件
prepic.onclick = function () {
    index -= 1;
    if (index < 1){
        index = 5
    }
    buttonsShow();
    animate(660);
}

// 下一张图片点击事件
nextpic.onclick = function () {
    index += 1;
    if (index > 5){
        index = 1
    }
    animate(-660);
    buttonsShow();
}

//点击小圆圈，转到相应图片
for(var i = 0; i < buttons.length; i++){
    (function (i) {
        buttons[i].onclick = function () {
            var clickIndex = parseInt(this.getAttribute('index'));
            var offset = 660 * (index - clickIndex);
            animate(offset);
            index = clickIndex;
            buttonsShow();
        }
    })(i)
}
container.onmouseover = stop;
container.onmouseout = play;
play();


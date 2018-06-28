// 1.返回一个DOM元素包含的子元素节点的数组集合（兼容IE9以下）
Element.prototype.myChildren=function () {
    var child = this.childNodes,
        len = child.length,
        arr = [];
        for(var i = 0; i <len; i ++){
            if(child[i].nodeType == 1){
                arr.push(child[i]);
            }
        }
        return arr;
}

// 2.判断一个DOM元素是否包含子元素节点
Element.prototype.hasChildren=function () {
    var child = this.childNodes,
        len = child.length,
        arr = [];
        for(var i = 0; i <len; i ++){
            if(child[i].nodeType == 1){
                return true;
            }
        }
        return false;
}

// 3.返回DOM元素c的第n个兄弟元素节点，正下，负上，零自己（兼容IE9以下）
function retSibling (e,n) {
    while(e && n) {
        if(n > 0) {
            if(e.nestElementSibling){
                e=e.nextElementSibling
            }else{
                for(e=e.nextSibling; e && e.nodeType !=1; e = e.nextSibling){};
            }
            n--;
        }else{
            if(e.previousElementSibling){
                e=e.previousElementSibling;
            }else{
                for(e = e.previousSibling; e && e.nodeType !=1; e = e.previousSibling){};
            }
            n++;
        }
    }
    return e;
}

// 4.功能类insertBefore(),方向相反，在指定元素节点后插入新建的元素节点
Element.prototype.insertAfter = function (targetNode,afterNode){
    var beforeNode = afterNode.nextElementSibling;
    if(beforeNode == null){
        this.appendChild(targetNode);
    }else{
        this.insertBefore(targetNode,beforeNode);
    }
} 

// 5.分钟计时器（setInterval不准）
// html:
//     minutes:<input type="text" value="0">
//     seconds:<input type="text" value="0">

// js:
// var minutesNode = document.getElementsByTagName('input')[0],
//     secondsNode = document.getElementsByTagName('input')[1],
//     minutes = 0,
//     seconds = 0,
//     timer = setInterval(function () {
//         seconds ++;
//         if(seconds == 60){
//             seconds == 0;
//             minutes ++;
//         }
//         secondsNode.value = seconds;
//         minutesNode.value = minutes;
//         if(minutes == 3){
//             clearInterval(timer);
//         }
//     },1000)

// 6.返回滚动轮滚动的距离（兼容IE9以下）
function getScrollOffset () {
    if(window.pageXOffset) {
        return {
            x : window.pageXOffset,
            y : window.pageYOffset
        }
    }else{
        return {
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 7.返回浏览器视口尺寸（兼容IE9以下）
function getViewportOffset () {
    if(window.innerWidth) {
        return {
            w : window.innerWidth,
            h : window.innerHeight
        }
    }else{
        if(document.compatMode === "BackCompat") {
            return {
                w : document.body.clientWidth,
                h : document.body.clientHeight
            }
        }else{
            return {
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
    }
}

// 8.利用加锁式编程思维制作自动阅读功能
// html:
//<div style="width:100px;height:100px;text-align:center;position:fixed;bottom:200px;right:50px;border-radius:50%;opacity:0.5;">start</div>
//<div style="width:100px;height:100px;text-align:center;position:fixed;bottom:50px;right:50px;border-radius:50%;opacity:0.5;">stop</div>
//
// js:
// var start = document.getElementsByTagName('div')[0],
//     stop = document.getElementsByTagName('div')[1],
//     timer = 0,
//     key = true;
//     start.onclick = function () {
//         if (key) {
//             timer = setInterval(function() {
//                 window.scrollBy(0 , 10);
//             }, 100);
//             key = false;
//         }
//     }
//     stop.onclick = function () {
//         clearInterval(timer);
//         key = true;
//     }

// 9.返回elem当前样式,prop加引号（兼容IE9以下）
function getStyle(elem , prop) {
    if(window.getComputedStyle) {
        return window.getComputedStyle(elem , null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}

// 10.给一个DOM对象elem添加type事件类型(事件加引号)的处理函数handle，函数只写函数名不加括号（兼容IE9以下）
function addEvent (elem , type, handle) {
    if(elem.addElementListener) {
        elem.addEventListener(type, handle, false);
    }else if(elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            handle.call(elem);
        })
    }else{
        elem['on' + type] = handle;
    }
}

// 11.取消冒泡 div.onclick = stopBubble;(兼容IE9以下)
function stopBubble(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

// 12.阻止默认事件 同上（兼容IE9以下）
function cancelHandler(event) {
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

// 13.输入框格式,写在html，css内
// <input type="text" value="请输入用户名" style="color:#999" 
// onfocus="if(this.value=='请输入用户名'){this.value='';this.style.color='#424242'}" 
// onblur="if(this.value==''){this.value='请输入用户名';this.style.color='#999'}">

// 14.异步加载js的第三种方法-按需加载，写在html-body-script标签内（兼容IE9以下）
// 调用格式 loadScript('Ttools.js',function(){text();}); 写在function后
function loadScript(url,callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if(script.readyState) {//IE
        script.onreadystatechange = function () {
            if(script.readyState == "complete" || script.readyState =="loaded") {
                callback();
            }
        }
    }else{//chrome safari firefox opera
        script.onload = function () {
            callback();
        }
    }
    script.src =url;
    document.head.appendChild(script);
}

// 15.页面尺寸调试工具，复制到css文件
// * {
//     background: #000 !important;
//     color: #0f0 !important;
//     outline: solid #f00 1px !important;
// }
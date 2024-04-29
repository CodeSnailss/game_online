// 通过标签名获取元素
function gettag(tag) {
     return document.getElementsByTagName(tag);
}

//通过类名获取元素
function getclass(name) {
    return document.getElementsByClassName(name)
}

//获取第一个子元素
function getfc(ele) {
    return ele.firstElementChild||ele.firstChild;
}

//获取最后一个子元素
function getlc(ele) {
    return ele.lastElementChild||ele.lastChild;
}
//获取下一个兄弟节点
function getns(ele) {
    return ele.nextElementSibling||ele.nextSibling;
}

//获取上一个兄弟节点
function getps(ele) {
    return ele.previousElementSibling||ele.previousSibling;
}
//通过id获取元素名
function getid(id) {
    return document.getElementById("id")
}



//匀速动画
//ele 标签名字  移动的元素
// target 目标位置

function animation(ele,target) {
    clearInterval(ele.timer);    //防止加速执行
    var step=(target-ele.offsetLeft)>0? 10:-10;//目标位置减去当前位置如果是正数向右走，如果是负数-10向左走

    ele.timer=setInterval(function () {
        if (Math.abs(target-ele.offsetLeft)<=Math.abs(step)) {  //目标位置减去当前位置取绝对值。小于一步step的绝对值直接执行下一步代码
            ele.style.left=target+"px";  //最后一步闪现过去
            clearInterval(ele.timer)
        } else {
            ele.style.left= ele.offsetLeft+step+"px";
        }
    },10)
}



//缓动动画 左右走
function slowanimation(ele, target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = (target - ele.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
            ele.style.left = target + "px";
            clearInterval(ele.timer)
        } else {
            ele.style.left = ele.offsetLeft + step + "px";
            // console.log(ele.offsetLeft)
        }
    }, 20)

}


//获取网页滚动出去的大小
function myscroll(){
    return{
        "left":window.pageXOffset||document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        "top":window.pageYOffset||document.documentElement.scrollTop|| document.body.scrollTop || 0,
    }
}



//缓动动画 上下走
function animateBox(ele,target){
    clearInterval(ele.timer)
    ele.timer=setInterval(function(){
   var step=(target-ele.offsetTop)/10
   step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (Math.abs(target - ele.offsetTop) <= Math.abs(step)) {
        ele.style.top = target + "px";
        clearInterval(ele.timer)
    } else {
        ele.style.top = ele.offsetTop + step + "px";
    }
    },20)
}



// 检查浏览器可视区域
function client() {
    if(window.innerWidth!= undefined){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else if(document.compatMode=== "CSS1Compat"){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight,
        }
    }
    return{
        width:document.body.clientWidth,
        height:document.body.clientHeight
    }
}




//获取元素属性值  attr 属性值 eg：width
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr]
    }else {
        return ele.currentStyle[attr]
    }
}







//缓动动画完整版
function slowAnimate(ele,json,fn){
    //清空定时器
    clearInterval(ele.timer);
    ele.timer=setInterval(function(){
        var bool=true;
        //四步
        for(var k in json){
           //当前位置
           var current;
           if (k==="opacity") {
               current=getStyle(ele,k)*100||1
           }else{
               current=parseInt(getStyle(ele,k))||0;
           }
         
        //获取步长
        var step=(json[k]-current)/10;
        //步长取整
        step=step>0? Math.ceil(step):Math.floor(step);
        current=current+step;
        //正常移动
        if(k==="opacity"){
                ele.style[k]=current/100;    
        }else if(k==="zIndex"){
            ele.style[k]=json[k];
        }else{
            ele.style[k]=current+"px";
        }
      
            if(current!==json[k]){
                bool=false;
            }
        }
        //清除计时器
        if(bool){
            clearInterval(ele.timer);
            fn&&fn()
            //fn&fn()的意思是if(fn!==underfined){
            //   fn()
            //  }
        }
    },20)
}
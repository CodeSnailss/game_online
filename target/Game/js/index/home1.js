// 轮播图区域
// 获取当前轮播图的五张图片
let items1 = document.querySelectorAll('.lubo1');
let tigger1 = $('.tigger1');
let active1 = 0;
let timer1;
// 根据轮播图的数量动态生成按钮
for (let i = 0; i < items1.length; i++) {
    let span1 = document.createElement('span');
    if (i === 0) {
        span1.setAttribute('class', 'on');
    } else {
        items1[i].setAttribute('style', 'transform:translate3d(550px,0px,0px)');
    }
    tigger1.append(span1);
    // 为span创建单击响应事件
    span1.onclick = function() {
        clearInterval(timer1);
        // alert(1)
        // 判断当前是第几个
        if (i !== active1) {
            clearOn1();
            span1.setAttribute('class', 'on');
        }
        index1 = i;
        changeSilder1(i);
        active1 = i;
        autoShow1();
    }
}

function changeSilder1(newVal) {
    for (let i = 0; i < items1.length; i++) {
        if (i < newVal) {
            items1[i].setAttribute('style', 'transform:translate3d(-550px,0px,0px)');
        } else if (i > newVal) {
            items1[i].setAttribute('style', 'transform:translate3d(550px,0px,0px)');
        } else {
            items1[i].setAttribute('style', 'transform:translate3d(0px,0px,0px)');
        }
    }
}
var index1 = 0;
let spans1 = $('.tigger1 span');

function clearOn1() {
    for (let c = 0; c < items1.length; c++) {
        spans1[c].className = '';
    }
}

function autoShow1() {
    timer1 = setInterval(function() {
        if (index1 > items1.length - 1) {
            index1 = 0;
        }
        clearOn1();
        changeSilder1(index1);
        spans1[index1].className = 'on';
        index1++;
    }, 2500)
}
// autoShow()
setTimeout(function() {
    $('.autoShow1').css('opacity', '1');
}, 420)
;window.onload = function () {
    //获取标签
    function $(idName) {
        return document.getElementById(idName);
    }

    //获取样式使用最终值的函数
    function getStyle(ele, attr) {
        var res = null;
        if (ele.currentStyle) {
            res = ele.currentStyle[attr];
        } else {
            res = window.getComputedStyle(ele, null)[attr];
        }
        return parseFloat(res);
    }

    //获取标签元素
    //获取开始按钮元素
    var ks = $("ks")
        , s = $("scores").firstElementChild.firstElementChild
        , an = $("an")//开始标签
        , yx = $("yx")//游戏界面标签
        , enemyP = $("enemy")//敌方飞机标签
        , rlP = $("rl")//进度条标签
        , tubiao = $("tubiao")//燃料标签
        , xxP = $("xx")//行星标签
        , nickname = $("nickname")//输入昵称标签
        , djzdsP = $("djzds")//敌机子弹标签
        , bullet = $("bullet");//子弹标签
    var bullets = [];//所有子弹的集合
    var rls = [];//定义燃料集合
    var xxx = [];//定义行星集合
    var djzds = [];//定义敌机子弹的集合
    //定义己方飞船
    var main = $("main");
    var x = null;//行星定时器
    var c = null; //背景定时器
    var score = 0;//得分
    var backgroundPX = 0; //定义背景的x轴
    //开始游戏
    an.firstElementChild.onclick = function () {
        ks.style.display = "none";
        yx.style.display = "block";
        appearEnemy();//敌机开始创建
        start();//计时器开始计时
        rl1();//燃料开始创建
        jdt();//进度条开始倒计时
        xxyd();//行星开始创建
        bgMove();//背景移动
        djzd_1();//创建敌机子弹

    };

    //键盘控制方向
    var main1 = document.getElementById("main");
    var jLeft = false;
    var jTop = false;
    var jRight = false;
    var jBottom = false;
    var mainStatus = true;
    var yxH = getStyle(yx, "height");
    setInterval(function () {
        if (jLeft) {
            if (mainStatus) {
                main1.style.left = main1.offsetLeft - 10 + "px";
            }
        } else if (jRight) {
            if (mainStatus) {
                main1.style.left = main1.offsetLeft + 10 + "px";
            }
        }
        if (jTop) {
            if (mainStatus) {
                main1.style.top = main1.offsetTop - 10 + "px";
            }
        } else if (jBottom) {
            if (mainStatus) {
                main1.style.top = main1.offsetTop + 10 + "px";
            }
        }
        limit();
    }, 30);
    document.onkeydown = function (event) {
        var event = event || window.event;
        switch (event.keyCode) {
            case 37:
                jLeft = true;
                break;
            case 38:
                jTop = true;
                break;
            case 39:
                jRight = true;
                break;
            case 40:
                jBottom = true;
                break;
        }
        limit();
        return false;
    };
    //var youxizt =true;
    // if(youxizt){正常调用}
    // else{ !createBullet();}
    // 暂停：{youxizt =false}
    // 开始{youxizt =true;}

    document.onkeyup = function (event) {
        switch ((event || window.event).keyCode) {
            case 37:
                jLeft = false;
                break;
            case 38:
                jTop = false;
                break;
            case 39:
                jRight = false;
                break;
            case 40:
                jBottom = false;
                break;
            case 32:
                if (mainStatus) {
                    createBullet();//触发子弹事件
                }
                break;
            case 80:
                if (mainStatus) { //点击P建时，暂停游戏，再次点击，开始游戏
                    mainStatus = false;
                    clearInterval(b);//清除敌机定时器
                    clearInterval(rl);//清除燃料定时器
                    clearInterval(x);//清除行星定时器
                    clearInterval(int);//清除计时器
                    clearInterval(djzd_timer);//清除敌机创建子弹定时器
                } else {
                    mainStatus = true;
                    rl = null;//燃料为空
                    rl1();//燃料开始创建
                    b = null;//敌机为空
                    appearEnemy();//敌机开始创建
                    x = null;//行星为空
                    xxyd();//开始创建行星
                    int = null;//计时器为空
                    start();//开始计时器
                    djzd_timer = null;//敌机子弹定时器
                    djzd_1();//开始敌机子弹定时器

                }
        }
        limit();
        return true;
    };

    //防止溢出
    function limit() {
        //var doc = [document.documentElement.clientWidth, document.documentElement.clientHeight];
        //防止左侧溢出
        main1.offsetLeft <= 0 && (main1.style.left = 0 + "px");
        //防止顶部溢出
        main1.offsetTop <= 0 && (main1.style.top = 0 + "px");
        //防止右侧溢出
        main1.offsetLeft >= 860 && (main1.style.left = 860 + "px");
        //防止底部溢出
        main1.offsetTop >= 500 && (main1.style.top = 500 + "px");
    }


//敏感区域的移动
    var top = document.getElementById("top");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var bottom = document.getElementById("bottom");

    right.onmouseover = function () {
        var right_timer = setInterval(function () {
            if (right) {
                if (mainStatus) {
                    main1.style.left = main1.offsetLeft + 10 + "px";
                }
            }
            limit();
        }, 30);
        right.onmouseout = function () {
            clearInterval(right_timer);
        }
    };
    top.onmouseover = function () {
        var top_timer = setInterval(function () {
            if (top) {
                if (mainStatus) {
                    main1.style.top = main1.offsetTop - 10 + "px"
                }
            }
            limit();
        }, 30);
        top.onmouseout = function () {
            clearInterval(top_timer);
        }
    };
    left.onmouseover = function () {
        var left_timer = setInterval(function () {
            if (left) {
                if (mainStatus) {
                    main1.style.left = main1.offsetLeft - 10 + "px"
                }
            }
            limit();
        }, 30);
        left.onmouseout = function () {
            clearInterval(left_timer);
        }
    };
    bottom.onmouseover = function () {
        var bottom_timer = setInterval(function () {
            if (bottom) {
                if (mainStatus) {
                    main1.style.top = main1.offsetTop + 10 + "px"
                }
            }
            limit();
        }, 30);
        bottom.onmouseout = function () {
            clearInterval(bottom_timer);
        }
    };
    var bulletW = 14
        , bulletH = 6;
    var bulletsP = $("bullets");
    var myMainW = getStyle(main, "width")
        , myMainH = getStyle(main, "height");
    var yxW = getStyle(yx, "width")
        , yxH = getStyle(yx, "height");

    //制造子弹
    function createBullet() {
        var bullet = new Image();
        bullet.src = "img/bullet1.png";
        bullet.className = "b";
        //己方飞机的位置
        var myMainL = getStyle(main, "left")
            , myMainT = getStyle(main, "top");
        //确定创建子弹的位置
        var bulletT = myMainT + myMainH / 2 - bulletH / 2
            , bulletL = myMainL + myMainW - bulletW / 2;
        if (mainStatus) {
            bullet.style.left = bulletL + "px";
            bullet.style.top = bulletT + "px";
        }
        bulletsP.appendChild(bullet);
        bullets.push(bullet);
        move(bullet, "left");
    }

    //子弹的运动
    function move(ele, attr) {
        var speed = +8;
        ele.timer = setInterval(function () {
            var moveVal = getStyle(ele, attr);
            //子弹的运动出游戏界面： 清除定时器 ，删除子弹
            if (moveVal >= 940) {
                clearInterval(ele.timer);
                ele.parentNode.removeChild(ele);
                bullets.splice(0, 1);
            } else {
                if (mainStatus) {
                    ele.style[attr] = moveVal + speed + "px";
                }
            }
        }, 30);
    }

    //创建敌机数据
    var ememysObj = {
        enemy1: {
            width: 80,
            height: 81,
            score: 5,
            hp: 100
        },
        enemy2: {
            width: 80,
            height: 80,
            score: 10,
            hp: 200
        },
        enemy3: {
            width: 80,
            height: 80,
            score: -10,
            hp: 100
        }
    };
    //创建燃料
    var rlObj = {
        rl1: {
            width: 35,
            height: 45
        }
    };
    //创建行星
    var xxObj = {
        xx1: {
            width: 100,
            height: 100
        },
        xx2: {
            width: 80,
            height: 80
        },
        xx3: {
            width: 90,
            height: 52
        },
        xx4: {
            width: 35,
            height: 36
        },
        xx5: {
            width: 23,
            height: 24
        }
    };
    //创建敌机的定时器
    var b = null;

    function appearEnemy() {
        if (b) return;//当创建子弹的定时器“b”为null时执行以下函数，当创建子弹定时器为return时不执行以下函数
        b = setInterval(function () {
            //制造敌机
            if (mainStatus) {
                createEnemy();
            }
        }, 1000);
    }

    clearInterval(b);
    //制造敌机的函数
    var enemys = [];

    function createEnemy() {
        //敌机出现概率的数据
        var percentData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
        //敌机的类型
        var enemyType = percentData[Math.floor(Math.random() * percentData.length)];
        //得到当前随机敌机的数据
        var enemyData = ememysObj ["enemy" + enemyType];
        //创建敌机所在的元素
        var enemy = new Image(enemyData.width, enemyData.height);
        enemy.src = "img/dj" + enemyType + ".png";
        enemys.t = enemyType;
        enemy.score = enemyData.score;
        enemy.hp = enemyData.hp;
        enemy.className = "e";
        enemy.dead = false;//敌机存活
        //确定当前敌机的出现时的位置
        var enemyL = -enemyData.width
            , enemyT = Math.floor(Math.random() * (yxH - enemyData.height + 1));
        if (mainStatus) {
            enemy.style.left = 960 + "px";
            enemy.style.top = enemyT + "px";
        }
        enemyP.appendChild(enemy);
        enemys.push(enemy);
        enemyMove(enemy, "left");
    }

    //敌机子弹创建方法
     var djzd_timer = null;
    function djzd_1() {
        if(djzd_timer) return;
        djzd_timer = setInterval(function () {
            var djs = enemyP.getElementsByTagName("img");
            for (var i = 0; i < djs.length; i++) {
                if (djs[i].offsetHeight === 81) {
                    // console.log(djs[i].offsetTop,djs[i].offsetHeight);
                    create_djzd(djs[i]);
                }
            }
        }, 2000);
    }

    function create_djzd(ele) {
        //console.log(ele.offsetHeight);
        //敌机子弹的宽、高
        var djzdW = 14
            , djzdH = 6;
        var djzd = new Image();
        djzd.src = "img/djzd1.png";
        djzd.className = "z";
        //确定敌机创建的位置
        var djW = ele.offsetWidth
            , djH = ele.offsetHeight;//敌机的宽高
        var djL = ele.offsetLeft
            ,djT = ele.offsetTop;//敌机的左、上边距
        //console.log(djW);
        //console.log(djH);
        //确定创建敌机子弹的位置
        var djzdT = djT + djH / 2 - djzdH / 2
            , djzdL = djL - djW/2  + djzdW / 2;
        if(mainStatus) {
            djzd.style.top = djzdT + "px";
            djzd.style.left = djzdL + "px";
        }
        djzdsP.appendChild(djzd);
        djzds.push(djzd);
        djzdMove(djzd, "left");
    }

    function djzdMove(ele,attr) {
        var speed = -5;
        ele.timer = setInterval(function () {
            var djzdyd = getStyle(ele,attr);
            if(djzdyd <= -14){
                clearInterval(ele.timer);
                djzdsP.removeChild(ele);
            }else {
                if(mainStatus) {
                    ele.style[attr] = djzdyd + speed + "px";
                }
                zdpz();
            }
        },10)
    }
    //敌机运动
    function enemyMove(ele,attr) {
        var speed = -2;
        ele.timer = setInterval(function () {
            var moveVal = getStyle(ele, attr);
            if (moveVal <= -80) {
                clearInterval(ele.timer);
                enemyP.removeChild(ele);
            } else {
                if(mainStatus) {
                    ele.style[attr] = moveVal + speed + 'px';


                }
                //每一架敌机运动时，检测和每一颗子弹的碰撞
                danger(ele);
                //检测己方飞机与敌机的碰撞
                gameOver();
            }
        }, 10)
    }
        //检测己方飞机的子弹和敌机的碰撞
        function danger(enemys) {
            for (var i = 0; i < bullets.length; i++) {
                //得到子弹的左上边距
                var bulletL = getStyle(bullets[i], "left")
                    , bulletT = getStyle(bullets[i], "top");
                //得到敌机的左上边距
                var enemyL = getStyle(enemys, "left")
                    , enemyT = getStyle(enemys, "top");
                //得到敌机的宽高
                var enemyW = getStyle(enemys, "width")
                    , enemyH = getStyle(enemys, "height");
                var condition = bulletL + bulletW >= enemyL && bulletL <= enemyL + enemyW && bulletT <= enemyT + enemyH && bulletT + bulletH >= enemyT;
                if (condition) {
                    //子弹和敌机的碰撞：删除子弹
                    //console.log("ccc");
                    //1.先清除碰撞子弹的定时器
                    clearInterval(bullets[i].timer);
                    //2.删除元素
                    bulletsP.removeChild(bullets[i]);
                    //3.从集合中删除子弹
                    bullets.splice(i, 1);
                    //4.子弹和敌机发生碰撞后，敌机血量减少，血量为0时，删除敌机
                    enemys.hp -= 100;
                    if (enemys.hp === 0) {
                        //删除敌机
                        clearInterval(enemys.timer);
                        enemyP.removeChild(enemys);
                        score += enemys.score;
                        s.innerHTML = score;
                    }
                }
            }
        }
        //计时器
    var hour,minute,second;//时 分 秒
    hour = minute = second = 0;//初始化
    var millisecond = 0;//毫秒
    var int = null;
    //游戏状态 gamestatue
    function start()//开始
    {
        if(int) return;
        if(mainStatus) {
            int = setInterval(time, 60);
        }
    }

    function time()//计时
    {
        millisecond = millisecond + 60;
        if(millisecond >= 1000) {
            millisecond = 0;
            second=second + 1;
        }
        if(second >= 60) {
            second = 0;
            minute=minute + 1;
        }
        if(minute >= 60) {
            minute = 0;
            hour=hour + 1;
        }
        if(mainStatus) {
            document.getElementById('jsq').value = toDub(hour) + ':' + toDub(minute) + ':' + toDub(second);
        }
    }
    //补零
    function toDub(n){
        return n<10?"0"+n:""+n;
    }
    //进度条
    var v = 200;
    function jdt() {
        var dsq1 = setInterval(function () {
            if(mainStatus) {
                document.getElementById("jdt").style.width = v-- + 'px';
                document.getElementById("span").innerHTML = parseInt(v * 100 / 200);
            }
            if (v <= 0) {
                v = 0;
                clearInterval(dsq1);
                yxjs();//游戏结束
                function yxjs() {
                    yx.style.display = "none";
                    nickname.style.display = "block";
                    var yxjs = $("yxjs");
                    mainStatus = true;
                    clearInterval(b);//清除敌机定时器
                    clearInterval(rl);//清除燃料定时器
                    clearInterval(x);//清除行星定时器
                    clearInterval(c);//清除背景定时器
                    clearInterval(djzd_timer);//清除子弹定时器

                    rl = null;//燃料为空

                    b = null;//敌机为空

                    x = null;//行星为空

                    djzd_timer = null;//敌机子弹定时器

                    hour = minute = second = 0;//时间初始化

                    millisecond = 0;//毫秒

                    int = null;//计时器为空

                    v = 200;
                    bullets = [];//所有子弹的集合


                    rls = [];//定义燃料集合
                    xxx = [];//定义行星集合

                    djzds = [];//定义敌机子弹的集合

                    var df = $("df");
                    df.innerHTML = "你的得分是："+ score + "分";

                    enemyP.innerHTML = "";
                    xxP.innerHTML = "";
                    bulletsP.innerHTML = "";

                    //定义己方飞船
                    x = null;//行星定时器
                    c = null; //背景定时器
                    score = 0;//得分
                    backgroundPX = 0; //定义背景的x轴
                    s.innerHTML = score;


                    yxjs.onclick = function (){
                        //mainStatus = !mainStatus;
                        yx.style.display = "none";
                        nickname.style.display = "none";
                        ks.style.display = "block";


                    }
                }
            }
        }, 150);
    }
    //燃料掉落的定时器
    var rl = null;
    function rl1() {
        if(rl) return;
        rl = setInterval(function () {
            //制造燃料
            if(mainStatus){
                ran();
            }
        },5000);
    }
    var rlW = 35
        ,rlH = 45;
    //制造燃料
    function ran() {
        //燃料出现的概率
        var rlGl = [1];
        //燃料的随机位置
        var rlLx = rlGl[Math.floor(Math.random()*rlGl.length)];
        //得到当前随机的数据
        var rlSj = rlObj ["rl" + rlLx];
        //创建燃料所在的元素
        var rl = new Image(rlLx.width,rlLx.height);
        rl.src = "img/rl" + rlLx + ".png";
        rl.className = "rl";
        rl.dead = false;//燃料存在
        //确定燃料出现的位置
        var rlL = Math.floor(Math.random()*(960 - rl.width + 1))
            ,rlT = rl.height;
        if(mainStatus) {
            rl.style.left = rlL + "px";
            rl.style.top = rlT + "px";
        }
        rlP.appendChild(rl);
        rls.push(rl);
        rlMove(rl,"top")
    }
    //燃料的运动
    function rlMove(ele,attr) {
        var speed = +5;
        ele.timer = setInterval(function () {
            var moveRl =getStyle(ele,attr);
            if(moveRl >= 600){
                //清除燃料的定时器
                clearInterval(ele.timer);
                //清除燃料的变量
                rlP.removeChild(ele);
                rls.splice(0,1);
            }else{
                if(mainStatus) {
                    ele.style[attr] = moveRl + speed + "px";
                }
                pz();
            }
        },30)
    }
    //字体大小
    var sizeup = document.getElementById("sizeup");
    var sizedown = document.getElementById("sizedown");
    sizeup.onclick = function () {
        var body = document.getElementsByTagName("body")[0];
        var zitidaxiao = window.getComputedStyle(body , null).getPropertyValue('font-size');
        var  gaiziti = parseInt(zitidaxiao)+1;
        //上限
        if(parseInt(zitidaxiao) >= 26 ){
            body.style.fontSize = 26 + "px"
        }else{
            body.style.fontSize = gaiziti + "px";
        }
    };
    sizedown.onclick = function () {
        var body = document.getElementsByTagName("body")[0];
        var zitidaxiao = window.getComputedStyle(body , null).getPropertyValue('font-size');
        var  gaiziti = parseInt(zitidaxiao)-1;
        console.log(gaiziti);
        //上限
        if(parseInt(zitidaxiao) <= 15 ){
            if(mainStatus) {
                body.style.fontSize = 15 + "px"
            }
        }else{
            if(mainStatus) {
                body.style.fontSize = gaiziti + "px";
            }
        }
    };
    //检测己方飞机与燃料的碰撞
    function pz() {
        for(var i = 0;i < rls.length;i++){
            //获取燃料的左、上边距
            var rlL = getStyle(rls[i],"left")
                ,rlT = getStyle(rls[i],"top");
            //console.log(rlL);
            //获取己方飞机的左、上边距
            var mainL = getStyle(main,"left")
                ,mainT = getStyle(main,"top");
            //获取己方飞机的宽、高
            var mainW = getStyle(main,"width")
                ,mainH = getStyle(main,"height");
            var jfr = rlL + rlW >= mainL && rlL <= mainL + mainW && rlT <= mainT + mainH && rlT + rlH >= mainT;
            if(jfr){
                //燃料计数器+100
                v  +=  100;
                //判断计数器》=200
                if(v >= 200){
                    v = 200;
                }
                   tubiao.src = "img/rl2.png";
                setTimeout(function() {
                        tubiao.src = "img/rl1.png";
                }, 300);

                // console.log("ccc");
                //清除燃料定时器
                clearInterval(rls[i].timer);
                //删除元素
                rlP.removeChild(rls[i]);
                //从集合中删除元素
                rls.splice(i,1);
            }
        }
    }
    //检测敌机与己方飞机的碰撞
    function gameOver() {
        for(var d = 0; d < enemys.length; d ++){
            if(!enemys[d].dead){//游戏里面存活的敌机
                //检测碰撞
                //获取敌机的左、上边距
                var enemysL = getStyle(enemys[d],"left")
                    ,enemysT = getStyle(enemys[d],"top");
                //获取敌机的宽高
                var enemysW = getStyle(enemys[d],"width")
                    ,enemysH = getStyle(enemys[d],"height");
                //获取己方飞机的左、上边距
                var mainL = getStyle(main,"left")
                    ,mainT = getStyle(main,"top");
                //获取己方飞机的宽高
                var mainW = getStyle(main,"width")
                    ,mainH = getStyle(main,"height");
                var condition = mainL + mainW >= enemysL && mainL <= enemysL + enemysW && mainT <= enemysT + enemysH && mainT + mainH >= enemysT;
                //console.log(condition);
                if(condition){
                    v = v - 30;
                    clearInterval(enemys[d].timer);
                    enemyP.removeChild(enemys[d]);
                    //console.log(v);
                    if(v <= 0){
                        v = 0;
                        if(mainStatus) {
                            document.getElementById("jdt").style.width = v + 'px';
                            document.getElementById("span").innerHTML = parseInt(v * 100 / 200);
                        }
                    }
                }
            }
        }
    }
    //创建行星定时器
    function xxyd() {
        if(x) return;
        x = setInterval(function () {
            if(mainStatus){
                xx();
            }

        },2000)
    }
    //clearInterval(x);
    //行星的出现的函数
    function xx() {
        //行星出现的概率
        var xxGl = [1,2,3,4,5];
        //行星的类型
        var xxType = xxGl [Math.floor(Math.random()*xxGl.length)];
        //得到当前随机的行星数据
        var xxSj = xxObj ["xx" + xxType];
        //创建行星所在的元素
        var xx = new Image(xxSj.width,xxSj.height);
        xx.src = "img/xx" + xxType + ".png";
        xx.t = xxType;
        xx.className = "f";
        xx.dead = false;
        //确定行星的出现位置
        var xxL = -xxSj.width
            ,xxT = Math.floor(Math.random()*(yxH - xxSj.height + 1));
        if(mainStatus) {
            xx.style.left = 960 + "px";
            xx.style.top = xxT + "px";
        }
        xxP.appendChild(xx);
        xxx.push(xx);
        xxMove(xx,"left");
    }
    //行星运动
    function xxMove(ele,attr) {
        //console.log(xxx);
        var speed = null;
        if (ele.t === 5) {
            speed = -2;
        } else if (ele.t === 4) {
            speed = -2.1;
        } else if (ele.t === 3) {
            speed = -2.2;
        } else if (ele.t === 2) {
            speed = -2.3;
        } else if (ele.t === 1) {
            speed = -2.5;
        }
        ele.timer = setInterval(function () {
            var moveXx = getStyle(ele, attr);
            if (moveXx <= -50) {
                clearInterval(ele.timer);
                //删除节点
                xxP.removeChild(ele);
                xxx.splice(0, 1);
            }else {
                if(mainStatus) {
                    ele.style[attr] = moveXx + speed + "px";
                }
            }
        }, 30)
    }
    //开始游戏之后的背景图的运动
    function bgMove() {
        c = setInterval(function () {
            backgroundPX -= 1;
            if(backgroundPX >= yxW){
                backgroundPX = 0;
            }
            if(mainStatus) {
                yx.style.backgroundPositionX = backgroundPX + "px";
            }
        },10)
    }
    //检测敌机子弹与己方飞机的碰撞
    function zdpz() {
        for(var i = 0;i < djzds.length;i++){
            //获取敌机子弹的左、上边距
            var zdL = getStyle(djzds[i],"left")
                ,zdT = getStyle(djzds[i],"top");
            //获取敌机子弹的宽、高
            var zdW = getStyle(djzds[i],"width")
                ,zdH= getStyle(djzds[i],"height");
            //获取己方飞机的宽、高
            var mainW = getStyle(main,"width")
                ,mainH = getStyle(main,"height");
            //获取己方飞机的左、上边距
            var mainL = getStyle(main,"left")
                ,mainT = getStyle(main,"top");
            var pz = zdL + zdW >= mainL && zdL <= mainL + mainW && zdT <= mainT + mainH && zdT + zdH >= mainT;
            if(pz){
                v = v -30;
                clearInterval(djzds[i].timer);
                djzdsP.removeChild(djzds[i]);
                if(v <= 0){
                    v =0;
                    if(mainStatus){
                        document.getElementById("jdt").style.width = v + 'px';
                        document.getElementById("span").innerHTML = parseInt(v * 100 / 200);
                    }
                }
            }
        }
    }
    //实现鼠标点击P建游戏暂停
    var jpzt = document.getElementById("jpzt");
    jpzt.onclick = function () {
        if (mainStatus) { //点击P建时，暂停游戏，再次点击，开始游戏
            mainStatus = false;
            clearInterval(b);//清除敌机定时器
            clearInterval(rl);//清除燃料定时器
            clearInterval(x);//清除行星定时器
            clearInterval(int);//清除计时器
            clearInterval(djzd_timer);//清除敌机子弹的定时器
        } else {
            mainStatus = true;
            rl = null;//燃料为空
            rl1();//燃料开始创建
            b = null;//敌机为空
            appearEnemy();//敌机开始创建
            x = null;//行星为空
            xxyd();//开始创建行星
            int = null;//计时器为空
            start();//开始计时器
            djzd_timer = null;//敌机子弹定时器
            djzd_1();//开始敌机子弹定时器
        }
    };
};
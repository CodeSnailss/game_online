$(document).ready(function () {
        $(".message").addClass("animated swing")
        $(".choosefj").addClass("animated swing")
        $(".rules").addClass("animated swing")
        var cds;
        var game = {
            name: '游戏开始',
            plane: document.getElementsByClassName('plane')[0],//飞机
            RunTime: document.getElementsByClassName('sd')[0],//计时文字替换
            RunTimekt: document.getElementsByClassName('kt')[0],//空投
            RunTimeyt: document.getElementsByClassName('yt')[0],//加油
            RunTimezd: document.getElementsByClassName('zd')[0],//炸弹
            SSpeedX: document.getElementsByClassName('xspeeds')[0],//x速度
            SSpeedY: document.getElementsByClassName('yspeeds')[0],//y速度
            num: 0,//计时
            giftnum: 0,//空投数
            oilnum: 0,//油桶数
            boomnum: 0,//炸弹数
            bullet: [],//子弹
            gift: [],//空投
            oil: [],//油桶
            boom: [],//炸弹
            flag: true,
            movePlus: {
                //墙壁外框
                outer: document.getElementsByClassName('outer')[0],
                iWidth: document.getElementsByClassName('outer')[0].offsetWidth,   //返回元素的宽度（包括元素宽度、内边距和边框，不包括外边距）
                iHeight: document.getElementsByClassName('outer')[0].offsetHeight,
                ispeedY: 10,//y速度,//子弹速度
                ispeedX: 10,
                starts: false
            },
            // 入口函数
            init: function () {
                // console.log(this.name);
                // console.log(this.movePlus.iHeight);
                this.createBullet(this.movePlus);
                this.createGift(this.movePlus);
                this.createOil(this.movePlus);
                this.createBoom(this.movePlus);
                this.DragPlane(this.movePlus);
                this.runTime();
                this.giftNumber();
                this.oilNumber();
                this.boomNumber();
                // this.runSpeed();
            },

            //    XY速度
            // runSpeed: function () {
            //     var that = this;
            //     that.SSpeedX.innerHTML = 'X轴速度' + that.movePlus.ispeedY + '秒';
            //     that.SSpeedY.innerHTML = 'Y轴速度' + that.movePlus.ispeedX + '秒';
            // },

            //    计时
            runTime: function () {
                var that = this;
                this.Timer = setInterval(function () {
                    that.num++;
                    that.RunTime.innerHTML = '飞行' + that.num + '秒';
                    $(".enum").html(that.num);
                }, 1000);
            },

            //    计礼物数
            giftNumber: function () {
                var that = this;
                this.giftTimer = setInterval(function () {
                    that.RunTimekt.innerHTML = '空投' + that.giftnum + '个';
                    $(".ekt").html(that.giftnum);
                }, 1000);
            },

            //    计yt数
            oilNumber: function () {
                var that = this;
                this.oilTimer = setInterval(function () {
                    that.RunTimeyt.innerHTML = '加油' + that.oilnum + '次';
                    $(".eyt").html(that.oilnum);
                }, 1000);
            },


            //    计zd数
            boomNumber: function () {
                var that = this;
                this.boomTimer = setInterval(function () {
                    that.RunTimezd.innerHTML = '爆炸' + that.boomnum + '次';
                    $(".eza").html(that.boomnum);
                }, 1000);
            },


            //创建子弹
            createBullet: function (obj) {
                var that = this;
                var plus = obj;
                function Bullet(plus) {
                    this.bb = document.createElement('div');//  创建div
                    this.bb.className = 'bullet';//  创建类
                    plus.outer.appendChild(this.bb);//  添加新的子节点
                    this.subWidth = Math.floor(Math.random() * 10);
                    this.bb.style.left = this.subWidth + 'px';
                    this.ispeedX = Math.floor(Math.random() * plus.ispeedX);//随机X速度
                    this.ispeedY = Math.floor(Math.random() * plus.ispeedY);//随机Y速度
                    // 自定义属性
                    this.iWidth = plus.iWidth;
                    this.iHeight = plus.iHeight;
                }
                //第一个子弹
                var fbb = new Bullet(plus);
                that.bullet.push(fbb);
                //几秒一个子弹
                // this.creatTimer = setInterval(function () {
                var as = setInterval(function () {
                    var fbb = new Bullet(plus);
                    that.bullet.push(fbb)
                    var fbbnum = that.bullet.length;
                    console.log("bullet数量" + fbbnum)
                    // 控制数量
                    console.log(bullets)
                    if (that.bullet.length > bullets-1) {
                        clearInterval(as)
                    }
                }, cds);
                this.moveBullet();
            },



            //创建礼物
            createGift: function (obj) {
                var that = this;
                var plus = obj;
                function Gift(plus) {
                    this.gg = document.createElement('div');//  创建div
                    this.gg.className = 'gift';//  创建类
                    plus.outer.appendChild(this.gg);//  添加新的子节点
                    this.subWidth = Math.floor(Math.random() * 10);
                    this.gg.style.left = this.subWidth + 'px';
                    this.ispeedX = Math.floor(Math.random() * plus.ispeedX);//随机X速度
                    this.ispeedY = Math.floor(Math.random() * plus.ispeedY);//随机Y速度
                    // 自定义属性
                    this.iWidth = plus.iWidth;
                    this.iHeight = plus.iHeight;
                }
                // this.creatgiftTimer = setTimeout(function () {
                //     var fgg = new Gift(plus);
                //     this.gift.push(fgg);
                // }, 3000);
                // this.creatgiftTimer = setInterval(function () {
                var bs = setInterval(function () {
                    var fgg = new Gift(plus);
                    that.gift.push(fgg)
                    var fggnum = that.gift.length;
                    console.log("gift数量" + fggnum)
                    // 控制数量
                    if (that.gift.length == bullets-1) {
                        clearInterval(bs)
                    }
                }, 7000);
                this.moveGift();
            },


            //创建yt
            createOil: function (obj) {
                var that = this;
                var plus = obj;
                function Oil(plus) {
                    this.oo = document.createElement('div');//  创建div
                    this.oo.className = 'oil';//  创建类
                    plus.outer.appendChild(this.oo);//  添加新的子节点
                    this.subWidth = Math.floor(Math.random() * 10);
                    this.oo.style.left = this.subWidth + 'px';
                    this.ispeedX = Math.floor(Math.random() * plus.ispeedX);//随机X速度
                    this.ispeedY = Math.floor(Math.random() * plus.ispeedY);//随机Y速度
                    // 自定义属性
                    this.iWidth = plus.iWidth;
                    this.iHeight = plus.iHeight;
                }
                // this.creatoilTimer = setTimeout(function () {
                //     var foo = new Oil(plus);
                //     this.oil.push(foo);
                // }, 4000);
                // this.creatoilTimer = setInterval(function () {
                var cs = setInterval(function () {
                    var foo = new Oil(plus);
                    that.oil.push(foo)
                    var foonum = that.oil.length;
                    console.log("oil数量" + foonum)
                    // 控制数量
                    if (that.oil.length == bullets-1) {
                        clearInterval(cs)
                    }
                }, 10000);
                this.moveOil();
            },


            //创建za
            createBoom: function (obj) {
                var that = this;
                var plus = obj;
                function Boom(plus) {
                    this.mm = document.createElement('div');//  创建div
                    this.mm.className = 'boom';//  创建类
                    plus.outer.appendChild(this.mm);//  添加新的子节点
                    this.subWidth = Math.floor(Math.random() * 10);
                    this.mm.style.left = this.subWidth + 'px';
                    this.ispeedX = Math.floor(Math.random() * plus.ispeedX);//随机X速度
                    this.ispeedY = Math.floor(Math.random() * plus.ispeedY);//随机Y速度
                    // 自定义属性
                    this.iWidth = plus.iWidth;
                    this.iHeight = plus.iHeight;
                }
                // this.creatboomTimer = setTimeout(function () {
                //     var fmm = new Boom(plus);
                //     this.boom.push(fmm);
                // }, 5000);
                // this.creatboomTimer = setInterval(function () {
                var ds = setInterval(function () {
                    var fmm = new Boom(plus);
                    that.boom.push(fmm)
                    var fmmnum = that.boom.length;
                    console.log("boom数量" + fmmnum)
                    // 控制数量
                    if (that.boom.length == bullets-1) {
                        clearInterval(ds)
                    }
                }, 5000);
                this.moveBoom();
            },




            // 子弹轨迹    
            moveBullet: function () {
                //创建定时器
                var that = this;
                // 保存window的this
                this.goTimer = setInterval(function () {

                    for (var i = 0; i < that.bullet.length; i++) {
                        that.crashCheck(that.bullet[i]);
                        var newLeft = that.bullet[i].bb.offsetLeft + that.bullet[i].ispeedX;
                        //  偏移量加速度
                        var newTop = that.bullet[i].bb.offsetTop + that.bullet[i].ispeedY;
                        //  四壁回弹
                        if (newLeft < 0) {
                            that.bullet[i].ispeedX *= -1;
                        }
                        else if (newLeft > (that.bullet[i].iWidth - that.bullet[i].bb.offsetWidth)) {
                            that.bullet[i].ispeedX *= -1;
                        }
                        else if (newTop < 0) {
                            that.bullet[i].ispeedY *= -1;
                        }
                        else if (newTop > (that.bullet[i].iHeight - that.bullet[i].bb.offsetHeight)) {
                            that.bullet[i].ispeedY *= -1;
                        }
                        that.bullet[i].bb.style.left = newLeft + 'px';
                        that.bullet[i].bb.style.top = newTop + 'px';
                    }
                }, 50)
            },
            // 礼物轨迹    
            moveGift: function () {
                //创建定时器
                var that = this;
                // 保存window的this
                this.gogiftTimer = setInterval(function () {
                    for (var i = 0; i < that.gift.length; i++) {
                        that.gcrashCheck(that.gift[i]);
                        var newLeft = that.gift[i].gg.offsetLeft + that.gift[i].ispeedX;
                        //  偏移量加速度
                        var newTop = that.gift[i].gg.offsetTop + that.gift[i].ispeedY;
                        //  四壁回弹
                        if (newLeft < 0) {
                            that.gift[i].ispeedX *= -1;
                        }
                        else if (newLeft > (that.gift[i].iWidth - that.gift[i].gg.offsetWidth)) {
                            that.gift[i].ispeedX *= -1;
                        }
                        else if (newTop < 0) {
                            that.gift[i].ispeedY *= -1;
                        }
                        else if (newTop > (that.gift[i].iHeight - that.gift[i].gg.offsetHeight)) {
                            that.gift[i].ispeedY *= -1;
                        }
                        that.gift[i].gg.style.left = newLeft + 'px';
                        that.gift[i].gg.style.top = newTop + 'px';
                    }
                }, 50)
            },
            // yt轨迹    
            moveOil: function () {
                //创建定时器
                var that = this;
                // 保存window的this
                this.gooilTimer = setInterval(function () {
                    for (var i = 0; i < that.oil.length; i++) {
                        that.ocrashCheck(that.oil[i]);
                        var newLeft = that.oil[i].oo.offsetLeft + that.oil[i].ispeedX;
                        //  偏移量加速度
                        var newTop = that.oil[i].oo.offsetTop + that.oil[i].ispeedY;
                        //  四壁回弹
                        if (newLeft < 0) {
                            that.oil[i].ispeedX *= -1;
                        }
                        else if (newLeft > (that.oil[i].iWidth - that.oil[i].oo.offsetWidth)) {
                            that.oil[i].ispeedX *= -1;
                        }
                        else if (newTop < 0) {
                            that.oil[i].ispeedY *= -1;
                        }
                        else if (newTop > (that.oil[i].iHeight - that.oil[i].oo.offsetHeight)) {
                            that.oil[i].ispeedY *= -1;
                        }
                        that.oil[i].oo.style.left = newLeft + 'px';
                        that.oil[i].oo.style.top = newTop + 'px';
                    }
                }, 50)
            },
            // za轨迹    
            moveBoom: function () {
                //创建定时器
                var that = this;
                // 保存window的this
                this.goboomTimer = setInterval(function () {
                    for (var i = 0; i < that.boom.length; i++) {
                        that.mcrashCheck(that.boom[i]);
                        var newLeft = that.boom[i].mm.offsetLeft + that.boom[i].ispeedX;
                        //  偏移量加速度
                        var newTop = that.boom[i].mm.offsetTop + that.boom[i].ispeedY;
                        //  四壁回弹
                        if (newLeft < 0) {
                            that.boom[i].ispeedX *= -1;
                        }
                        else if (newLeft > (that.boom[i].iWidth - that.boom[i].mm.offsetWidth)) {
                            that.boom[i].ispeedX *= -1;
                        }
                        else if (newTop < 0) {
                            that.boom[i].ispeedY *= -1;
                        }
                        else if (newTop > (that.boom[i].iHeight - that.boom[i].mm.offsetHeight)) {
                            that.boom[i].ispeedY *= -1;
                        }
                        that.boom[i].mm.style.left = newLeft + 'px';
                        that.boom[i].mm.style.top = newTop + 'px';
                    }
                }, 50)
            },



            DragPlane: function (obj) {
                var that = this;
                that.plane.onmousedown = function (e) {
                    var lastX = e.pageX, lastY = e.pageY;
                    document.onmousemove = function (e) {
                        var newX = e.pageX, newY = e.pageY;
                        that.plane.style.left = (newX - lastX) + that.plane.offsetLeft + 'px';
                        that.plane.style.top = (newY - lastY) + that.plane.offsetTop + 'px';
                        lastX = newX;
                        lastY = newY;

                        //墙壁
                        if (that.plane.offsetLeft < 0 && that.flag) {
                            that.flag = false;//加锁
                            that.clearTimer();//清除定时器 刷新页面 游戏重开
                            that.cleargiftTimer();//清除定时器 刷新页面 游戏重开
                            that.clearoilTimer();//清除定时器 刷新页面 游戏重开
                            that.clearboomTimer();//清除定时器 刷新页面 游戏重开
                            swal({
                                title: "本轮游戏结束",
                                text: "飞行了" + that.num + '秒' + "\n" + "游戏结束" + "本轮得分" + (that.giftnum * 10 + that.oilnum * 5 - that.boomnum * 3) + "分",
                                type: "warning",
                                // showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "再来一局",
                                // cancelButtonText: "取消删除！",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        swal("重开！", "您将重新开始飞行。", "success");
                                        var againgame = setTimeout(function () {
                                            window.location.reload();
                                        }, 1000);
                                    } else {
                                        // swal("取消！", "你的虚拟文件是安全的:)",
                                        //     "error");
                                    }
                                });
                            // that.flag = false;//加锁
                            // that.clearTimer();//清除定时器 刷新页面 游戏重开
                            // that.cleargiftTimer();//清除定时器 刷新页面 游戏重开
                            // that.clearoilTimer();//清除定时器 刷新页面 游戏重开
                            // window.location.reload();
                        } else if (that.plane.offsetLeft > (obj.iWidth - that.plane.offsetWidth) && that.flag) {
                            that.flag = false;//加锁
                            that.clearTimer();//清除定时器 刷新页面 游戏重开
                            that.cleargiftTimer();//清除定时器 刷新页面 游戏重开
                            that.clearoilTimer();//清除定时器 刷新页面 游戏重开
                            that.clearboomTimer();//清除定时器 刷新页面 游戏重开
                            swal({
                                title: "本轮游戏结束",
                                text: "飞行了" + that.num + '秒' + "\n" + "游戏结束" + "本轮得分" + (that.giftnum * 10 + that.oilnum * 5 - that.boomnum * 3) + "分",
                                type: "warning",
                                // showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "再来一局",
                                // cancelButtonText: "取消删除！",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        swal("重开！", "您将重新开始飞行。", "success");
                                        var againgame = setTimeout(function () {
                                            window.location.reload();
                                        }, 1000);
                                    } else {
                                        // swal("取消！", "你的虚拟文件是安全的:)",
                                        //     "error");
                                    }
                                });

                        } else if (that.plane.offsetTop < 0 && that.flag) {
                            that.flag = false;//加锁
                            that.clearTimer();//清除定时器 刷新页面 游戏重开
                            that.cleargiftTimer();//清除定时器 刷新页面 游戏重开
                            that.clearoilTimer();//清除定时器 刷新页面 游戏重开
                            that.clearboomTimer();//清除定时器 刷新页面 游戏重开
                            swal({
                                title: "本轮游戏结束",
                                text: "飞行了" + that.num + '秒' + "\n" + "游戏结束" + "本轮得分" + (that.giftnum * 10 + that.oilnum * 5 - that.boomnum * 3) + "分",
                                type: "warning",
                                // showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "再来一局",
                                // cancelButtonText: "取消删除！",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        swal("重开！", "您将重新开始飞行。", "success");
                                        var againgame = setTimeout(function () {
                                            window.location.reload();
                                        }, 1000);
                                    } else {
                                        // swal("取消！", "你的虚拟文件是安全的:)",
                                        //     "error");
                                    }
                                });

                        } else if (that.plane.offsetTop > (obj.iHeight - that.plane.offsetHeight) && that.flag) {
                            that.flag = false;//加锁
                            that.clearTimer();//清除定时器 刷新页面 游戏重开
                            that.cleargiftTimer();//清除定时器 刷新页面 游戏重开
                            that.clearoilTimer();//清除定时器 刷新页面 游戏重开
                            that.clearboomTimer();//清除定时器 刷新页面 游戏重开
                            swal({
                                title: "本轮游戏结束",
                                text: "飞行了" + that.num + '秒' + "\n" + "游戏结束" + "本轮得分" + (that.giftnum * 10 + that.oilnum * 5 - that.boomnum * 3) + "分",
                                type: "warning",
                                // showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "再来一局",
                                // cancelButtonText: "取消删除！",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        swal("重开！", "您将重新开始飞行。", "success");
                                        var againgame = setTimeout(function () {
                                            window.location.reload();
                                        }, 1000);
                                    } else {
                                        // swal("取消！", "你的虚拟文件是安全的:)",
                                        //     "error");
                                    }
                                });

                        }
                    }
                }
            },
            // 碰撞
            crashCheck: function (crash) {
                var that = this;
                //子弹的圆心
                // console.log(111, crash, 111)
                var bulletX1 = crash.bb.offsetLeft + Math.floor(crash.bb.offsetWidth / 2),
                    bulletY1 = crash.bb.offsetTop + Math.floor(crash.bb.offsetHeight / 2),
                    //飞机的圆心
                    planeX1 = this.plane.offsetLeft + Math.floor(this.plane.offsetWidth / 2),
                    planeY1 = this.plane.offsetTop + Math.floor(this.plane.offsetHeight / 2);
                //Math.abs x1 - x2,y1 - y2 的绝对值
                var dx = Math.abs(bulletX1 - planeX1),
                    dy = Math.abs(bulletY1 - planeY1);
                // console.log(dx,dy);
                var r = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
                //圆的标准方程(x-a)²+(y-b)²=r²点P（x1,y1) 与圆的位置关系：⑴当r方<x方+y方时，则点P在圆外。⑵当r方=x方+y方时，则点P在圆上。
                // Math.floor向下取整
                // Math.sqrt平方根
                // Math.pow几次方
                // console.log(r);
                var R = crash.bb.offsetWidth / 2 + this.plane.offsetWidth / 2;
                //子弹半径和飞机半径（定值）
                if (r < R && this.flag) {
                    // $(".emessage").css("display", "block")
                    // $(".cstart").click(function () {
                    // swal("飞行了" + this.num + '秒' + "\n" + "游戏结束" + "本轮得分" + (that.giftnum * 10 + that.oilnum * 5 - that.boomnum * 3) + "分");
                    swal({
                        title: "本轮游戏结束",
                        text: "飞行了" + this.num + '秒' + "\n" + "游戏结束" + "本轮得分" + (that.giftnum * 10 + that.oilnum * 5 - that.boomnum * 3) + "分",
                        type: "warning",
                        // showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "再来一局",
                        // cancelButtonText: "取消删除！",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                swal("重开！", "您将重新开始飞行。", "success");
                                var againgame = setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                            } else {
                                // swal("取消！", "你的虚拟文件是安全的:)",
                                //     "error");
                            }
                        });
                    this.flag = false;
                    this.clearTimer();//重启
                    // window.location.reload();
                    // });
                    // console.log(that.giftnum*10+that.oilnum*5)
                }
            },

            // 接礼物
            gcrashCheck: function (crash) {
                var that = this;
                //空投的圆心
                // console.log(111, crash, 111)
                var giftX1 = crash.gg.offsetLeft + Math.floor(crash.gg.offsetWidth / 2),
                    giftY1 = crash.gg.offsetTop + Math.floor(crash.gg.offsetHeight / 2);
                //飞机的圆心
                planeX1 = this.plane.offsetLeft + Math.floor(this.plane.offsetWidth / 2),
                    planeY1 = this.plane.offsetTop + Math.floor(this.plane.offsetHeight / 2);
                //Math.abs x1 - x2,y1 - y2 的绝对值
                var gx = Math.abs(giftX1 - planeX1),
                    gy = Math.abs(giftY1 - planeY1);
                // console.log(gx, gy)
                // console.log(dx,dy);
                var gr = Math.floor(Math.sqrt(Math.pow(gx, 2) + Math.pow(gy, 2)));
                //圆的标准方程(x-a)²+(y-b)²=r²点P（x1,y1) 与圆的位置关系：⑴当r方<x方+y方时，则点P在圆外。⑵当r方=x方+y方时，则点P在圆上。
                // Math.floor向下取整
                // Math.sqrt平方根
                // Math.pow几次方
                // console.log(r);
                var gR = crash.gg.offsetWidth / 2 + this.plane.offsetWidth / 2;
                // console.log(that.giftnum, 222)
                //子弹半径和飞机半径（定值）
                if (gr < gR && this.flag) {
                    console.log("aaa")
                    that.giftnum = that.giftnum + 1;
                    // console.log(that.giftnum)
                    // swal("空投" + this.giftnum + '个');
                    // this.flag = false;
                    // this.cleargiftTimer();//重启
                    // window.location.reload();
                    $(".gift").css("display", "none")
                }
            },


            // 接yt
            ocrashCheck: function (crash) {
                var that = this;
                //空投的圆心
                // console.log(111, crash, 111)
                var oilX1 = crash.oo.offsetLeft + Math.floor(crash.oo.offsetWidth / 2),
                    oilY1 = crash.oo.offsetTop + Math.floor(crash.oo.offsetHeight / 2);
                //飞机的圆心
                planeX1 = this.plane.offsetLeft + Math.floor(this.plane.offsetWidth / 2),
                    planeY1 = this.plane.offsetTop + Math.floor(this.plane.offsetHeight / 2);
                //Math.abs x1 - x2,y1 - y2 的绝对值
                var ox = Math.abs(oilX1 - planeX1),
                    oy = Math.abs(oilY1 - planeY1);
                // console.log(gx, gy)
                // console.log(dx,dy);
                var or = Math.floor(Math.sqrt(Math.pow(ox, 2) + Math.pow(oy, 2)));
                //圆的标准方程(x-a)²+(y-b)²=r²点P（x1,y1) 与圆的位置关系：⑴当r方<x方+y方时，则点P在圆外。⑵当r方=x方+y方时，则点P在圆上。
                // Math.floor向下取整
                // Math.sqrt平方根
                // Math.pow几次方
                // console.log(r);
                var oR = crash.oo.offsetWidth / 2 + this.plane.offsetWidth / 2;
                // console.log(that.giftnum, 222)
                //子弹半径和飞机半径（定值）
                if (or < oR && this.flag) {
                    console.log("aaa")
                    that.oilnum = that.oilnum + 1;
                    $(".oil").css("display", "none")
                }
            },


            // 接za
            mcrashCheck: function (crash) {
                var that = this;
                //空投的圆心
                // console.log(111, crash, 111)
                var boomX1 = crash.mm.offsetLeft + Math.floor(crash.mm.offsetWidth / 2),
                    boomY1 = crash.mm.offsetTop + Math.floor(crash.mm.offsetHeight / 2);
                //飞机的圆心
                planeX1 = this.plane.offsetLeft + Math.floor(this.plane.offsetWidth / 2),
                    planeY1 = this.plane.offsetTop + Math.floor(this.plane.offsetHeight / 2);
                //Math.abs x1 - x2,y1 - y2 的绝对值
                var mx = Math.abs(boomX1 - planeX1),
                    my = Math.abs(boomY1 - planeY1);
                // console.log(gx, gy)
                // console.log(dx,dy);
                var mr = Math.floor(Math.sqrt(Math.pow(mx, 2) + Math.pow(my, 2)));
                //圆的标准方程(x-a)²+(y-b)²=r²点P（x1,y1) 与圆的位置关系：⑴当r方<x方+y方时，则点P在圆外。⑵当r方=x方+y方时，则点P在圆上。
                // Math.floor向下取整
                // Math.sqrt平方根
                // Math.pow几次方
                // console.log(r);
                var mR = crash.mm.offsetWidth / 2 + this.plane.offsetWidth / 2;
                // console.log(that.giftnum, 222)
                //子弹半径和飞机半径（定值）
                if (mr < mR && this.flag) {
                    console.log("aaa")
                    that.boomnum = that.boomnum + 1;
                    $(".boom").css("display", "none")
                }
            },
            // 取消由 setInterval() 设置的 timeout clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。
            clearTimer: function () {
                clearInterval(this.goTimer);
                clearInterval(this.creatTimer);
                clearInterval(this.Timer);
            },
            // 取消由 setInterval() 设置的 timeout clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。
            cleargiftTimer: function () {
                clearInterval(this.gogiftTimer);
                clearInterval(this.creatgiftTimer);
                clearInterval(this.giftTimer);
            },
            // 取消由 setInterval() 设置的 timeout clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。
            clearoilTimer: function () {
                clearInterval(this.gooilTimer);
                clearInterval(this.creatoilTimer);
                clearInterval(this.oilTimer);
            },
            // 取消由 setInterval() 设置的 timeout clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。
            clearboomTimer: function () {
                clearInterval(this.goboomTimer);
                clearInterval(this.creatboomTimer);
                clearInterval(this.boomTimer);
            }
        }
        $(".rulesover").click(function () {
            $(".rules").removeClass("swing")
            $(".rules").addClass("animated bounceOut")
            $(".rules").css("display", "none")
        })
        $(".choosefj-img").click(function () {
            $(".plane").css("background-image", "url(images/fj.gif)")
        })
        $(".choosefj1-img").click(function () {
            $(".plane").css("background-image", "url(images/fj1.gif)")
        })

        $(".choosefj2-img").click(function () {
            $(".plane").css("background-image", "url(images/fj2.gif)")
        })

        $(".choosefj3-img").click(function () {
            $(".plane").css("background-image", "url(images/fj3.gif)")
        })
        $(".chooseover").click(function () {
            $(".choosefj").removeClass("swing")
            $(".choosefj").addClass("animated bounceOut")
            $(".choosefj").css("display", "none")
        })
        $(".start").click(function () {
            $(".title").css("display", "block")
            var bgchange1 = setTimeout(function () {
                $(".outer").css("background-image", "url(images/bg1.jpg)")
                $("body").css("background-image", "url(images/bg1.jpg)")
                $(".bullet").css("background-color", "rgb(243 73 23)")
            }, 10000);
            var bgchange2 = setTimeout(function () {
                $(".outer").css("background-image", "url(images/bg2.jpg)")
                $("body").css("background-image", "url(images/bg2.jpg)")
                $(".bullet").css("background-color", "rgb(255 228 195)")
            }, 20000);
            var bgchange3 = setTimeout(function () {
                $(".outer").css("background-image", "url(images/bg3.jpg)")
                $("body").css("background-image", "url(images/bg3.jpg)")
                $(".bullet").css("background-color", "rgb(243 124 124)")
            }, 30000);
            console.log(game)
            console.log(game.movePlus)
            game.movePlus.ispeedY = document.getElementById("txt2").value || 10;
            game.movePlus.ispeedX = document.getElementById("txt1").value || 10;
            cds = document.getElementById("txt3").value * 1000 || 1000;
            bullets = document.getElementById("txt4").value;
            this.gogiftTimer = setTimeout(function () {
                game.movePlus.ispeedY = document.getElementById("txt2").value * 2 || 10 * 2;
                game.movePlus.ispeedX = document.getElementById("txt1").value * 2 || 10 * 2;
                console.log("加速")
                console.log(game.movePlus)
            }, 20000);
            $(".message").css("display", "none")
            $(".xspeeds").css("display", "block")
            $(".yspeeds").css("display", "block")
            $(".outer").addClass("animated fadeInDownBig")
            game.init();//入口函数
        });
    })

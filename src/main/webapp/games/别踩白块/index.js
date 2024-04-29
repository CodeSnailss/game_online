window.onload = function () {
    var box = getclass("box")[0];
    var start = getclass("start")[0];
    var main = getclass("main")[0];
    var gameStatus = getclass("gameStatus")[0];
    var timer = null;
    //得分 score
    var score = 0;
    //点击按钮进行创建

    start.onclick = function () {
        if(main.children.length){
            main.innerHTML = "";
        }
        gameStatus.innerHTML = "游戏开始";
        start.style.display = "none";
        cDiv();
        timer = setInterval(function () {
            main.style.top = main.offsetTop + 5 + "px";
            if (main.offsetTop === 0) {
                main.style.top = "-150px";
                cDiv();
            }
            if (main.children.length >= 6) {
                for (var i = 0; i < 4; i++) {
                    if (main.children[main.children.length - 1].children[i].key === "hei") {
                        clearInterval(timer);
                        start.style.display = "block";
                        gameStatus.innerHTML = "游戏结束,分数" + score;
                        start.innerHTML = "重新开始";
                        //得分 重新开始必须清零
                        score = 0;
                    }
                }
                main.removeChild(main.children[main.children.length - 1])
            }
        }, 20)
    };


    function cDiv() {
        var rowDiv = document.createElement("div");
        rowDiv.className = "row";
        //来个随机数
        var index = parseInt(Math.random() * 4);

        for (var i = 0; i < 4; i++) {
            var colDiv = document.createElement("div");
            colDiv.className = "col";
            if (i === index) {
                colDiv.style.background = "black";
                //COLDIV是自己创建的可以看做对象 对象可以加入各种属性，key就是自己加入的属性
                colDiv.key = "hei";
            }
            colDiv.onclick = function () {
                if (this.key === "hei") {
                    this.style.background = "gray";
                    this.key = "";
                    score++;
                } else {
                    clearInterval(timer);
                    start.style.display = "block";
                    gameStatus.innerHTML = "游戏结束,分数" + score;
                    start.innerHTML = "重新开始";
                    //得分 重新开始必须清零
                    score = 0;
                }
            };
            //把col填进row里面
            rowDiv.appendChild(colDiv)
        }
        if (main.children.length === 0) {
            main.appendChild(rowDiv)
        } else {
            main.insertBefore(rowDiv, main.children[0])
        }
    }
}

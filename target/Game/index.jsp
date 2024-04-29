<%--
  Created by IntelliJ IDEA.
  User: mzj18
  Date: 2022/12/24
  Time: 15:26
  To change this template use File | Settings | File Templates.
--%>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" type="text/css">
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

</head>

<body>
<!-- 顶部 -->
<div class="header">
    <!-- 左上角图标 -->
    <div class="headerLeft">
        <img src="${pageContext.request.contextPath}/images/index/gameLogo.png" width="100%" />
    </div>
    <!-- 右边导航 -->
    <div class="headerRight">
        <!-- 搜索游戏 -->
        <div class="headerRight">
            <h1>Home</h1>
            <!-- 登入登出(登入后可以点击跳到个人信息界面) -->
            <a href="${pageContext.request.contextPath}/jsp/login.jsp" class="login"></a>
        </div>
    </div>
</div>
<!-- 主体内容 -->
<div class="container">
    <!-- 左侧导航 -->
    <div class="leftColumn">
        <a href="${pageContext.request.contextPath}/index.jsp" class="box add">
            <ion-icon name="home-outline" aria-hidden="true"></ion-icon>
            <span>Home</span>
        </a>
        <a href="${pageContext.request.contextPath}/show.do" class="box">
            <ion-icon name="game-controller"></ion-icon>
            <span>Store</span>
        </a>
        <a href="${pageContext.request.contextPath}/jsp/admin/profile.do?method=show" class="box">
            <ion-icon name="person-circle-outline" aria-hidden="true"></ion-icon>
            <span>Profile</span>
        </a>
        <a href="${pageContext.request.contextPath}/jsp/admin/favorite.do?method=show" class="box">
            <ion-icon name="heart-outline"></ion-icon>
            <span>Favorite</span>
        </a>
        <a href="${pageContext.request.contextPath}/jsp/admin/wallet.jsp" class="box">
            <ion-icon name="wallet-outline"></ion-icon>
            <span>Wallet</span>
        </a>
    </div>
    <!-- 右侧内容 -->
    <div class="rightColumn">
        <!-- <iframe class="changePag" name="con" src="home.html"></iframe> -->
        <div class="first-section">
            <div class="leftSection">
                <h2>Recommended & Featured</h2>
                <!-- 轮播部分 -->
                <div class="autoShow">
                    <div class="autoshow-wrapper">
                        <a class="lubo" href="${pageContext.request.contextPath}/games/切方块小游戏/index.html">
                            <img src="${pageContext.request.contextPath}/games/切方块小游戏/index.png" />
                        </a>
                        <a class="lubo" href="">
                            <img src="${pageContext.request.contextPath}/games/像素鸟/index.png" />
                        </a>
                        <a class="lubo" href="">
                            <img src="${pageContext.request.contextPath}/games/mineClearance/index.png" />
                        </a>
                        <a class="lubo" href="">
                            <img src="${pageContext.request.contextPath}/games/别踩白块/index.png" />
                        </a>
                        <a class="lubo" href="">
                            <img src="${pageContext.request.contextPath}/games/halloween-game/index.png" />
                        </a>
                    </div>
                    <div class="tigger">
                        <!-- 此处轮播按钮由JS动态生成 -->
                    </div>
                    <script src="${pageContext.request.contextPath}/js/common/jquery.js"></script>
                    <script src="${pageContext.request.contextPath}/js/index/home.js"></script>
                </div>
            </div>
            <div class="rightSection">
                <h2>Trending Now</h2>
                <!-- 轮播部分 -->
                <div class="autoShow1">
                    <div class="autoshow-wrapper1">
                        <a class="lubo1" href="">
                            <img src="${pageContext.request.contextPath}/games/好玩的2D桌球游戏/index.png" />
                        </a>
                        <a class="lubo1" href="">
                            <img src="${pageContext.request.contextPath}/games/飞机躲避子弹/index.png" />
                        </a>
                        <a class="lubo1" href="">
                            <img src="${pageContext.request.contextPath}/games/像素鸟/index.png" />
                        </a>
                        <a class="lubo1" href="">
                            <img src="${pageContext.request.contextPath}/games/切方块小游戏/index.png" />
                        </a>
                    </div>
                    <div class="tigger1">
                    </div>
                    <script src="${pageContext.request.contextPath}/js/common/jquery.js"></script>
                    <script src="${pageContext.request.contextPath}/js/index/home1.js"></script>
                </div>
            </div>
        </div>
        <!-- 下方轮播图 -->
        <div class="second-section">
            <h2>Most Popular</h2>
            <!-- 轮播部分 -->
            <div class="autoShow2">
                <div class="autoshow-wrapper2">
                    <a class="lubo2" href="">
                        <img src="${pageContext.request.contextPath}/games/halloween-game/index.png" />
                    </a>
                    <a class="lubo2" href="">
                        <img src="${pageContext.request.contextPath}/games/mineClearance/index.png" />
                    </a>
                    <a class="lubo2" href="">
                        <img src="${pageContext.request.contextPath}/games/像素鸟/index.png" />
                    </a>
                </div>
                <div class="tigger2">
                </div>
                <script src="${pageContext.request.contextPath}/js/common/jquery.js"></script>
                <script src="${pageContext.request.contextPath}/js/index/home2.js"></script>
            </div>
        </div>
    </div>
</div>
</body>

</html>

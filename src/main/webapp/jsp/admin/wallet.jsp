<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/wallet.css">
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
        <h1>Wallet</h1>
        <!-- 登入登出(登入后可以点击跳到个人信息界面) -->
        <a href="" class="login"></a>
    </div>
</div>
<!-- 主体内容 -->
<div class="container">
    <!-- 左侧导航 -->
    <div class="leftColumn">
        <a href="${pageContext.request.contextPath}/index.jsp" class="box">
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
        <a href="${pageContext.request.contextPath}/jsp/admin/wallet.jsp" class="box add">
            <ion-icon name="wallet-outline"></ion-icon>
            <span>Wallet</span>
        </a>
    </div>
    <!-- 右侧内容 -->
    <div class="rightColumn">
        <div class="content">
            <div class="leftSection">
                <h1>Blance</h1>
                <div class="blance">
                    <span>500 CNY</span>
                    <span class="state">Available</span>
                </div>
            </div>
            <div class="rightSection">
                <h1>Payment Method</h1>
                <div class="payment">
                    <div class="card">
                        <span>**** **** **** 6958</span>
                        <span class="account">¥ 18,320.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

</html>
<%--
  Created by IntelliJ IDEA.
  User: mzj18
  Date: 2022/12/25
  Time: 12:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--<!DOCTYPE html>--%>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/profile.css">
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
        <h1>Profile</h1>
        <!-- 登入登出(登入后可以点击跳到个人信息界面) -->
        <a href="#" class="login"></a>
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
        <a href="${pageContext.request.contextPath}/jsp/admin/profile.do?method=show" class="box add">
            <ion-icon name="person-circle-outline" aria-hidden="true"></ion-icon>
            <span>Profile</span>
        </a>
        <a href="${pageContext.request.contextPath}/jsp/admin/favorite.do?method=show" class="box">
            <ion-icon name="heart-outline"></ion-icon>
            <span>Favorite</span>
        </a>
        <a href="{pageContext.request.contextPath}/jsp/admin/wallet.jsp" class="box">
            <ion-icon name="wallet-outline"></ion-icon>
            <span>Wallet</span>
        </a>
    </div>
    <!-- 右侧内容 -->
    <div class="rightColumn">
        <div class="leftSection">
            <div class="profile">
                <img src="${pageContext.request.contextPath}/images/index/profile.png" alt="">
                <span class="username">${username}</span>
                <span class="birthday">${birthday}</span>
                <span class="tel1">Tel: </span><span class="tel">${phone}</span>
                <span class="email1">e-mail: </span><span class="email">${email}</span>
            </div>
            <!-- 修改用户信息 -->
            <h1 class="update">Update information</h1>
            <form id="userForm" class="user" method="get" action="${pageContext.request.contextPath}/jsp/admin/profile.do">
                <div id="username">
                    <span>Username: </span><input type="text" name="username" id="usernameu">
                </div>
                <div id="birday">
                    <span>Birthday: </span><input type="text" name="birthday" id="birthday"><span id="birinfo"></span>
                </div>

                <div id="telephone">
                    <span>Tel: </span><input type="text" name="phone" id="phone"><span id="phoneinfo"></span>
                </div>
                <div id="e-mail">
                    <span>Old Password: </span><input type="password" name="oldpassword" id="oldpassword">
                    <span id="oldinfo"></span>
                </div>
                <div id="possward" >
                    <span>New Password: </span><input type="password"name="newpassword" id="newpassword"><span id="newinfo"></span>
                </div>
                <input type="hidden" name="method" value="update">
                <input class="submit" type="submit" value="Send   " id="saveBtn">
            </form>
        </div>
        <div class="rightSection">
            <h1>Badges</h1>
            <div class="badges">
                <img src="${pageContext.request.contextPath}/images/index/badge-1.png" alt="">
                <img src="${pageContext.request.contextPath}/images/index/badge-2.png" alt="">
                <img src="${pageContext.request.contextPath}/images/index/badge-3.png" alt="">
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="path" name="path" value="${pageContext.request.contextPath }"/>
<input type="hidden" id="referer" name="referer" value="<%=request.getHeader("Referer")%>"/>
<script src="${pageContext.request.contextPath}/js/common/jquery.js"></script>
<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script src="${pageContext.request.contextPath}/js/admin/profile.js"></script>
</body>

</html>

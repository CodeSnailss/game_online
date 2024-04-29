<%--
  Created by IntelliJ IDEA.
  User: mzj18
  Date: 2022/12/24
  Time: 20:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--<!DOCTYPE html>--%>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Game</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/favorite.css">
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</head>

<body>
<!-- 顶部 -->
<div class="header">
  <!-- 左上角图标 -->
  <div class="headerLeft">
    <img src="${pageContext.request.contextPath}/images/index/gameLogo.png" />
  </div>
  <!-- 右边导航 -->
  <div class="headerRight">
    <h1>My Favorite</h1>
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
    <a href="${pageContext.request.contextPath}/jsp/admin/profile.do?method=show" class="box">
      <ion-icon name="person-circle-outline" aria-hidden="true"></ion-icon>
      <span>Profile</span>
    </a>
    <a href="${pageContext.request.contextPath}/jsp/admin/favorite.do?method=show" class="box add">
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

    <div class="favorite">
      <c:forEach var="game" items="${gameList }" varStatus="status">
        <div class="game">
          <div class="gameImg">
            <a href="${pageContext.request.contextPath}/games/${game.url}/index.html">
              <img src="${pageContext.request.contextPath}/games/${game.url}/index.png" width="230px" height="150px" />
            </a>
          </div>
          <div class="gameInfo">
            <a href="#" class="gameTitle">
              <h2>${game.name}</h2>
            </a>
            <!-- 收藏量 -->
            <div class="collection">
              <ion-icon name="star"></ion-icon>
              <span>${game.players}</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span>${game.price}</span>
              <ion-icon name="logo-yen"></ion-icon>
            </div>
            <!-- 平台 -->
            <div class="platform">
              <ion-icon name="logo-windows"></ion-icon>
            </div>
          </div>
          <div class="control">
            <div class="button">
              <a href="${pageContext.request.contextPath}/games/${game.url}/index.html" class="play">
                <ion-icon name="game-controller-outline"></ion-icon>
              </a>
              <a href="${pageContext.request.contextPath}/jsp/admin/favorite.do?method=remove&code=${game.code}" class="remove">
                <ion-icon name="trash-outline"></ion-icon>
              </a>
            </div>
          </div>
        </div>
      </c:forEach>

    </div>
  </div>
</div>
</body>

</html>

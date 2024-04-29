<%--
  Created by IntelliJ IDEA.
  User: mzj18
  Date: 2022/12/24
  Time: 14:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/store.css">
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script src="${pageContext.request.contextPath}/js/common/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
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
        <h1>Games Store</h1>
        <!-- 搜索游戏 -->
        <form class="search" method="get" action="${pageContext.request.contextPath }/show.do">
            <div class="searchLab">
                <input name="method" value="query" class="input-text" type="hidden">
                <input name="queryname" class="input-text" type="text">
                <input type="hidden" name="pageIndex" value="1" />
            </div>
            <div class="searchButton">
                <input value="" type="submit" id="searchbutton">
                <ion-icon name="search-outline"></ion-icon>
            </div>
        </form>
        <!-- 登入登出(登入后可以点击跳到个人信息界面) -->
        <a href="${pageContext.request.contextPath}/jsp/login.jsp" class="login"></a>
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
        <a href="${pageContext.request.contextPath}/show.do" class="box add">
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
        <div class="store">

            <c:forEach var="game" items="${gameList}" varStatus="status">
                <div class="game">
                    <div class="gameImg">
                        <a href="${pageContext.request.contextPath}/games/${game.url}/index.html">
                            <img src="${pageContext.request.contextPath}/games/${game.url}/index.png" width="230px" height="150px" />
                        </a>
                    </div>
                    <div class="gameInfo">
                        <a href="#" class="gameTitle">
                            <h3>${game.name}</h3>
                            <!-- 收藏量 -->
                            <div class="collection">
                                <ion-icon name="star-outline"></ion-icon>
                                <span>${game.players}</span>
                            </div>
                            <!-- 价格 -->
                            <div class="price">
                                <span>${game.price}</span>
                                <ion-icon name="logo-yen"></ion-icon>
                            </div>
                        </a>
                        <!-- 收藏 -->
                        <div class="favorite">
                            <a href="${pageContext.request.contextPath}/jsp/admin/favorite.do?method=add&code=${game.code}" class="favoriteClick">
                                <ion-icon name="heart"></ion-icon>
                            </a>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
        <input type="hidden" id="totalPageCount" value="${totalPageCount}"/>
        <c:import url="${pageContext.request.contextPath}/jsp/common/rollpage.jsp">
            <c:param name="totalCount" value="${totalCount}"/>
            <c:param name="currentPageNo" value="${currentPageNo}"/>
            <c:param name="totalPageCount" value="${totalPageCount}"/>
        </c:import>
    </div>
</div>

</body>

</html>

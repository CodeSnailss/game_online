
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Lowin</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/auth.css">
</head>

<body>
<div class="lowin">
    <div class="lowin-brand">
        <img src="${pageContext.request.contextPath}/images/login/kodinger.jpg" alt="logo">
    </div>
    <div class="lowin-wrapper">
        <div class="lowin-box lowin-login">
            <div class="lowin-box-inner">
                <form method="post">
                    <p>Sign in to continue</p>
                    <div class="info">${error}</div>
                    <div class="lowin-group">
                        <label>Email <a href="#" class="login-back-link">Sign in?</a></label>
                        <input type="email" autocomplete="email" name="email" value="admin@qq.com" class="lowin-input">
                    </div>
                    <div class="lowin-group password-group">
                        <label>Password <a href="#" class="forgot-link">Forgot Password?</a></label>
                        <input type="password" name="password" autocomplete="current-password" class="lowin-input">
                    </div>
                    <button class="lowin-btn login-btn">
                        Sign In
                    </button>

                    <div class="text-foot">
                        Don't have an account? <a href="" class="register-link">Register</a>
                    </div>
                </form>
            </div>
        </div>

        <div class="lowin-box lowin-register">
            <div class="lowin-box-inner">
                <form id="userForm">
                    <p>Let's create your account</p>
                    <div class="lowin-group">
                        <label id="emailLabel">Email<span class="append" id="appendE"></span></label>
                        <input type="email" autocomplete="email" name="email" class="lowin-input" id="email">
                    </div>
                    <div class="lowin-group">
                        <label id="passwordLabel">Password<span class="append" id="appendP"></span></label>
                        <input type="password" name="password" autocomplete="current-password" class="lowin-input" id="password">
                    </div>
                    <div class="lowin-group" id="ver-code-input">
                        <label id="vercodeLabel">VerificationCode<span class="append" id="appendV"></span></label>
                        <input type="text" name="vercode" autocomplete="vercode" class="lowin-input" id="vercode">
                        <button class="ver-code" id="ver-code-btn" name="button">ObtainCode</button>
                    </div>

                    <button class="lowin-btn" id="sign-up">
                        Sign Up
                    </button>

                    <div class="text-foot">
                        Already have an account? <a href="" class="login-link">Login</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <footer class="lowin-footer">

    </footer>
    <input type="hidden" id="path" name="path" value="${pageContext.request.contextPath }"/>
    <input type="hidden" id="referer" name="referer" value="<%=request.getHeader("Referer")%>"/>
</div>

<script src="${pageContext.request.contextPath}/js/common/jquery.js"></script>
<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script src="${pageContext.request.contextPath}/js/login/auth.js"></script>
<script src="${pageContext.request.contextPath}/js/login/register.js"></script>

<script>
    Auth.init({
        login_url: '../login.do',
        forgot_url: '../forgot.do',
    });
</script>
</body>
</html>
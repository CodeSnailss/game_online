var verCode = null;
var email = null;
var password = null;
var signUpBtn = null;
$(function(){
    verCode = $("#vercode");
    password = $("#password");
    email= $("#email");
    signUpBtn = $("#sign-up");

    emailAppend = $("#appendE");
    passwordAppend = $("#appendP");
    vercodeAppend = $("#appendV");


    email.on("focus",function(){
        validateTip(emailAppend,{"color":"#666666"},"* 请输入邮箱地址",false);
    }).on("blur",function(){
        var emailZZ = "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$";
        $.ajax({
            url:path+"/register.do",
            data: {email:email.val(),method: "verifyEmail"},
            dataType: "json",
            success:function (data){
                if (!email.val().match(emailZZ)){
                    validateTip(emailAppend,{"color":"red"},imgNo+" 邮箱格式不正确",false)
                }else if (data.result == "true"){
                    validateTip(emailAppend,{"color":"green"},imgYes,true)
                }else if (data.result == "false"){
                    validateTip(emailAppend,{"color":"red"},imgNo+" 该邮箱已存在",false);
                }
            },
            error:function(data){
                //请求出错
                validateTip(emailAppend,{"color":"red"},imgNo + " 请求错误",false);
            }
        })
    });

    $("button[name='button']").click(function(event) {
       if (emailAppend.attr("validateStatus") == "true"
           && passwordAppend.attr("validateStatus") == "true"){
           $.ajax({
               url:path+'/register.do',
               method:'GET',
               data:{emailPath:email.val(),method:"sendCode"},
               dataType:'json',
               success:function () {

               }
           })
           var time = 60;
           settime($(this));
           function settime(obj){
               if (time==0) {
                   $(obj).attr('disabled', false);
                   $(obj).html("ObtainCode");
                   time = 60;
                   return;
               } else{
                   $(obj).attr('disabled', true);
                   $(obj).html(time+"S后重新发送");
                   time--;
               }
               setTimeout(function() {
                   settime(obj)
               },1000)
           }
       }
       else{
           event.preventDefault();
           console.log("shibai");
       }
    });

    password.on("focus",function(){
        validateTip(passwordAppend,{"color":"#666666"},"* 密码长度必须大于6小于20",false);
    }).on("blur",function(){

        if(password.val() != null && password.val().length > 5
            && password.val().length < 20 ){
            validateTip(passwordAppend,{"color":"green"},imgYes,true);
        }else{
            validateTip(passwordAppend,{"color":"red"},imgNo + " 密码输入不符合规范，请重新输入",false);
        }
    });

    verCode.on("blur",function(){

    }).on("focus",function(){
        validateTip(vercodeAppend,{"color":"#666666"},"* 请输入验证码",false);
    });



    signUpBtn.on("click",function(event){
        verCode.blur();
        email.blur();
        password.blur();
        if(emailAppend.attr("validateStatus") == "true"
            && passwordAppend.attr("validateStatus") == "true"){
            $.ajax({
                url:path+'/register.do?method=registerVerify',
                data:{email:email.val(),password:password.val(),vercode:verCode.val()},
                dataType:'json',
                success:function (data){
                    if (data.result == "true"){
                        confirm("注册成功");
                        console.log("进入")
                    }else{
                        validateTip(vercodeAppend,{"color":"red"},imgNo + "验证码不正确",false);
                        event.preventDefault();
                    }
                }
            });
        }

    });
});
var username = null;
var newpassword = null;
var birthday = null;
var phone =null;
var oldpassword = null;
var saveBtn = null;

var oldinfo = null;
var birinfo = null;
var phoneinfo = null;
var newinfo = null;

function isEmptyStr(s) {
    if (s == undefined || s == null || s == '') {
        return true
    }
    return false
}



$(function(){
    username = $("#usernameu");
    newpassword = $("#newpassword");
    oldpassword = $("#oldpassword");
    birthday = $("#birthday");
    phone = $("#phone");
    saveBtn = $("#saveBtn");

    oldinfo = $('#oldinfo');
    newinfo = $('#newinfo');
    birinfo = $('#birinfo');
    phoneinfo = $('#phoneinfo');

    oldpassword.on("blur",function(){
        $.ajax({
            type:"GET",
            url:path+"/jsp/admin/profile.do",
            data:{method:"verify",oldpassword:oldpassword.val()},
            dataType:"json",
            success:function(data){
                if(data.result == "true"){//旧密码正确
                    validateTip(oldinfo,{"color":"green"},imgYes,true);
                }else if(data.result == "false"){//旧密码输入不正确
                    validateTip(oldpassword.next(),{"color":"red"},imgNo + " 原密码输入不正确",false);
                }else if(data.result == "sessionerror"){//当前用户session过期，请重新登录
                    validateTip(oldpassword.next(),{"color":"red"},imgNo + " 当前用户session过期，请重新登录",false);
                }else if(data.result == "error"){//旧密码输入为空
                    validateTip(oldpassword.next(),{"color":"red"},imgNo + " 请输入旧密码",false);
                }
            },
            error:function(data){
                //请求出错
                validateTip(oldpassword.next(),{"color":"red"},imgNo + " 请求错误",false);
            }
        });


    }).on("focus",function(){
        validateTip(oldpassword.next(),{"color":"#666666"},"* 请输入原密码",false);
    });

    newpassword.on("focus",function(){
        validateTip(newpassword.next(),{"color":"#666666"},"* 密码长度必须是大于6小于20",false);
    }).on("blur",function(){
        if(newpassword.val() != null && newpassword.val().length > 5
            && newpassword.val().length < 20 ){
            validateTip(newinfo,{"color":"green"},imgYes,true);
        }else{
            validateTip(newinfo,{"color":"red"},imgNo + " 密码输入不符合规范，请重新输入",false);
        }
    });

    birthday.on("blur",function () {
        var pattern = "([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))";
        if(isEmptyStr(birthday.val())){
            validateTip(birinfo,{"color":"green"},imgYes,true);
        } else if (!birthday.val().match(pattern)){
            validateTip(birinfo,{"color":"red"},imgNo+" 格式错误",false)
        }
    })

    phone.on("blur",function (){
        var pattern = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        if (isEmptyStr(phone.val())){
            validateTip(phoneinfo,{"color":"green"},imgYes,true);
        }
        else if (!pattern.test(phone.val())){
            validateTip(phoneinfo,{"color":"red"},imgNo+" 格式错误",false)
        }
    })

    saveBtn.on("click",function(){
        oldpassword.blur();
        newpassword.blur();
        phone.blur();
        birthday.blur();
        if(oldpassword.attr("validateStatus") == "true"
            && newpassword.attr("validateStatus") == "true"
            && phone.attr("validateStatus") == "true"
            && birthday.attr("validateStatus") == "true") {
            if(confirm("确定要修改密码？")){
                $("#userForm").submit();
            }
        }

    });
});
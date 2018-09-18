//弹框组件，依赖alert.css,

window.MyAlert = {
    alertInit:function(){
        $("body").prepend("<div class='alert'>"
        +"<div class='alertBg'></div>"
        +"<div class='alertBox'>"
            +"<p id='alertMessage'></p>"
            +"<div id='alertBtn'></div>"
        +"</div>"
        +"</div>");
    },
    alertFun:function(func){
        $("#alertBtn").click(function(){
            func();
        });
        $(".alertBg").click(function(){
            func();
        })
    },
    showAlert:function(msg,buttonText,func) {
        $("#alertMessage").text(msg);
        $("#alertBtn").text(buttonText);
        $(".alert").fadeIn();
        $("body,html").css({"overflow":"hidden"});
        $("#alertBtn").off("click").click(function(){
            $('.alert').fadeOut();
            $("body,html").css({"overflow":"auto"});
            func && func();
        });
        $(".alertBg").off("click").click(function(){
            $('.alert').fadeOut();
            $("body,html").css({"overflow":"auto"});
            func && func();
        })
    }
}

$(function(){
    MyAlert.alertInit();
});


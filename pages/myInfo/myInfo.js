function showBigImg(picUrl){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $("#bigimg").attr('src',picUrl);
    $("#outerdiv").fadeIn();
    $("body,html").css({"overflow":"hidden"});
}

$(function(){
    $("footer").html(footerNav("5",true));
    MyAjax.get(GETUSERINFO_URL,
    true,
    false,
    function(data){
        if(data.status){
            $(".protrait").css('background-image','url('+data.picUrl+')');
            $(".protrait").click(function(event) {
                showBigImg(data.picUrl);
            });
            $("#nickname").text(data.nickname);
        }else{
            window.location.href = '../login/login.html';
        }
    });
});

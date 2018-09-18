var goodsId = MyTools.getQueryString('goodsId');

function leaveMsg(){
    var note = $("textarea").val();
    if(note){
        MyAjax.post(LEAVEMESSAGE_URL,
        {
            goodsId: goodsId,
            note: note
        },
        true,
        function(data){
            if(data.status){
                MyAlert.showAlert("留言成功","好的",function(){
                    window.location.href=document.referrer;
                });
            }
        });
    }else{
        MyAlert.showAlert("请填写留言","好的");
    }
}

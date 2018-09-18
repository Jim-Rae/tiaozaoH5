var goodsId = MyTools.getQueryString('goodsId');

function leaveMsg(){
    var note = $("textarea").val();
    if(note){
        MyAjax.post(OPINION_URL,
        {
            goodsId: goodsId,
            note: note
        },
        true,
        function(data){
            if(data.status){
                MyAlert.showAlert("提交成功","好的",function(){
                    window.history.go(-1);
                });
            }
        });
    }else{
        MyAlert.showAlert("请填写意见","好的");
    }
}

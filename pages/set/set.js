function logout(){
    MyAjax.get(LOGOUT_URL,
        true,
        false,
        function(data){
            if(data.status){
                window.location.href = '../index/index.html';
            }else{
                MyAlert.showAlert(data.message,'好的');
            }
        });
}

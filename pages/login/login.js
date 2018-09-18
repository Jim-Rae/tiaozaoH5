function login(){
    var username = $("#username").val();
    var password = $("#password").val();

    if(!(username && password)){
        MyAlert.showAlert("账号或密码不能空，请重新填写","好的");
    }else if(username.length>20 || password.length>20){
        MyAlert.showAlert("账号密码不能超过20个字符，请重新填写","好的");
    }else{
        MyAjax.post(LOGIN_URL,
        {
            username: username,
            password: password
        },
        false,
        function(data){
            console.log(data);
            if(data.status){
                window.location.href = "../index/index.html";
            }else{
                MyAlert.showAlert("账号或密码错误，请重新填写","好的");
            }
        });
    }
}

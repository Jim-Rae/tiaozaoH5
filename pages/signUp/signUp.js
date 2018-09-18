function signUp(){
    var username = $("#username").val();
    var password = $("#password").val();
    var confirmPwd = $("#confirmPwd").val();

    if(!(username && password && confirmPwd)){
        MyAlert.showAlert("请填写完整的注册信息","好的");
    }else if(username.length>20 || password.length>20){
        MyAlert.showAlert("账号密码不能超过20个字符，请重新填写","好的");
    }else if(password != confirmPwd){
        MyAlert.showAlert("两次输入的密码不一致，请重新填写","好的");
    }else{
        MyAjax.post(SIGNUP_URL,
        {
            username: username,
            password: password
        },
        false,
        function(data){
            console.log(data);
            if(data.status){
                MyAlert.showAlert("注册成功","返回登录",function(){
                    window.location.href = "../login/login.html";
                });
            }else{
                MyAlert.showAlert(data.message,"好的");
            }
        });
    }
}

var pic;

function fileSelected() {
    // 文件选择后触发此函数
    var formData = new FormData();
    formData.append('file', pic);
    $.ajax({
        url: UPLOADPIC_URL,
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        xhrFields: {withCredentials: true},
        dataType:"json",
        success:function(data){
            // console.log(data);
            if(data.status){
                setTimeout(function(){
                    $("#protrait").attr("style","background-image: url("+data.picUrl+");");
                },500)
            }
        }
    })
    .done(function(res) {

    })
    .fail(function(res) {
        alert("操作失败！")
    });
}

function save(){
    MyAjax.post(UPLOADINFO_URL,
        {
            nickname: $("#nickname").val(),
            sex: $("#sex").text(),
            birthday: $("#birthday").val(),
            school: $("#school").text(),
            address: $("#address").val(),
            introduce: $("#intro").val()
        },
        true,
        function(data){
            if(data.status){
                MyAlert.showAlert("提交成功","好的");
            }else{
                console.log(data.message);
            }
        });
}


$(function(){
    $("#sexSlt").change(function(){
        $('#sex').text(this.value);
    });
    $("#birthday").change(function(){
        $('#date').text(this.value);
    });
    $("#schoolSlt").change(function(){
        $('#school').text(this.value);
    });

    MyAjax.get(GETUSERINFO_URL,
        true,
        false,
        function(data){
            if(data.status){
                style="background-image: url(../../temp/default.png);"
                $("#protrait").css('background-image','url('+data.picUrl+')');
                $("#nickname").val(data.nickname);
                $("#sex").text(data.sex);
                $("#sexSlt").val(data.sex);
                $("#birthday").val(data.birthday);
                $("#school").text(data.school);
                $("#schoolSlt").val(data.school);
                $("#intro").val(data.introduce);
                $("#address").val(data.address[0]);
            }else{
                window.location.href = '../login/login.html';
            }
        });
    $.compressPic({limitSize: 0.1, multiple:false, filebutton: "#protrait"},function(file){
        var formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: UPLOADPIC_URL,
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            xhrFields: {withCredentials: true},
            dataType:"json",
            success:function(data){
                // console.log(data);
                if(data.status){
                    setTimeout(function(){
                        $("#protrait").attr("style","background-image: url("+data.picUrl+");");
                    },500)
                }
            }
        })
        .done(function(res) {

        })
        .fail(function(res) {
            alert("操作失败！")
        });
    });
});

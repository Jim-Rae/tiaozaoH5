// function fileSelected() {
//     // 文件选择后触发此函数
//     if($(".picDiv>.item").length+$('#fileToUpload')[0].files.length>9 || $('#fileToUpload')[0].files.length>9){
//         MyAlert.showAlert("图片数量不能超过9张","好的");
//         return false;
//     }
//     if($(".picDiv>.item").length+$('#fileToUpload')[0].files.length == 9){
//         $(".picDiv>.addPicDiv").css('display','none');
//     }
    // Array.from($('#fileToUpload')[0].files).forEach(function(item){
    //     var img=new Image();
    //     img.size=(item.size)/ 1024 /1024;
    //     if(img.size>3){
    //         MyAlert.showAlert("图片大小不能超过3M","好的");
    //         return false;
    //     };
    //     var fr = new FileReader();
    //     fr.readAsDataURL(item);
    //         fr.onload = function() {
    //             var html = '<div class="item" style="background-image: url('+this.result+')" onclick="showBigImg('+"'"+this.result+"'"+')"></div>';
    //             $('.addPicDiv').before(html);
    //         };
    //     });
// }

var picArr = [];

function showBigImg(picUrl){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $("#bigimg").attr('src',picUrl);
    $("#outerdiv").fadeIn();
    $("body,html").css({"overflow":"hidden"});
}

function publish(){
    var formData = new FormData($('#uploadForm')[0]);
    formData.append('cmd','0');

    picArr.forEach(function(item){
        formData.append('goodsPic',item);
    });
    console.log(formData.get('cmd'));
    console.log(formData.get('goodsTitle'));
    console.log(formData.get('intro'));
    console.log(formData.get('category'));
    console.log(formData.get('price'));
    console.log(formData.get('goodsPic').size);

    if(formData.get('goodsTitle') && formData.get('intro') && formData.get('category') && formData.get('price') && formData.get('goodsPic').size!=0){
        $.ajax({
            url: PUBLISH_URL,
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            xhrFields: {withCredentials: true},
            dataType:"json",
            success:function(data){
                if(data.status){
                    MyAlert.showAlert("发布成功","好的",function(){
                        window.location.href = '../index/index.html';
                    });
                }else{
                    window.location.href = '../login/login.html';
                }
            }
        })
        .done(function(res) {

        })
        .fail(function(res) {
            alert("操作失败！")
        });
    }else{
        MyAlert.showAlert("请填写完整的信息","好的");
    }
}

$(function(){
    $("footer").html(footerNav("3",true));
    $(".categoryDiv select").change(function(){
        $(this).siblings('.category')[0].innerText = this.value;
    });
    $(".priceDiv input").blur(function(){
        $(this).val(parseFloat($(this).val()));
    });

    $.compressPic({limitSize: 0.1, filebutton: ".addPicDiv", previewZoom: ".addPicDiv"},function(file){
        picArr.push(file);
    });
});

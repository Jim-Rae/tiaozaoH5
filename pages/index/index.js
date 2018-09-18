function getGoodsList(school){
    MyAjax.get(GETGOODSLIST_URL+'?school='+school,
        true,
        true,
        function(data){
            if(data.status){
                var result = '';
                if(data.goods.length > 0){
                    data.goods.forEach(function(item){
                        result += goodsCell(item);
                    });
                    result += '<div class="menuBg" onclick="closeMenu()"></div>';
                }else{
                    result = '<p style="text-align: center;margin-top: 100px;">该学校暂无发布物品</p>';
                }
                $("section").html(result);
                $("div.lazy").lazyload({threshold : 200,effect : "fadeIn"});
            }
        });
}

$(function(){
    $("#schoolSlt").change(function(){
        $(this).siblings('span')[0].innerText = this.value;
        getGoodsList(this.value);
    });

    MyAjax.get(GETUSERINFO_URL,
        true,
        false,
        function(data){
            // console.log(data);
            if(data.status){
                $("footer").html(footerNav("1",true));
                if(data.school){
                    $(".select>span")[0].innerText = data.school;
                    $("#schoolSlt").val(data.school);
                }
            }else{
                $("footer").html(footerNav("1",false));
            }
            var school = $("#schoolSlt").val();
            getGoodsList(school);
        });
});


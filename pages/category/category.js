function getGoodsList(category){
    MyAjax.get(SEARCHBYCATEGORY_URL+'?category='+category,
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
                    result = '<p style="text-align: center;margin-top: 100px;">该分类暂无发布物品</p>';
                }
                $("section").html(result);
                $("div.lazy").lazyload({threshold : 200,effect : "fadeIn"});
            }
        });
}

function searchGoods(){
    if(event.keyCode == "13"){
        MyAjax.get(SEARCHBYWORD_URL+'?checkWord='+$("#search").val(),
        true,
        false,
        function(data){
            if(data.status){
                $(".back").css('display','block');
                $("section").removeClass('half').addClass('full');
                $(".sideMenu").css('display','none');
                var result = '';
                if(data.goods.length > 0){
                    data.goods.forEach(function(item){
                        result += goodsCell(item);
                    });
                    result += '<div class="menuBg" onclick="closeMenu()"></div>';
                }else{
                    result = '<p style="text-align: center;margin-top: 100px;">没有搜索结果</p>';
                }
                $("section").html(result);
                $("div.lazy").lazyload({threshold : 200,effect : "fadeIn"});
            }else{
                MyAlert.showAlert(data.message,'好的');
            }
        });
    }
}

function backToHalf(){
    $(".back").css('display','none');
    $("section").removeClass('full').addClass('half');
    $(".sideMenu").css('display','block');
    getGoodsList('生活百货');
}

$(function(){
    $("footer").html(footerNav("2",true));
    getGoodsList('生活百货');

    $('.sideMenu .menuItem').click(function(){
        $('.sideMenu .menuItem').removeClass('actived');
        $(this).addClass('actived');
        getGoodsList(this.innerText);
    });
});

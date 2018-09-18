var goodsId = MyTools.getQueryString('goodsId');
var isLogin, isCollected, isAddCar;
var reg = /leaveMsg/i;

function sltBack(){
    if(reg.test(document.referrer)){
        window.location.href = '../index/index.html'
    }else{
        window.history.back();
    }
}

function showBigImg(picUrl){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $("#bigimg").attr('src',picUrl);
    $("#outerdiv").fadeIn();
    $("body,html").css({"overflow":"hidden"});
}

function unOpen(){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    MyAlert.showAlert("该功能暂未开放","好的");
}

function menu(){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $("body,html").css({"overflow":"hidden"});
    $('.menu').fadeIn('fast');
    $('.menuBg').fadeIn('fast');
}

function closeMenu(){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $("body,html").css({"overflow":"auto"});
    $('.menu').fadeOut('fast');
    $('.menuBg').fadeOut('fast');
}

function leaveMsg(){
    if(isLogin){
        window.location.href = '../leaveMsg/leaveMsg.html?goodsId='+goodsId;
    }else{
        window.location.href = '../login/login.html';
    }
}

function collect(){
    if(isLogin){
        if(isCollected){
            MyAjax.post(COLLECTED_URL,
                {
                    goodsId: goodsId,
                    cmd: "1"
                },
                true,
                function(data){
                    if(data.status){
                        $("footer>.collect").text('收藏');
                        MyAlert.showAlert("已取消收藏","好的");
                    }
                });
        }else{
            MyAjax.post(COLLECTED_URL,
                {
                    goodsId: goodsId,
                    cmd: "0"
                },
                true,
                function(data){
                    if(data.status){
                        $("footer>.collect").text('已收藏');
                        MyAlert.showAlert("已收藏","好的");
                    }
                });
        }
    }else{
        window.location.href = '../login/login.html';
    }
}

function addCar(){
    if(isLogin){
        if(isAddCar){
            MyAjax.post(ADDCAR_URL,
                {
                    goodsId: goodsId,
                    cmd: "1"
                },
                true,
                function(data){
                    if(data.status){
                        $("footer>.addCar").text('加入购物车');
                        MyAlert.showAlert("已移出购物车","好的");
                        isAddCar = false;
                    }
                });
        }else{
            MyAjax.post(ADDCAR_URL,
                {
                    goodsId: goodsId,
                    cmd: "0"
                },
                true,
                function(data){
                    if(data.status){
                        $("footer>.addCar").text('移出购物车');
                        MyAlert.showAlert("已加入购物车","好的");
                        isAddCar = true;
                    }
                });
        }
    }else{
        window.location.href = '../login/login.html';
    }
}

function buy(){
    if(isLogin){
        MyAjax.post(BUY_URL,
            {
                goodsId: goodsId
            },
            true,
            function(data){
                if(data.status){
                    MyAlert.showAlert("购买成功","好的",function(){
                        window.location.href = '../myBuy/myBuy.html';
                    });
                }
            });
    }else{
        window.location.href = '../login/login.html';
    }
}

function initSection(goods){
    var html = '<div class="info">'+
                    '<div class="portrait lazy" data-original="'+goods.picUrl+'" onclick="unOpen()"></div>'+
                    '<div class="detail bg-detail" onclick="menu()"></div>'+
                    '<ul class="menu"><li onclick="unOpen()">进入主页</li><li onclick="unOpen()">拉黑</li></ul>'+
                    '<div class="menuBg" onclick="closeMenu()"></div>'+
                    '<p class="nickname">'+goods.nickname+'</p>'+
                    '<p class="time">'+goods.time+'</p>'+
                '</div>'+
                '<div class="introDiv">'+
                    '<p class="goodTitle">'+goods.goodsTitle+'</p>'+
                    '<p class="goodIntro">'+goods.intro+'</p>'+
                    '<p class="goodPrice">¥'+goods.price+'</p>'+
                '</div>'+
                '<div class="fullPicDiv">';
    goods.goodsPic.forEach(function(item,index){
        if(index < 3){
            html += '<div class="fullPic lazy" data-original="'+item+'" onclick="showBigImg('+"'"+item+"'"+')"></div>';
        }
    });
    html += '</div>';
    if(goods.goodsPic.length >= 3){
        html += '<div class="halfPicDiv">';
        goods.goodsPic.forEach(function(item,index){
            if(index >= 3){
                html += '<div class="halfPic lazy" data-original="'+item+'" onclick="showBigImg('+"'"+item+"'"+')"></div>';
            }
        });
        html += '</div>';
    }
    if(goods.notes.length != 0){
        html += '<div class="leaveMsgDiv">'+
                    '<p>留言:</p>';
        goods.notes.forEach(function(item){
            html += '<div class="leaveMsg">'+
                        '<div class="portrait lazy" data-original="'+item.picUrl+'"></div>'+
                        '<p class="message"><span class="author">'+item.nickname+'</span>：'+item.content+'</p>'+
                    '</div>';
        });
        html += '</div>';
    }

    $("section").html(html);
    $("div.lazy").lazyload({threshold : 200,effect : "fadeIn"});
}

$(function(){
    var url = CHECKITEMDETAIL_URL;
    if(goodsId){
        url += '?goodsId=' + goodsId;
    }
    console.log(url);
    MyAjax.get(url,
        true,
        false,
        function(data){
            if(data.status){
                if(data.goods.isSelled){
                    $('.isSell').css('display','block');
                    $('footer').css('display','none');
                }
                initSection(data.goods);
                if(data.isCollected){
                    $("footer>.collect").text('已收藏');
                }
                if(data.isAddCar){
                    $("footer>.addCar").text('移出购物车');
                }
                isLogin = data.isLogin;
                isCollected = data.isCollected;
                isAddCar = data.isAddCar;
            }
        });
});

function goodsCell(good){
    var result = '<div class="goodsDiv" onclick="toDetail('+good.id+')">'+
                    '<div class="info">'+
                        '<div class="portrait lazy" data-original="'+good.picUrl+'" onclick="unOpen()"></div>'+
                        '<div class="detail bg-detail" onclick="menu('+good.id+')"></div>'+
                        '<ul id="menu'+good.id+'" class="menu"><li onclick="unOpen()">进入主页</li><li onclick="unOpen()">拉黑</li></ul>'+
                        '<p class="nickname">'+good.nickname+'</p>'+
                        '<p class="time">'+good.time+'</p>'+
                    '</div>'+
                    '<div class="detailDiv clearfix">'+
                        '<div class="goodsTitle">'+good.goodsTitle+'</div>'+
                        '<div class="cgyAndPri"><span style="display:inline-block;">'+good.category+'</span><strong style="display:inline-block;">¥'+good.price+'</strong></div>'+
                    '</div>'+
                    '<div class="picsDiv">';
    good.goodsPic.forEach(function(item,index){
        if(index < 6){
            result += '<div class="pic lazy" data-original="'+item+'" onclick="showBigImg('+"'"+item+"'"+')"></div>';
        }
    });
    result += '</div></div>';
    return result;
}

function showBigImg(picUrl){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $("#bigimg").attr('src',picUrl);
    $("#outerdiv").fadeIn();
    $("body,html").css({"overflow":"hidden"});
}

function toDetail(id){
    window.location.href = '../../pages/detail/detail.html?goodsId='+id;
}

function unOpen(){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    MyAlert.showAlert("该功能暂未开放","好的");
}

function menu(id){
    $("body,html").css({"overflow":"hidden"});
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $('#menu'+id).fadeIn('fast');
    $('.menuBg').fadeIn('fast');
}

function closeMenu(){
    $("body,html").css({"overflow":"auto"});
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    $('.menu').fadeOut('fast');
    $('.menuBg').fadeOut('fast');
}

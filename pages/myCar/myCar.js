var state = [],
    price = [],
    idList = [],
    sellList = [],
    allState = 0,
    mode = 0;

function selectItem(index,id){
    event.stopPropagation();
    event.cancelBubble = true;  //IE
    if(state[index] == 0){
        $('#checkbox'+id).removeClass('untick').addClass('bg-tick');
        state[index] = 1;
        computerAllSelect();
        computerTotal();
    }else{
        $('#checkbox'+id).removeClass('bg-tick').addClass('untick');
        state[index] = 0;
        computerAllSelect();
        computerTotal();
    }
}

function allSelect(){
    if(allState==0){
        $('footer .checkbox').removeClass('untick').addClass('bg-tick');
        allState = 1;
        if(mode==0){
            state = Array.apply(null, Array($('section .checkboxDiv').length)).map(function(item, index) {
                if($.inArray(index, sellList) == -1){
                    return 1;
                }else{
                    return 0;
                }
            });
            Array.from($('section .checkbox')).forEach(function(item,index){
                if($.inArray(index, sellList) == -1){
                    $(item).removeClass('untick').addClass('bg-tick');
                }
            });
        }else{
            state = Array.apply(null, Array($('section .checkboxDiv[onclick]').length)).map(function(item, i) {return 1;});
            $('.checkbox').removeClass('untick').addClass('bg-tick');
        }
        computerTotal();
    }else{
        $('.checkbox').removeClass('bg-tick').addClass('untick');
        allState = 0;
        state = Array.apply(null, Array($('section .checkboxDiv[onclick]').length)).map(function(item, i) {return 0;});
        computerTotal();
    }
}

function computerAllSelect(){
    var cond = false;
    if(state.length != 0){
        if(mode==0){
            cond = state.every(function(item,index){
                if($.inArray(index, sellList) == -1){
                    return item == 1
                }else{
                    return true;
                }
            })
        }else{
            cond = state.every(function(item){return item == 1});
        }
    }
    if(cond){
        $('footer .checkbox').removeClass('untick').addClass('bg-tick');
        allState = 1;
    }else{
        $('footer .checkbox').removeClass('bg-tick').addClass('untick');
        allState = 0;
    }
}

function computerTotal(){
    var total = 0;
    price.forEach(function(item,index){
        if(state[index]==1){
            total += item;
        }
    });
    $('.total span').text('¥'+total);
    $('footer>.settle').text('结算('+state.filter(function(item){return item==1}).length+')');
}

function settle(){
    var postData = [];
    state.forEach(function(item,index){
        if(item==1){
            postData.push(idList[index]);
        }
    });
    if(postData.length != 0){
        console.log(postData.join('-'));
        MyAjax.post(BUY_URL,
            {
                goodsId: postData.join('-')
            },
            true,
            function(data){
                if(data.status){
                    MyAlert.showAlert("购买成功","好的",function(){
                        window.location.href = '../myBuy/myBuy.html';
                    });
                }else{
                    window.location.href = '../login/login.html';
                }
            });
    }else{
        MyAlert.showAlert('您还没选择要购买的商品喔','好的');
    }
}

function addCollect(){
    var postData = [];
    state.forEach(function(item,index){
        if(item==1){
            postData.push(idList[index]);
        }
    });
    if(postData.length != 0){
        console.log(postData.join('-'));
        MyAjax.post(ADDCAR_URL,
            {
                goodsId: postData.join('-'),
                cmd: '1'
            },
            true,
            function(data){
                if(data.status){
                    MyAjax.post(COLLECTED_URL,
                        {
                            goodsId: postData.join('-'),
                            cmd: '0'
                        },
                        true,
                        function(data){
                            if(data.status){
                                postData.forEach(function(item){
                                    $('#carItem'+item).remove();
                                    state = [];
                                    price = [];
                                    idList = [];
                                    sellList = [];
                                    allState = 0;
                                    computerAllSelect();
                                    computerTotal();
                                    $('.checkbox').removeClass('bg-tick').addClass('untick');

                                });
                                MyAlert.showAlert('已成功移入收藏夹','好的');
                            }
                        });
                }else{
                    window.location.href = '../login/login.html';
                }
            });

    }else{
        MyAlert.showAlert('您还没选择要移入的商品喔','好的');
    }
}

function deleteItem(){
    var postData = [];
    state.forEach(function(item,index){
        if(item==1){
            postData.push(idList[index]);
        }
    });
    if(postData.length != 0){
        console.log(postData.join('-'));
        MyAjax.post(ADDCAR_URL,
            {
                goodsId: postData.join('-'),
                cmd: '1'
            },
            true,
            function(data){
                if(data.status){
                    postData.forEach(function(item){
                        $('#carItem'+item).remove();
                        state = [];
                        price = [];
                        idList = [];
                        sellList = [];
                        allState = 0;
                        computerAllSelect();
                        computerTotal();
                        $('.checkbox').removeClass('bg-tick').addClass('untick');
                    });
                }else{
                    window.location.href = '../login/login.html';
                }
            });
    }else{
        MyAlert.showAlert('您还没选择要删除的商品喔','好的');
    }
}

function edit(){
    $('header .editBtn')[0].onclick = finish;
    $('header .editBtn').text('完成');
    $('footer .total').css('display','none');
    $('footer .settle').css('display','none');
    $('footer #total2').css('display','block');
    $('footer .addCollect').css('display','inline-block');
    $('footer .delete').css('display','inline-block');
    $('section .displayNone').css('display','block');
    mode = 1;
    computerAllSelect();
}

function finish(){
    $('header .editBtn')[0].onclick = edit;
    $('header .editBtn').text('编辑');
    $('footer #total2').css('display','none');
    $('footer .addCollect').css('display','none');
    $('footer .delete').css('display','none');
    $('footer .total').css('display','block');
    $('footer .settle').css('display','inline-block');
    $('section .displayNone').css('display','none');
    $('section .checkboxDiv').each(function(index, el) {
        if($.inArray(index, sellList) != -1){
            $('#checkbox'+idList[index]).removeClass('bg-tick').addClass('untick');
            state[index] = 0;
            computerAllSelect();
            computerTotal();
        }
    });
    mode = 0;
    computerAllSelect();
    if($("section").is(":empty")){
        $('header .editBtn').css('display','none');
        $('footer .settle').attr('disabled','true');
        html = '<div class="noneDiv">'+
                    '<div class="none bg-bigCar"></div>'+
                    '<p>购物车空空如也！</p>'+
                    '<p>快去逛逛吧～</p>'+
                '</div>';
        $('section').html(html);
    }
}

function toDetail(id){
    window.location.href = '../../pages/detail/detail.html?goodsId='+id;
}

$(function(){
    MyAjax.get(CHECKCAR_URL,
        true,
        false,
        function(data){
            // console.log(data);
            if(data.status){
                var html = '';
                if(data.goods.length==0){
                    $('header .editBtn').css('display','none');
                    $('footer .settle').attr('disabled','true');
                    html += '<div class="noneDiv">'+
                                '<div class="none bg-bigCar"></div>'+
                                '<p>购物车空空如也！</p>'+
                                '<p>快去逛逛吧～</p>'+
                            '</div>';
                }else{
                    data.goods.forEach(function(item,index){
                        state.push(0);
                        price.push(parseFloat(item.price));
                        idList.push(item.id);
                        html += '<div id="carItem'+item.id+'" class="carItem" onclick="toDetail('+item.id+')">'+
                                    '<div class="goodsPic" style="background-image: url('+item.goodsPic[0]+')"></div>'+
                                    '<p class="goodsTitle">'+item.goodsTitle+'</p>';
                        if(!item.isSelled){
                            html += '<div class="checkboxDiv" onclick="selectItem('+index+','+item.id+')">'+
                                        '<div id="checkbox'+item.id+'" class="checkbox untick"></div>'+
                                    '</div>';
                        }else{
                            sellList.push(index);
                            html += '<div class="checkboxDiv displayNone" onclick="selectItem('+index+','+item.id+')">'+
                                        '<div id="checkbox'+item.id+'" class="checkbox untick"></div>'+
                                    '</div>';
                        }
                        html += '<p class="price">¥'+item.price+'</p>';
                        if(item.isSelled){
                            html += '<div class="label">已售出</div>';
                        }
                        html += '</div>';
                    });
                }
                $('section').html(html);
            }else{
                window.location.href = '../login/login.html';
            }
        });
});


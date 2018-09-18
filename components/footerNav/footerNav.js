function footerNav(activeItem,isLogin){
    var className = ['bg-home', 'bg-category', 'bg-camera', 'bg-car', 'bg-person'];
    var btnName = ['首页', '分类', '发布', '购物车', '我的'];
    switch(activeItem){
        case '1': className[0] = 'bg-home_active';break;
        case '2': className[1] = 'bg-category_active';break;
        case '3': {
            return '<div class="footerNav">'+
                        '<div class="circle"></div>'+
                        '<div class="menuDiv">'+
                            '<div class="icon" onclick="window.location.href = '+"'"+'../index/index.html'+"'"+'"><div class="'+className[0]+'"></div>'+btnName[0]+'</div>'+
                            '<div class="icon" onclick="window.location.href = '+"'"+'../category/category.html'+"'"+'"><div class="'+className[1]+'"></div>'+btnName[1]+'</div>'+
                            '<div class="icon" onclick="window.location.href = '+"'"+'../index/index.html'+"'"+'"><div class="bg-close center"></div></div>'+
                            '<div class="icon" onclick="window.location.href = '+"'"+'../myCar/myCar.html'+"'"+'"><div class="'+className[3]+'"></div>'+btnName[3]+'</div>'+
                            '<div class="icon" onclick="window.location.href = '+"'"+'../myInfo/myInfo.html'+"'"+'"><div class="'+className[4]+'"></div>'+btnName[4]+'</div>'+
                        '</div>'+
                    '</div>';
                };break;
        case '4': className[3] = '';break;
        case '5': className[4] = 'bg-person_active';break;
        default: console.log('传入参数错误');
    }
    if(isLogin){
       return '<div class="footerNav">'+
                    '<div class="circle"></div>'+
                    '<div class="menuDiv">'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../index/index.html'+"'"+'"><div class="'+className[0]+'"></div>'+btnName[0]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../category/category.html'+"'"+'"><div class="'+className[1]+'"></div>'+btnName[1]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../publish/publish.html'+"'"+'"><div class="'+className[2]+'"></div>'+btnName[2]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../myCar/myCar.html'+"'"+'"><div class="'+className[3]+'"></div>'+btnName[3]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../myInfo/myInfo.html'+"'"+'"><div class="'+className[4]+'"></div>'+btnName[4]+'</div>'+
                    '</div>'+
                '</div>';
    }else{
        return '<div class="footerNav">'+
                    '<div class="circle"></div>'+
                    '<div class="menuDiv">'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../index/index.html'+"'"+'"><div class="'+className[0]+'"></div>'+btnName[0]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../category/category.html'+"'"+'"><div class="'+className[1]+'"></div>'+btnName[1]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../login/login.html'+"'"+'"><div class="'+className[2]+'"></div>'+btnName[2]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../login/login.html'+"'"+'"><div class="'+className[3]+'"></div>'+btnName[3]+'</div>'+
                        '<div class="icon" onclick="window.location.href = '+"'"+'../myInfo/myInfo.html'+"'"+'"><div class="'+className[4]+'"></div>'+btnName[4]+'</div>'+
                    '</div>'+
                '</div>';
    }

}

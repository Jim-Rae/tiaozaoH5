window.MyAjax={
    post:function(interface,postData,async,sucFunction,errFunction){
        $.ajax({
            type:"post",
            url:interface,
            // data:JSON.stringify(postData),
            data:postData,
            dataType:"json",
            async:async,
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success:function(data){
                sucFunction && sucFunction(data);
            },
            error:function(xhr){
                console.log(xhr);
                errFunction && errFunction();
            }
        })
    },
    get:function(interface,async,cache,sucFunction,errFunction){
        $.ajax({
            type:"get",
            url:interface,
            dataType:"json",
            async:async,
            cache:cache,
            crossDomain: true,
            xhrFields: {withCredentials: true},
            success:function(data){
                sucFunction && sucFunction(data)
            },
            error:function(xhr){
                console.log(xhr);
                errFunction && errFunction();
            }
        })
    }
}

window.MyTools = {
    getQueryString:function(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return  unescape(r[2]);
         return null;
    }
}

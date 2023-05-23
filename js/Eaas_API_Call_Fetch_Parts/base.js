//Setup Token
function setLocalStorage(key,val){
    var exp=new Date().getTime()+7200000;  //令牌过期时间是当前时间加2个小时，注意：js得到的是毫秒
    var obj={
        val:val,
        exp:exp
    };
    localStorage.setItem(key,JSON.stringify(obj));//localStorage.setItem()存储数据;JSON.stringify()对象转为字符串
}

// 获取本地缓存的token
function getLocalStorage(key){
    var info= localStorage.getItem(key);//按key值去本地读取数据
    if(info){
        info = JSON.parse(info);//JSON.parse();字符串转对象

        //后期要对此判断条件进行扩展，增加记住密码的时候，如果token过期重新获取，如果记住密码时间失效才进行else删除token
        if(info.exp > new Date().getTime()){//判断token是否过期
            return info.val;
        }else{//过期删除token
            this.deleteLocalStorage(key);
        }
    }
    return '';
}

// 删除本地token
function deleteLocalStorage (key){
    return localStorage.removeItem(key);//按key值删除某个具体变量 
}
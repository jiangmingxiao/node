//获取控件唯一标识
function getNewId() {
    var seedId = new Date().getTime();
    return function() {
        return seedId += 1;
    };
}

//新建css样式
function buildStyles(id){
    var css="";
    setStyleText(css);
}
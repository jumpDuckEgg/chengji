

$(function () {
    initScrollTime();
    $('.useTime').click(function() {
        $("#scrollTime").show();
    })
    
});
//初始化滚动时间
function initScrollTime() {
    timeBox = $("#scrollTime").jqueryTimeScroll({
        scrollId: "time",
        time: true,
        callback: callbackTime,
        title: '用车时间',
        date: new Date(),
    });
}

//时间回调
function callbackTime(text) {
    console.log(text)
    $('.useTime').html(text);
    $("#scrollTime").hide();
}

var timeFlag;
var timeBox;
$(function () {
    initTime();
    initScrollTime();
    $('.start-time,.end-time,.start-btn,.end-btn').click(function () {
        timeFlag = this;
        openTime();
        if (!$(this).hasClass('start-time') && !$(this).hasClass('end-time')) {
            $(this).children('.arr').show();
            $(this).children('.arr-right').hide();
            timeFlag = $(this).prev();

        } else {
            timeFlag = $(this);
            $(this).next().children('.arr').show();
            $(this).next().children('.arr-right').hide();
        }
    })
});
//初始化时间
function initTime() {
    var date = new Date();
    var year_val = date.getFullYear();
    var month_val = date.getMonth() + 1;
    var day_val = date.getDate();
    if (month_val < 10) {
        month_val = "0" + month_val;
    }
    if (day_val < 10) {
        day_val = "0" + day_val;
    }
    var text = year_val + "-" + month_val + "-" + day_val;
    $('.end-time,.start-time').text(text);
}
//初始化滚动时间
function initScrollTime() {
    timeBox = $("#scrollTime").jqueryTimeScroll({
        scrollId: "time",
        time: true,
        callback: callbackTime,
        title: '',
        date: new Date(new Date().getFullYear() - 2, new Date().getMonth()),
        showDate:new Date('2018-6-5'),
        dateEnd: new Date(new Date().getFullYear() + 2, new Date().getMonth())
    });
}
//打开选择时间
function openTime() {
    $("#scrollTime").show();
}
//时间回调
function callbackTime(text, val) {

    timeFlag.next().children('.arr').hide();
    timeFlag.next().children('.arr-right').show();
    if (text == 'cancel') {
        return false;
    }
    console.log(timeFlag)
    timeFlag.text(text);
    timeFlag.attr("times", text);
    var ST = new Date($('.start-time').text()).getTime();
    var ET = new Date($('.end-time').text()).getTime();
    if ($(timeFlag).hasClass('start-time')) {
        if (ST > ET) {
            $('.end-time').text($('.start-time').text())
        }
    } else {
        if (ST > ET) {
            $('.start-time').text($('.end-time').text())
        }
    }

}
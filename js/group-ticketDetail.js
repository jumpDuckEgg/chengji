var timeFlag;
var timeBox;
$(function () {
    ruleBtn();
    initTime();
    initScrollTime();
    sumbitInformation();
    $('.start-time,.end-time').click(function () {
        timeFlag = this;    
        openTime();

    })

});
//购票须知
function ruleBtn() {
    $('.close-btn').click(function () {
        $('.rule').hide();
    });
    $('.prompt-message').click(function () {
        $('.rule').show();
    })
}

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
    var text = year_val + "/" + month_val + "/" + day_val;
    $('.end-time,.start-time').text(text);
}
//初始化滚动时间
function initScrollTime() {
    timeBox = $("#scrollTime").jqueryTimeScroll({
        scrollId: "time",
        time: true,
        callback: callbackTime,
        title: '选择时间',
        date: new Date('2018/1/1'),
        dateEnd:new Date('2019/2/2')
    });
}
//打开选择时间
function openTime(that) {
    $("#scrollTime").show();
}
//时间回调
function callbackTime(text, val) {
    $(timeFlag).text(text);
    $(timeFlag).attr("times", text);
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
//提交按钮
function sumbitInformation() {
    $('.footer-item-right').click(function () {
        var phone = $('.choose-phone-fr').val();
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            alert("手机号码有误，请重填");
            return false;  
        }
    });

}

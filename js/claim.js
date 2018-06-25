
var timeFlag = '';
$(function () {

    initScrollTime();
    $('.starttime,.endtime').click(function () {
        timeFlag = $(this);
        $("#scrollTime").show();
    })

    $('.sumbitBtn-content').click(function () {
        var dialogContent = $('.dialog-content');
        var mask = $('.mask');
        if (!$('.up-place').val()) {
            dialogContent.html('上车点不能为空')
            mask.show();
            return false;
        }
        if (!$('.down-place').val()) {
            dialogContent.html('下车点不能为空')
            mask.show();
            return false;
        }
        if ($('.starttime').find('.time-content').text() == '发车时间') {
            dialogContent.html('发车时间不能为空')
            mask.show();
            return false;
        }
        if ($('.endtime').find('.time-content').text() == '返程时间') {
            dialogContent.html('返程时间不能为空')
            mask.show();
            return false;
        }
        if (!$('.mobile').val()) {
            dialogContent.html('联系方式不能为空')
            mask.show();
            return false;
        }
        if (!isPoneAvailable($('.mobile').val())) {
            dialogContent.html("请填写正确手机号码");
            mask.show();
            return false;
        }

    })
    $('.dialog-btn').click(function () {
        $('.mask').hide();
    })

});

//初始化滚动时间
function initScrollTime() {
    timeBox = $("#scrollTime").jqueryTimeScroll({
        scrollId: "time",
        time: true,
        callback: callbackTime,
        title: '',
        date: new Date(),
    });
}
//时间回调
function callbackTime(text) {
    timeFlag.find('.time-content').text(text);
    var starttime = $('.starttime').find('.time-content').text();
    var endtime = $('.endtime').find('.time-content').text();
    if (starttime != '发车时间' && endtime != '返程时间') {
        var startArr = starttime.split('：');
        var endArr = endtime.split('：');
        if (startArr[0] > endArr[0] || (startArr[0] <= endArr[0] && startArr[1] > endArr[1])) {
            $('.starttime').find('.time-content').text(starttime);
            $('.endtime').find('.time-content').text(starttime);
        }
    }
}
//手机校验
function isPoneAvailable(str) {
	var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (!myreg.test(str)) {
		return false;
	} else {
		return true;
	}
}
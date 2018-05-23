

$(function () {
    initScrollTime();
    $('.useTime').click(function() {
        $("#scrollTime").show();
    })
    initUpAdress();
    $('.submitBtn').click(function(){
        var username = $('.username').val().trim();
        var phone = $('.phone').val().trim();
        var address = $('.address').val().trim();
        var useTime = $('.useTime').text().trim();
        if(username == ''){
            $('.dialog-content').html("联系人姓名不能为空");
            $('.mask').show();
            return ;
        }
        if(phone == ''){
            $('.dialog-content').html("手机号码不能为空");
            $('.mask').show();
            return ;
        }else{
            if (!isPoneAvailable(phone)) {
                $('.dialog-content').html("请填写正确手机号码");
                $('.mask').show();
                return false;
            }
        }
        if(address == ''){
            $('.dialog-content').html("上车地址不能为空");
            $('.mask').show();
            return ;
        }
        if(useTime == '用车时间'){
            $('.dialog-content').html("用车时间不能为空");
            $('.mask').show();
            return ;
        }

    });

    $('.dialog-btn').click(function(){
        $('.mask').hide();
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
//初始化上车地点列表时间
function initUpAdress(){
    $('.stationList-item').click(function(){
        $('.address').val($(this).html());
        $('.stationList').hide();
    });
    $('.address').on('input propertychange',function(){
        if($(this).val()==''){
            $('.stationList').hide();
        }else{
            $('.stationList').show();
        }
    });
    $('body').on('click',function(){
        $('.stationList').hide();
    })
    $('.address').on('focus',function(){
        $(this).val('');
    })
}
//时间回调
function callbackTime(text) {
    $('.useTime').addClass('useTimeCheck');
    $('.useTime').html(text);
    $("#scrollTime").hide();
}
function isPoneAvailable(str) {
	var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (!myreg.test(str)) {
		return false;
	} else {
		return true;
	}
}
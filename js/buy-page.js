var testJson = ['深圳市', '汕尾市', '中山市', '河源市', '汕头市', '广州市', '佛山市', '韶关市', '湛江市'];


$(function () {
    //初始化城市列表高度
    var cityFlag = "";
    init();
    tabchange();
    chooseCity();
    chooseProvince();
    $('.search-input').on('input', function () {
        var flag = 0;
        if ($(this).val()) {
            $('.select-data').html("");
            var regx = new RegExp($(this).val());
            testJson.forEach(function (value) {
                if (regx.test(value)) {
                    $('.select-data').append("<div class='cityList-item'>" + value + "</div>");
                    flag++;
                }
            });
            if(flag==0){
                $('.select-data').append("<div class='cityList-item_none'>查无此处</div>");
            }
            chooseCity();
            chooseProvince();
            $('.select-data').show();
            $('.loacl-data').hide();
        } else {
            $('.loacl-data').show();
            $('.select-data').hide();
        }
    });
});
function init() {
    $('.cityList').css("height", $('body').height() - $('.search-bar').height() - $('.footer').height() - parseInt($('.search-bar').css('margin-top')) * 2);
}
function tabchange() {
    $('.ticket-button').click(function () {
        if (!$(this).hasClass('choose-color')) {
            $(this).siblings().removeClass('choose-color');
            $(this).addClass('choose-color');
        }
    })
}
function chooseCity() {
    $('.start-place,.end-place').on('click', function () {
        $('.choose-city').show();
        cityFlag = $($(this).children()[1]).attr('data-msg');
    });
    $('.cancelbtn').on('click', function () {
        $('.choose-city').hide();
    });
    $('.cityList-item').on('click', function () {
        if (cityFlag == 'start') {
            $('[data-msg="start"]').text($(this).text()).css('color', 'black');
            $('.search-input').val("");
            $('.select-data').hide();
            $('.loacl-data').show();
        }
        if (cityFlag == 'end') {
            $('[data-msg="end"]').text($(this).text()).css('color', 'black');
            $('.search-input').val("");
            $('.select-data').hide();
            $('.loacl-data').show();
        }
        $('.choose-city').hide();
    })
}
function chooseProvince() {
    $('.footer').on('click', function () {
        $('.footer-box').toggle();
    });
    $('.footer-item').on('click', function () {
        $('.footer span').text($(this).text());
        if (!$(this).hasClass('footer-item_select')) {
            $(this).siblings().removeClass('footer-item_select');
            $(this).addClass('footer-item_select');
        }
        $('.footer-box').hide();

    })
}
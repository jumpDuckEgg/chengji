$(function () {
    //初始化
    init();
    // 选择按钮切换样式
    buttonEvent();
});
function init() {

    //初始化车票列表高度
    $('.ticket-list').css('height', $('body').height() - ($('.remain').height() + $('.footer-bar').height() + $('.choose-ticket').height()));
    $('.time-place_up span,.time-place_down span').css('width', $('.time-place_up').width() - $('.time-place_up img').width() - 5);
    //初始化开始地点和结束地点大小
    $('.start-place').css('width', $('.start').width() - $('.start img').width() - $('.start price').width() - 80);
    $('.end-place').css('width', $('.end').width() - $('.end img').width() - 5);
}
function buttonEvent() {
    var $onceTicket = $('.OnceTicket');
    var $monthTicket = $('.MonthTicket');
    var $onceTicketList = $('.onceTicket-list');
    var $monthTicketList = $('.monthTicket-list');
    $onceTicket.click(function () {
        if (!$onceTicket.hasClass('choose-color')) {
            $onceTicket.addClass('choose-color');
            $monthTicket.removeClass('choose-color');
            $onceTicketList.css('display', 'block').scrollTop(0);
            $monthTicketList.css('display', 'none');

        }
    })
    $monthTicket.click(function () {
        if (!$monthTicket.hasClass('choose-color')) {
            $monthTicket.addClass('choose-color');
            $onceTicket.removeClass('choose-color');
            $monthTicketList.css('display', 'block').scrollTop(0);
            $onceTicketList.css('display', 'none');
        }
    })
}



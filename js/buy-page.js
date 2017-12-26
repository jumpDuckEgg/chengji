$(function () {
    //初始化城市列表高度
    init();
    tabchange();
});
function init(){
    $('.cityList').css("height",$('body').height()-$('.search-bar').height()-$('.footer').height()-parseInt($('.search-bar').css('margin-top'))*2);
    console.log($('.search-bar').height(),$('.footer').height())
}
function tabchange() {
    var $onceTicketBtn = $('.OnceTicket');
    var $seasonTicketBtn = $('.SeasonTicket');
    var $yearTicketBtn = $('.YearTicket');
    $onceTicketBtn.click(function () {
        if (!$onceTicketBtn.hasClass('choose-color')) {
            $seasonTicketBtn.removeClass('choose-color');
            $yearTicketBtn.removeClass('choose-color');
            $onceTicketBtn.addClass('choose-color');
        }
    })
    $seasonTicketBtn.click(function () {
        if (!$seasonTicketBtn.hasClass('choose-color')) {
            $onceTicketBtn.removeClass('choose-color');
            $yearTicketBtn.removeClass('choose-color');
            $seasonTicketBtn.addClass('choose-color');
        }
    }) 
    $yearTicketBtn.click(function () {
        if (!$yearTicketBtn.hasClass('choose-color')) {
            $seasonTicketBtn.removeClass('choose-color');
            $onceTicketBtn.removeClass('choose-color');
            $yearTicketBtn.addClass('choose-color');
        }
    })
}
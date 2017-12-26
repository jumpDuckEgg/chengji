$(function () {
    tabchange();
    init();
});
function init() {

    //初始化车票列表高度
    $('.ticket-list').css('height', $('body').height() -$('.footer').height()- $('.ticketTab').height());
    // //初始化开始地点和结束地点大小
    $('.start-place').css('width', $('.start').width() - $('.start img').width() - $('.start price').width() - 100);
    $('.end-place').css('width', $('.end').width() - $('.end img').width() - 34);
}
function tabchange() {
    var $onceTicketBtn = $('.OnceTicket');
    var $monthTicketBtn = $('.MonthTicket');
    var $groupTicketBtn = $('.GroupTicket');
    var $onceTicketList = $('.onceTicketList');
    var $monthTicketList = $('.monthTicketList');
    var $groupTicketList = $('.groupTicketList');
    $onceTicketBtn.click(function () {
        if (!$onceTicketBtn.hasClass('ticketTab_item-select')) {
            $monthTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.removeClass('ticketTab_item-select');
            $onceTicketBtn.addClass('ticketTab_item-select');
            $onceTicketList.css('display', 'block').scrollTop(0);
            $monthTicketList.css('display','none');
            $groupTicketList.css('display','none');
        }
    })
    $monthTicketBtn.click(function () {
        if (!$monthTicketBtn.hasClass('ticketTab_item-select')) {
            $onceTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.removeClass('ticketTab_item-select');
            $monthTicketBtn.addClass('ticketTab_item-select');
            $monthTicketList.css('display', 'block').scrollTop(0);
            $onceTicketList.css('display','none');
            $groupTicketList.css('display','none');
        }
    }) 
    $groupTicketBtn.click(function () {
        if (!$groupTicketBtn.hasClass('ticketTab_item-select')) {
            $monthTicketBtn.removeClass('ticketTab_item-select');
            $onceTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.addClass('ticketTab_item-select');
            $groupTicketList.css('display', 'block').scrollTop(0);
            $onceTicketList.css('display','none');
            $monthTicketList.css('display','none');
        }
    })
}
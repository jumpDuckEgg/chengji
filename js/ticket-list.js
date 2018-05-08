$(function () {
    // tabchange();
    init();
    var $onceTicketBtn = $('.OnceTicket');
    var $monthTicketBtn = $('.MonthTicket');
    var $groupTicketBtn = $('.GroupTicket');
    var mySwiper = new Swiper('.swiper-container', {
        on:{
            transitionEnd: function(swiper){
                console.log(mySwiper.snapIndex)
              if(mySwiper.snapIndex==0){
                $monthTicketBtn.removeClass('ticketTab_item-select');
                $groupTicketBtn.removeClass('ticketTab_item-select');
                $onceTicketBtn.addClass('ticketTab_item-select');
              }
              if(mySwiper.snapIndex==1){
                $onceTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.removeClass('ticketTab_item-select');
            $monthTicketBtn.addClass('ticketTab_item-select');
              }
              if(mySwiper.snapIndex==2){
                $monthTicketBtn.removeClass('ticketTab_item-select');
                $onceTicketBtn.removeClass('ticketTab_item-select');
                $groupTicketBtn.addClass('ticketTab_item-select');
              }
            },
          },
    });  
    
    $onceTicketBtn.click(function () {
        if (!$onceTicketBtn.hasClass('ticketTab_item-select')) {
            $monthTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.removeClass('ticketTab_item-select');
            $onceTicketBtn.addClass('ticketTab_item-select');
            mySwiper.slideTo(0, 1000, false);
        }
    })
    $monthTicketBtn.click(function () {
        if (!$monthTicketBtn.hasClass('ticketTab_item-select')) {
            $onceTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.removeClass('ticketTab_item-select');
            $monthTicketBtn.addClass('ticketTab_item-select');
            mySwiper.slideTo(1, 1000, false);
        }
    }) 
    $groupTicketBtn.click(function () {
        if (!$groupTicketBtn.hasClass('ticketTab_item-select')) {
            $monthTicketBtn.removeClass('ticketTab_item-select');
            $onceTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.addClass('ticketTab_item-select');
            mySwiper.slideTo(2, 1000, false);
        }
    })
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
    $onceTicketBtn.click(function () {
        if (!$onceTicketBtn.hasClass('ticketTab_item-select')) {
            $monthTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.removeClass('ticketTab_item-select');
            $onceTicketBtn.addClass('ticketTab_item-select');
        }
    })
    $monthTicketBtn.click(function () {
        if (!$monthTicketBtn.hasClass('ticketTab_item-select')) {
            $onceTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.removeClass('ticketTab_item-select');
            $monthTicketBtn.addClass('ticketTab_item-select');
           
        }
    }) 
    $groupTicketBtn.click(function () {
        if (!$groupTicketBtn.hasClass('ticketTab_item-select')) {
            $monthTicketBtn.removeClass('ticketTab_item-select');
            $onceTicketBtn.removeClass('ticketTab_item-select');
            $groupTicketBtn.addClass('ticketTab_item-select');
            
        }
    })
}
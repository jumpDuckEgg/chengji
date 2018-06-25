
$(function () {

    initSchedule();
    $('.scheduleBox-item').click(function(){
        if($(this).hasClass('scheduleBox-item-noticket')){
           return false; 
        }
        $('.scheduleBox-item').removeClass('scheduleBox-item-choose');
        $(this).addClass('scheduleBox-item-choose');
        var time = $(this).find('.scheduleBox-item-time').text();
        var ticketNum = $(this).find('.scheduleBox-item-ticketNum').text();
        $('.timeBox-content-left-time').text(time);
        $('.timeBox-content-left-ticketNum').text(ticketNum);
    })

});

function initSchedule() {
    var scheduleBox = $('.scheduleBox');
    scheduleBox.hide();
    $('.timeBox-content-right').click(function () {
        scheduleBox.toggle();
    });
    var firstScheduleItem = $(scheduleBox.find('.scheduleBox-item')[0])
    firstScheduleItem.addClass('scheduleBox-item-choose');
           
}

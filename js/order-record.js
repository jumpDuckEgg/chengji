$(function () {
    init();
    ticketTab();
});
function ticketTab(){
    var $itemleft=$('.item-left');
    var $itemright=$('.item-right');
    var $ticket_information=$('.ticket-information');
    var $ticket_information_fail=$('.ticket-information_fail');
    $itemleft.click(function () {
        if (!$itemleft.hasClass('item-choose')) {
            $itemleft.addClass('item-choose ticketused-tab_content-item_choose');
            $itemright.removeClass('item-choose ticketused-tab_content-item_choose');  
            $ticket_information.parent().css('display','block').scrollTop(0);
            $ticket_information_fail.parent().css('display','none');    
        }
    })
    $itemright.click(function () {
        if (!$itemright.hasClass('item-choose')) {
            $itemright.addClass('item-choose ticketused-tab_content-item_choose');
            $itemleft.removeClass('item-choose ticketused-tab_content-item_choose');
            $ticket_information_fail.parent().css('display','block').scrollTop(0);
            $ticket_information.parent().css('display','none');   
        }
    })
}
function init(){
    $('.ticket-list').css('height',$('body').height()-$('.headbar').height()-$('.ticketused-tab').height());
    console.log($('body').height(),$('.headbar').height(),$('.ticketused-tab').height(),$('.ticket-list').height());

}


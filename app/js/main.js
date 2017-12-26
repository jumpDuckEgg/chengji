$(function () {
    init();
    ticketTab();
});
function ticketTab(){
    var $itemleft=$('.item-left');
    var $itemright=$('.item-right');
    $itemleft.click(function () {
        if (!$itemleft.hasClass('item-choose')) {
            $itemleft.addClass('item-choose');
            $itemright.removeClass('item-choose');    
        }
    })
    $itemright.click(function () {
        if (!$itemright.hasClass('item-choose')) {
            $itemright.addClass('item-choose');
            $itemleft.removeClass('item-choose');
        }
    })
}
function init(){
    $('.ticket-list').css('height',$('body').height()-$('.headbar').height()-$('.ticketused-tab').height());
    console.log($('body').height(),$('.headbar').height(),$('.ticketused-tab').height(),$('.ticket-list').height());

}


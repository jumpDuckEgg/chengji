$(function () {
    //初始化
    init();
    
    //切换使用中已使用标签样式
    ticketTab();
});
function init() {

    //初始化车票列表高度
    $('.ticket-list').css('height', $('body').height() - ($('.ticketused-tab').height() + $('.headbar').height()));
    $('.ticket-information:last-child').css('margin-bottom', $('.footer-bar').height()+parseInt($('.ticket-information:first-child').css('margin-top')) );

}

function ticketTab(){
    var $itemleft=$('.item-left');
    var $itemright=$('.item-right');
    var $usedlist=$('.used');
    var $finishlist=$('.finish');
    var $footer=$('.footer-bar');
    $itemleft.click(function () {
        if (!$itemleft.hasClass('item-choose')) {
            $itemleft.addClass('item-choose');
            $itemright.removeClass('item-choose');
            $usedlist.css('display', 'block').scrollTop(0);
            $finishlist.css('display', 'none');
            $footer.css('display', 'block');    
        }
    })
    $itemright.click(function () {
        if (!$itemright.hasClass('item-choose')) {
            $itemright.addClass('item-choose');
            $itemleft.removeClass('item-choose');
            $finishlist.css('display', 'block').scrollTop(0);
            $usedlist.css('display', 'none');  
            $footer.css('display', 'none');
                 
        }
    })
}



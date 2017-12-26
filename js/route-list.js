$(function () {
    init();
    $('.select-down').click(function(){
        var $routeContent=$(this).parent().next();
        
        if($($routeContent).css('display')=='block'){
            $($routeContent).hide();
            $(this).attr('src','resource/img/select-down.png');
        }else{
            $($routeContent).show();
            $(this).attr('src','resource/img/select-up.png')
        }
    })
});
function init(){
    $('.route-place').css('width',$('.route-head').width()-$('.route-icon').width()-$('.select-down').width()-20)
}

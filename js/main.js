$(function () {
    $('.searchbtn').click(function(){
        if($('.search-input').val()){
            $('.search-result-list').show();
            $('.search-result-noresult').hide();
        }else{
            $('.search-result-list').hide();
            $('.search-result-noresult').show();
        }
    });
});

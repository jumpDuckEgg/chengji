

$(function () {
    initSwiper();
    $('.content').click(function (e) {
        $('.content').removeClass('content-choose');
        $('.content').next().css('display', 'none');
        $(this).addClass('content-choose');
        $(this).next().css('display', 'block');
    })
});

function initSwiper() {
    $('.swiper-slide').css({
        'width': '92px',
        'margin-right': '12px'
    })
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 12,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    var swiperFirstItem = $($('.swiper-slide')[0]);
    swiperFirstItem.find('.content').addClass('content-choose');
    swiperFirstItem.find('.content-triangle').css('display', 'block');

    var $elem = $('.placeBoxbg');
	var $elemTop = $elem.offset().top;
    $(window).scroll(function(event) {
        var scroll_top = $(document).scrollTop();

        if($elemTop - scroll_top < 3) {
            $elem.addClass('placeBox-fixed');
            $('.blank-box').show();
        } else {
            $elem.removeClass('placeBox-fixed');
            $('.blank-box').hide();
        }
    })
}


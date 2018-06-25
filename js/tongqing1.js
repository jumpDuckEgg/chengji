
var map2 = null; //地图实例
$(function () {
    initLogin();
    // 排序
    initials();
    // 选择目的地
    chooseDestination();
    initTimeLoad();
    initcityList();
    chooseCity();
    chooseProvince();
    chooseArea();
    initBaidu();
    // 搜索城市筛选
    $('.search-input').on('input', function () {
       
        if ($(this).val()) {
            $('.select-data').html("");
            $('.loading').show();
            setTimeout(function () {
                $('.loading').hide();
                $('.select-data').append("<div class='cityList-item-search'><div class='cityList-item-search-name'>测试</div><div class='cityList-item-search-remark'>测试</div></div>");
                $('.select-data').append("<div class='cityList-item_none'>查无此处</div>");
                chooseCity();
                chooseProvince();
                $('.select-data').show();
                $('.loacl-data').hide();
            }, 3000);

        } else {
            $('.loacl-data').show();
            $('.select-data').hide();
        }
    });
    $('.choose-area-header-back').click(function () {
        $(".choose-area").hide();
    });
    // 点击详情
    $('.sort_list-img').click(function (e) {
        e.stopPropagation();
        $('#stationDetail').show();
    });
    // 隐藏详情
    $('.infoBox-btn').click(function () {
        $('#stationDetail').hide();
    });


});


function initLogin() {
    // 登录提交
    $('.login-box_btn--submit').click(function () {
        var phone = $('.login-box__input-phone').val().trim();
        var code = $('.login-box__input-code').val().trim();
        if (!isPoneAvailable(phone)) {
            $('.remian-dialog-content').text("手机号码有误");
            $('.remian-dialog').show();
            setTimeout(function () {
                $('.remian-dialog').hide();
            }, 1500);
            return false;
        }
        if (!code) {
            $('.remian-dialog-content').text("验证码不能为空");
            $('.remian-dialog').show();
            setTimeout(function () {
                $('.remian-dialog').hide();
            }, 1500);
            return false;
        }
        $('.loading').show();
        setTimeout(function () {
            $('.loading').hide();
            $('.login-box').hide();
            $('.content-box').show();
        }, 3000)
    });
}
function initcityList() {
    $('.cityList').css("height", $('body').height() - $('.search-bar').height() - $('.footer').height() - parseInt($('.search-bar').css('padding-top')) * 2);
}
function chooseCity() {
    $('.start-place').on('click', function () {
        $('.choose-city').show();
    });
    $('.cancelbtn').on('click', function () {
        $('.search-input').val("");
        $('.select-data').hide();
        $('.loacl-data').show();
        $('.choose-city').hide();
    });
    // 城市选择
    $('.cityList-item').on('click', function () {
        $('.choose-area-header-name--orange').text($(this).text());
        $('.search-input').val("");
        $('.select-data').hide();
        $('.loacl-data').show();
        $('.choose-area').show();
    });
    // 搜索结果选择
    $('.cityList-item-search').click(function () {
        var placeName = $(this).find('.cityList-item-search-name').text();
        $('[data-msg="start"]').text(placeName).css('color', 'black');
        $('[data-msg="end"]').text('到达目的地').css('color', '#999');
        $('.search-input').val("");
        $('.select-data').hide();
        $('.loacl-data').show();
        $('.choose-area').hide();
        $('.choose-city').hide();
    })
    // 城市进地区选择
    $('.sort_list').click(function () {
        $('[data-msg="start"]').text($(this).find('.num_name').text()).css('color', 'black');
        $('[data-msg="end"]').text('到达目的地').css('color', '#999');
        $('.choose-area').hide();
        $('.choose-city').hide();
    });
    // 历史记录选择
    $('.cityList-historyList-item').click(function () {
        $('[data-msg="start"]').text($(this).text()).css('color', 'black');
        $('[data-msg="end"]').text('到达目的地').css('color', '#999');
        $('.choose-city').hide();
    })
}
function chooseProvince() {
    $('.footer-box,.area-box').click(function () {
        $(this).hide();
    })
    $('.footer').on('click', function () {
        $('.footer-box').toggle();
    });
    $('.footer-item').on('click', function (e) {
        e.stopPropagation();
        $('.footer span').text($(this).text());
        if (!$(this).hasClass('footer-item_select')) {
            $(this).siblings().removeClass('footer-item_select');
            $(this).addClass('footer-item_select');
        }
        $('.footer-box').hide();

    })
}
function chooseArea() {
    $('.area-choose').on('click', function () {
        $('.area-box').toggle();
    });
    $('.area-item').on('click', function () {
        $('.area-choose span').text($(this).text());
        if (!$(this).hasClass('area-item_select')) {
            $(this).siblings().removeClass('area-item_select');
            $(this).addClass('area-item_select');
        }
        $('.area-box').hide();

    })
}
function chooseDestination() {
    // 选择目的地
    $('.choose-destination__cityList-item').click(function () {
        $('[data-msg="end"]').text($(this).text()).css('color', 'black');
        $('.choose-destination').hide();
    });
    $('.end-place').click(function () {
        var startPlace = $('[data-msg="start"]').text();
        if (startPlace == '请选择上车点') {
            $('.remian-dialog-content').text('请选择上车点');
            $('.remian-dialog').show();
            setTimeout(function () {
                $('.remian-dialog').fadeOut();
            }, 1000)
            return false;
        }
        $('.choose-destination').show();
    })
    $('.choose-destination-header-back').click(function () {
        $('.choose-destination').hide();
    })
}
// 获取验证码倒计时
function initTimeLoad() {
    $('.login-box_btn--code').click(function () {
        var codeBtn = $(this);
        if (!codeBtn.hasClass('login-box_btn--disabled')) {
            codeBtn.text('发送中(60s)');
            $('.remian-dialog-content').text("验证码发送中，请留意短信");
            $('.remian-dialog').show();
            setTimeout(function () {
                $('.remian-dialog').hide();
            }, 1500);
            codeBtn.addClass('login-box_btn--disabled');
            var codeTime = 60;
            var codeRemian = '';
            var codeCountdown = setInterval(function () {
                codeTime--;
                if (codeTime == 0) {
                    clearInterval(codeCountdown);
                    codeBtn.removeClass('login-box_btn--disabled');
                    codeBtn.text('重新发送');
                    return false;
                }
                codeRemian = '发送中(' + codeTime + "s)";
                codeBtn.text(codeRemian);
            }, 1000);
        }
    })
}
/**隐藏站点详细**/
function hideDetail() {
    $("#stationDetail").hide();
}
// 百度地图详情

function initBaidu() {
    // 中心坐标
    var point = new BMap.Point(113.315463, 23.416921);
    // 初始化导航地图
    map2 = new BMap.Map("l-map");
    map2.centerAndZoom(point, 12);
    map2.enableScrollWheelZoom();
    // 详情百度地图
    var goStations = {
        Latitude: "23.186097",
        Longitude: "113.304073",
        name: '地球'
    };

    $('.goRoad').click(function () {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {

                var locationy = goStations.Latitude;
                var locationx = goStations.Longitude;
                var name = goStations.name;
                var p1 = new BMap.Point(r.point.lng, r.point.lat);
                var p2 = new BMap.Point(locationx, locationy);
                var transit = new BMap.TransitRoute(map2, {
                    renderOptions: { map: map2, panel: "r-result" }, onPolylinesSet: function () {
                        $("#r-result h1").html("我的位置 到 " + name + " 的路线");
                    },
                    onSearchComplete: function (result) {
                        if (result.yr.length == 0) {
                            $("#r-result").append("<div style='text-align:center;margin-top:20px;'>暂无推荐出行路线</div>")
                        }
                    }
                });

                transit.search(p1, p2);
            }
            else {
                alert('failed' + this.getStatus());
            }
        }, { enableHighAccuracy: true })

        $('.mapV2').show();
    })
}

function isPoneAvailable(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}


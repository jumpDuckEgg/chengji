var points = '';//站点信息
var map = '';//全程线路
var map2 = '';//地点详情
var goStations = {
    Latitude: "23.186097",
    Longitude: "113.304073",
    name: '地球'
};//temp站点
var runscar = new Array();
// 最后车辆出现的位置(需要获取) '<?php echo json_encode($row["RunsGPS"]); ?>';
var lastRunsStr = [];
$(function () {
    initBaidu();

    $('.order-box__payway-item').click(function () {
        var thisImg = $(this).find('.order-box__payway-item-img');
        var thisRemain = $(this).find('.order-box__payway-item-remain');
        if (thisRemain.hasClass('order-box__payway-item-remain--show')) {
            return false;
        }
        if (!thisImg.hasClass('order-box__payway-item-img--choose')) {
            $('.order-box__payway-item-img').removeClass('order-box__payway-item-img--choose').attr('src', 'resource/img/shuttle/order-nochoose.png');
            thisImg.addClass('order-box__payway-item-img--choose').attr('src', 'resource/img/shuttle/order-choose.png');
        }
    });
    $('.order-submitBtn').click(function () {
        var select = $('.order-box__payway-item-img--choose').length;
        if (select == 0) {
            $('.remian-dialog-content').text("请选择支付方式");
            $('.remian-dialog').show();
            setTimeout(function () {
                $('.remian-dialog').fadeOut();
            }, 1500);
        }
    });
    $('.order-box__info-item-place').click(function () {
        $("#stationDetail").show();
    })
    // 隐藏详情
    $('.infoBox-btn').click(function () {
        $('#stationDetail').hide();
    });
    // 全程路线
    $('.order-box__info-item-other-line').click(function () {
        window.location.href = '#edit';
        initBaiduLine();
        // 车辆位置
        updateCars();
        window.setInterval(updateCars, 60 * 1000);
        $('.map').show();
    });
    window.addEventListener('hashchange', function (e) {
        if (window.location.hash == '') {
            $('.map').hide();
        }
    });
    // 购票须知
    $('.order-rule').click(function(){
        $('.rule').show();
    })
    $('.close-btn').click(function(){
        $('.rule').hide();
    })
});

/**隐藏站点详细**/
function hideDetail() {
    $("#stationDetail").hide();
}
// 百度地图详情
function initBaidu() {

    // // 中心坐标
    var point = new BMap.Point(113.315463, 23.416921);
    // 初始化导航地图
    map2 = new BMap.Map("l-map");
    map2.centerAndZoom(point, 12);
    map2.enableScrollWheelZoom();
    // 详情百度地图


    $('.goRoad').click(function () {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                console.log(goStations)
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

// 百度地图线路
function initBaiduLine() {
    // 获取站点(需要获取)
    var stationsStr = '[{"StationName":"\u82b1\u57ce\u6c471","StationName2":"\u82b1\u57ce\u6c47(\u6d4b\u8bd5)","StationCode":"S0192","StationSeq":"1","StationMinutes":"0","StationMile":"","StationType":"1","Price":"0","StationPrice":"0","StationDesp":"\u82b1\u57ce\u5e7f\u573a\u54a8\u8be2\u7535\u8bdd\uff1a13725220488","pic1":"images\/42\/2016\/12\/J7RXUmqUe9WQt7SR0EiGH8qwI9XpXr.png","pic2":"images\/42\/2016\/12\/C0xQXmr1u6utqM3T3mq43xv77M3Zrl.png","StationPic":"http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/42\/2016\/12\/J7RXUmqUe9WQt7SR0EiGH8qwI9XpXr.png,http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/42\/2016\/12\/C0xQXmr1u6utqM3T3mq43xv77M3Zrl.png","Latitude":"23.131994","Longitude":"113.331258"},{"StationName":"\u5927\u5b66\u57ce\u5317","StationName2":"\u5927\u5b66\u57ce\u5730\u94c1\u5317","StationCode":"S0181","StationSeq":"10","StationMinutes":"10","StationMile":"","StationType":"1","Price":"0","StationPrice":"0","StationDesp":"","pic1":"","pic2":"","StationPic":"","Latitude":"23.064417","Longitude":"113.392309"},{"StationName":"\u73e0\u6d77\u4e09\u7076\u5ba2\u8fd0\u7ad9","StationName2":"\u73e0\u6d77\u4e09\u7076\u5ba2\u8fd0\u7ad9","StationCode":"S0194","StationSeq":"78","StationMinutes":"60","StationMile":"","StationType":"2","Price":"0","StationPrice":"0","StationDesp":"","pic1":"images\/52\/2016\/11\/gzn6H0arxG6HSG5GccG5NNX0Xw6wRA.png","pic2":"images\/52\/2016\/11\/W44L3BBoJzE3fyE3OyL54KLYT3TlYl.png","StationPic":"http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/52\/2016\/11\/gzn6H0arxG6HSG5GccG5NNX0Xw6wRA.png,http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/52\/2016\/11\/W44L3BBoJzE3fyE3OyL54KLYT3TlYl.png","Latitude":"22.050213","Longitude":"113.356738"},{"StationName":"\u82b3\u6751","StationName2":"\u82b3\u6751","StationCode":"S4699","StationSeq":"80","StationMinutes":"0","StationMile":"","StationType":"3","Price":"0","StationPrice":"0","StationDesp":"","pic1":"images\/52\/2017\/03\/YKweOSWsg817q1L61oOgk8ZQ7UQlU7.jpg","pic2":"images\/52\/2017\/03\/A5xKjC3053K43JjHs5045nRRmjK5L5.jpg","StationPic":"http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/52\/2017\/03\/YKweOSWsg817q1L61oOgk8ZQ7UQlU7.jpg,http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/52\/2017\/03\/A5xKjC3053K43JjHs5045nRRmjK5L5.jpg","Latitude":"23.104311","Longitude":"113.242163"},{"StationName":"\u73e0\u6d77\u62f1\u5317","StationName2":"\u73e0\u6d77\u62f1\u5317","StationCode":"S0184","StationSeq":"100","StationMinutes":"10","StationMile":"","StationType":"2","Price":"22","StationPrice":"22","StationDesp":"\u5475\u5475\u54d2","pic1":"images\/42\/2016\/12\/bKx5kFAK6665a4gBEcLboE7Za3EeAk.png","pic2":"images\/42\/2016\/12\/zK7Y3300L6ROU3lu96Ot0t43U66Uyp.png","StationPic":"http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/42\/2016\/12\/bKx5kFAK6665a4gBEcLboE7Za3EeAk.png,http:\/\/rycoachtest.xunxintech.com\/attachment\/thumbnail\/images\/42\/2016\/12\/zK7Y3300L6ROU3lu96Ot0t43U66Uyp.png","Latitude":"22.221567","Longitude":"113.560621"}]';
    var stations = eval("(" + stationsStr + ")");
    stations.sort(function (a, b) {
        return parseInt(a.StationSeq) - parseInt(b.StationSeq);
    })
    // 获取站点坐标（需要获取）
    pointsStr = '[]';

    if (pointsStr) {
        points = eval("(" + pointsStr + ")");
        points.sort(function (a, b) {
            return parseInt(a.Seq) - parseInt(b.Seq);
        });
    } else {
        points = stations;
    }
    if (JSON.parse(pointsStr) == 0) {
        points = stations;
    }
    map = new BMap.Map("allmap", {
        enableMapClick: false
    });
    var point = new BMap.Point(stations[0]['Longitude'], stations[0]['Latitude']);
    map.centerAndZoom(point, 11);
    mapDrawLine();
}

/**站点连线**/
function mapDrawLine() {
    var wpoints = new Array();
    var n = 0;
    var last = points.length - 1;
    for (n; n <= last; n++) {
        wpoints.push(new BMap.Point(points[n].Longitude, points[n].Latitude));

    }
    var driving = new BMap.DrivingRoute(map, {
        renderOptions: {
            map: map,
            autoViewport: true
        }
    });
    var startIcon = new BMap.Icon("/resource/img/shuttle/ic_@0302startstation.png", new BMap.Size(30, 30));
    var endIcon = new BMap.Icon("/resource/img/shuttle/ic_@0302endstation.png", new BMap.Size(30, 30));
    var midIcon = new BMap.Icon('/resource/img/shuttle/ic_@0302stationV2.png', new BMap.Size(30, 30));

    //设置起终点图标
    driving.setMarkersSetCallback(function (result) {
        for (var i in result) {
            if (i == 0 || i == result.length - 1) {
                $(result[i].marker.V).css('display', 'none');
                $(result[i].marker.Yc).css("display", 'none');
            } else {

                if (result[i].Om) {
                    $(result[i].Om.V).css('display', 'none');
                    $(result[i].Om.Yc).css("display", 'none');
                } else if (result[i].Pm) {
                    $(result[i].Pm.V).css('display', 'none');
                    $(result[i].Pm.Yc).css("display", 'none');
                } else {
                    var marker = result[i][Object.keys(result[i])[3]];
                    $(marker.V).css('display', 'none');
                    $(marker.Yc).css('display', 'none');
                }

            }
        }
        // 检索站点
        var n = 0;
        var last = points.length - 1;
        for (n; n <= last; n++) {
            var myP1 = new BMap.Marker(new BMap.Point(points[n]['Longitude'], points[n]['Latitude']), { icon: midIcon });
            var label = new BMap.Label("<img src='/resource/img/shuttle/ic_@0302sbiao.png' style='position:absolute;height:22px;top:0px;'><span style='color:#5094d3;margin-left:25px; margin-right:18px;font-size:15px;'>" + points[n].StationName + "</span><img  src='/resource/img/shuttle/ic_@0302bright.png' style='width:6px;margin-left:-15px;margin-right:10px;'>", {
                offset: new BMap.Size(5, -22)
            });
            // 始发站图标
            if (n == 0) {
                myP1 = new BMap.Marker(new BMap.Point(points[n]['Longitude'], points[n]['Latitude']), { icon: startIcon });
                var label = new BMap.Label("<img src='/resource/img/shuttle/ic_@0302upbiao.png' style='position:absolute;height:22px;top:0px;'><span style='color:#5094d3;margin-left:25px; margin-right:18px;font-size:15px;'>" + points[n].StationName + "</span><img  src='/resource/img/shuttle/ic_@0302bright.png' style='width:6px;margin-left:-15px;margin-right:10px;'>", {
                    offset: new BMap.Size(5, -22)
                });
            }
            //终点站图标
            if (n == last) {
                myP1 = new BMap.Marker(new BMap.Point(points[n]['Longitude'], points[n]['Latitude']), { icon: endIcon });
                var label = new BMap.Label("<img src='/resource/img/shuttle/ic_@0302downbiao.png' style='position:absolute;height:22px;top:0px;'><span style='color:#ff4000;margin-left:25px; margin-right:18px;font-size:15px;'>" + points[n].StationName + "</span><img  src='/resource/img/shuttle/ic_@0302rright.png' style='width:6px;margin-left:-15px;margin-right:10px;'>", {
                    offset: new BMap.Size(5, -22)
                });
            }
            myP1.addEventListener("click", attribute, false);
            map.addOverlay(myP1);
            label.setStyle({
                'padding': '0px',
                "border": "#fff 0px solid",
                "border-radius": "13px",
                "text-align": "center",
                "z-index": "-944315",
                "height": "20px",
                "display": "block",
            })
            myP1.setLabel(label);
            label.addEventListener("click", function () {
                for (var i in points) {
                    if (points[i]['StationName'] == this.V.innerText) {
                        goStations = {
                            Latitude: points[i]['Latitude'],
                            Longitude: points[i]['Longitude'],
                            name: points[i]['StationName']
                        }

                        var img1 = '';
                        var img2 = '';
                        var stationImgArr = points[i]['StationPic'].split(",");
                        if (stationImgArr.length >= 2) {
                            img1 = stationImgArr[0];
                            img2 = stationImgArr[1];
                        } else if (stationImgArr.length >= 1) {
                            img1 = stationImgArr[0];
                        }
                        if (img1) {
                            $("#station_img1").attr("src", img1);
                        } else {
                            $("#station_img1").attr("src", "/resource/img/shuttle/nopic.png");
                        }
                        if (img2) {
                            $("#station_img2").attr("src", img2);
                        } else {
                            $("#station_img2").attr("src", "/resource/img/shuttle/nopic.png");
                        }
                        $("#station_desp").text(points[i]['StationDesp']);
                        $("#station_name").text(points[i]['StationName']);
                        $("#stationDetail").show();
                    }
                }
            });
        }
    });
    // 设置线路样式
    driving.setPolylinesSetCallback(function (result) {
        for (var line in result) {
            result[line].getPolyline().setStrokeStyle('dashed')
            result[line].getPolyline().setStrokeColor('#0fadfa')
            result[line].getPolyline().setStrokeWeight(3)
            result[line].getPolyline().setStrokeOpacity(1)
        }
    })

    var startstationaddr = new BMap.Point(points[0]['Longitude'], points[0]['Latitude']);
    var startstationicon = new BMap.Icon("/resource/img/shuttle/ic_@0302startstation.png", new BMap.Size(30, 30), { anchor: new BMap.Size(4, 36) });
    var upstationmk = new BMap.Marker(startstationaddr, {
        title: points[0]['StationName'],
        icon: startstationicon
    });

    var endstationaddr = new BMap.Point(points[points.length - 1]['Longitude'], points[points.length - 1]['Latitude']);
    var endstationicon = new BMap.Icon("/resource/img/shuttle/ic_@0302endstation.png", new BMap.Size(30, 30), { anchor: new BMap.Size(4, 36) });
    var downstationmk = new BMap.Marker(endstationaddr, {
        title: points[points.length - 1]['StationName'],
        icon: endstationicon
    });
    driving.search(upstationmk, downstationmk, {
        waypoints: wpoints
    });
}
//点击站点图标显示label
function attribute(e) {
    if ($(e.target.Yc).next()) {
        var label = $(e.target.Yc).next()
        if (label.css('display') == 'none') {
            label.css("display", "block");
        } else if (label.css('display') == 'block') {
            label.css("display", "none");
        }
    }
    // 调试
    label.css("display", "block");
}

/**获取车辆数组**/
function updateCars() {
    var lineCode = 'L0267';//线路code（需要获取）'{$row["SchLineCode"]}'
    var date = '2018-06-20';//日期（需要获取）'{$row['SchDate']}';
    // post请求车辆位置（需要获取）
    // var queryUrl = "./index.php?i=1&c=entry&pages=getLineCars&do=pages&m=ticketorder&wxref=mp.weixin.qq.com";
    // $.post(queryUrl, {
    // 	date: date,
    // 	linecode: lineCode
    // }, function (result) {
    // 	updaterunscar(result);
    // });
    updaterunscar('[]');
}
/**更新车辆位置**/
function updaterunscar(runsStrs) {
    for (var j = 0; j < runscar.length; j++) {
        map.removeOverlay(runscar[j]);
    }
    runsStrs = runsStrs || lastRunsStr;
    var runs = eval("(" + runsStrs + ")");
    // 测试数据
    runs = [{
        Latitude: "23.186097",
        Longitude: "113.304073",
        name: '地球'
    }];
    runscar = new Array();
    for (var j = 0; j < runs.length; j++) {
        var rpt = new BMap.Point(runs[j].Longitude, runs[j].Latitude);
        var myIcon = new BMap.Icon("/resource/img/shuttle/ic_@nowbus0001.gif", new BMap.Size(22, 40));
        runscar[j] = new BMap.Marker(rpt, { icon: myIcon });
        runscar[j].CarNumber = runs[j].CarNumber;
        runscar[j].index = 0;
        runscar[j].LastLocatetime = runs[j].LastLocatetime;
        map.addOverlay(runscar[j]);
    }
}
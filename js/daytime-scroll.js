;
(function ($) {
    var myScrollDate;
    var myScrollHour;
    var myScrollMinute;

    var timeScroll = function (elem, opt) {
        this.$element = elem,
            this.default = {
                yearFlag: 4,
                indexY: 1,
                indexM: 1,
                indexD: 1,
                id: elem.selector,
                obj: {},
                scrollId: "",
                title: "用车时间",
                callback: function () { },
                date: new Date()
            },
            this.options = $.extend({}, this.default, opt);
    };
    timeScroll.prototype = {
        //初始化
        init: function () {
            $(this.options.id).html('');
            this.initHead(this.options.title, this.options.scrollId);
            this.initFrame();
            $("#dates ul").html(this.initDate());
            $("#hours ul").html(this.initHour());
            $("#minutes ul").html(this.initMinute());
            this.initClick(this.options.scrollId);
            this.initIscroll();
            $(this.options.id).hide();
        },
        //初始化时间标题栏
        initHead: function (title, scrollId) {
            var mixhead = '<div class="blackMask"></div>' +
                '<div class="h-40x l-h-40x bc-white b-b-1 p-f z-100 w-100 b-160x">' +
                '<div class="w-20 fl-l text-center " id="cancelButton' + scrollId + '">取消</div>' +
                '<div class="w-60 text-center fl-l">' + title + '</div>' +
                '<div class="w-20 fl-r text-center fcorange " id="confirmButton' + scrollId + '">确定</div>' +
                '</div>';
            $(this.options.id).append(mixhead);
        },
        //初始化时间滚动框架
        initFrame: function () {
            var middleframe = '<div class="h-160x bc-white p-f w-100 overflow-h z-100 b-0">' +
                '<div class="h-40x b-tb-1 p-a t-40x w-100"></div>' +
                '<div class="fl-l w-33 h-160x" id="dates">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="fl-l w-33 h-160x" id="hours">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="fl-l w-33 h-160x" id="minutes">' +
                '<ul></ul>' +
                '</div>' +
                '</div>';
            $(this.options.id).append(middleframe);
        },

        //初始化第一栏日期
        initDate: function () {
            var str = '<li  class="h-40x l-h-40x text-center">&nbsp;</li>';
            var d = this.options.date;
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var myday = d.getDay();
            var xingqi
            switch (myday) {
                case 0: xingqi = "周日"; break;
                case 1: xingqi = "周一"; break;
                case 2: xingqi = "周二"; break;
                case 3: xingqi = "周三"; break;
                case 4: xingqi = "周四"; break;
                case 5: xingqi = "周五"; break;
                case 6: xingqi = "周六"; break;
                default: xingqi = "系统错误！"
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            str += '<li class="h-40x l-h-40x text-center" data-date="' + d + '">' + month + '月' + day + '日' + xingqi + '</li>';
            return str + '<li  class="h-40x l-h-40x text-center">&nbsp;</li><li  class="h-40x l-h-40x text-center">&nbsp;</li>';
        },
        //初始化第二栏小时
        initHour: function () {
            var str = '<li class="h-40x l-h-40x text-center">&nbsp;</li>';
            for (var i = 0; i < 24; i++) {
                var temp = '';
                if(i<10){
                    temp = '0'+i;
                }else{
                    temp = i;
                }
                str += '<li class="h-40x l-h-40x text-center" data-hour="' + temp + '">' + temp + '时</li>'
            }
            return str + '<li class="h-40x l-h-40x text-center">&nbsp;</li><li class="h-40x l-h-40x text-center">&nbsp;</li>';
        },
        //初始化第三栏日期
        initMinute: function () {
            var str = '<li class="h-40x l-h-40x text-center">&nbsp;</li>';
           
            for (var i = 0; i < 60; i+=5) {
                var temp = '';
                if(i<10){
                    temp = '0'+i;
                }else{
                    temp = i;
                }
                str += '<li class="h-40x l-h-40x text-center" data-mimute="' + temp + '">' + temp + '分</li>'
            }
            return str + '<li class="h-40x l-h-40x text-center">&nbsp;</li><li class="h-40x l-h-40x text-center">&nbsp;</li>';
        },

        //初始化iscroll
        initIscroll: function () {
            var that = this;
            myScrollDate = new iScroll('dates', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                checkDOMChanges:true,
                onScrollEnd: function () {
                    that.options.indexY = Math.floor((this.y / 40) * (-1) + 1);
                }
            });
            myScrollHour = new iScroll('hours', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                hScroll: false,
                checkDOMChanges:true,
                onScrollEnd: function () {
                    that.options.indexM = Math.floor((this.y / 40) * (-1) + 1);
                }
            });
            myScrollMinute = new iScroll('minutes', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                checkDOMChanges:true,
                onScrollEnd: function () {
                    that.options.indexD = Math.floor((this.y / 40) * (-1) + 1);
                }
            });

        },


        //初始化点击事件
        initClick: function (id) {
            var that = this;
            $("#cancelButton" + id).on("click", function () {
                $(that.options.id).hide();
            });
            $(".blackMask").on("click", function () {
                $(that.options.id).hide();
            });
            $("#confirmButton" + id).on("click", function () {
                var date_val = $("#dates>ul>li").eq(that.options.indexY).html();
                var hour_val = $("#hours>ul>li").eq(that.options.indexM).html();
                var minute_val = $("#minutes>ul>li").eq(that.options.indexD).html();
                var text = date_val+ hour_val  + minute_val;
                that.options.callback(text);
                $(that.options.id).hide();
            });
        }

    }
    $.fn.jqueryTimeScroll = function (options) {
        var newTimeScroll = new timeScroll(this, options);
        newTimeScroll.init();

        return newTimeScroll;
    }
})(jQuery);
;
(function ($) {
    var myScrollHour;
    var myScrollMinute;

    var timeScroll = function (elem, opt) {
        this.$element = elem,
            this.default = {
                yearFlag: 4,
                indexH: 1,
                indexM: 1,
                id: elem.selector,
                obj: {},
                scrollId: "",
                title: "用车时间",
                callback: function () {},
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
                '<div class="fl-l w-25 h-160x"  >' +
                '<ul></ul>' +
                '</div>' +
                '<div class="fl-l w-25 h-160x" id="hours">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="fl-l w-25 h-160x" id="minutes">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="fl-l w-25 h-160x"  >' +
                '<ul></ul>' +
                '</div>' +
                '</div>';
            $(this.options.id).append(middleframe);
        },

        //初始化第一栏小时
        initHour: function () {
            var str = '<li class="h-40x l-h-40x text-center">&nbsp;</li>';
            for (var i = 0; i < 24; i++) {
                var temp = '';
                if(i<10){
                    temp = '0'+i;
                }else{
                    temp = i;
                }
                str += '<li class="h-40x l-h-40x text-center" data-hour="' + temp + '">' + temp + '</li>'
            }
            return str + '<li class="h-40x l-h-40x text-center">&nbsp;</li><li class="h-40x l-h-40x text-center">&nbsp;</li>';
        },
        //初始化第二栏分钟
        initMinute: function () {
            var str = '<li class="h-40x l-h-40x text-center">&nbsp;</li>';
           
            for (var i = 0; i < 60; i+=5) {
                var temp = '';
                if(i<10){
                    temp = '0'+i;
                }else{
                    temp = i;
                }
                str += '<li class="h-40x l-h-40x text-center" data-mimute="' + temp + '">' + temp + '</li>'
            }
            return str + '<li class="h-40x l-h-40x text-center">&nbsp;</li><li class="h-40x l-h-40x text-center">&nbsp;</li>';
        },

        //初始化iscroll
        initIscroll: function () {
            var that = this;
            myScrollHour = new iScroll('hours', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                hScroll: false,
                checkDOMChanges:true,
                onScrollEnd: function () {
                    that.options.indexH = Math.floor((this.y / 40) * (-1) + 1);
                }
            });
            myScrollMinute = new iScroll('minutes', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                checkDOMChanges:true,
                onScrollEnd: function () {
                    that.options.indexM = Math.floor((this.y / 40) * (-1) + 1);
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
                var hour_val = $("#hours>ul>li").eq(that.options.indexH).html();
                var minute_val = $("#minutes>ul>li").eq(that.options.indexM).html();
                var text = hour_val +'：'+ minute_val;
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
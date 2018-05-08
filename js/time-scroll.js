;
(function ($) {
    var myScrollYear;
    var myScrollMonth;
    var myScrollDay;

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
                date: new Date(),
                showDate: new Date(),
                dateEnd: new Date((new Date()).getFullYear() + 4, 0, 0)
            },
            this.options = $.extend({}, this.default, opt);
    };
    timeScroll.prototype = {
        //初始化
        init: function () {
            $(this.options.id).html('');
            this.initHead(this.options.title, this.options.scrollId);
            this.initFrame();
            $("#years ul").html(this.initYear());
            $("#months ul").html(this.initMonth());
            $("#days ul").html(this.initDay());
            (this.initIscroll())();

            this.initClick(this.options.scrollId);
            this.initNowTime(this.options.scrollId)
            $(this.options.id).hide();
        },
        //初始化时间标题栏
        initHead: function (title, scrollId) {
            var mixhead = '<div class="blackMask"></div>' +
                '<div class="h-40x l-h-40x bc-white b-b-1 p-f z-100 w-100 b-160x">' +
                '<div class="w-20 fl-l text-center fcorange" id="cancelButton' + scrollId + '">取消</div>' +
                '<div class="w-60 text-center fl-l">' + title + '</div>' +
                '<div class="w-20 fl-r text-center fcorange " id="confirmButton' + scrollId + '">确定</div>' +
                '</div>';
            $(this.options.id).append(mixhead);
        },
        //初始化时间滚动框架
        initFrame: function () {
            var middleframe = '<div class="h-160x bc-white p-f w-100 overflow-h z-100 b-0">' +
                '<div class="h-40x b-tb-1 p-a t-40x w-100" style="background-color: #f3f2f2;"></div>' +
                '<div class="fl-l w-33 h-160x" id="years">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="fl-l w-33 h-160x" id="months">' +
                '<ul></ul>' +
                '</div>' +
                '<div class="fl-l w-33 h-160x" id="days">' +
                '<ul></ul>' +
                '</div>' +
                '</div>';
            $(this.options.id).append(middleframe);
        },

        //初始化第一栏年
        initYear: function () {
            var str = '<li  class="h-40x l-h-40x text-center">&nbsp;</li>';
            var d = this.options.date;
            var year = d.getFullYear();
            var dE = this.options.dateEnd;
            var yearEnd = dE.getFullYear();
            var num = yearEnd - year;


            for (var i = 0; i <= num; i++) {
                str += '<li class="h-40x l-h-40x text-center" data-year="' + (year + i) + '">' + parseInt(year + i) + '年</li>';
            }
            return str + '<li  class="h-40x l-h-40x text-center">&nbsp;</li><li  class="h-40x l-h-40x text-center">&nbsp;</li>';
        },
        //初始化第二栏月
        initMonth: function () {

            var str = '<li class="h-40x l-h-40x text-center">&nbsp;</li>';
            var d = this.options.date;
            var lastYear = this.options.dateEnd.getFullYear() - this.options.date.getFullYear() + 1;
            var flag = d.getMonth() + 1;
            var Mmonth = d.getMonth();
            if (this.options.indexY > 1) {
                flag = 1;
            }
            for (var i = flag; i <= (this.options.indexY == lastYear ? this.options.dateEnd.getMonth() + 1 : 12); i++) {
                var month = '';
                if (i < 10) {
                    month = '0' + i;
                } else {
                    month = i;
                }
                str += '<li class="h-40x l-h-40x text-center" data-month="' + i + '">' + month + '月</li>'
            }
            return str + '<li class="h-40x l-h-40x text-center">&nbsp;</li><li class="h-40x l-h-40x text-center">&nbsp;</li>';
        },
        //初始化第三栏日期
        initDay: function () {
            var str = '<li class="h-40x l-h-40x text-center">&nbsp;</li>';
            var d = this.options.date;
            var Dd = d.getDate();
            var lastYear = this.options.dateEnd.getFullYear() - this.options.date.getFullYear() + 1;
            var lastMonth = this.options.dateEnd.getMonth() + 1;
            var Dlast = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            if (this.options.indexY > 1 || this.options.indexM > 1) {
                Dd = 1;
                var year_val = parseInt($("#years>ul>li").eq(this.options.indexY).html());
                var month_val = parseInt($("#months>ul>li").eq(this.options.indexM).html());
                Dlast = new Date(year_val, month_val, 0).getDate();
            }

            if (this.options.indexY == lastYear && this.options.indexM == lastMonth) {
                Dd = 1;
                Dlast = this.options.dateEnd.getDate();
                console.log(Dlast)
            }
            if (this.options.date.getFullYear() == this.options.dateEnd.getFullYear() && this.options.date.getMonth() == this.options.dateEnd.getMonth()) {
                Dd = this.options.date.getDate();
                Dlast = this.options.dateEnd.getDate();
            }
            for (var i = Dd; i <= Dlast; i++) {
                var day = '';
                if (i < 10) {
                    day = '0' + i;
                } else {
                    day = i;
                }
                str += '<li class="h-40x l-h-40x text-center" data-day="' + i + '">' + day + '日</li>'
            }
            return str + '<li class="h-40x l-h-40x text-center">&nbsp;</li><li class="h-40x l-h-40x text-center">&nbsp;</li>';
        },

        //初始化iscroll
        initIscroll: function () {
            var that = this;
            try {
                myScrollYear.destory();
                myScrollMonth.destory();
                myScrollDay.destory();
            } catch (e) {

            }
            myScrollYear = new iScroll('years', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                onScrollEnd: function () {

                    that.options.indexY = Math.floor((this.y / 40) * (-1) + 1);
                    $("#months ul").html(that.initMonth());
                    $("#days ul").html(that.initDay());

                    myScrollMonth.refresh();
                    myScrollDay.refresh();
                    // console.log(that.options.indexY);
                }
            });

            myScrollMonth = new iScroll('months', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                hScroll: false,
                onScrollEnd: function () {
                    that.options.indexM = Math.floor((this.y / 40) * (-1) + 1);
                    $("#days ul").html(that.initDay());
                    myScrollDay.refresh();
                    // console.log(that.options.indexM)
                }
            });


            myScrollDay = new iScroll('days', {
                snap: 'li',
                hScrollbar: false,
                momentum: false,
                vScrollbar: false,
                onScrollEnd: function () {
                    that.options.indexD = Math.floor((this.y / 40) * (-1) + 1);
                    // console.log(that.options.indexD);
                }
            });
            function initrefresh() {
                myScrollYear.refresh();
                myScrollMonth.refresh();
                myScrollDay.refresh();
            }

            return initrefresh;

        },


        //初始化点击事件
        initClick: function (id) {
            var that = this;

            $("#cancelButton" + id).on("click", function () {
                $(that.options.id).hide();
                that.options.callback('cancel');
            });
            $(".blackMask").on("click", function () {
                $(that.options.id).hide();
                that.options.callback('cancel');
            });
            $("#confirmButton" + id).on("click", function () {
                var year_val = parseInt($("#years>ul>li").eq(that.options.indexY).html());
                var month_val = parseInt($("#months>ul>li").eq(that.options.indexM).html());
                var day_val = parseInt($("#days>ul>li").eq(that.options.indexD).html());
                if (month_val < 10) {
                    month_val = "0" + month_val;
                }
                if (day_val < 10) {
                    day_val = "0" + day_val;
                }
                var text = year_val + "-" + month_val + "-" + day_val;
                that.options.callback(text, text);
                $(that.options.id).hide();
            });
        },
        // 初始化开始时间
        initNowTime: function () {
            let showDateYear = this.options.showDate.getFullYear();
            let showDateMonth = this.options.showDate.getMonth() + 1;
            let showDateDay = this.options.showDate.getDate();
            let startDateYear = this.options.date.getFullYear();
            let startDateMonth = this.options.date.getMonth() + 1;
            let startDateDay = this.options.date.getDate();
            console.log(this.options.showDate)
            if (this.options.showDate > this.options.date) {
                if (showDateYear > startDateYear) {
                    myScrollYear.scrollTo(0, -40 * (showDateYear - startDateYear));
                    myScrollMonth.scrollTo(0, -40 * (showDateMonth - 1));
                    myScrollDay.scrollTo(0, -40 * (showDateDay - 1));

                } else {
                    if (showDateMonth > startDateMonth) {
                        myScrollMonth.scrollTo(0, -40 * showDateMonth - startDateMonth);
                        myScrollDay.scrollTo(0, -40 * (showDateDay - 1));
                    } else {
                        if (showDateDay > startDateDay) {
                            myScrollDay.scrollTo(0, -40 * showDateDay - startDateDay);
                        }
                    }

                }
            }
            console.log(showDateYear);
        }

    }
    $.fn.jqueryTimeScroll = function (options) {
        var newTimeScroll = new timeScroll(this, options);
        newTimeScroll.init();

        return newTimeScroll;
    }
})(jQuery);

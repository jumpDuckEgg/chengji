;(function($) {
	var dateDom = [];
	var weekNameArr = ['日','一','二','三','四','五','六'];
	var lastMonthAtPanel = null;


	var ScrollRefreshDate = function(elem, opt) {
		this.$element = elem,
			this.default = {
				enableDays : 20,
				months : 2, /*一次刷新几个月份数据*/
				callback:function(){},
				isNewObjEveryTime: true,
				isEnableScrollRefresh: false,
				oneDateOn: new Date(),
				theme: 'red',
				dtitle:'选择日期',
				ishidden: true,
				datestrs:""
			}
		this.options = $.extend({}, this.default, opt);
	}

	ScrollRefreshDate.prototype = {
		init : function() {
			this.drawDatePanel();
			this.toggleSvgColor();
			this.editortitle();
			this.createScroll();
			this.setOneDateOn(this.options.oneDateOn);
		},

		/**
		 * @description 切换主题色
		 */
		toggleSvgColor: function() {
			document.getElementById('d-return').style.stroke = this.options.theme;
		},
		
		/**
		 * @description 修改标题
		 */
		editortitle: function() {
			document.getElementById('date-title').innerText = this.options.dtitle;
		},

		/**
		 * 新建iScroll对象，并监听滑动
		 */
		createScroll : function() {
			var that = this;

			var isEnableScrollRefresh = this.options.isEnableScrollRefresh;
			var pullUpObj = document.getElementById('pullUp');
			var pullUpOffset = pullUpObj.offsetHeight;
			var dateScroll = new iScroll('wrapper', {
				mouseWheel: true,
				scrollbars: false,
				interactiveScrollbars: false,
				fadeScrollbars: false,

				onScrollMove : function() {
					if (isEnableScrollRefresh) {
						if (this.y < (this.maxScrollY - 5) && !pullUpObj.className.match('flip')) {
							pullUpObj.className = 'flip';
							pullUpObj.querySelector('.pullUpLabel').innerHTML = '准备加载...';
							this.maxScrollY = this.maxScrollY;
						}
					}
				},

				onScrollEnd : function() {
					if (isEnableScrollRefresh) {
						if (pullUpObj.className.match('flip')) {
							pullUpObj.querySelector('.pullUpLabel').innerHTML = '正在加载中...';
							setTimeout(function() {
								that.pullUpAction(dateScroll);
							}, 200);
							pullUpObj.className = '';
						}
					}
				}
			});


			
		},

		/**
		 * 绘制日历面板
		 */
		drawDatePanel : function() {
			$("#d-box").remove();
			dateDom.push('<div id="d-box">');
			this.insertHeader();
			this.insertTitle();
			this.insertDate(2);
			dateDom.push('</div>');
			var html = "";
			html = dateDom.join('');
			$('body').append(html);
			this.clickListener(); /*点击事件监听*/
		},

		/**
		 * 插入header
		 */
		insertHeader : function() {
//			dateDom.push('<div id="d-header">选择日期<a><img id="d-return" src="img/ic_return.svg"/></a></div>');
//			dateDom.push('<div id="d-header">选择日期<a><svg id="d-return" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-1{fill:none;}</style></defs><title>画板 7</title><path class="cls-1" d="M26.38,36a3.14,3.14,0,0,1-2.23-.94h0L11.35,22.25a3.18,3.18,0,0,1,0-4.5L24.15,4.94a3.18,3.18,0,0,1,5.43,2.25V32.81a3.13,3.13,0,0,1-2,2.94A3.22,3.22,0,0,1,26.38,36Zm-.81-2.35a1.18,1.18,0,0,0,2-.83V7.19a1.18,1.18,0,0,0-2-.83L12.76,19.17a1.18,1.18,0,0,0,0,1.67L25.57,33.64Z"/></svg></a></div>');
			dateDom.push('<div id="d-header"><span id="date-title"></span><a><img id="d-return" height="15px" style="position:relative;top:2px;" src="/web/resource/img/serviceleft.png"><span style="color:#f79030;font-size:15px;"> 返回</span></a></div>');
		},

		/**
		 * 插入表头
		 */
		insertTitle : function() {
			dateDom.push('<div id="d-title">');
			for (var i=0; i<7; i++) {
				dateDom.push('<div style="color:'+this.options.theme+'">'+weekNameArr[i]+'</div>');
			}
			dateDom.push('</div>');
		},

		/**
		 * 插入日历
		 */
		insertDate : function() {
			dateDom.push('<div id="wrapper">');
			dateDom.push('<div id="scroller">');
			dateDom.push('<ul id="d-date">');

			this.insertOneMonthDate();

			dateDom.push('</ul>');
			dateDom.push('<div id="pullUp">');
			if (this.options.isEnableScrollRefresh) {
				dateDom.push('<span class="pullUpLabel">上拉加载更多...</span>');
			}
			dateDom.push('</div>');
			dateDom.push('</div>');
			dateDom.push('</div>');
		},


		/**
		 * 插入一个月的日期相关信息
		 */
		insertOneMonthDate : function() {
			var drawMonths = this.getDrawMonths(); //首先获取绘制的月份数
			for (var i=0; i<drawMonths; i++) {
				dateDom.push("<li>");
				this.insertMonth();
				this.insertDay(lastMonthAtPanel);
				dateDom.push("</li>");
			}
		},

		/**
		 * 插入月份信息
		 */
		insertMonth : function() {
			if (null == lastMonthAtPanel) {
				var currentMonth = this.getMonthFirst(new Date());
				lastMonthAtPanel = currentMonth;
			}else {
				lastMonthAtPanel = this.getNextMonth(lastMonthAtPanel);
			}
			dateDom.push('<div class="d-month"><span>'+lastMonthAtPanel.getFullYear()+'年'+(lastMonthAtPanel.getMonth()+1)+'月</span><hr/></div>');
		},

		/**
		 * 获取下一个月
		 * @param {Object} currentMonth
		 */
		getNextMonth : function(currentMonth) {
			var daysOfMonth = this.getMonthLast(currentMonth).getDate();
			return this.dateAddDay(currentMonth, daysOfMonth);
		},


		/**
		 * 插入天信息
		 * @param {Object} currentMonth
		 */
		insertDay : function(currentMonth) {
			var lastDaysOfMonth = this.getMonthLast(currentMonth);
			var firstDaysOfMonth = this.getMonthFirst(currentMonth);
			var weekStartIndex = this.getFirstIndexOfWeekNumArr(firstDaysOfMonth);
			var nowDate = new Date();
			var limitSize =  (weekStartIndex+lastDaysOfMonth.getDate()+1)*1>35? 42:35;
			var currentDate = firstDaysOfMonth;
			dateDom.push('<div class="d-day">');
			for (var i=0; i<limitSize; i++) {
				var enableAttr = !this.validateIfEnable(nowDate, currentDate, lastDaysOfMonth, weekStartIndex, i) ? ' d-unable' : '';
//				var todayAttr = this.validateIfIsToday(nowDate, currentDate) ? ' d-today d-on' : '';
				var todayAttr = this.validateIfIsToday(nowDate, currentDate) ? ' d-today' : '';
				var onBg = this.validateIfIsToday(nowDate, currentDate) ? 'color:#fff; background:'+this.options.theme : '';

				var dAttr = enableAttr +""+ todayAttr;
				var day = this.getDayStr(weekStartIndex, i, currentDate, weekStartIndex, lastDaysOfMonth);
				if(day!="" ){
					var dstatus=this.getStatus(currentDate);
				}else{
					var dstatus="";
				}
				if(dstatus.trim() == 'haveticket'){
					dAttr = todayAttr;
				}else{
					dAttr = enableAttr +""+ todayAttr;
				}
//				dateDom.push('<div class="d-chooseDate '+dAttr+'" data-date="'+Date.parse((currentDate.parseStr('YYYY/MM/DD')).parseToDate())/1000+'"><span>'+day+'</span></div>');/*一出日之后的时分秒*/
				dateDom.push('<div class="d-chooseDate '+dstatus+dAttr+'" data-date="'+Date.parse((currentDate.parseStr('YYYY/MM/DD')).parseToDate())/1000+'" style="position:relative;"><div style="position:absolute;color:#cbcbcb;right:10px;z-index:100;font-size:11px;" class="noticketed">无</div><div style="position:absolute;color:#1b93ce;right:10px;z-index:100;font-size:11px;" class="ticketed">票</div><span style="'+onBg+'">'+day+'</span></div>');/*一出日之后的时分秒*/

				if ('' != day) {
					currentDate = this.dateAddDay(currentDate, 1);
				}
			}
			dateDom.push('</div>');
		},


		/**
		 * 获取网格对应的日期字符串
		 * @param {Object} weekStartIndex
		 * @param {Object} currentIndex
		 * @param {Object} currentDate
		 * @param {Object} weekStartIndex
		 * @param {Object} lastDaysOfMonth
		 */
		getDayStr : function(weekStartIndex, currentIndex, currentDate, weekStartIndex, lastDaysOfMonth){
			var dayDate = this.getDayDateStr(weekStartIndex, currentIndex, currentDate);
			if (null != dayDate) {
				dayDate = dayDate.parseToDate(); //格式化为日期格式
			}
			var dayStr = "";

			if (currentIndex <= weekStartIndex+lastDaysOfMonth.getDate() && null != dayDate) {	//当当前的描绘的网格是最后一个日期了，就不再描绘了
				dayStr = dayDate.getDate();
			}
			return dayStr;
		},

		/**
		 * 获取网格对于的日期
		 * @param {Object} weekStartIndex
		 * @param {Object} currentIndex
		 * @param {Object} currentDate
		 */
		getDayDateStr : function(weekStartIndex, currentIndex, currentDate) {
			var day = null;
			if (currentIndex > weekStartIndex) {
				day = currentDate.parseStr('YYYY/MM/DD');	//格式化为日期字符串
			}
			return day;
		},
		
		/**
		 * 获取对应的状态
		 */
		getStatus : function(currentDate) {
			   var datestr=this.options.datestrs;
			   var temp_dstatus="";
			   if(datestr!=""){  
				   var fulldate=currentDate.getFullYear()+""+this.changedate(currentDate.getMonth()+1)+""+this.changedate(currentDate.getDate());
				   for(var i in datestr.data.Rows){
					   	var s=datestr.data.Rows[i];   
					   	if(s.SchDate==fulldate){
					   		temp_dstatus=s.Status
					   	}
					   }
				 
				   if(temp_dstatus=="1"){
				   		temp_dstatus="haveticket";
				   }else if(temp_dstatus=="2"){
				   		temp_dstatus="havenoticket";
				   }else{
				   		temp_dstatus="";
				   }
				   return temp_dstatus;
				}else{
					temp_dstatus=""
					return temp_dstatus;
				}
			   
			},
		changedate:function(num) {
			if(num<10){
				return "0"+num;
			}else{
				return num;
			}  
		},
		/**
		 * 获取绘制的月份数
		 */
		getDrawMonths : function() {
			var drawMonths = 1;
			var enableDays = this.options.enableDays;
		
			if (0 < enableDays) {			//当激活有限日期时
				var nowDate = new Date();
				var currentMonth = nowDate.getMonth();
				var currentYear=nowDate.getFullYear();
				var enableLastDateMonth = this.dateAddDay(nowDate, (enableDays-1)).getMonth();
				var enableLastDateYear =this.dateAddDay(nowDate, (enableDays-1)).getFullYear();
				if(currentYear<enableLastDateYear){  //跨年处理
					enableLastDateMonth+=(enableLastDateYear-currentYear)*12
				}
				if (currentMonth < enableLastDateMonth) {		//当被激活最后一个日期对应的月份 大于 当前月份 时，绘制enableLastDateMonth - currentMonth + 1个月份；若两月份相等，绘制1个月份
					drawMonths = enableLastDateMonth - currentMonth + 1;
				}
			}else {		//当激活日期不定时，按照传进来绘制月份数去绘制
				drawMonths = this.options.months;
			}
			return drawMonths;
		},


		/**
		 * 日期回填
		 * @param {Object} dateObj
		 */
		setOneDateOn : function(dateObj) {
			var that = this;
			var oneDate = dateObj.parseStr('YYYY/MM/DD').parseToDate();
			var oneDateTime = Date.parse(oneDate)/1000;
			$.each($('.d-chooseDate'), function(i, obj) {
				var currentTime = parseInt($(obj).attr('data-date').trim());
				if (oneDateTime == currentTime) {
					that.setThemeColor($('.d-day'), $(obj));
					return;
				}
			});
		},

		/**
		 * 判断是否是可选择,过去的日期，以及没有显示日期的方格都不可以选择
		 * @param {Object} nowDate	今天日期
		 * @param {Object} currentDate	当前描绘日期
		 * @param {Object} weekStartIndex	该月第一天对应的周下表
		 * @param {Object} currentIndex	当前描绘到第几个格子
		 */
		validateIfCanChoose : function(nowDate, currentDate, lastDaysOfMonth, weekStartIndex,　currentIndex) {
			var isEnable = true;

			if　(currentIndex <= weekStartIndex) { //月初前的空格不可选
				isEnable = false;
			}else {
				if (currentDate.parseStr('YYYY-MM-DD').parseToDate() < nowDate.parseStr('YYYY-MM-DD').parseToDate()) {	//今天之前的都不可选
					isEnable = false;
				}else if (currentDate.parseStr('YYYY-MM-DD').parseToDate() > lastDaysOfMonth.parseStr('YYYY-MM-DD').parseToDate()){//月末之后的空格不可选
					isEnable = false;
				}
			}
			return isEnable;
		},

		/**
		 * 判断是否激活日期
		 * @param {Object} nowDate 			今天日期
		 * @param {Object} currentDate 		当前描绘日期
		 * @param {Object} lastDaysOfMonth 	某月的最后一天
		 * @param {Object} weekStartIndex	该月第一天对应的周下表
		 * @param {Object} currentIndex		当前描绘到第几个格子
		 */
		validateIfEnable : function(nowDate, currentDate, lastDaysOfMonth, weekStartIndex,　currentIndex) {
			var isEnable = true;
			var enableDays = this.options.enableDays;
			isEnable = this.validateIfCanChoose(nowDate, currentDate, lastDaysOfMonth, weekStartIndex,　currentIndex);

			//如果满足validateIfCanChoose,则不再执行下面操作
			if (0 < enableDays && isEnable) { /*如果enableDays小于等于0,则除过去以外的日期都被激活*/
				var lastEnableDate = this.dateAddDay(nowDate, enableDays);
				isEnable = !this.compareDate(lastEnableDate, currentDate);
			}
			return isEnable;
		},


		/**
		 * 判断是否是今天
		 * @param {Object} nowDate
		 * @param {Object} currentDate
		 */
		validateIfIsToday : function(nowDate, currentDate) {
			var isToday = false;
			if (currentDate.parseStr('YYYY-MM-DD') == nowDate.parseStr('YYYY-MM-DD')) {
				isToday = true;
			}
			return isToday;
		},

		/**
		 * 判断是否是周末
		 * @param {Object} currentIndex
		 */
		validateIfIsWeekend : function(currentIndex) {

			var isWeekend = false;
			if ((0 == (currentIndex % 7) || 6 == (currentIndex % 7))){
				isWeekend = true;
			}
			return isWeekend;
		},


		/**
		 * 比较日期大小
		 * @param {Object} date1 小日期
		 * @param {Object} date2 大日期
		 */
		compareDate : function(date1, date2) {
			var isLarge = true;
			var time1 = (new Date(date1.parseStr('YYYY-MM-DD'))).getTime();
			var time2 = (new Date(date2.parseStr('YYYY-MM-DD'))).getTime();

			if (time2 < time1) {
				isLarge = false;
			}

			return isLarge;
		},


		/**
		 * 在日期的基础上增加天数
		 * @param date 原日期
		 * @param dayNum 增加天数
		 * @author dapaer
		 */
		dateAddDay : function(date,dayNum){
			var oneDay=1000*60*60*24;
			if ((typeof dayNum) == 'number'){
				dayNum = new Number(dayNum);
			}
			if (( typeof date) == 'string'){
				date = date.parseToDate();
			}
			return new Date(Date.parse(date) + (oneDay*dayNum));
		},


		/**
		 * 获取当前月的第一天
		 */
		getCurrentMonthFirst : function(){
			return getMonthFirst(new Date());
		},


		/**
		 * 获取月的第一天
		 */
		getMonthFirst : function(date){
			if (( typeof date) == 'string'){
				date = date.parseToDate();
			}

			date.setDate(1);
			return date;
		},

		/**
		 * 获取当前月的最后一天
		 */
		getCurrentMonthLast : function(){
			return getMonthLast(new Date());
		},


		/**
		 * 获取月的最后一天
		 */
		getMonthLast : function(dDate){

			if(( typeof dDate) == 'string'){
				dDate = dDate.parseToDate();
			}
			var currentMonth=dDate.getMonth();
			var nowYear = dDate.getFullYear();
			var nextMonth=++currentMonth;

			if (nextMonth > 12) {
				nextMonth -= 12;
				nowYear++;
			}
			var nextMonthFirstDay=new Date(nowYear,nextMonth,1);
			return this.dateAddDay(nextMonthFirstDay, -1);
		},

		/**
		 * 获取对应星期下标
		 * @param date
		 * @returns {number}
		 */
		getFirstIndexOfWeekNumArr : function(date){
			if(( typeof date) == 'string'){
				date = date.parseToDate();
			}
			return (date.getDay()+7-1)%7;
		},


		/**
		 * 上拉滚动刷新
		 * @param {Object} dateScroll
		 */
		pullUpAction : function(dateScroll) {
			dateDom = [];
			this.insertOneMonthDate(3);
			var html = "";
			html = dateDom.join('');
			$('#d-date').append(html);

			dateScroll.refresh();
			document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			this.clickListener(); /*点击事件监听*/
		},


		/**
		 * 点击事件监听
		 */
		clickListener : function() {
			var that = this;
			var myDate = '';
			var myWeek = '';

			$('.d-chooseDate').click(function() {
				if (!$(this).hasClass('d-unable')) {
					$dayBox = $('.d-day').children();
					$days = $dayBox.children('span');
					that.setThemeColor($dayBox, $(this));

//					$dayBox.removeClass('d-on');
//					$(this).addClass('d-on');
					myDate = $(this).attr('data-date').trim();
					that.options.callback(myDate);

					that.hiddenDateBox();
				}
			})

			that.listenClickReturn();
		} ,

		/**
		 * 修改主题色
		 * @param {Object} $day
		 * @param {Object} $obj
		 */
		setThemeColor: function($day, $obj) {
			$day.children().css('background', '').css('color', '');
			$obj.children('span').css('background', this.options.theme).css('color', '#fff');
		},


		/**
		 * 监听返回
		 */
		listenClickReturn : function() {
//			var that = this;
//			$('#d-header').find('a').click(function() {
//				that.hiddenDateBox();
//			})
			var that = this;
			$('#d-header').find('a').click(function() {
			var $obj = $('#d-box');
			if (that.options.isNewObjEveryTime) {
				$obj.remove();
			}else {
				$obj.animate({'right':'-100%'}, '250', function() {
						$obj.addClass('dpn');
					});
				}
			
			})

		},

		/**
		 * 返回时,销毁相应内容
		 */
		hiddenDateBox : function() {
			var $obj = $('#d-box');
			if (this.options.isNewObjEveryTime) {
				$obj.remove();
			}else {

//				$obj.removeClass('d-toLeft')
//					.addClass('d-toRight')
//					.css('right', '-100%');

//				$obj.removeClass('d-animateLeft')
//					.removeClass('d-left')
//					.addClass('d-animateRight')
//					.addClass('d-right');//.addClass('dpn');/*无法用这种方式,因为没有回调函数,效果会在移动还没开始时就已经隐藏元素了*/
				if(this.options.ishidden){
					$obj.animate({'right':'-100%'}, '250', function() {
						$obj.addClass('dpn');
					});
				}else{
					return;
				}
				
//				$obj.slideUp('250');
//				$obj.fadeOut('250');
//				$obj.addClass('dpn');
			}
		}

	}

	var scrollRefreshDate;
	function getInstance(obj, options) {
		var isNewObjEveryTime = options.isNewObjEveryTime;
		if (!isNewObjEveryTime && 'undefined' != typeof(isNewObjEveryTime)) {	//当不是每次都新建对象事,存在则显示,不存在则new
			if ('object' == typeof(scrollRefreshDate)) {
				dateDom = [];
				lastMonthAtPanel = null;
				scrollRefreshDate = new ScrollRefreshDate(obj, options);
				scrollRefreshDate.init();
			}else {
				scrollRefreshDate = new ScrollRefreshDate(obj, options);
				scrollRefreshDate.init();
			}

		}else {	//当每次都新建对象事,需要每次都置空变量
			dateDom = [];
			lastMonthAtPanel = null;
			scrollRefreshDate = new ScrollRefreshDate(obj, options);
			scrollRefreshDate.init();
		}

		var $obj = $('#d-box');

		$obj.removeClass('dpn');
		$obj.animate({'right':'0%'}, '250');

//  	$obj.fadeIn('250');

//		$obj.removeClass('d-animateRight')
//			.removeClass('d-right')
//			.addClass('d-animateLeft')
//			.addClass('d-left');


//		$obj.removeClass('d-toRight')
//			.addClass('d-toLeft')
//			.css('right', '0%');

		return scrollRefreshDate;
	}



	$.fn.scrollRefreshDate = function(options) {
		try{
			options.enableDays = options.datestrs.data.Rows.length;
		}catch(e){
			
		}
		return getInstance(this, options);
	}
})(jQuery)
    
    

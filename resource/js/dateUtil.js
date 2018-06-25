/**
 * Created by dapaer on 2015/12/20.
 */
/**
 * 扩展Date对象的解析字符串方法
 * @param format 要过滤的格式
 * @author dapaer
 * @returns
 */
Date.prototype.parseStr = function(format) {
    var mths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var WEEKs =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    var WEKs = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ];
    var YYYY = this.getFullYear()+""; //2011

    var YY = YYYY.substr(2);   // 11
    format = format.replaceAll("YYYY",YYYY);
    format = format.replaceAll("YY",YY);

    var M=this.getMonth()+1;
    var MM=(M<10)?"0"+M:M;
    var MMM=mths[M - 1];
    format=format.replaceAll("MMM",MMM);
    format=format.replaceAll("MM",MM);
    format=format.replaceAll("M",M);

    var D=this.getDate();
    var DD=(D<10)?"0"+D:D;
    format=format.replaceAll("DD",DD);
    format=format.replaceAll("D",D);

    var h=this.getHours();
    var hh=(h<10)?"0"+h:h;
    format=format.replaceAll("hh",hh);
    format=format.replaceAll("h",h);
    var m=this.getMinutes();
    var mm=(m<10)?"0"+m:m;
    format=format.replaceAll("mm",mm);
    format=format.replaceAll("m",m);
    var s=this.getSeconds();
    var ss=(s<10)?"0"+s:s;
    format=format.replaceAll("ss",ss);
    format=format.replaceAll("s",s);
    var dayOfWeek=this.getDay();
    format=format.replaceAll("WEEK",WEEKs[dayOfWeek]);
    format=format.replaceAll("WEK",WEKs[dayOfWeek]);
    return format;
};

/**
 * 扩展Sting的转换Date方法
 * @author dapaer
 * @returns {Date} 返回的日期对象
 */
String.prototype.parseToDate  = function() {
    return new Date(this.replace(/-/g,   "/"));
};

Date.prototype.parseToDate = function(){
    return new Date(this.getTime());
}

/**
 * 扩展字符串的替换所有方法
 * @param src 原字符
 * @param dest 替换后字符
 * @author dapaer
 */
String.prototype.replaceAll  = function(src,dest){
    return this.replace(new RegExp(src,"gm"),dest);
};

String.prototype.parseStr  = function(){
    return this;
}



/**
 * Created by huangweirong on 2016/07/21.
 * @author huangweirong
 * @param {Object} isShowTodayWord 是否个性化显示今明天
 */
Date.prototype.parseWeek = function(isShowTodayWord){
    var weekArray = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    var weekStr = '';
    var oneDay=1000*60*60*24;
    var todayDate = new Date();

    var dateStr = this.parseStr('YYYY-MM-DD');
    var todayDateStr = todayDate.parseStr('YYYY-MM-DD');
    var tomorrowDateStr = (new Date(Date.parse(todayDate) + oneDay)).parseStr('YYYY-MM-DD');

    if (isShowTodayWord) {
        if (todayDateStr == dateStr) {			//判断是否是今天
            weekStr = '今天';
        }else if (tomorrowDateStr == dateStr){	//判断是否是明天
            weekStr = '明天';
        }else {
            weekStr = weekArray[this.getDay()];
        }
    }else {
        weekStr = weekArray[this.getDay()];
    }
    return weekStr;
}


Date.prototype.parseWithWeek = function(pattern, isShowTodayWord) {
    var dt = this.parseStr(pattern);
    var week = this.parseWeek(isShowTodayWord);
    return dt+' '+week;
}


function getWeek(myDate){
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekDay[myDate.getDay()];
}

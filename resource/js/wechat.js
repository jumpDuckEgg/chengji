/**
 * Created by joneszhu on 16/7/9.
 */
"use strict";
(function () {
  var moduleName = 'Wechat';
  var myModule = (function () {
    var host = '//100jc.net/one-open-service';
    var wechat = function (appid) {
      // 默认公众号appid
      if (!appid) {
        appid = "wx26be12d215d3d8cb";
      }
      this.appid = appid;
    };
    var proto = wechat.prototype;

    /**
    * 进入授权页面
    * @param op
    * scope 静默授权: snsapi_base, 显式授权: snsapi_userinfo
    * state - 可选，重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
    * redirecturi - 授权后重定向的回调链接地址，需要用encodeURIComponent进行编码。
    */
    proto.goAuth = function (scope, state, redirectUri) {
      window.location.href = host.concat('/web/auth/', this.appid, '?scope=', scope, '&state=', state, '&redirecturi=', encodeURIComponent(redirectUri));
    }

    /*
     * 确保已经授权成功
     * */
    proto.ready = function (cb) {
      if (this.getQuery('code') && cb instanceof Function) {
        cb();
      }
    }

    /**
     * 微信jssdk初始化
     * @param op
     *  {
     *    jsApiList:array
     *    debug:bool
     *  }
     */
    proto.config = function (op) {
      op = op || {};
      var debug = op.debug == undefined ? false : op.debug;
      var jsApiList = (op.jsApiList == undefined || op.jsApiList.length == 0) ? [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
      ] : op.jsApiList;
      var url = window.location.href.replace(/#{1}.*/, '');
      this.ajax({
        type: "POST",
        url: host + "/web/sign",
        data: JSON.stringify({
          appid: this.appid,
          url: url
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
          if (res.code == 0) {
            var sign = res.data;
            wx.config({
              debug: debug,
              appId: sign.appId,
              timestamp: sign.timestamp,
              nonceStr: sign.nonceStr,
              signature: sign.signature,
              jsApiList: jsApiList
            });
          } else {
            console.error(res);
          }
        }.bind(this)
      });
      return this;
    }


    /**
     * 设置分享话术
     * @param config
     *  {
     *    timelineTitle:'',
     *    appmessageTitle:'',
     *    appmessageDesc:'',
     *    link:'',
     *    imgUrl:''
     *  }
     * @param successCb 分享成功回调
     * @param cancelCb 分享失败回调
     */
    proto.share = function (config, successCb, cancelCb) {
      if (!config) {
        console.error("wechat.share缺少config参数");
        return;
      }
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: config.timelineTitle,
          link: config.link,
          imgUrl: config.imgUrl,
          success: function () {
            if (successCb instanceof Function) {
              successCb();
            }
          },
          cancel: function () {
            if (cancelCb instanceof Function) {
              cancelCb();
            }
          }
        });
        wx.onMenuShareAppMessage({
          title: config.appmessageTitle,
          desc: config.appmessageDesc,
          link: config.link,
          imgUrl: config.imgUrl,
          success: function () {
            if (successCb instanceof Function) {
              successCb();
            }
          },
          cancel: function () {
            if (cancelCb instanceof Function) {
              cancelCb();
            }
          }
        });
      });
    }

    /**
     * 分享发送给朋友
     * {
     *    appmessageTitle:'',
     *    appmessageDesc:'',
     *    link:'',
     *    imgUrl:''
     *  }
     * @param config
     * @param successCb
     * @param cancelCb
     */
    proto.shareFriend = function (config, successCb, cancelCb) {
      if (!config) {
        console.error("wechat.share缺少config参数");
        return;
      }
      wx.ready(function () {
        wx.onMenuShareAppMessage({
          title: config.appmessageTitle,
          desc: config.appmessageDesc,
          link: config.link,
          imgUrl: config.imgUrl,
          success: function () {
            if (successCb instanceof Function) {
              successCb();
            }
          },
          cancel: function () {
            if (cancelCb instanceof Function) {
              cancelCb();
            }
          }
        });
      });
    }

    /**
     * 分享到朋友圈
     * {
     *    timelineTitle:'',
     *    link:'',
     *    imgUrl:''
     *  }
     * @param config
     * @param successCb
     * @param cancelCb
     */
    proto.shareTimeline = function (config, successCb, cancelCb) {
      if (!config) {
        console.error("wechat.share缺少config参数");
        return;
      }
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: config.timelineTitle,
          link: config.link,
          imgUrl: config.imgUrl,
          success: function () {
            if (successCb instanceof Function) {
              successCb();
            }
          },
          cancel: function () {
            if (cancelCb instanceof Function) {
              cancelCb();
            }
          }
        });
      });
    }

    /**
     * 获取二维码
     */
    proto.getQrcode = function (param, cb) {
      this.ajax({
        type: "POST",
        url: host + "/api/qrcode",
        data: JSON.stringify({
          data: {
            'action_name':
            'QR_LIMIT_STR_SCENE',
            'action_info': { 'scene': { 'scene_str': param } }
          },
          appid: this.appid
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
          this.successCallback(res, cb);
        }.bind(this)
      });
    }

    /*
     * 返回用户Openid
     * */
    proto.getOpenid = function (cb) {
      var code = this.getQuery('code');
      if (!code) {
        console.error("wechat.getOpenid 缺少code");
        return;
      }
      this.ajax({
        type: "POST",
        url: host + "/web/openid",
        data: JSON.stringify({
          appid: this.appid,
          code: code
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
          this.successCallback(res, cb);
        }.bind(this)
      });
    }

    /*
     * 返回用户userInfo
     * */
    proto.getUserInfo = function (cb) {
      var code = this.getQuery('code');
      if (!code) {
        console.error("wechat.getUserInfo 缺少code");
        return;
      }
      this.ajax({
        type: "POST",
        url: host + "/web/user_info",
        data: JSON.stringify({
          appid: this.appid,
          code: code
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
          this.successCallback(res, cb);
        }.bind(this)
      });
    }

    /*
     * 获取用户是否关注
     * */
    proto.getSubscribe = function (openid, cb) {
      if (!openid) {
        console.error("wechat.getSubscribe 缺少openid");
        return;
      }
      this.ajax({
        type: "POST",
        url: host + "/web/subscribe",
        data: JSON.stringify({
          appid: this.appid,
          openid: openid
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
          this.successCallback(res, cb);
        }.bind(this)
      });
    }

    /*
     * 获取query参数
     * */
    proto.getQuery = function (queryName) {
      var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
      var r = location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }

    /*
     * 成功回调
     * */
    proto.successCallback = function (res, cb) {
      if (cb instanceof Function) {
        if (res.code !== 0) {
          cb(res);
        } else {
          cb(null, res.data);
        }
      }
    }

    /*
     * 过滤部分参数
     * */
    proto.filter = function (params, newParams) {
      params = params || [];
      newParams = newParams || {};
      var search = window.location.search;
      search = search.substr(1, search.length);
      var queryArr = search.split('&');
      var query = {};
      for (var i = 0; i < queryArr.length; i++) {
        if (queryArr[i].length > 0) {
          var temp = queryArr[i].split('=');
          query[temp[0]] = temp[1];
        }
      }
      var newSearch = '';
      // Object.assign(query, newParams);
      for (var key in newParams) {
        query[key] = newParams[key];
      }
      for (var key in query) {
        if (params.indexOf(key) !== -1) {
          continue;
        }
        newSearch = newSearch + key + '=' + query[key] + '&';
      }
      newSearch = newSearch.replace(/&{1}$/, '');

      if (newSearch.length > 0) newSearch = '?' + newSearch;
      var href = location.origin + location.pathname + newSearch + location.hash;
      return href;
    }

    /*
     * 原生ajax
     * */
    proto.ajax = function (config) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open(config.type || 'GET', config.url, true);
      if (config.contentType) {
        xmlhttp.setRequestHeader("Content-Type", config.contentType);
      }
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status >= 200 && xmlhttp.status <= 299) {
          var responseText = xmlhttp.responseText;
          if (config.dataType == 'json') {
            try {
              responseText = JSON.parse(xmlhttp.responseText);
            }
            catch (e) {
              if (config.error instanceof Function) {
                config.error(xmlhttp, xmlhttp.status, e);
                return;
              }
              throw e;
            }
          }
          if (config.success instanceof Function) {
            config.success(responseText);
          }
          return;
        } else if (xmlhttp.readyState == 4 && xmlhttp.status >= 400 && xmlhttp.status <= 599) {
          if (config.error instanceof Function) {
            config.error(xmlhttp, xmlhttp.status, xmlhttp.responseText);
            return;
          }
          throw xmlhttp;
        }
      }
      xmlhttp.send(config.data || '');
    }
    return wechat;
  })();

  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = myModule;
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function () {
      return myModule;
    });
  } else {
    window[moduleName] = myModule;
  }
})()
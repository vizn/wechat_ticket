var apiPath = require('./config/apiPath')

//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.getUserInfo({
    //   withCredentials: false,
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (e) {
    //     console.log(e)
    //   }
    // })
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       console.log(res.code)
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //         },
    //         fail: function(e) {
    //           console.log(e)
    //         }
    //       })
    //       // //发起网络请求
    //       // wx.request({
    //       //   url: 'https://test.com/onLogin',
    //       //   data: {
    //       //     code: res.code
    //       //   }
    //       // })
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
  },

  getUserInfo: function(cb) {
    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: apiPath.GETOPENID,
            method: 'POST',
            data: JSON.stringify(res),
            success: function(json){
              console.log(json)
              if (!that.globalData.openId){
                that.globalData.openId = json.data.openid
              }
              if (that.globalData.userInfo) {
                that.globalData.userInfo.openId = that.globalData.openId
                typeof cb == "function" && cb(that.globalData.userInfo)
              } else {
                wx.getUserInfo({
                  withCredentials: false,
                  success: function (r) {
                    that.globalData.userInfo = r.userInfo
                    that.globalData.userInfo.openId = that.globalData.openId
                    console.log(that.globalData.userInfo)
                    typeof cb == "function" && cb(that.globalData.userInfo)
                  }
                })
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  globalData: {
    userInfo: null
  }
})

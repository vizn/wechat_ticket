var apiPath = require('./config/apiPath')

//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: apiPath.GETTOKEN,
            method: 'POST',
            data: JSON.stringify(res),
            success: function(json){
              wx.setStorageSync('token', json.data.token)
              if (that.globalData.userInfo) {
                typeof cb == "function" && cb(that.globalData.userInfo)
              } else {
                wx.getUserInfo({
                  withCredentials: false,
                  success: function (r) {
                    that.globalData.userInfo = r.userInfo
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

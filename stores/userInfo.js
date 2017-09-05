var extendObservable = require('../libs/mobx').extendObservable;
var apiPath = require('../config/apiPath')
var {formatTime} = require('../utils/tool')


//获取应用实例
var app = getApp()

var userInfo = function(){
  extendObservable(this,{
    title: '我的预约',
    data: {},
    order: []
  })
  this.receive = function(){
    var that = this
    app.getUserInfo(function (userInfo) {
      that.data = userInfo
    })
  }
  this.changeTitle = function(){
    this.title = this.data.nickName
  }
  this.getUserOrder = function(){
    var that = this
    wx.request({
      url: apiPath.GETUSERORDER,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token') || []}`,
        'Content-Type': 'application/json'
      },
      success:function(json){
        if(json.statusCode == 200){
          that.order = json.data
        }
      },
      fail:function(e){
        console.log(e)
      }
    })
  }
}

module.exports = {
  default: new userInfo
}

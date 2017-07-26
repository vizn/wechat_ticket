var extendObservable = require('../libs/mobx').extendObservable;

//获取应用实例
var app = getApp()

var userInfo = function(){
  extendObservable(this,{
    title: '火车余票查询',
    data: {}
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
}

module.exports = {
  default: new userInfo
}

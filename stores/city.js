var extendObservable = require('../libs/mobx').extendObservable
var apiPath = require('../config/apiPath')

var cityInfo = function () {
  extendObservable(this, {
    hotCity: [{key:1,name:1}],
    allCity: '',
    historyCity: '',
    linkCity: '',
    type:''
  })

  this.receiveHotCity = function () {
    var that = this
    wx.request({
      url: apiPath.HOTCITY,
      method: 'GET',
      header: {
          'content-type': 'application/json'
      },
      success:function(json){
        if(json.statusCode == 200){
          that.hotCity = json.data
        }
      },
      fail:function(e){
        console.log(e)
      }
    })
  }
  this.receiveAllCity = function (data) {
    this.allCity = data
  }
  this.receiveHistoryCity = function (data) {
    this.historyCity = data
  }
  this.receiveLinkCity = function (data) {
    console.log(data)
  }
  this.receiveType = function (data) {
    this.type = data
  }
}

module.exports = {
  default: new cityInfo
}

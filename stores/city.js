var extendObservable = require('../libs/mobx').extendObservable
var apiPath = require('../config/apiPath')

var cityInfo = function () {
  extendObservable(this, {
    hotCity: [],
    allCity: [],
    get historyCity(){
      return wx.getStorageSync('city') || []
    },
    linkCity: '',
    searchCity: [],
    type:'',
    index: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  })
  this.initSearchCity = function (val){
    this.searchCity = []
  }
  this.getSearchCity = function (val) {
    this.searchCity = []
    if(val.length > 1){
      for (var i = 0; i<this.allCity.length; i++) {
        if (this.allCity[i].cityName.indexOf(val) > -1) {
          this.searchCity.push(this.allCity[i])
        }
        if (this.allCity[i].cityCode.indexOf(val) > -1) {
          this.searchCity.push(this.allCity[i])
        }
      }
    }
  }

  this.receiveHotCity = function () {
    var that = this
    if (wx.getStorageSync('hotCity')){
      that.hotCity = wx.getStorageSync('hotCity')
    }else{
      wx.request({
        url: apiPath.HOTCITY,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (json) {
          if (json.statusCode == 200) {
            that.hotCity = json.data
            wx.setStorageSync('hotCity', that.hotCity)
          }
        },
        fail: function (e) {
          console.log(e)
        }
      })
    }
  }
  this.receiveAllCity = function () {
    var that = this
    if (wx.getStorageSync('allCity')) {
      that.allCity = wx.getStorageSync('allCity')
    } else {
      wx.request({
        url: apiPath.ALLCITY,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (json) {
          if (json.statusCode == 200) {
            that.allCity = json.data
            wx.setStorageSync('allCity', that.allCity)
          }        
        },
        fail: function (e) {
          console.log(e)       
        }
      })
    }
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

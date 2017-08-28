var extendObservable = require('../libs/mobx').extendObservable
var {formatDate} = require('../utils/tool')
var apiPath = require('../config/apiPath')

var date = new Date()
var searchInfo = function(){
  extendObservable(this, {
    startCity: '',
    endCity: '',
    date: formatDate(date),
    startDate: formatDate(date),
    endDate: formatDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()+29)),
    trainInfos: ''
  })
  this.changeCity = function(){
    var oldCity = this.startCity
    this.startCity = this.endCity
    this.endCity = oldCity
  }
  this.setStorageCity = function(data){
    var city = wx.getStorageSync('city') || []
    var init = 1
    //判断storage是否存在所选city
    for (var i = 0; i < city.length; i++){
      if (city[i].cityCode == data[1]){
        init = 0
      }
    }
    if(init){
      if(city.length >7){
        city.pop()
      }
      city.unshift({ cityName: data[0], cityCode: data[1] })
      wx.setStorageSync('city', city)
    }
  }
  this.receiveDate = function(value){
    this.date = value
  }
  this.receiveStartCity = function(data){
    this.startCity = data.split('^')
    this.setStorageCity(this.startCity) 
  }
  this.receiveEndCity = function(data){
    this.endCity = data.split('^')
    this.setStorageCity(this.endCity) 
  }
  this.changeSeatStatus = function(key){
    if(this.trainInfos[key].seatStatus == 0){
      this.trainInfos[key].seatStatus = 1
    }else{
      this.trainInfos[key].seatStatus = 0
    }
  }
  this.getTrainInfos = function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: apiPath.TRAININFOS,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        startCityCode: that.startCity[1],
        date: that.date,
        endCityCode: that.endCity[1]
      }),
      success:function(json){
        if(json.statusCode == 200){
          var data = json.data.data.trainInfos
          if (data){
            for (var i = 0; i < data.length; i++) {
              data[i].seatStatus = 0
            }
          }
          that.trainInfos = data
          wx.hideLoading()
          wx.navigateTo({
            url: 'list'
          })
        }
      },
      fail:function(e){
        wx.hideLoading()
        console.log(e)
      }
    })
  }
  this.addTrainInfo = function(data) {
    var that = this
    data.trainDate = that.date
    data.startCity = that.startCity[0]
    data.startCityCode = that.startCity[1]
    data.endCity = that.endCity[0]
    data.endCityCode = that.endCity[1]
    wx.showLoading({
      title: '预约中',
    })
    wx.request({ 
      url: apiPath.ADDTRAININFO,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(data),
      success: function (json) {
        wx.hideLoading()
        if (json.statusCode == 200 && json.data.success) {
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '预约失败，请稍后再试',
            image: 'images/fail.png',
            duration: 2000
          })
        }
      },
      fail: function(e) {
        wx.hideLoading()
        console.log(e)
        wx.showToast({
          title: e.message,
          image: 'images/fail.png',
          duration: 2000
        })
      }
    })
  }
}

module.exports = {
  default: new searchInfo
}

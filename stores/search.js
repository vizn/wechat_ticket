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
    trainInfos: '',
  })

  this.receiveDate = function(data){
    this.date = data
  }
  this.receiveStartCity = function(data){
    this.startCity = data.split('^')
  }
  this.receiveEndCity = function(data){
    this.endCity = data.split('^')
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
      data: {
        startCityCode: that.startCity[1],
        date: that.date,
        endCityCode: that.endCity[1]
      },
      success:function(json){
        if(json.statusCode == 200){
          console.log(json.data.data.trainInfos)
          that.trainInfos = json.data.data.trainInfos
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
}

module.exports = {
  default: new searchInfo
}

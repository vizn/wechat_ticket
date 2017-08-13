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

  this.receiveDate = function(data){
    this.date = data
  }
  this.receiveStartCity = function(data){
    this.startCity = data.split('^')
  }
  this.receiveEndCity = function(data){
    this.endCity = data.split('^')
  }
  this.changeSeatStatus = function(key){
    console.log(key)
    // console.log(this.trainInfos[key])
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
              var count = 0
              for (var j = 0; j < data[i].seatList.length; j++) {
                count += parseInt(data[i].seatList[j].seatNum)
              }
              data[i].seatSum = count
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
}

module.exports = {
  default: new searchInfo
}

var extendObservable = require('../libs/mobx').extendObservable
var {formatDate} = require('../utils/tool')

var date = new Date()
var searchInfo = function(){
  extendObservable(this, {
    startCity: '',
    endCity: '',
    date: formatDate(date),
    startDate: formatDate(date),
    endDate: formatDate(new Date(date.getFullYear(),date.getMonth(),date.getDate()+29))
  })

  this.receiveDate = function(data){
    this.date = data
  }
  this.receiveStartCity = function(data){
    this.startCity = data
  }
  this.receiveEndCity = function(data){
    this.endCity = data
  }
  this.getTicket = function(){
    console.log(this)
  }
}

module.exports = {
  default: new searchInfo
}

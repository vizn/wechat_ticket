//index.js
var observer = require('../../libs/observer').observer;
var Toast = require('../../components/toast/index')

Page(observer(Object.assign({}, Toast, {
  props: {
    searchInfo: require('../../stores/search.js').default,
  },
  bindDateChange: function(e) {
    this.props.searchInfo.receiveDate(e.detail.value)
  },
  bindStartCityHandle: function(e){
    // wx.navipateTo({
    //   url: '../city/index?type=start'
    // })
    // this.props.searchInfo.receiveStartCity(e.detail.value)
  },
  bindEndCityHandle: function(e){
    // wx.navipateTo({
    //   url: '../city/index?type=end'
    // })
    // this.props.searchInfo.receiveEndCity(e.detail.value)
  },
  formSubmit: function (e) {
    this.props.searchInfo.getTicket()
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})))

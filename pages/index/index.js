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
  bindStartHandle: function() {
    wx.navigateTo({url: "/pages/city/index?type=start"})
  },
  bindEndHandle: function() {
    wx.navigateTo({url: "/pages/city/index?type=end"})
  },
  formSubmit: function (e) {
    if(!this.props.searchInfo.startCity){
      this.showZanToast('请选择出发站')
      return
    }
    if(!this.props.searchInfo.endCity){
      this.showZanToast('请选择到达站')
      return
    }
    //查询车次信息
    this.props.searchInfo.getTrainInfos()
  }
})))

//index.js
var observer = require('../../libs/observer').observer;
var Toast = require('../../components/toast/index')

Page(observer(Object.assign({}, Toast, {
  props: {
    searchInfo: require('../../stores/search.js').default,
  },
  bindChangeCity: function(){
    this.props.searchInfo.changeCity()
  },
  bindDateChange: function(e) {
    this.props.searchInfo.receiveDate(e.detail.value)
  },
  bindStartHandle: function() {
    wx.navigateTo({
      url: "/pages/city/index?type=start"
    })
  },
  bindEndHandle: function() {
    wx.navigateTo({
      url: "/pages/city/index?type=end"
    })
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
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    var that = this
    return {
      title: '火车票查询|预约余票提醒',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        that.showZanToast('转发成功')
      },
      fail: function (res) {
        // 转发失败
        that.showZanToast('转发失败')
      }
    }
  }
})))

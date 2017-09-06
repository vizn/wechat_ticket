
//index.js
var observer = require('../../libs/observer').observer;
var Toast = require('../../components/toast/index')

Page(observer(Object.assign({}, Toast, {
  props: {
    searchInfo: require('../../stores/search.js').default,
    userInfo: require('../../stores/userInfo.js').default
  },
  bindChangeSeatStatus: function(e){
    if (e.target.id){
      this.props.searchInfo.changeSeatStatus(parseInt(e.target.id))
    }
  },
  bindAddTrainInfo: function(e){
    var data = e.detail.value
    data.formId = e.detail.formId
    this.props.searchInfo.addTrainInfo(data)
  },
  onLoad: function(){
    this.props.userInfo.receive()
    wx.setNavigationBarTitle({
      title: this.props.searchInfo.startCity[0] + "-" + this.props.searchInfo.endCity[0]
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#6ed458',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }
})))

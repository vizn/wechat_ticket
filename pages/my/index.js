//my.js
var observer = require('../../libs/observer').observer;
var Toast = require('../../components/toast/index')

Page(observer(Object.assign({}, Toast, {
  props: {
    userInfo: require('../../stores/userInfo').default
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    // this.showZanToast('AA')
    this.props.userInfo.changeTitle()
  },
  onLoad: function () {
    this.props.userInfo.receive()
  }
})))

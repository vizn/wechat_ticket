//index.js
var observer = require('../../libs/observer').observer;
var Toast = require('../../components/toast/index')

Page(observer(Object.assign({}, Toast, {
  props: {
    searchInfo: require('../../stores/search.js').default,
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: "北京-太原"
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#22ca92',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }
})))

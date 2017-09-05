//城市选择器
var observer = require('../../libs/observer').observer;

Page(observer({
  props: {
    cityInfo: require('../../stores/city.js').default,
    searchInfo: require('../../stores/search.js').default
  },
  bindDateSelect: function (e) {
    wx.navigateBack()
    if(this.props.cityInfo.type == 'start'){
      this.props.searchInfo.receiveStartCity(e.target.id)
    }
    if (this.props.cityInfo.type == 'end') {
      this.props.searchInfo.receiveEndCity(e.target.id)
    }
  },
  searchCity: function(event){
    this.props.cityInfo.getSearchCity(event.detail.value)
  },
  onLoad: function (option) {
    // wx.showLoading({
    //   title: '加载中'
    // })
    this.props.cityInfo.receiveHotCity()
    this.props.cityInfo.receiveAllCity()
    //获取选择始发或终点
    this.props.cityInfo.receiveType(option.type)
  }
  // onReady: function (){
  //   wx.hideLoading()
  // }
}))

//城市选择器
var observer = require('../../libs/observer').observer;

Page(observer({
  props: {
    cityInfo: require('../../stores/city.js').default,
    searchInfo: require('../../stores/search.js').default
  },
  bindDateSelect: function (data) {
    if(this.props.cityInfo.type == 'start'){
      this.props.searchInfo.receiveStartCity(data.detail.value.input)
    }
    if (this.props.cityInfo.type == 'end') {
      this.props.searchInfo.receiveEndCity(data.detail.value.input)
    }
  },
  onLoad: function (option) {
    this.props.cityInfo.receiveHotCity()
    //获取选择始发或终点
    this.props.cityInfo.receiveType(option.type)

    // console.log(option.type)
  }
}))

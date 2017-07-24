//城市选择器
var observer = require('../../libs/observer').observer;

Page(observer({
  props: {
    cityInfo: require('../../stores/city.js').default,
  },
  bindDateChange: function (e) {
    this.props.cityInfo.receiveDate(e.detail.value)
  },
  onLoad: function (option) {
    console.log(option.type)
  }
}))

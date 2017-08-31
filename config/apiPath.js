
// const env = 'development';
const env = 'production'
const host = env == "development" ? 'http://127.0.0.1:3000/ticket/v1/' : 'https://api.vizn.cn/ticket/v1/'

module.exports = {
  TRAININFOS: host + 'search',
  HOTCITY: host + 'hotcity',
  ALLCITY: host + 'allcity',
  ADDTRAININFO: host + 'addTrainInfo',
  GETTOKEN: env == "development" ? 'http://127.0.0.1:3000/auth/wechat' : 'https://api.vizn.cn/auth/wechat'
}

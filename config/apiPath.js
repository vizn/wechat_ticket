
const env = 'pro';
const host = env == "development" ? 'http://127.0.0.1:3001/ticket/v1/' :'https://api.vizn.cn/ticket/v1/'
module.exports = {
  TRAININFOS: host + 'search',
  HOTCITY: host + 'hotcity',
  ALLCITY: host + 'allcity',
  ADDTRAININFO: host + 'addTrainInfo',
  GETOPENID: host + 'getOpenId'
}


const env = 'development';
const host = env == "development"?'http://127.0.0.1:3000/':'https://api.vizn.cn/'
module.exports = {
  TRAININFOS: host + 'search',
  HOTCITY: host + 'hotCity',
  ALLCITY: host + 'allCity'
}

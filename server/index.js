const koa = require("koa")
const app = new koa()
const request = require('request')
const path = require('path')
const json = require('koa-json')
const port = process.env.port || 3000

app.use(json())
app.use((ctx) => {
  // const url = 'http://api.12306.com/v1/train/trainInfos?arrStationCode=TYV&deptDate=2017-07-25&deptStationCode=BJP&findGD=false'
  // const url = path.resolve(__dirname, 'json/hotcity.json')
  // let data = 'Holle World'
  // const response =  await request(url)
  ctx.body = require('./json/hotcity.js')
  // console.log(response)
})

console.log(`\n==> 🌎  Listening on port ${port}. Open up http://127.0.0.1:${port}/ in your browser.\n`)
app.listen(port)

const cheerio = require('cheerio')
const fs = require('fs')
const $ = cheerio.load(require('./json/allcity.json'))
const $hot = cheerio.load(require('./json/hotcity.json'))
const data = []

$hot('li').map((i, elem) => {
  if($(elem).attr('title')){
  data.push('{cityCode:"'+$(elem).attr('title')+'", cityName:"'+$(elem).attr('data')+'", cityIndex:"'+$(elem).attr('data').substr(0,1)+'"}')
  }
})


// fs.appendFile('server/hotcity.json', '['+data+']', (err) => {
//   if (err) throw err;
// });
$('li').map((i, elem) => {
  if($(elem).attr('title')){
  data.push('{cityCode:"'+$(elem).attr('title')+'", cityName:"'+$(elem).attr('data')+'", cityIndex:"'+$(elem).attr('data').substr(0,1)+'"}')
  }
})
console.log(data)
//
// fs.appendFile('server/allcity.json', '['+data+']', (err) => {
//   if (err) throw err;
//   console.log('The data was appended to file!');
// });

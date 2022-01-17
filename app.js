const express = require('express')
const app = express()
app.use(express.json())

const fs = require('fs');
const iconv = require('iconv-lite');
const {parse} = require('csv-parse/sync');

app.get('/', function (req, res) {
  code = req.query.code;
  console.log("郵便番号:"+code +"で検索")
  // csvファイルの内容を読み込み
  const rawData = fs.readFileSync('38EHIME.CSV');
  const data = iconv.decode(rawData, 'ms932');
  // csvファイルをパース
  const records = parse(data);
  // 結果の表示
  for (const record of records) {
    if(record[2] == code){
      console.log(record);
      res.jsonp(record[6]+record[7]+record[8]);
    }
  }
})

app.listen(3000, () => console.log('App listening on port 3000!'))
var express = require('express');
var app = express();
const path = require('path');

const csv=require('csvtojson')

var data = [];

csv()
.fromFile('./data.csv')
.then((jsonObj)=>{
    data = jsonObj
})

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'EnergyConversion', data: data })
  })

app.get('/results', (req, res) => {
  const testdata = {'number': 200, 'var': 'Watt'}

  res.render('results', {results: testdata})
})

app.listen(3000);
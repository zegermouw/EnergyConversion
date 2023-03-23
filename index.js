var express = require('express');
var app = express();
const path = require('path');

const csv=require('csvtojson')
var bodyParser = require('body-parser');
const { callbackify } = require('util');
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

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
app.post('/submit-form', (req, res) => {
  var body = req.body;
  var amount = req.body.amount;
  var energyType = req.body.energyType
  var energyTypeReq = req.body.energyTypeReq
  res.redirect(`/results/${amount}/${energyType}/${energyTypeReq}`)  
})
app.get('/results/:amount/:energyType/:energyTypeReq', (req, res) => {
  function calulateTo(amount, energyType, energyTypeReq) {
    var indexes = {"Joules": 0, "KWh": 1, 'BarrelsOil': 2, 'calorie': 3, "Uranium": 4, "Coal": 5, "Firewood": 6}
    var energyTypeIndex = indexes[energyType]
    var energyTypeReqIndex = indexes[energyTypeReq]
    var convArr = 
    [[1,3.6e6, 6383087908.4,4.18, 3.9e12, 2.4e7, 1.6e7],
     [2.77e-7,1]]
    var val = convArr[energyTypeReqIndex][energyTypeIndex]
    return val
  }

  var amount = req.params.amount
  var energyType = req.params.energyType
  var energyTypeReq = req.params.energyTypeReq
  var val = calulateTo(amount, energyType, energyTypeReq)
  const testdata = {'number': (amount* val), 'var': energyTypeReq}
  res.render('results', {results: testdata})
})

app.listen(3000);


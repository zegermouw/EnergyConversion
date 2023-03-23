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
    var convArr = {"Joules": 1, "KWh": 3.6e6, 'Barrels of Oil': 6383087908.4, 'Calories': 4.18, "Kg of Uranium": 3.9e12, "Kg of Coal": 2.4e7, "Kg of Firewood": 1.6e7}
    var val = amount * convArr[energyType] / convArr[energyTypeReq]
    return val
  }

  var amount = req.params.amount
  var energyType = req.params.energyType
  var energyTypeReq = req.params.energyTypeReq
  var val = calulateTo(amount, energyType, energyTypeReq)
  const testdata = {'number': val, 'var': energyTypeReq}
  res.render('results', {results: testdata})
})

app.listen(3000);


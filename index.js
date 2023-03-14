var express = require('express');
var app = express();

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  })

app.listen(3000);
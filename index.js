var express = require('express');
var app = express();
const path = require('path');

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Energy converter', message: 'Hello there!' })
  })

app.listen(3000);

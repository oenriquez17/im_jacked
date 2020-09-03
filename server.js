const express = require('express');
const app = express();
const port = 3000;

const db = require('./configuration/db_conn');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/ajax', express.static(__dirname + '/node_modules/ajax/lib'));
app.use('/data', express.static(__dirname + '/data'));

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get('/', function(req, res) {
  res.render('navbar');
});

app.get('/workoutentry', function(req, res) {
  res.render('workoutentry');
});

app.get('/exercise', function(req, res) {
  res.render('exercise');
});
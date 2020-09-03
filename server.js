const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// create db connection
var db = require('./configuration/db_conn');

// create url-encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// configure file locations
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/ajax', express.static(__dirname + '/node_modules/ajax/lib'));
app.use('/data', express.static(__dirname + '/data'));

// configure engine to use ejs
app.set('view engine', 'ejs');

// start app
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

app.post('/add_edit_exercise', urlencodedParser, function (req, res) {
  console.log("Name: " + req.body.exercise);
  console.log("Muscle: " + req.body.muscle);
  res.send('POST request to the homepage');
});
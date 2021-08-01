const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// create db connection
var db = require('./configuration/db_conn');
var queries = require('./queries/queries');

// create url-encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// configure file locations
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/ajax', express.static(__dirname + '/node_modules/ajax/lib'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/chartjs', express.static(__dirname + '/node_modules/chart.js/dist'));
app.use('/images', express.static(__dirname + '/images'));

// configure engine to use ejs
app.set('view engine', 'ejs');

// start app
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get('/', async function(req, res) {
  const exercise_details = await db.pool.query(queries.get_exercise_details);
  res.render('index', {details: exercise_details.rows});
});

app.get('/workoutentry', async function(req, res) {
  const id = req.query.id;
  const exercise_id = req.query.exerciseid;

  if(id) {
    const db_workout_entry = await db.pool.query(queries.get_workoutentry_byid, [id]);
    res.render('workoutentry', {exercises: [], exercise_id: undefined, entries: db_workout_entry.rows[0]}); 
  } else {
    const db_exercises = await db.pool.query(queries.get_all_exercise);
    res.render('workoutentry', {exercises: db_exercises.rows, exercise_id: exercise_id, entries: []});
  }
});

app.get('/exercise', function(req, res) {
  res.render('exercise');
});

app.get('/detailprogress', async function(req, res) {
  const id = req.query.id;
  const db_exercises = await db.pool.query(queries.get_all_exercise);
  res.render('detailprogress', {exercises: db_exercises.rows, id: id});
});

app.get('/allworkoutentries', async function(req, res) {  
  var today = new Date();
  
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  db_today = yyyy + '-' + mm + '-' + dd;
  
  const db_workout_entries = await db.pool.query(queries.get_workoutentries_bydate, [db_today]);
  res.render('allworkoutentries', {workout_entries: db_workout_entries.rows, db_date: db_today});
});

app.get('/workoutentrybydate', async function(req, res) {
  var db_date = req.query.newdate;
  const db_workout_entries = await db.pool.query(queries.get_workoutentries_bydate, [db_date]);
  
  res.setHeader('Content-Type', 'application/json');
  res.json(db_workout_entries.rows);
});

app.get('/filterbyexercise', async function(req, res) {
  var exercise = req.query.exercise;
  const filter = await db.pool.query(queries.get_exerciseprogress_details, [exercise]);
  
  res.setHeader('Content-Type', 'application/json');
  res.json(filter.rows);
});

app.post('/add_edit_exercise', urlencodedParser, async function (req, res) {
  const r = res;
  var exercise_name =  req.body.exercise;
  var muscle_worked =  req.body.muscle;
  
  db.pool.query(queries.insert_exercise, [exercise_name, muscle_worked],
    (err, res) => {
      if(err){
        r.render('exercise', {error: 'Exercise name already exists.'})
      }else{
        r.redirect('/');
      }
    }  
  );
});

app.post('/add_edit_workoutentry', urlencodedParser, async function (req, res) {
  const r = res;
  
  const date =  req.body.workoutdate;
  const exercise =  req.body.exercise;
  const id = req.body.entry_id;
  
  var reps = req.body.reps == "" ? null : parseInt(req.body.reps);
  var weight = req.body.weight == "" ? null : parseInt(req.body.weight);
  var notes = req.body.notes == "" ? null : req.body.notes;
  
  if(id) {
    db.pool.query(queries.update_workout_entry, [reps, weight, notes, id],
      (err, res) => {
        if(err) {
          r.render('workoutentry', {error: err, exercises: {}, exercise_id: {}, entries: []});
        } else {
          r.redirect('/detailprogress?id=' + exercise);
        }
      }
    );
  } else {
    db.pool.query(queries.insert_workout_entry, [date, exercise, reps, weight, notes],
      (err, res) => {
        if(err) {
          r.render('workoutentry', {error: err, exercises: {}, exercise_id: {}, entries: []});
        } else {
          r.redirect('/detailprogress?id=' + exercise);
        }
      }
    );
  }
});
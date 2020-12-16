// Exercise queries

//Insert new exercise into table
const insert_exercise = 'INSERT INTO exercises(name, muscle_worked) VALUES($1, $2)';

//Insert new workout entry into table
const insert_workout_entry = 'INSERT INTO workout_entries(entry_date, exercise, reps_completed, sets_completed, weight) VALUES($1, $2, $3, $4, $5)';

//Selects all exercises, ordered by NAME
const get_all_exercise = 'SELECT * FROM exercises ORDER BY name';

//Selects all exercises, which muscles get worked, and Max/Min weight
const get_exercise_details = 'SELECT e.Id, e.name AS name, e.muscle_worked as muscle, MAX(w.weight) AS max, MIN(w.weight) AS min FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise GROUP BY e.Id ORDER BY name';

//Selects all workout entries to show detailed progress
const get_exerciseprogress_details = "SELECT w.weight, w.reps_completed, w.sets_completed, TO_CHAR(w.entry_date, 'YYYY-MM-DD') AS entry_date FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE e.Id = $1 ORDER BY entry_date DESC";

//Selects all workout entries by date (all exercises for single date)
const get_workoutentries_bydate = "SELECT w.*, e.* FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE entry_date = $1 ORDER BY w.Id";

module.exports = 
    {insert_exercise,
    insert_workout_entry,
    get_all_exercise,
    get_exercise_details,
    get_exerciseprogress_details,
    get_workoutentries_bydate};
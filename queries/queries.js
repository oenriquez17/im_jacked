// Exercise queries

//Insert new exercise into table
const insert_exercise = 'INSERT INTO exercises(name, muscle_worked) VALUES($1, $2)';

//Insert new workout entry into table
const insert_workout_entry = 'INSERT INTO workout_entries(entry_date, exercise, reps_completed, weight, notes, failure) VALUES($1, $2, $3, $4, $5, $6)';

//Updates workout_entry
const update_workout_entry = 'UPDATE workout_entries SET reps_completed = $1, weight = $2, notes = $3, failure = $4 WHERE id = $5';

//Selects all exercises, ordered by NAME
const get_all_exercise = 'SELECT * FROM exercises ORDER BY name';

//Updates exercise note
const update_exercise_note = 'UPDATE exercises SET exercise_notes = $1 WHERE id = $2';

//Selects all exercises, ordered by NAME
const get_workoutentry_byid = "SELECT w.id, TO_CHAR(w.entry_date, 'YYYY-MM-DD') AS entry_date, w.reps_completed, w.weight, w.notes, w.exercise, w.failure, e.name AS exercise_name FROM workout_entries w LEFT JOIN exercises e ON e.id = w.exercise WHERE w.id = $1";

//Selects all exercises, which muscles get worked, and Max/Min weight
const get_exercise_details = "SELECT e.Id, e.name AS name, e.muscle_worked as muscle, CASE WHEN e.name = 'Assisted Pullups' THEN MIN(w.weight) ELSE MAX(w.weight) END AS max, MAX(w.entry_date) as latest_entry_date FROM workout_entries w RIGHT JOIN exercises e ON e.Id = w.exercise GROUP BY e.Id ORDER BY name";

//Selects all workout entries to show detailed progress
const get_exerciseprogress_details = "SELECT w.weight, w.reps_completed, w.entry_date AS entry_date, w.notes AS notes, w.failure AS failure FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE e.Id = $1 ORDER BY entry_date DESC";

//Selects all workout entries by date (all exercises for single date)
const get_workoutentries_bydate = "SELECT w.id, w.entry_date, w.exercise, w.weight, w.reps_completed, w.failure, e.id AS exercise, e.name AS name, e.muscle_worked AS muscle_worked FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE entry_date = $1 ORDER BY w.Id";

module.exports = 
    {insert_exercise,
    insert_workout_entry,
    update_workout_entry,
    get_workoutentry_byid,
    get_all_exercise,
    update_exercise_note,
    get_exercise_details,
    get_exerciseprogress_details,
    get_workoutentries_bydate
};
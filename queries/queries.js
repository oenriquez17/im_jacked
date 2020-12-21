// Exercise queries

//Insert new exercise into table
const insert_exercise = 'INSERT INTO exercises(name, muscle_worked) VALUES($1, $2)';

//Insert new workout entry into table
const insert_workout_entry = 'INSERT INTO workout_entries(entry_date, exercise, reps_completed, sets_completed, weight) VALUES($1, $2, $3, $4, $5)';

//Selects all exercises, ordered by NAME
const get_all_exercise = 'SELECT * FROM exercises ORDER BY name';

//Selects all exercises, which muscles get worked, and Max/Min weight
const get_exercise_details = 'SELECT e.Id, e.name AS name, e.muscle_worked as muscle, MAX(w.weight) AS max, MIN(w.weight) AS min, CAST(AVG(w.reps_completed) AS DECIMAL(10,2)) as avg_reps FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise GROUP BY e.Id ORDER BY name';

//Selects all workout entries to show detailed progress
const get_exerciseprogress_details = "SELECT w.weight, w.reps_completed, w.sets_completed, w.entry_date AS entry_date FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE e.Id = $1 ORDER BY entry_date DESC";

//Selects all workout entries by date (all exercises for single date)
const get_workoutentries_bydate = "SELECT w.*, e.* FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE entry_date = $1 ORDER BY w.Id";

//Selects all workout entries between two given dates
const get_workoutentries_inweek = "SELECT w.*, e.* FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE entry_date >= $1 AND entry_date < $2 ORDER BY entry_date";

//Select week number from current date
const get_week_number = "SELECT EXTRACT(week FROM current_date) AS week_number";

//Selects first and last day of week (number)
const get_first_last_day = "SELECT TO_DATE($1, 'iyyyiw') AS first, TO_DATE($1, 'iyyyiw') + 6 AS last";

module.exports = 
    {insert_exercise,
    insert_workout_entry,
    get_all_exercise,
    get_exercise_details,
    get_exerciseprogress_details,
    get_workoutentries_bydate,
    get_workoutentries_inweek,
    get_week_number,
    get_first_last_day
};
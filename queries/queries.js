// Exercise queries

const insert_exercise = 'INSERT INTO exercises(name, muscle_worked, bodyweight) VALUES($1, $2, $3)';

const insert_workout_entry = 'INSERT INTO workout_entries(entry_date, exercise, reps_completed, weight) VALUES($1, $2, $3, $4)';

const get_all_exercise = 'SELECT * FROM exercises';

const get_weight_exercise_details = 'SELECT e.Name AS name, MAX(w.weight) AS max, MIN(w.weight) AS min FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE e.bodyweight = False GROUP BY name';

const get_exercises_detals_by_type = 'SELECT w.*, e.* FROM workout_entries w INNER JOIN exercises e ON e.Id = w.exercise WHERE e.muscle_worked = $1 ORDER BY entry_date';

module.exports = 
    {insert_exercise,
    insert_workout_entry,
    get_all_exercise,
    get_weight_exercise_details,
    get_exercises_detals_by_type};
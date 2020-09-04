// Exercise queries

const insert_exercise = 'INSERT INTO exercises(name, muscle_worked, bodyweight) VALUES($1, $2, $3)';

const insert_workout_entry = 'INSERT INTO workout_entries(entry_date, exercise, reps_completed, weight) VALUES($1, $2, $3, $4)';

const get_all_exercise = 'SELECT * FROM exercises';

const get_weight_exercise_details = 'SELECT w.exercise AS Id, e.Name AS Name, MAX(w.weight) AS max, MIN(w.weight) AS min FROM workout_entry w INNER JOIN exercises e ON e.Id = w.exercise WHERE e.bodyweight = False GROUP BY Id';

module.exports = 
    {insert_exercise,
    insert_workout_entry,
    get_all_exercise};
// Exercise queries

const insert_exercise = 'INSERT INTO exercises(name, muscle_worked, bodyweight) VALUES($1, $2, $3)';

const insert_workout_entry = 'INSERT INTO workout_entries(entry_date, exercise, sets_completed, reps_completed, weight) VALUES($1, $2, $3, $4, $5)';

const get_all_exercise = 'SELECT * FROM exercises';

const get_exercise_byname = 'SELECT * FROM exercises WHERE Name Like $1';

module.exports = 
    {insert_exercise,
    insert_workout_entry,
    get_all_exercise, 
    get_exercise_byname};
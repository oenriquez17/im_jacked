// Exercise queries

const insert_exercise = 'INSERT INTO exercises(name, muscle_worked, bodyweight) VALUES($1, $2, $3)';

const get_all_exercise = 'SELECT * FROM exercises';

const get_exercise_byname = 'SELECT * FROM exercises WHERE Name Like $1';

module.exports = {insert_exercise, get_all_exercise, get_exercise_byname};
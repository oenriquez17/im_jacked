--Drop database if exists
DROP DATABASE IF EXISTS dbjacked;

--Create database
CREATE DATABASE dbjacked;
\connect dbjacked

-- Create exercises table
CREATE TABLE exercises(
    ID SERIAL PRIMARY KEY,
    NAME TEXT NOT NULL,
    MUSCLE_WORKED TEXT,
    BODYWEIGHT BOOLEAN
);

CREATE UNIQUE INDEX ux_exercise_name ON exercises(UPPER(NAME));

-- Create workout entry table
CREATE TABLE workout_entries(
    ID SERIAL PRIMARY KEY,
    ENTRY_DATE DATE NOT NULL,
    EXERCISE INT NOT NULL,
    REPS_COMPLETED INT,
    WEIGHT INT,
    CONSTRAINT exercise_fk
        FOREIGN KEY(EXERCISE)
            REFERENCES exercises(ID)
);

CREATE UNIQUE INDEX ux_workout_entry_date ON workout_entries(ENTRY_DATE, EXERCISE);

-- Create workout routine table
CREATE TABLE workout_routine(
    DAY_OF_WEEK INT NOT NULL,
    MUSCLE_WORKED TEXT NOT NULL,
    PRIMARY KEY(DAY_OF_WEEK, MUSCLE_WORKED)
);
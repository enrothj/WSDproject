CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    date DATE,
    morning BOOLEAN NOT NULL,
    mood INTEGER NOT NULL check (mood between 1 and 5),
    
    user_id INTEGER REFERENCES users(id) NOT NULL,

    sleep_duration DECIMAL(4,2) check (sleep_duration between 0 and 30),
    sleep_quality DECIMAL(4,2) check (sleep_quality between 1 and 5),

    time_sport DECIMAL(4,2) check (time_sport between 0 and 24),
    time_study DECIMAL(4,2) check (time_study between 0 and 24),
    eating INTEGER check (eating between 1 and 5)
);

CREATE INDEX ON reports (date, user_id);
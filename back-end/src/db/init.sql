CREATE TABLE IF NOT EXISTS Users (
    id SERIAL CONSTRAINT user_id_pk PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_image BYTEA NOT NULL,
    gender VARCHAR(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS Clothes (
    cloth_id INT CONSTRAINT cloth_id_pk PRIMARY KEY ,
    cloth_owner_id INT NOT NULL REFERENCES Users(id),
    cloth_type VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    season VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS Looks (
    look_id INT CONSTRAINT look_id_pk PRIMARY KEY,
    look_owner_id INT NOT NULL REFERENCES Users(id),
    gender VARCHAR(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS Look_Clothes (
    cloth_id INT NOT NULL REFERENCES Clothes(cloth_id),
    look_id INT NOT NULL REFERENCES Looks(look_id),
    PRIMARY KEY (look_id, cloth_id)
);
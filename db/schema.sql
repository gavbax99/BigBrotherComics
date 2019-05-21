CREATE DATABASE first_db;

USE first_db;

CREATE TABLE players (
    id INTEGER NOT NULL AUTO_INCREMENT,
    char_name_token VARCHAR(200) NOT NULL DEFAULT "Joe",
    created TIMESTAMP NOT NULL DEFAULT current_timestamp,

    PRIMARY KEY (id)
);
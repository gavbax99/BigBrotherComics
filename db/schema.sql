CREATE DATABASE bigbrother_db;

USE bigbrother_db;

CREATE TABLE bulletins (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(80) NOT NULL DEFAULT "NA",
	author VARCHAR(30) NOT NULL DEFAULT "Staff",
    imgurl VARCHAR(200) NOT NULL DEFAULT "NA",
    body VARCHAR(1000) NOT NULL DEFAULT "NA",
    hiddenbulletin BOOLEAN NOT NULL DEFAULT 0,
    posted TIMESTAMP NOT NULL DEFAULT current_timestamp,
    
    PRIMARY KEY (id)
);
CREATE DATABASE bigbrother_db;

USE bigbrother_db;

CREATE TABLE bulletins (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(80) NOT NULL DEFAULT "BULLETIN POST",
	author VARCHAR(30) NOT NULL DEFAULT "BB STAFF",
    imgurl VARCHAR(200) NOT NULL DEFAULT "../images/website-banner.jpg",
    body VARCHAR(1000) NOT NULL DEFAULT "BODY TEXT",
    hiddenbulletin BOOLEAN NOT NULL DEFAULT 0,
    posted TIMESTAMP NOT NULL DEFAULT current_timestamp,
    
    PRIMARY KEY (id)
);
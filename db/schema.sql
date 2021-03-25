DROP DATABASE IF EXISTS path_finder_db;

CREATE DATABASE path_finder_db;

USE path_finder_db;

CREATE TABLE User (
	id INTEGER AUTO_INCREMENT NOT NULL,
    
    email VARCHAR(50) NOT NULL,
    
    password VARCHAR(50) NOT NULL,
    
    PRIMARY KEY(id)
);

SELECT * FROM User;
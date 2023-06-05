create table uzivatel (
    id_uz INT AUTO_INCREMENT PRIMARY KEY,
    uz_jmen varchar(15),
    heslo char(200)
);

CREATE TABLE marker (
    id_mar INT AUTO_INCREMENT PRIMARY KEY,
    latitude  DECIMAL(17, 15),
    longitude DECIMAL(17, 15),
    name VARCHAR(40),
    id_use INT
);
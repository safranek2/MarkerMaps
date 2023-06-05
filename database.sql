
create table _user (
    id_use INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(15),
    password char(200)
);

CREATE TABLE marker (
    id_mar INT AUTO_INCREMENT PRIMARY KEY,
    latitude  DECIMAL(17, 15),
    longitude DECIMAL(17, 15),
    name VARCHAR(40),
    id_use INT
);

CREATE TABLE
IF NOT EXISTS `houses`
(
    `id`   INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    `describtion` VARCHAR
(30)   NOT NULL DEFAULT '',
    `location_country`  VARCHAR
(50)  NOT NULL  ,
    `location_city`     VARCHAR
(50)  NOT NULL  ,
    `size_rooms` INT unsigned TINYINT,
     `link` VARCHAR
(255) NOT NULL `UNIQUE`,
  PRIMARY KEY
(`id`)
       );
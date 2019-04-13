
const CREATE_houses_TABLE
= `
CREATE TABLE
IF NOT EXISTS houses
(
        `id` INT UNSIGNED  NOT NULL AUTO_INCREMENT,
         `description`  CHAR
(250)       NOT NULL,
         `link`  CHAR
(250)       NOT NULL UNIQUE,
         `size_rooms` tinyint unsigned ,
         `location_country`         VARCHAR
(30)   NOT NULL ,
         `location_city`            VARCHAR
(30)   NOT NULL,
         `price_value`        DECIMAL
(7,2)  NOT NULL ,
         PRIMARY KEY
(id)
         );`;

[{
"link":"http://funda.com",
"location_country":"Erirtre",
"location_city":"Asmara",
"size_rooms":3,
"price_value":3456,
"price_currency":"Eur"},
{
"link":"http://fundaGERM.com",
"location_city":"frankfurt",
"size_rooms":"two",
"price_value":"#23456",
"price_currency":"Eur"}
]
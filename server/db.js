const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'houses',
});

async function createandinsert() {
    const CREATE_houses_TABLE = `
  CREATE TABLE  IF NOT EXISTS houses (
        id INT UNSIGNED  NOT NULL AUTO_INCREMENT,
         description  CHAR(250)       NOT NULL,
         link  CHAR(250)       NOT NULL UNIQUE,
         size_rooms tinyint unsigned ,
         location_country         VARCHAR(30)   NOT NULL ,
         location_city            VARCHAR(30)   NOT NULL,
         price_value        DECIMAL(7,2)  NOT NULL ,
         PRIMARY KEY(id)
         );`;
    const sqlInsert = ` insert into houses values('5','6 bed rooms nice villa','r433',3,'Eritrea','keren',234);;
    
  `;

    const execQuery = util.promisify(connection.query.bind(connection));
    connection.connect();
    try {
        //await execQuery(CREATE_houses_TABLE);
        await execQuery(sqlInsert);
    } catch (error) {
        console.log(error);
    }
    connection.end();
}
createandinsert();

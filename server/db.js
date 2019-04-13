const { promisify } = require('util');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'class18_db',
});
db.queryPromise = promisify(db.query);

module.exports = db;

// (async function() {
//     const createHouse_Table = ` CREATE TABLE IF NOT EXISTS houses (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       link VARCHAR(255) NOT NULL UNIQUE,
//       location_country VARCHAR(50) NOT NULL,
//       location_city VARCHAR(50) NOT NULL,
//       size_rooms INT NOT NULL,
//       price_value FLOAT NOT NULL,
//       price_currency VARCHAR(3) NOT NULL
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
//     const sqlInsert = ` insert into houses
// ( link,
//   location_country,
//   location_city,
//   size_rooms,
//   price_value,
//   price_currency
// )
// values(?) ;
// `;
//     const values = ['http://third link', 'ERitrea', 'Asmara', 5, 35233, 'Eur'];
//     db.connect();
//     try {
//         //await db.queryPromise(createHouse_Table);
//         // const results = await db.queryPromise(sqlInsert, [values]);
//         // console.log(results);
//     } catch (error) {
//         console.log(error);
//     }
//     db.end();
// })();

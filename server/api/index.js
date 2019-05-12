// Purpose of file: To contain all our routes and necessary logic
const { promisify } = require('util');

const apiRouter = require('express').Router();
const db = require('../db');
const { validateHouse, houseAsSqlParams } = require('../validateHouse');
db.queryPromise = promisify(db.query);
const addHousesSql = `
  replace into houses (
    link,
    location_country,
    location_city,
    size_rooms,
    price_value,
    price_currency
  )values ?;
  `;

apiRouter
    .route('/houses')
    .get(async (req, res) => {
        let {
            price_min = 0,
            price_max = 800000,
            order = 'location_country_asc',
            page = 1,
            city = '',
            size_rooms = 3,
        } = req.query;
        price_min = parseInt(price_min, 10);
        price_max = parseInt(price_max, 10);
        page = parseInt(page, 10);
        size_rooms = parseInt(size_rooms, 10);

        if (Number.isNaN(price_min) || price_min < 0) {
            res.status(400).json({
                error: `"Price_min" Should be positive number`,
            });
        }
        if (Number.isNaN(price_max) || price_max < 0) {
            return res.status(400).json({
                error: `"Price_max" Should be positive number`,
            });
        }
        if (price_max < price_min) {
            return res.status(400).json({
                error: `'Price_max' should be greater than 'price_min'`,
            });
        }
        if (Number.isNaN(size_rooms) || size_rooms < 0) {
            return res.status(400).json({
                error: `"size_rooms" Should be positive number`,
            });
        }
        if (Number.isNaN(page) || page <= 0) {
            return res.status(400).json({
                error: `"page" Should be greater than 0`,
            });
        }

        let order_field, order_direction;
        const index = order.lastIndexOf('_');
        if (index > 0) {
            order_field = order.slice(0, index);
            order_direction = order.slice(index + 1);
            console.log(order_field, order_direction);
        }
        if (['asc', 'desc'].indexOf(order_direction) === -1) {
            return res.status(400).json({ error: `'order' parm is  wrong` });
        }
        const houses_per_page = 5;
        const offset = (page - 1) * houses_per_page;

        const conditions = [`price_value BETWEEN ? AND ? `];
        const params = [price_min, price_max];

        if (size_rooms > 0) {
            conditions.push(`size_rooms= ?`);
            params.push(size_rooms);
        }

        if (city.length > 0) {
            conditions.push(`location_city=?`);
            params.push(city);
        }

        // if (location_country.length) {
        //     conditions.push(`location_country=?`);
        //     params.push(location_country);
        // }
        const queryBody = `
      FROM houses WHERE ${conditions.join(' AND ')}  `;
        const queryTotal = `
      SELECT COUNT(id) AS total ${queryBody} 
      `;
        const queryItems = `SELECT * ${queryBody} ORDER BY ${db.escapeId(
            order_field,
            true
        )}  ${order_direction} LIMIT ${houses_per_page} offset ${offset}; `;

        try {
            const houses = await db.queryPromise(queryItems, params);
            const total = await db.queryPromise(queryTotal, params);

            const citiesAll = await db.queryPromise(
                `select distinct location_city from houses;`
            );
            const parsedCities = JSON.parse(JSON.stringify(citiesAll));
            const cities = parsedCities.map(city => city.location_city);
            console.log(total);
            res.json({
                total: total[0].total,
                houses,
                pageSize: houses_per_page,
                cities,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    })

    // post

    .post(async (req, res) => {
        const inputArrayData = req.body;
        if (!Array.isArray(inputArrayData)) {
            return res.status(400).send({ error: 'data should be an array' });
        }
        const processedData = inputArrayData.map(houseObj => {
            return validateHouse(houseObj);
        });

        //console.log(processedData);
        const validData = [];
        const invalidData = [];
        processedData.forEach(element => {
            if (element.valid) {
                validData.push(element);
            } else {
                invalidData.push(element);
            }
        });
        const report = {
            valid: validData.length,
            invalid: invalidData.length,
            invalidData: invalidData,
        };
        if (validData.length) {
            try {
                //  db.connect();
                const housesData = validData.map(el =>
                    houseAsSqlParams(el.raw)
                );
                console.log('valid datas', housesData);
                await db.queryPromise(addHousesSql, [housesData]);

                //db.end();
                return res.json(report);
            } catch (error) {
                //console.log('my error', error);
                return res.status(500).json({ error: error.message });
            }
        } else {
            res.json(report);
        }
    });

apiRouter
    .route('/houses/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        const houses = await db.queryPromise('select * from houses;');
        const item = houses.find(house => {
            return house.id === parseInt(id, 10);
        });
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({
                error: `item with an id ${id} doesn't Exist`,
            });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        const houses = await db.queryPromise('select * from houses;');
        const index = houses.findIndex(house => {
            return house.id === parseInt(id, 10);
        });
        if (index > -1) {
            houses.splice(index, 1);
            res.send(`the house with the id: ${id} is deleted`);
        } else {
            res.send(`the house with the given id: ${id} not found`);
        }
    });

apiRouter.use((req, res) => {
    res.status(404).end();
});

module.exports = apiRouter;

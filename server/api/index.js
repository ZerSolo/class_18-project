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
        try {
            const houses = await db.queryPromise('select * from houses;');
            console.log('this is data from client', houses);
            res.json(houses);
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
                error: `item with an id ${id} doesnt Exist`,
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

// Purpose of file: To contain all our routes and necessary logic

const apiRouter = require('express').Router();
let lastId = 3;
const fakeDB = [
    {
        id: 1,
        price: 135000,
        desc: 'villa 3 rooms',
    },
    {
        id: 2,
        price: 150050,
        desc: 'studio with 1 room',
    },
    {
        id: 3,
        price: 1789000,
        desc: 'apartment  with 2 rooms',
    },
];

apiRouter
    .route('/houses')
    .get((req, res) => {
        res.json(fakeDB);
    })
    .post((req, res) => {
        let { price, desc } = req.body;
        if (typeof price === 'undefined') {
            res.status(400).json({
                error: `price field is required`,
            });
        }
        price = parseInt(price, 10);
        if (Number.isNaN(price) || price <= 0) {
            res.status(400).json({
                error: `price should be a positive number`,
            });
        } else {
            lastId++;
            const newItem = {
                id: lastId,
                price,
                desc,
            };
            fakeDB.push(newItem);
            res.json(newItem);
        }
    });

apiRouter
    .route('/houses/:id')
    .get((req, res) => {
        const { id } = req.params;

        const item = fakeDB.find(house => {
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
    .delete((req, res) => {
        const { id } = req.params;
        const index = fakeDB.findIndex(house => {
            return house.id === parseInt(id, 10);
        });
        if (index > -1) {
            fakeDB.splice(index, 1);
            res.send(`the house with the id: ${id} is deleted`);
        } else {
            res.send(`the house with the given id: ${id} not found`);
        }
    });

apiRouter.use((req, res) => {
    res.status(404).end();
});

module.exports = apiRouter;

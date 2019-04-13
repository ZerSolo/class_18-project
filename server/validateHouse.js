const validator = require('validator');
const { getCode } = require('country-list');
console.log(getCode('kenya'));
const requiredFields = [
    'link',
    'location_country',
    'location_city',
    'size_rooms',
    'price_value',
    'price_currency',
];
const validateHouse = houseObj => {
    let valid = true;
    let errors = [];
    if (typeof houseObj !== 'object') {
        valid = false;
        errors.push('house should be an object');
    } else {
        requiredFields.forEach(field => {
            if (typeof houseObj[field] === 'undefined') {
                valid = false;
                errors.push(`${field} : is required`);
            }
        });
        const countryValidator = getCode(`${houseObj['location_country']}`);
        console.log(countryValidator);
        if (countryValidator === undefined) {
            valid = false;
            errors.push(`the Country name must have a valid name `);
        }
        if (!validator.isURL(`${houseObj['link']}`)) {
            valid = false;
            errors.push(`The Link ' ${houseObj['link']} ':  must be valid URL`);
        }
        if (!validator.isNumeric(`${houseObj['price_value']}`)) {
            valid = false;
            errors.push(`price_value  must be numeric `);
        }
        if (!validator.isNumeric(`${houseObj['size_rooms']}`)) {
            valid = false;
            errors.push(`number of rooms must be  must be valid number`);
        }
    }

    return {
        valid,
        errors,
        raw: houseObj,
    };
};

const houseAsSqlParams = houseObj => {
    return [
        'link',
        'location_country',
        'location_city',
        'size_rooms',
        'price_value',
        'price_currency',
    ].map(field => houseObj[field]);
};
module.exports = {
    validateHouse,
    houseAsSqlParams,
};

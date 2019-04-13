// Purpose of file: To start our axios server
const axios = require('axios');
const app = require('./app'); // This loads in the code from app.js
const PORT = 8080;
const { validateHouse } = require('./validateHouse');

// axios
//     .get('http://pastebin.com/raw/hpwWsdf9')
//     .then(res => {
//         console.log(res.data.map(validateHouse));
//     })
//     .catch(error => {
//         console.log({ error: error.message });
//     });

app.listen(PORT, () => {
    console.log(`app is running at the port ${PORT} `);
}); // We can use that "app" functionality now in this file to start the server

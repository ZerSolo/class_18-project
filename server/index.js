// Purpose of file: To start our HTTP server
const app = require('./app'); // This loads in the code from app.js
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`app is running at the port ${PORT} `);
}); // We can use that "app" functionality now in this file to start the server

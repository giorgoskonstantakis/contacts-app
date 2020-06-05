const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

// Handle uncaught exceptions' situations
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION. Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

//Database connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => console.log('DB connection succesful'));

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// Handle unhandled rejections' situations
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION. Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
const contactRouter = require('./routes/contactRoutes');
const compression = require('compression');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(compression());

// Middleware for serving static files 
app.use(express.static(`${__dirname}/public`));

// BASIC ROUTE
app.use('/api/contacts', contactRouter);

// Middleware to handle all other urls than /api/contacts
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// Through this we use the errorController in all server files
app.use(globalErrorHandler);

module.exports = app;




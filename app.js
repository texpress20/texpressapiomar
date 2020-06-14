const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPasrser = require('body-parser');
const mssql = require('mssql');
const mongoose = require('mongoose');



const itemRoutes = require('./api/routes/items');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const subsectionRoutes = require('./api/routes/subsection');
const sectionRoutes = require('./api/routes/sections');
const marketRoutes = require('./api/routes/markets');
const saleRoutes = require('./api/routes/sales');

mongoose.connect("mongodb+srv://node-Rest:node-Rest@cluster0-r014i.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyPasrser.urlencoded({ extended: false }));
app.use(bodyPasrser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {

        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();

});


// Routes which should handle requests
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/subsections', subsectionRoutes);
app.use('/sections', sectionRoutes);
app.use('/markets', marketRoutes);
app.use('/sales', saleRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    err.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app; 
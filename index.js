const express = require('express');
const app = express();
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const EmployeesRouter = require('./routers/EmployeesRouter');
const CustomerRouter = require('./routers/CustomerRouter');
const LocationRouter = require('./routers/LocationRouter');

connectDB();

app.use(express.json());

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/employee', EmployeesRouter);
app.use('/api/customer', CustomerRouter);
app.use('/api/location', LocationRouter);
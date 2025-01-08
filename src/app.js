const express = require('express');
const userRouter = require('./Routes/userRoutes');
const cors = require('cors');
const companyRouter = require('./Routes/companyRouter');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    console.log("Called");
    res.status(200).json({ message: "App is working fine...!" });
});

app.use('/user', userRouter);

app.use('/company', companyRouter);

module.exports = app;
const express = require('express');
const userRouter = require('./Routes/userRoutes');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    console.log("Called");
    res.status(200).json({ message: "App is working fine...!" });
});

app.use('/user', userRouter)

module.exports = app;
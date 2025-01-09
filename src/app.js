const express = require('express');
const userRouter = require('./Routes/userRoutes');
const cors = require('cors');
const companyRouter = require('./Routes/companyRouter');
const app = express();

const allowedOrigins = ['https://growsphere.onrender.com', 'http://localhost:5173'];

// Configure CORS to allow only specified origins
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/', (req, res) => {
    console.log("Called");
    res.status(200).json({ message: "App is working fine...!" });
});

app.use('/user', userRouter);
app.use('/company', companyRouter);

module.exports = app;
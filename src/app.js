const express = require('express');
const userRouter = require('./Routes/userRoutes');
const cors = require('cors');
const companyRouter = require('./Routes/companyRouters');
const investmentsRouter = require('./Routes/investmentsRoutes');
const investerRouter = require('./Routes/investerRoutes');
const passwordController = require('./Controller/passwordController');
const searchRouter = require('./Routes/searchRoutes');
const postRouter = require('./Routes/postRoutes');
const employeeRouter = require('./Routes/employeeRouter');
const communityRouter = require('./Routes/communityRoutes');
const app = express();

app.use(express.json())

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
    res.status(200).json({ message: "App is working fine...!" });
});

app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/invester', investerRouter);
app.use('/employee', employeeRouter);
app.use('/investments', investmentsRouter);
app.use('/search', searchRouter)
app.use('/posts', postRouter)
app.use('/community', communityRouter);

app.post('/validate-password', passwordController);

module.exports = app;
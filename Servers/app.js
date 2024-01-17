const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database');
const PORT = 3001;
const EmployeeRouter = require('./routers/employeeRouters');
const userRouter = require('./routers/UserRouter');
const cookieParser = require('cookie-parser');

connectDB();
// app.use(cors);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/api', EmployeeRouter);
app.use('/api/users', userRouter);
app.listen(PORT, () => {
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
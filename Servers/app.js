const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./database');
const PORT = 3000;

connectDB();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => {
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
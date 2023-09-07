require('dotenv').config();

const express = require('express');
const pool = require('./config/database');
const userRouter = require('./api/users/user.router');


const app = express();

app.use(express.json());
app.use('/api/users', userRouter);




app.listen(4000,()=>{
    console.log("server connected sucess fully");
});
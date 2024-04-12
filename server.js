const express = require("express");
const app=express();
const db=require('./databaseCon')
const bodyParser=require('body-parser');
const { default: mongoose } = require("mongoose");
require('dotenv').config();

const PORT=process.env.PORT||3000;
require('dotenv').config();
app.use(bodyParser.json())

const PersonRoute=require('./ExpressRoute/PersonRoute');
app.use('/person',PersonRoute);

const MenuRouter=require('./ExpressRoute/MenuRouter');
app.use('/menu',MenuRouter)


app.listen(PORT,()=>{
    console.log("listening on port NO 3000")
})
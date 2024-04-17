const express = require("express");
const app=express();
const db=require('./databaseCon')
const bodyParser=require('body-parser');
const { default: mongoose } = require("mongoose");
require('dotenv').config();
//const passport =require('passport');
const PORT=process.env.PORT||3000;

const passport=require('./auth')

app.use(passport.initialize())

const LocalauthMiddleWare=passport.authenticate('local',{session:false})
require('dotenv').config();
app.use(bodyParser.json())

const PersonRoute=require('./ExpressRoute/PersonRoute');


app.use('/person',PersonRoute);

const MenuRouter=require('./ExpressRoute/MenuRouter');
const { jwtAuthMiddleware } = require("./jwt");
app.use('/menu',MenuRouter)


app.listen(PORT,()=>{
    console.log("listening on port NO 3000")
})
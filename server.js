
const express=require('express')
const app=express();
const db=require('./db')
const bodyParser=require('body-parser')
app.use(bodyParser.json());  //req.body
require('dotenv').config();
const passport=require('./auth')
const LocalStrategy=require('passport-local').Strategy


const Person=require('./modules/Person')
const Menu=require('./modules/Menu')

//middleware function


const logRequset = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
};
app.use(logRequset)

app.use(passport.initialize());

const authorize=passport.authenticate('local',{session:false})
app.get('/',authorize,(req,res)=>{
    res.send('Hello World')
})
const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')

app.use('/person',authorize,personRoutes)
app.use('/menu',authorize,menuRoutes)
const PORT=process.env.PORT|| 5050
app.listen(PORT,()=>{
    console.log('server is listening on port 5050')
})





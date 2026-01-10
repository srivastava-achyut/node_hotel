const express=require('express')
const app=express()
const morgan=require('morgan')
//req=>middleware=>res

const logger = require('./logger')
const authorize=require('./authorize')

// middleware applied by three things 1) by own 2)by express 3)third party


// app.use([logger,authorize])

//app.use(express.static('./public'))


app.use(morgan('tiny'))  
app.get('/',(req,res)=>{
    
    res.send('Home')
})
app.get('/about',(req,res)=>{
    res.send('Abouts')
})
app.get('/api/products',(req,res)=>{

  res.send('Products')
     
})
app.get('/api/items',(req,res)=>{
    res.send('Items')
     
})


app.listen(2000,()=>{
    console.log("Server is listenning")
})

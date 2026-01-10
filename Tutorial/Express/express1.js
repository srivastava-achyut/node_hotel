const express=require('express');
const app=express();





app.get('/about',(req,res)=>{
    res.send('About Page')
})

app.get('/contact',(req,res)=>{
    res.send('contact Page')
})

app.all('/{*any}',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})
app.listen(5000,()=>{
    console.log('server is listening')    
})

//app.get
//app.post
//app.put
//app.delete
//app.all
//app.listen

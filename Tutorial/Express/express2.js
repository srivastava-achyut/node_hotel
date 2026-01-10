const express =require('express')

const app=express();
const {products}=require('./data')
//console.log('PRODUCTS:', products)

// app.get('/',(req,res)=>{
//     res.json([{name:'john'},{name:'Achyut'}])
// })

// app.get('/',(req,res)=>{
//     res.json(products)
// })
app.get('/',(req,res)=>{
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
 })

 app.get('/api/products',(req,res)=>{
  const newProducts=products.map((product)=>{
    const{id,name,price,category}=product
    return {id,name,price,category}
  })
  res.json(newProducts)
 })

 app.get('/api/products/:productID',(req,res)=>{

  const {productID}=req.params
  const singleProduct=products.find((product)=>product.id===Number(productID))
  
  if(!singleProduct){
    return res.status(404).send("Product not found")
  }
  res.json(singleProduct)
 })
//query

app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
  console.log(req.params)
  res.send("Hello World")
})

app.get('/api/v1/query',(req,res)=>{
  console.log(req.query)
  res.send('hello world')
})

app.listen(5000,()=>{
    console.log('server is listening')
});



const http= require('http')
console.log('start')
const server=http.createServer((req,res)=>{
   res.write('Welcome to our home page');
   res.end() 
   console.log('second')
}) 
server.listen(5000);
console.log('third')
 
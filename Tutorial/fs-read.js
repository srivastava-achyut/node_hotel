const {createReadStream} = require('fs')
const stream = createReadStream('./Read/big.txt',{encoding:'utf8'})


//dafault 64kb
//last buffer - remainder
// highWaterMark - control size 
//const stream =createReadStream('./Read/big.txt,{highWaterMark:90000}) //this will show raw binary data buffer
//const stream = createReadStream('./Read/big.txt,{encoding: 'utf8'}')  // this will actual data

stream.on('data', (result) =>{
    console.log(result)
}) 


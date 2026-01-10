//this will read file from other folder by giving its directory

const {readFileSync , writeFileSync} = require('fs')
//const fs=require('fs')

// we give the proper location of that file
const first=readFileSync('./Read/first.txt','utf8')
console.log(first);
const second=readFileSync('./Read/second.txt','utf8')
console.log(second);
console.log(first,second);

//now we will learn how to write content in another fill which is not created yet in another folder by pa
//by passing its location 

writeFileSync('./Read/write.txt',`here is the result : ${first} , ${second}`)    

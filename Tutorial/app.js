// const amount=1;
// if(amount>10)
//     console.log("amount is greater");
// else
//     console.log("amount is less")
// console.log(`I have started to learn to learn node`)
// setInterval(()=>{
// console.log('hello world');
// }
// ,1000
// )


//Modules
// const print=(name)=>{
//     console.log(` My name is ${name}`)
// }
// print('Nishant')
// print('Ajay')
const names=require('./export')
const print=require('./print')
print('Achyut')
print(names.harry)


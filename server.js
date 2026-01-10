// var fs=require('fs')
// var os=require('os')
// var user=os.userInfo()
// var lo=require('lodash')
// console.log(user)


// fs.appendFile('greet.txt','Hi'+user.username+'!\n',()=>{console.log('file is created')})

// var data=["person","person","name",2,2,3,4,5,5]
// var filter=lo.uniq(data)
// console.log(filter)

const express=require('express')
const app=express();
const db=require('./db')
const bodyParser=require('body-parser')
app.use(bodyParser.json());  //req.body
require('dotenv').config();

const Person=require('./modules/Person')
const Menu=require('./modules/Menu')


// app.post('/menu',async (req,res)=>{
//     try {
//         const menu=new Menu(req.body)
//         const saved=await menu.save()
//          res.status(201).json(saved);
//     } catch (err) {
//          res.status(500).json({ error: err.message });
//     }
// })
app.get('/',(req,res)=>{
    res.send('Hello World')
})

// app.get('/about',(req,res)=>{
//     res.send('About Page')
// })
// app.get('/user',(req,res)=>{

//     const user_info={
//         name:'Achyut',
//         Session_Id:400.400,
//         is_logged:true,


//     }
//     res.send(user_info)
// })

    // newPerson.name=data.name;
    // newPerson.age=data.age
   
    // newPerson.mobile=data.mobile
    // newPerson.email=data.email
    // newPerson.address=data.address

    //Save the new Person to the databases
  
// app.post('/person', async (req, res) => {
//   try {
//     const person = new Person(req.body);
//     const saved = await person.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get('/person',async (req,res)=>{
//     try{
//        const data= await Person.find();
//        console.log('data fetched');
//        res.status(200).json(data)
//     }catch(err){
//          res.status(500).json({ error: err.message });
//     }
// })

// app.get('/person/:workType',async (req,res)=>{
//     try{
//     const workType=req.params.workType
//     if(workType=='chef' || workType=='manager' || workType=='waiter'){
//           const response=await Person.find({work:workType})
//           console.log('response fetched')
//           res.status(200).json(response)
//     }else{
//         res.status(404).json({error:'Invalid work type'})
//     }
// }catch(err){
//        res.status(500).json({error:'Internal Server Error'})
// }
// })

const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')

app.use('/person',personRoutes)
app.use('/menu',menuRoutes)
const PORT=process.env.PORT|| 5050
app.listen(PORT,()=>{
    console.log('server is listening on port 5050')
})





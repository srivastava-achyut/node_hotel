const express=require('express')
const router=express.Router()
const Person=require('./../modules/Person')
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

router.post('/signup', async (req, res) => {
  console.log('start')
  try {
    const data=req.body
    const newPerson= new Person(data)
    const response= await newPerson.save()
    console.log('data saved')
    const token=generateToken({ username: response.username })
    console.log("Token is : ",token)
    res.status(200).json({response:response,token:token})
  }
catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 //LOGIN
router.post('/login',async(req,res)=>{
  try {
    //extract username and password from request body
    const {username,password}= req.body

    //find the user by username
    const user=await Person.findOne({username:username})

    if(!user || !(await user.comparePassword(password)!=undefined)){
      return res.status(401).json({error:'Invalid username or password'})
    }

    //generate token
    const payload={
      id:user.id,
      username:user.username
    }
    const token=generateToken(payload)

    //return token as response
    res.json({token})

  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server Error'})
  }
})
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const { username } = req.user;

    const user = await Person.findOne({ username }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    const saved = await person.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/',async (req,res)=>{
    try{
       const data= await Person.find();
       console.log('data fetched');
       res.status(200).json(data)
    }catch(err){
         res.status(500).json({ error: err.message });
    }
})
router.get('/:workType',async (req,res)=>{
    try{
    const workType=req.params.workType
    if(workType=='chef' || workType=='manager' || workType=='waiter'){
          const response=await Person.find({work:workType})
          console.log('response fetched')
          res.status(200).json(response)
    }else{
        res.status(404).json({error:'Invalid work type'})
    }
}catch(err){
       res.status(500).json({error:'Internal Server Error'})
}
})

router.put('/:id',async (req,res)=>{
  try {
    const personId=req.params.id;  //Extract the id from the URL parameter
    const updatePersonData=req.body;  // Updated data for the person
    
    const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
    new:true,
    runValidators:true,
    }

)

if(!response){
   return res.status(404).json({error:'person not found'})
}
console.log('data uploaded')
res.status(200).json(response)

} catch (err) {
    console.log(err)
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//delete opearation

router.delete('/:id',async (req,res)=>{
  try {
    const personId=req.params.id;
    const response=await Person.findByIdAndDelete(personId)
    if(!response){
   return res.status(404).json({error:'person not found'})

}
 console.log('Person delted sucessfully')
   res.status(200).json(response)


  } catch (err) {
    console.log(err)
    res.status(500).json({error: 'Internal Server Error'})
  }
})

module.exports=router

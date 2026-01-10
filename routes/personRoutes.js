const express=require('express')
const router=express.Router()
const Person=require('./../modules/Person')

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

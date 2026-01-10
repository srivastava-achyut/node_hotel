const express=require('express')
const router=express.Router();
const Menu=require('./../modules/Menu')

router.post('/',async (req,res)=>{
    try {
        const menu=new Menu(req.body)
        const saved=await menu.save()
         res.status(201).json(saved);
    } catch (err) {
         res.status(500).json({ error: err.message });
    }
})
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    console.log('Menu data fetched');
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id',async (req,res)=>{
  try { 
    const menuId=req.params.id;  //Extract the id from the URL parameter
    const updateMenuData=req.body;  // Updated data for the menu
    
    const response=await Menu.findByIdAndUpdate(menuId,updateMenuData,{
    new:true,
    runValidators:true,
    }

)

if(!response){
   return res.status(404).json({error:'menu not found'})
}
console.log('data uploaded')
res.status(200).json(response)

} catch (err) {
    console.log(err)
    res.status(500).json({error: 'Internal Server Error'})
  }
})
module.exports=router
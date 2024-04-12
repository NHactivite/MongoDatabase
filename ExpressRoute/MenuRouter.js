const express=require('express');
const router=express.Router();
const MenuItem=require('../MenuItem');

router.post('/',async(req,res)=>{
   try{ const data=req.body;
    const newMenu=new MenuItem(data);
    const response=await newMenu.save();
    res.status(200).json(response);
   }catch(e){
    res.status(500).json({error:'data not save'})
   }

})

router.get('/',async(req,res)=>{
  try{     const response=await MenuItem.find();
       res.status(200).json(response);
}catch(e){
    res.status(500).json({error:'internal server error'})    
}
})

router.get('/:tasteType',async(req,res)=>{
 try{   const tasteType=req.params.tasteType;
    const response=await MenuItem.find({taste:tasteType});
    res.status(200).json(response)
}catch(e){
    res.status(500).json({error:"invalid taste you find"})
}
})

module.exports=router;
const express=require('express');
const router=express.Router();
const person=require('../person')


router.get('/:workType',async(req,res)=>{
   try{ const workType=req.params.workType;
    const response=await person.find({work:workType})
    res.status(200).json(response)
   }catch(e){
    res.status(500).json({error:'invalid work type'})
   }
})

router.post('/',async(req,res)=>{
     try{
          const data=req.body;
          const newperson=new person(data);
          const response= await newperson.save();
          res.status(200).json(response)
     }catch(e){
           res.status(500).json({error:"internal server error data not save"})
     }
})

router.get('/',async(req,res)=>{
    try{
        const response=await person.find();
        res.status(200).json(response)
    }catch(e){
           res.status(500).json({error:"internal server error"})
    }
});

module.exports=router;
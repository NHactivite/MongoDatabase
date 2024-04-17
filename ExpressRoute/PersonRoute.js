const express=require('express');
const router=express.Router();
const person=require('../person')

const {jwtAuthMiddleware,generateToken}=require('../jwt')

router.get('/:workType',async(req,res)=>{
   try{ const workType=req.params.workType;
    const response=await person.find({work:workType})
    res.status(200).json(response)
   }catch(e){
    res.status(500).json({error:'invalid work type'})
   }
})

router.post('/signup',async(req,res)=>{
     try{
          const data=req.body;
          const newperson=new person(data);
          const response= await newperson.save();
          const payload={
            id:response.id,
            username:response.username
          }
          const token=generateToken(payload);
          res.status(200).json({response:response,token:token})
     }catch(error){
           res.status(500).json({error:"internal server error data not save"})
     }
})

//login

router.post('/login',async(req,res)=>{

    try{
        const {username,password}=req.body;
        const user=await person.findOne({username:username})
        if(!user||!(await user.comparePassword(password))){
          return res.status(401).json({error:'invalid username and password'})
        }
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);
        console.log("token genetred ")
        res.json({token})
    }catch(error){
        res.status(500).json({error:'internal server error'})
        console.log(error)
    }
});

router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        const response=await person.find();
        res.status(200).json(response)
    }catch(e){
           res.status(500).json({error:"internal server error"})
    }
});

module.exports=router;
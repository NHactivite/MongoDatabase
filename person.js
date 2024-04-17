const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chief','manager','waiter'],
        required:true
    },
    address:{
        type:String,
        required:true
    },
    username:{
              type:String,
              required:true
    },
    password:{
        required:true,
        type:String
    }

});
personSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')){
        return next();
    }
    try{
          const salt=await bcrypt.genSalt(10);
          const hasedPassword=await bcrypt.hash(person.password,salt);
          person.password=hasedPassword;
          next();
    }catch(error){
        next(error)
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
         const isMatch=await bcrypt.compare(candidatePassword,this.password);
         return isMatch;
    }catch(error){
        throw (error)
    }
}

const person=mongoose.model('person',personSchema);

module.exports=person;
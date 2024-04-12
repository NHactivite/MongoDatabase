const mongoose=require('mongoose');
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
    }

});


const person=mongoose.model('person',personSchema);

module.exports=person;
const mongoose=require('mongoose');
const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        requried:true
    },
    is_drink:{
        type:Boolean,
        default:false
    }
})

const MenuItem=mongoose.model('MenuItem',menuSchema);
module.exports=MenuItem
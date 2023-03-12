const mongoose=require("mongoose");
const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    img:String,
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=customerSchema;
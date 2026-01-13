const mongoose=require("mongoose")

const employeeSchema= new mongoose.Schema({
    empname:{
        type:String,
        required:true
    },
        email:{
        type:String,
        required:true
    },
        password:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true
    }
})
const employees=mongoose.model("employees",employeeSchema)
module.exports=employees
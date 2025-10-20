//import mongoose
const mongoose=require("mongoose")

const bookingSchema= new mongoose.Schema({
    wastetype:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    time:{
        type:TimeRanges,
        required:true
    },
    date:{
        type:Date,
        required:true

    },
    instructions:{
        type:String,
        required:true
    },
})
const bookings=mongoose.model("bookings",bookingSchema)
module.exports=bookings
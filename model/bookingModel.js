//import mongoose
const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    wastetype: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true

    },
    instructions: {
        type: String,
        required: false
    },
    userMail: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
        amount: {
        type: Number,
        required: true
    },
            weight: {
        type: Number,
        required: true
    },
      status: {
    type: String,
    default: "Pending",
    
  },
  paidby:{
    type:String,
    default:""
  },
  pstatus: {
    type: String,
    default: "Pending",
  }
    
})
const bookings = mongoose.model("bookings", bookingSchema)
module.exports = bookings
const mongoose = require("mongoose");

const wasteRateSchema = new mongoose.Schema({
  wasteType: { 
    type: String,
     required: true, 
     unique: true },
  ratePerKg: {
     type: Number,
     required: true }
});

 const rates= mongoose.model("rates", wasteRateSchema);
 module.exports=rates

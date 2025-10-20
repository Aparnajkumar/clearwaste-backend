//import mongoose

const mongoose=require("mongoose")

const connectionString=process.env.DATABASE

//connection

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB connected successfully");
    
}).catch((err)=>{
    console.log(`MongoDB connection failed due to :${err}`);
    
})
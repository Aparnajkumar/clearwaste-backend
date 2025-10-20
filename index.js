//import dotenv module
require("dotenv").config() //to load environment
//const dotenv=require("dotenv")
//dotenv.config()

//1.import express
const express=require("express")

//5.import cors
const cors=require("cors")

//8.import routes
const routes=require("./router")

//11.import connection
require("./connection")

//2.create server
const clearwasteServer=express()

//6.use cors to connect with frontend
clearwasteServer.use(cors())

//7.parse the json data-middleware
clearwasteServer.use(express.json())

//9.tell server to use router
clearwasteServer.use(routes)

//export imgUpload to server
clearwasteServer.use("/upload",express.static("./imgUploads"))

//3.set port
const PORT=4000||process.env.port

//4.tell server to listen the port
clearwasteServer.listen(PORT,()=>{
    console.log(`server running successfully at : ${PORT}`);
    
})

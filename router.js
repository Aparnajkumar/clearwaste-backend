//import express
const express=require("express")
const { registerController, loginController } = require("./controller/userController")



//instance
const routes=new express.Router()


//register
routes.post("/register",registerController)

//login
routes.post("/login",loginController)




 //export
 module.exports=routes

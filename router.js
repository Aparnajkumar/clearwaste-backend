//import express
const express=require("express")
const { registerController, loginController, updateProfileController, getalluserController, deleteuserController } = require("./controller/userController")
const { bookpickupController, ubookinghistoryController, getallhistoryController, updateBookingStatus, paymentcontroller, deleteabookingController } = require("./controller/bookingController")
const jwtMiddleware = require("./middleware/jwtMiddleware")
const adminjwtMiddleware = require("./middleware/adminjwtMiddleware")
const { deleteOne } = require("./model/userModel")



//instance
const routes=new express.Router()


//register
routes.post("/register",registerController)

//login
routes.post("/login",loginController)

//book a pickup
routes.post("/bookpickup",jwtMiddleware,bookpickupController)

//user history
routes.get("/userbookinghistory",jwtMiddleware,ubookinghistoryController)

//update user profile
routes.put("/updateprofile",jwtMiddleware,updateProfileController)

//payment
routes.put("/make-payment",jwtMiddleware,paymentcontroller)


//..............admin................

//get all userbookinghistory
routes.get("/alluserbookings",getallhistoryController)

//get all user 
routes.get("/all-user",adminjwtMiddleware,getalluserController)

//update booking status
routes.put("/updatebookingstatus/:id",adminjwtMiddleware,updateBookingStatus)

//delete user
routes.delete("/deleteuser/:id",deleteuserController)

//delete booking
routes.delete("/deletebooking/:id",deleteabookingController)

 //export
 module.exports=routes

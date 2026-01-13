//import express
const express=require("express")
const { registerController, loginController, updateProfileController, getalluserController, deleteuserController, googleloginController, getrateController } = require("./controller/userController")
const { bookpickupController, ubookinghistoryController, getallhistoryController, updateBookingStatus, paymentcontroller, deleteabookingController } = require("./controller/bookingController")
const jwtMiddleware = require("./middleware/jwtMiddleware")
const adminjwtMiddleware = require("./middleware/adminjwtMiddleware")
const { deleteOne } = require("./model/userModel")
const { empregisterController, emploginController,getallempController,deleteempController, getBookingLocationController, updateEmployeeLocationController } = require("./controller/empController")
const { updateWasteRate, getWasteRates, addWasteRate, getAllWasteRates } = require("./controller/adminController")
const { getAllMessagesController, deleteMessageController, addMessageController } = require("./controller/messageController")



//instance
const routes=new express.Router()


//register
routes.post("/register",registerController)

//login
routes.post("/login",loginController)

//googlelogin
routes.post("/google-login",googleloginController)

//empregister
routes.post("/empregister",empregisterController)

//emplogin
routes.post("/emplogin",emploginController)

//book a pickup
routes.post("/bookpickup",jwtMiddleware,bookpickupController)

//get a user history
routes.get("/userbookinghistory",jwtMiddleware,ubookinghistoryController)

//update user profile
routes.put("/updateprofile",jwtMiddleware,updateProfileController)

//payment
routes.put("/make-payment",jwtMiddleware,paymentcontroller)

//getallrate
routes.get("/rates",getrateController)

//add message
routes.post("/addmessage",addMessageController)

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

//get all emp
routes.get("/getallemp",getallempController)

//delete employee
routes.delete("/deleteemp/:id",deleteempController)

routes.post("/add-waste-rate", addWasteRate); 

routes.get("/rates", getAllWasteRates);         

routes.put("/updaterate/:id", updateWasteRate)



routes.get("/getmessages",getAllMessagesController)

routes.delete("/deletemessages/:id",deleteMessageController)

//.............emp................
routes.put("/emp-loc/:id",jwtMiddleware,updateEmployeeLocationController)


 //export
 module.exports=routes

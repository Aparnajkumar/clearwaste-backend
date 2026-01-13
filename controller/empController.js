const bookings = require("../model/bookingModel");
const employees=require("../model/empModel")
const jwt=require("jsonwebtoken")

exports.empregisterController = async (req, res) => {
    //logic
    const { empname, password, email,phone } = req.body
    console.log(empname, password, email,phone);

    // res.status(200).json("register request received")

    try {
        const existingUser = await employees.findOne({ email })
        if (existingUser) {
            res.status(406).json("Employee Already exists")
        }
        else {
            const newemp = new employees({
                empname,
                email,
                password,
                phone
            })
            await newemp.save()
            res.status(200).json(newemp)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//login
exports.emploginController = async (req, res) => {
    console.log(`Inside login controller`);

    const { password, email } = req.body
    console.log(password, email);

    try {
        const existingemp= await employees.findOne({ email })
        if (existingemp) {
            if (existingemp.password == password) {
                const token = jwt.sign({ userMail: existingemp.email }, process.env.secretkey)
                res.status(200).json({ existingemp, token })
            } else {
                res.status(406).json("Incorrect Credentials")
            }
        } else {
            res.status(403).json("User does not exists. Please register")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

    //for getting all emp data
exports.getallempController=async(req,res)=>{
    
    try {
      const getallemp=await employees.find()  
    //   console.log(getallemp)
      res.status(200).json(getallemp)
    } catch (error) {
     res.status(500).json(error)   
    }
}


//delete emp
exports.deleteempController=async(req,res)=>{
    const { id } = req.params
    try {
       await employees.findByIdAndDelete({_id:id})
       res.status(200).json("Removed Employee") 
    } catch (error) {
       res.status(500).json(error) 
    }
}

//to get user location

// exports.getBookingLocationController = async (req, res) => {
//     const { bookingId } = req.params;
//     try {
//         const booking = await bookings.findById(bookingId).select('location username userMail');
//         if (!booking) return res.status(404).json({ error: "Booking not found" });

//         res.status(200).json({
//             message: "Location fetched",
//             location: booking.location,
//             customer: booking.username
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching location", details: error });
//     }
// }


exports.updateEmployeeLocationController = async (req, res) => {
  const { bookingId } = req.params;
  const { latitude, longitude } = req.body;

  try {
    await bookings.findByIdAndUpdate(bookingId, {
      employeeLocation: {
        latitude,
        longitude,
        updatedAt: new Date()
      }
    });

    res.status(200).json({ message: "Employee location updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

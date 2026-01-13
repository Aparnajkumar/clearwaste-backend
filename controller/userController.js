const rates = require("../model/adminModel");
const users = require("../model/userModel");
const jwt = require("jsonwebtoken")
//register
exports.registerController = async (req, res) => {
    //logic
    const { username, password, email } = req.body
    console.log(username, password, email);

    // res.status(200).json("register request received")

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already exists")
        }
        else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//login
exports.loginController = async (req, res) => {
    console.log(`Inside login controller`);

    const { password, email } = req.body
    console.log(password, email);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, process.env.secretkey)
                res.status(200).json({ existingUser, token })
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
//update user profile

    exports.updateProfileController = async (req, res) => {
        const userMail = req.payload
        console.log(userMail);
        const { username, email, password} = req.body
        console.log(username, email, password);
        try {
            const updateProfile = await users.findOneAndUpdate({ email: userMail },
                {
                    username,
                    email: userMail,
                    password,
                    
                }, 
            )
            res.status(200).json(updateProfile)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //for getting all user data
exports.getalluserController=async(req,res)=>{
    const userMail=req.payload
    try {
      const getalluser=await users.find({email:{$ne:userMail}})  
    //   console.log(getalluser)
      res.status(200).json(getalluser)
    } catch (error) {
     res.status(500).json(error)   
    }
}

//delete user
exports.deleteuserController=async(req,res)=>{
    const { id } = req.params
    try {
       await users.findByIdAndDelete({_id:id})
       res.status(200).json("Removed user") 
    } catch (error) {
       res.status(500).json(error) 
    }
}

//google login contoller
exports.googleloginController = async (req, res) => {
    console.log(`Inside google login controller`);
    const { username, password, profile, email } = req.body
    console.log(username, password, profile, email);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            
                const token = jwt.sign({ userMail: existingUser.email }, process.env.secretkey)
                res.status(200).json({ existingUser, token })
            } else {
                const newUser = new users({
                    username,
                    email,
                    password,
                    profile
                })
                await newUser.save()
                const token = jwt.sign({ userMail: existingUser.email }, process.env.secretkey)
                res.status(200).json({ existingUser: newUser, token })
            }
        } 
        catch (error) {
            res.status(500).json(error)
        }
    }

    //for getting rate of wastetye
exports.getrateController=async(req,res)=>{
    try {
      const getrate =await rates.find()  
    //   console.log(getalluser)
      res.status(200).json(getrate)
    } catch (error) {
     res.status(500).json(error)   
    }
}


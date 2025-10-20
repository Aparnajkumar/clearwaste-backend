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
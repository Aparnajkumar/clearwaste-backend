const jwt=require("jsonwebtoken")

const adminjwtMiddleware=(req,res,next)=>{
    console.log(`Inside adminJWT middleware`);
    const token=req.headers["authorization"].split(" ")[1];
    // console.log(token);

    try {
        const jwtResponse=jwt.verify(token,process.env.secretkey)
        console.log(jwtResponse);
        req.payload=jwtResponse.userMail
        if(jwtResponse.userMail==`clearwasteadmin@gmail.com`){
        next()
        }else{
            res.status(401).json("invalid user")
        }
       
    } catch (error) {
        res.status(401).json("Authorization Failed",error)
    }
    
    
    
}
module.exports=adminjwtMiddleware
const jwt=require('jsonwebtoken')
const User=require('../model/user')

async function verifyToken(req,res,next){
    try{
        const {token}=req.cookies
        // console.log(token)
        if(!token){
            return res.status(401).json({error:"Session Expired"});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user=await User.findById(decoded.id)

        next()

    }
    catch(err){
        console.log(err)
        res.status(500).json("Internal Server Error")
    }

}

async function isAdmin(req,res,next){
    if(req.user.role!=="admin"){
        return res.status(403).json({error:`Not authorised`})
    }
    next();
}

module.exports={verifyToken,isAdmin}
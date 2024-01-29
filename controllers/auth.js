const User=require('../model/user')

async function signUp(req,res){
    try{
        const {name,email,password,phone}=req.body
        const user=await User.create({name,email,password,phone})
        res.status(201).json(user)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server error",err:err})
    }
}

async function signIn(req,res){
    try{
        const {email,password}=req.body

        if(!email || !password){
            return res.status(400).json("Please enter email and password")
        }
        const user=await User.findOne({email}).select("+password")
        
        if(!user){
            return res.status(401).json("Invalid email and password")
        }   

        // Checks if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return res.status(401).json("Invalid email and password")
        }

        const token=await user.getJwtToken()
        res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now() + 1* 24 * 60 * 60 * 1000)})
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
        res.status(500).json("Internal Server error")
    }
}


async function logOut(req,res){
    res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})
    res.status(200).json("Logeed Out ")
}
module.exports={signUp,signIn,logOut}

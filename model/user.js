const mongoose= require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        maxLength:[50,"Your name cannot exceed 50 character"]
    },
    phone:{
        type:Number,
        required:[true,"Please enter your Phone number"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate: {
            validator: function(value){
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
          },
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minLength:[6,"Your password must be longer than 6 characters"],
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
},{timestamps:true})

userSchema.pre('save',async function(next){
    const hashpass =await bcrypt.hash(this.password,10)
    this.password = hashpass;
    next()
})

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.getJwtToken=function (){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'1h'})
}



module.exports=mongoose.model("User",userSchema)
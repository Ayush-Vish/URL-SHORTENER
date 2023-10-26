import mongoose  from "mongoose";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
const User = new mongoose.Schema({
    name:{
        type:String, 
        require:[true, "Name is Required"],
        trim:true,
        minLength:[2 , "Name must be greater than 5 characters"]
    },
    email:{
        type:String,
        require:[true,"Name is required for SignUp"],
        unique:[true, 'User already SignIn'], 
        lowercase:true,
        trim:true,
        match:[ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ,  "Please Enter a Valid Email "]

            
    },
    password:{
        type:String,
        require:[true,"Password is required for further Process"],
        select:[false],
        minLength:[4, "Password must be greater than 8 characters"]
        
    },
    role: {
        type:String,
        default:"USER"
    },
},{
    timestamps : true 
})
User.pre( "save" ,  async function (next) {
    if(this.isModified("password")) { 
        return next()
    }
    this.password  = bcrypt.hash(this.password , 10)
    return next()
}
)


User.methods =   {
    async  comparePassword(newPassword)  { 
        newPassword = await bcrypt.hash(newPassword ,10) 
        console.log("THis is new Password" , newPassword )
        return this.password === newPassword 
    },
    generateJwtToken() {
        return JWT.sign(
            {id: this._id ,email :  this.email,role: this.role}, 
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
}

export default mongoose.model("User" ,User)
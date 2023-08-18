import User from "../models/user.model.js"
import Apperror from "../utility/error.util.js";

import JWT from "jsonwebtoken";

const register = async (req , res , next) => {
    try {
        console.log("Yaha Par")
        const {name, email , password}  = req.body
        console.log("Yaha Par")
        if(!name || !email || !password  ) {
            return next(new Apperror ("All fields are required", 400));
        }
        const UserExists  = await User.find({email})
        if(UserExists.length!==0) {
            return next(new Apperror ("User Already Exists Please Change Email" ,400))
        }
        const user =await User.create({
            name ,email , password 
        })
        if(!user)  {
            return next(new Apperror ("User does not created Successfully " ,400 ) ) 

        }
        await user.save( ) 
        return res.status(200).json({
            success: true , 
            message : "User registered Successfully", 
            user 

        })
     } catch (e) {
        return next(new Apperror (e.message, 400))
    }
}
const login = async  (req, res, next) => { 
    try {
        const {email , password}  = req.body 
        if(!email || !password )  {
            return next(new Apperror ("Please Fill All credentials " , 400  )  )
        }
        const user =await User.findOne({email })
                                .select("+password")
        if(!user) {
             return next(new Apperror("User Does not registered" , 400 )) 

        }
        console.log("Password is -> ", password  )
        if(!user.comparePassword(password))  {
            return next (new Apperror ("Password is incorrect" ,400 )) 

        }
        
        const token = user.generateJwtToken()
        user.password  =undefined 
        const cookieOptions = {
            maxAge:7*24*60*60*100,
            httpOnly:true,
            secure:true
        }
        res.cookie("token", token ,cookieOptions)
        return res.status(200).json({ 
            success:true, 
            message : "User logined Successfully", 
            user
        })
    }
    catch(e) {
        return next(new Apperror(e.message ,400))
    }
}
const me  =async (req, res, next ) =>  {
    try {
        const id =req.user.id 
        const user = await User.findById(id) 
        if(!user) {
            return next(new Apperror("User Does not Exists " ,400))
        }
        return res.status(200).json({
            success:true, 
            message: "User fetched Successfully", 
            user
         })
    } catch (e) {
        return next(new Apperror(e.message ,400  ) ) 
    }
}
const logout = async (req, res, next) => {
    try {
        res.cookie("token" ,"sfljkn" , {
            expires: new Date(),
            httpOnly : true 
        })
        return res.status(200).json({
            success: true, 
            message : "User LoggedOut Successfully"
        })
    } catch (error) {
        return next(new Apperror(error.message ,400 ))
    }
}
export default  { 
    register , 
    login,
    me ,
    logout 
}
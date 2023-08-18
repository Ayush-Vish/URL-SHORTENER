import JWT from "jsonwebtoken" 
import Apperror from "../utility/error.util.js"



const jwtAuth = async (req ,res, next) => { 
    const token = req.cookies && req.cookies.token || null 
    if(!token) {
        return res.status(400).json({
            success: false 
        })
    }
    try {
        
        console.log(token)
        const payload =  await JWT.verify(token , process.env.JWT_SECRET)
        req.user = {id:payload.id ,email : payload.email,  role : payload.role  }
        next() 
    } catch (e) {
        return next(new Apperror(e.message) ,400 )  
    }
     
}


export default  jwtAuth 
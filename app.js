import express from 'express'
import dotenv from 'dotenv'

import connectToDb from './config/db.js'
import errorMiddleware from './middlewares/error.middleware.js'
import morgan from 'morgan'
const app  = express() 
dotenv.config()
import userRoutes from "./routes/user.routes.js"
import urlRoute from "./routes/url.route.js"
import cors from "cors"
import cookieParser from 'cookie-parser'
app.use(cookieParser())
app.use(express.json())
// Connecting To database  
connectToDb()
app.use(morgan("dev"))

app.use(cors({
    
    origin :["http://localhost:5173"  ,"https://linkshort-hdnxh2luo-ayush-vishwakarmas-projects.vercel.app/"],
    credentials : true
}))

// User Route 

app.use("/api/v1/user" , userRoutes ) 

// Url Route 

app.use("/" ,urlRoute)




app.use("*" , (req ,res)=>{
    res.status(404).send("OOPS PAGE NOT FOUND ! ") 
 

})

app.use(errorMiddleware)

export default app 

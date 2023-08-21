import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectToDb from './config/db.js'
import errorMiddleware from './middlewares/error.middleware.js'
import morgan from 'morgan'
const app  = express() 
dotenv.config({path:'./.env'})
import userRoutes from "./routes/user.routes.js"
import urlRoute from "./routes/url.route.js"
import cookieParser from 'cookie-parser'
app.use(cookieParser())
app.use(express.json())
// Connecting To database  
connectToDb()
app.use(morgan("dev"))



// User Route 

app.use("/api/v1/user" , userRoutes ) 

// Url Route 

app.use("/" ,urlRoute)




app.use("*" , (req ,res)=>{
    res.status(404).send("OOPS PAGE NOT FOUND ! ") 
    res.json({
        success :false 
    }) 

})

app.use(errorMiddleware)

export default app 

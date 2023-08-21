import mongoose  from "mongoose";
const urlSchema = new mongoose.Schema({
    urlID : {
        type: Number
    },
    userId : {
        type : String
    },
    shortUrl : {
        type : String
    },
    longUrl  : { 
        type: String 
    },
    expiry : {
        type : Date
    },
    status : {
        type : String,
        default : "INACTIVE"
    }
},{
    timestamps: true 
})

export default mongoose.model("urlmodel", urlSchema)
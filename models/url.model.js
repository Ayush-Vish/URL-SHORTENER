import mongoose  from "mongoose";
const urlSchema = new mongoose.Schema({
    userId : {
        type: String
    },
    shortUrl : {
        type : String
    },
    longUrl  : { 
        type: String 
    }
},{
    timestamps: true 
})

export default mongoose.model("urlmodel", urlSchema)
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
    linkShortUrl: {
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
    },
    clicks:  {
        type : Number ,
        default: 0
    }, 
    qrCode : {
        public_id: String,
        secureUrl : String
    }
},{
    timestamps: true 
})

export default mongoose.model("urlmodel", urlSchema)
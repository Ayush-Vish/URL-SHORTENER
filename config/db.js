import mongoose from "mongoose";

const connectToDb = async ()=> {
    await mongoose.connect(process.env.MONGO_URI )
        .then((conn)=>{
            console.log(`Connected TO database ${conn.connection.host}`)
        }).catch((e)=>{ 
            console.log(`Error Occured While Connecting To database ${e.message}`)
            process.exit(1) 
        })
}


export default connectToDb 




import mongoose from "mongoose";

const connectToDb = async ()=> {
    await mongoose.connect("mongodb://127.0.0.1:27017/URLSHORTENER?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1" )
        .then((conn)=>{
            console.log(`Connected TO database ${conn.connection.host}`)
        }).catch((e)=>{ 
            console.log(`Error Occured While Connecting To database ${e.message}`)
            process.exit(1) 
        })
}


export default connectToDb 




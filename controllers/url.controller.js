import urlModel from "../models/url.model.js"

const makeShortUrlInDB = async (req , res , next) => {
    let lengthOfUrls= 0
    
    for(let num=0  ;num < 10000 ; num ++ )  {
        const combinationArray = "abcdefghkijklmnopqrstuvwxyx1234567890ABCDEFGHIJKLMOPQRSTUVWXYZ~!@#$%^&*()_+"
        let str = ""
        
        for(let i =0 ;i < 6 ;i ++ ) 
        {       
            str += ((combinationArray[Math.floor((Math.random() *100) %combinationArray.length)]) )
        }
        const url =await urlModel.findOne({shortUrl: str})
        if(url) {
            continue; 
        }else { 
            const smallUrl =await urlModel.create({
                urlID : lengthOfUrls,
                shortUrl :str 
            })

            await smallUrl.save() 
            

        }
        lengthOfUrls = (await urlModel.find({})).length

    }
    return res.status(200).json({ 
        succesS :true , 
        data : await urlModel.find({})
    })
}
const linkShortUrL = async (req, res, next) => { 
    const {longUrl}  = req.body 

    
}
export default {
    makeShortUrlInDB, 
    linkShortUrL
     
}
import urlModel from "../models/url.model.js"
import isUrl from "is-url"
import Apperror from "../utility/error.util.js"
const makeShortUrlInDB = async (req , res , next) => {
    let lengthOfUrls= 0
    
    for(let num=0  ;num < 100;   num ++ )  {
        const combinationArray = "abcdefghkijklmnopqrstuvwxyx1234567890ABCDEFGHIJKLMOPQRSTUVWXYZ"
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

    try {
        const {longUrl}  = req.body 
        const validUrl= await  isUrl(longUrl)
        if(!validUrl)   {
            return next(new Apperror("Please provide Valid Url ", 400)  ) 
        }
        const url  = await urlModel.findOne({status: "INACTIVE"}) 
        if(!url)  { 
            return next(new Apperror("Url Cannot be Found",400))
        }
        const authorId = req.user.id 
        if(!authorId) {
            return next(new Apperror("User is not Logged In " ,400)) 
        }
        url.userId = authorId 
        url.longUrl = longUrl 
        url.status= "ACTIVE"
        await url.save()

        return res.status(200).json({ 
            success:  true, 
            message : "Url Linked SuccessFully",
            shortUrl: `${process.env.HOSTNAME}:${process.env.PORT}/${url.shortUrl}`
        })
        

    } catch (e) {
        return next(new Apperror(e.message ,400))
    }
}
const clickShortLink =async  (req, res, next) => { 
    console.log("Click on Short Link me Hu ")
    try {
        const hash = req.params["hash"]
        const longUrl = await urlModel.findOne({shortUrl: hash})
        if(!longUrl) { 
            return next(new Apperror("LongUrl Corresponding to Short Url Does Not Exists " ,500 )) 
        }
        longUrl.clicks ++ ;
        
        await longUrl.save()
        res.redirect(longUrl.longUrl)
        res.status(200)
        
        if(!res.finished) { 
            return  res.json({ 
                success :true, 
                message:"Redirected SUccessfully "
    
            })
        }
        

    } catch (e) {
        return next(new Apperror (e.message , 400 ) ) 

    }
}
const deleteUrl = async(req ,res, next) => { 
    const {shortUrl} = req.body 

    try{ 

    }catch(e)  {
        
    }

} 
const getAllUrls  = async (req, res, next)=> {
     try {  
        console.log("fknjsdvbkljvgvfsdbjk")
        const userId = req.user.id 
        const urls =await urlModel.find({userId: userId})
        if(!urls.length)  {
            return next(new Apperror("User Does No tHave Any Urls", 400))
        }   
        return res.status(200).json({ 
            success: true, 
            urls
        })     
     } catch (e) {
        return next(new Apperror (e.message , 400))
     }
}
export default {
    makeShortUrlInDB, 
    linkShortUrL,
    clickShortLink,
    deleteUrl,
    getAllUrls


     
}
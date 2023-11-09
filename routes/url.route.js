import expresss from "express";
const  router = expresss.Router() 
import isLoggedIn from "../middlewares/authentication.middleware.js"
import url from "../controllers/url.controller.js"



router.route("/url/make-url").post(url.makeShortUrlInDB)
router.route("/url/link-shortUrl").post(isLoggedIn,url.linkShortUrL)
router.route("/:hash").get(url.clickShortLink)
router.route("/url/deleteUrl").post(url.deleteUrl)
router.route("/url/getAllUrls").get(isLoggedIn, url.getAllUrls) 
router.route("/url/:uid/genrate-qr")
        .get(url.generateQr)
router.route("/url/custom/:hash").post( isLoggedIn ,  url.makeCustomUrl)
export default router



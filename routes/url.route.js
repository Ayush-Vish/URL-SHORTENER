import expresss from "express";
const router = expresss.Router() 
import url from "../controllers/url.controller.js"
router.route("/make-url").post(url.makeShortUrlInDB)
router.route("link-shortUrl").post(url.linkShortUrL)


export default router
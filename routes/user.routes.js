import express from "express";

const route = express.Router() 
import user from "../controllers/user.controller.js"
import userController from "../controllers/user.controller.js";
import jwtAuth from "../middlewares/authorization.middleware.js";
import isLoggedIn from "../middlewares/authentication.middleware.js";
route.route("/").get() 
route.route("/register").post(user.register) 
route.route("/login").post(user.login)
route.route("/me").get(isLoggedIn,  user.me)
route.route("/logout").get(user.logout)

export default route 
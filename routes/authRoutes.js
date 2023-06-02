import express from "express";
import  {registerController,loginController,testController,forgotPasswordController,updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import {isAdmin  ,requireSignIn  } from "../middlewares/authMiddleware.js";
//router object
const router=express.Router() ;
//routing
//register || method=POST

router.post('/register',registerController);

//LOGIN || METHOD=POST
router.post('/login',loginController);

//Forgot Password
router.post('/forgot-password',forgotPasswordController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController); //requiresignin and admin  is middleware here


//protected user route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});   //the request which goes here is true then only we can access dashboard page  and we will acess user-auth in private route
});
    
//protected Admin route auth
router.get("/admin-auth",requireSignIn, isAdmin,(req,res)=>{
    res.status(200).send({ok:true});   //the request which goes here is true then only we can access dashboard page  and we will acess user-auth in private route
});

//update profile
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController);

//all orders
router.get("/all-orders", requireSignIn,getAllOrdersController);

router.put("/order-status/:orderId",requireSignIn,isAdmin, orderStatusController);


export default router;
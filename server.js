
import express from"express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';

//configure env
dotenv.config(); //our env file is in root so we dont need to mention location 
//rest object
const app=express()     //call express 

connectDB(); //call database

app.use(express.json()); //call json package
app.use(morgan("dev"));  //call morgan package 


// routes
app.use("/api/v1/auth",authRoutes);   //call authroutes   syntax:api/version/related to

//rest api
app.get('/',(req,res)=>{  //use arrow function to call api for homepage,we can handle requests and send response to user 
    res.send("<h1>Welcome to ecommerce app</h1>");     //this is send function
        
    })

//port
const PORT= process.env.PORT || 8080 //variable to store port address and we are getting the port value from env file by the help of process.env.port or else if port value isnt updated use 8080
app.listen(PORT,()=>{       //run app 
    console.log(`server running on ${PORT}`.bgCyan.white);   //$shows port number value
})
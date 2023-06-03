
import express from"express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors'
import productRoutes from "./routes/productRoutes.js";
import path from 'path';   //for hosting

//configure env
dotenv.config(); //our env file is in root so we dont need to mention location 
//rest object


connectDB(); //call database
const app=express()     //call express 



//middleware
app.use(cors());
app.use(express.json()); //call json package
app.use(morgan("dev"));  //call morgan package 
app.use(express.static(path.join(__dirname, './client/build')))   //for hosting


// routes
app.use("/api/v1/auth",authRoutes);   //call authroutes   syntax:api/version/related to
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
// app.get('/',(req,res)=>{  //use arrow function to call api for homepage,we can handle requests and send response to user 
//     res.send("<h1>Welcome to ecommerce app</h1>");     //this is send function
        
//     });

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

//port
const PORT= process.env.PORT || 8080; //variable to store port address and we are getting the port value from env file by the help of process.env.port or else if port value isnt updated use 8080
app.listen(PORT,()=>{       //run app 
    console.log(`server running on ${PORT}`.bgCyan.white);   //$shows port number value
});

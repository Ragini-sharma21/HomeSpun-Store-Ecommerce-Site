
import userModel from "../models/userModels.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//REGISTER

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;       //get name ,phone etc from user model using req.body
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });    //send responses 
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    //check   user
    const exisitingUser = await userModel.findOne({ email });  //findone function will find one document on basis of email
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);   //pass plane password in hashpassword function to get hashed password  , we can use password because we have already acquired password using req.body
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,   //add hashedpassword
    }).save();        //call save function 

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,    //pass user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,         //pass error as it is
    });
  }
};


//LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {  //using sign method we create the token on basis of id which comes from user._id and write expiry date after how many days token expires 
      expiresIn: "7d",       //after 7 days
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {            //obejct created by name of user
        _id: user._id,    //id kahan se aayegi user.id se;
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
  

//testcontroller   
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => { //when we will get the request ,then next will be evaluate authenticate user,then response will be send
  try {
    const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);  //token is present in header in authorization section 
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};    

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModels.findById(req.user._id);  //check id of user to see whether it is admin or not 
      if (user.role !== 1) {   //if role is 0 then it is user not admin
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();   //show response
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
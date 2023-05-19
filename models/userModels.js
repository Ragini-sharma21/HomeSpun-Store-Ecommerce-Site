import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {                             //object creation
      type: String,
      required: true,
      trim: true,   //remove white spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: Number,    // it is 0 then it is user if it is admin then it should be 1
      default: 0,
    },
  },
  { timestamps: true } //whenever new user will be created ,time will be shown 
);

export default mongoose.model("users", userSchema);    //users because already we have made user package in compass
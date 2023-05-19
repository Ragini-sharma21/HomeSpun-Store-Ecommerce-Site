import mongoose from "mongoose";
import colors from "colors";
const connectDB=async()=>{   //function to connect to database
try{
    const conn=await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Mongodb Database ${conn.connection.host}`.bgMagenta.white);  //conn.connection.host will show custer name
}
catch(error){
    console.log(`Error in mongodb ${error}`.bgRed.white);
}
}
export default connectDB;
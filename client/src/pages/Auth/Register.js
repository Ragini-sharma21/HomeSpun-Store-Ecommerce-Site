import React,{useState} from "react";
import Layout from "./../../components/Layout/Layout";
import toast from 'react-hot-toast'; //to show popup messages
import axios from "axios";
import {useNavigate} from 'react-router-dom'  //with this we can redirect
import "../../styles/AuthStyles.css";
 
const Register=()=>{

    const [name, setName] = useState("");  //getter setter functions to change and set value inside forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer,setAnswer]=useState("");
  const navigate= useNavigate();         //we need to create variable in order to use Navigate because it is a hook thts why we cant use it directly

  //form function
  const handleSubmit =async (e)=>{
    e.preventDefault();   //this will prevent the refreshing of page which is happening bydefault on submit form .here e stands for event 
    try{
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success( res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  

    return(
        <Layout title="Register-HomeSpun">

    <div className="form-container" style={{ minHeight: "90vh" }}>
    
     

      {/*bootstrap form*/}
     <form onSubmit={handleSubmit}>   {  /*calls handlesubmit function*/}
        
        
        
  <h4 className="title">REGISTER FORM</h4>
  <div className="mb-3">
    
    <input type="text" 
    value={name}    /*additional field for using state to store form values*/
    onChange={(e)=> setName(e.target.value)}  /*it will take event and then change the orginal val*/
    className="form-control"
     id="exampleInputName"
     placeholder="Enter Your Name" 
     required 
     autoFocus/>
    </div>
    <div className="mb-3">
    
    <input 
    type="email" 
    value={email}
    onChange={(e)=> setEmail(e.target.value)}
    className="form-control" 
    id="exampleInputEmail1"  
    placeholder="Enter Your Email"
    required/>
     </div>
    <div className="mb-3">
    
    <input type="password" 
    value={password}
    onChange={(e)=> setPassword(e.target.value)}
    className="form-control" 
    id="exampleInputPassword1"
    placeholder="Enter Your Password"
    required />
  </div>

    <div className="mb-3">
   
    <input type="text" 
    value={phone}
    onChange={(e)=> setPhone(e.target.value)}
    className="form-control"
     id="exampleInputPhone" 
     placeholder="Enter Your Mobile Number"
     required />   { /*for validation so that it dont remain empty*/}
     </div>

    <div className="mb-3">

    <input type="text"
    value={address}
    onChange={(e)=> setAddress(e.target.value)}
     className="form-control" 
     id="exampleInputAddress"
     placeholder="Enter Your Address" 
     required />

  </div>

  <div className="mb-3">

    <input type="text"
    value={answer}
    onChange={(e)=> setAnswer(e.target.value)}
     className="form-control" 
     id="exampleInputAddress"
     placeholder="What is your movie" 
     required />

  </div>

  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
    <label className="form-check-label" htmlFor="exampleCheck1">Agree to our terms and conditions</label>
  </div>
  <button type="submit" className="btn btn-primary">REGISTER</button>

</form>


      </div>
    </Layout>
  );
};

export default Register;
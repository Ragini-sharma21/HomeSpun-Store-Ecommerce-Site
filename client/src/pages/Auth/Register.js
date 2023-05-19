import React,{useState} from "react";
import Layout from "./../../components/Layout/Layout";
import {toast} from 'react-toastify'
const Register=()=>{

    const [name, setName] = useState("");  //getter setter functions to change and set value inside forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  const handleSubmit =(e)=>{
    e.preventDefault();   //this will prevent the refreshing of page which is happening bydefault on submit form .here e stands for event 
    console.log(name,email,password,address,phone)
    toast.success('Registered Successfully ')    // to show pop for successful registration
  };

    return(
        <Layout title="Register-HomeSpun">

    <div className="register">
     <h1>Register</h1>
     

      {/*bootstrap form*/}
     <form onSubmit={handleSubmit}>   {  /*calls handlesubmit function*/}
        
        
        
  
  <div className="mb-3">
    
    <input type="text" 
    value={name}    /*additional field for using state to store form values*/
    onChange={(e)=> setName(e.target.value)}  /*it will take event and then change the orginal val*/
    className="form-control"
     id="exampleInputName"
     placeholder="Enter Your Name" 
     required />
    </div>
    <div className="mb-3">
    
    <input type="email" 
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
     id="exampleInputEmail1" 
     placeholder="Enter Your Mobile Number"
     required />   { /*for validation so that it dont remain empty*/}
     </div>

    <div className="mb-3">

    <input type="text"
    value={address}
    onChange={(e)=> setAddress(e.target.value)}
     className="form-control" 
     id="exampleInputEmail1"
     placeholder="Enter Your Address" 
     required />

  </div>

  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
    <label className="form-check-label" htmlFor="exampleCheck1">Agree to our terms and conditions</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>

</form>


      </div>
    </Layout>
  );
};

export default Register;
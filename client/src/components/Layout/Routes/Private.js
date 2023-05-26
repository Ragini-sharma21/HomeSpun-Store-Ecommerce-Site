  //private route
   import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");   //.api from serverjs
      if (res.data.ok) {   //if we got ok request 
        setOk(true); 
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck(); //agr token milta hai tabhi function execute hoga 
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
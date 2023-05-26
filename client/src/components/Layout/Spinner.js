import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";   //used to redirect
const Spinner = ({path="login"}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {                 //useeffect ke ander multiple function create kr sakte hai
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);  //decrement from 5
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,   //the path whoch user want to acess or current path
      });
    return () => clearInterval(interval);
  }, [count, navigate, location,path]);   //dependencies
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us -HomeSpun Store"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpg"
            alt="aboutus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Welcome to our exquisite collection of handcrafted products from the enchanting region of Jammu and Kashmir. Each piece in our curated selection showcases the rich cultural heritage and exceptional craftsmanship of this breathtaking land. Discover the artistry and passion infused into every creation, from intricately woven textiles to delicately carved wooden masterpieces. <br/>
          Start your journey of elegance and authenticity with us today!
          </p>
        </div>
      </div>
    </Layout>
  );
};



export default About;

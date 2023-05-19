import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title="Privacy Policies">
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>We collect and use your personal information solely for the purpose of processing orders.</p>
          <p>Our website uses cookies to improve your browsing experience</p>
          <p>We are committed to the privacy and security of your personal information</p>
          <p> We reserve the right to update or modify this policy at any time</p>
          <p>If you have any questions or concerns about our Privacy Policy, please contact our customer support team.</p>
          
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
import React from 'react'
import Header from "./Header";
import Footer from './Footer';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const Layout = ({children,title,description,keywords,author}) => {   /*meta tags for search engine */
  return (
    <div>
        <Helmet>
        <meta charSet="utf-8"/>
        <meta name="description" content={description}/>
        <meta name ="keywords" content={keywords}/>
        <meta name="author" content={author}/>
        <title>{title}</title>
        </Helmet>
        <Header/>
        <main style={{minHeight:"70vh"}}>
          <ToastContainer/>
            {children}
        </main>
        
        <Footer/>
    </div>
  );
};

Layout.defaultProps={       /*default meta tags for seo*/
  title : "Ecommerce App",
  description:"Crafted Treasures from Jammu and Kashmir | Explore Authentic Handcrafted Products - Immerse yourself in the artistry of Jammu and Kashmir with our exquisite collection of handcrafted treasures",
  keywords:"handcrafted products, Jammu and Kashmir, artisanal treasures,  local artisans, online shopping",
  author:"Ragini Sharma(IIIT-BH)",
};

export default Layout
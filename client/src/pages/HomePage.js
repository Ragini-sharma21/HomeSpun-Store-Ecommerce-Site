
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import {useNavigate} from "react-router-dom";
import {useCart} from "../context/cart";
import toast from "react-hot-toast";
const HomePage = () => {
  const navigate=useNavigate();
  const [cart,setCart]= useCart();
  const [products, setProducts] = useState([]); //initial state mei products ko empty rakho []
  const [categories, setCategories] = useState([]);  //initially sabko empty state dedo
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category"); //api call
      if (data?.success) {
        setCategories(data?.category); //jab api call hua tab category ko set krdo
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {        //useeffect hooke
    getAllCategory();         //imtial time pe category milne wali hai
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);   //jab api call hua tab products ko set krdo
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);  //jo b data aaya usko total se fulfill krwaao
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);


  //load more
  const loadMore = async () => {   //jabtak saare product khtam nhi hote tabtak loadmore ka button aayega 
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);   //jaise hi requst gyi false krdo
      setProducts([...products, ...data?.products]); //products ko as it is rakho fil jo data aaya usko as it is spread krke show krwaado
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];     //let becuase changes can be made       //jo bhi values checked hongi woh store ho jaayengi all ke ander//...means spread krna
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);      //set checked mei all ki value ko assign krdo
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts(); //if no filter is added show all products
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct(); //if filter is added show only checked products
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (    //category ko map krwado agr milti hai toh
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}   //checked wali categories ke products ko show krwaao
              >
                {c.name}       {/*display categories name*/}
              </Checkbox>
            ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}> {/*radio button*/}
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>  {/*priduct show krwaado*/}
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button                     //button to reset all filters
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>    {/*//card to show all products*/}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...    {/*description length*/}
                  </p>
                  <p className="card-text"> $ {p.price}</p>     {/*buttons*/}
                  <button class="btn btn-primary ms-1"
                  onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1" onClick={()=>{
                    setCart([...cart,p])   //display card as it is and add more products in it 
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))//store that product in localstorage to prevent loss after page refersh
                  toast.success('Item Added to cart')}}>ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (   //show more products and load more pages button
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
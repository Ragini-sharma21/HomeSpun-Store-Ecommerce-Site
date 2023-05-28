import React from "react";
import { useSearch } from "../../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(   //destructuring data
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });      //result ko data se fulfill krdo
      navigate("/search");  //redirect on search page
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>        {/*bootstrap form for search button in header*/}
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}  //value ke ander keyword ko pass krwaado upar
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/index.css";
import Pagination from "../../components/Pagination/Pagination";
import SkeletonShoes from "../../components/Skeleton/SkeletonShoes";
import { setText } from "../../redux/searchReducer";
import Shoe from "./Shoe";
import { Slider, TextField } from "@mui/material";

const ShoesList = ({ type, list, pagination, handle, loading, types,max }) => {
  const text = useSelector((state) => state.search.text);
  const flag = useSelector((state) => state.search.flag);
  const { handleApply, handleSetTo, handleSetFrom, handleSetKind } = handle;
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [value, setValue] = useState([0, 10000000]);
  const handleChange = (e, newValue) => {
    setValue(newValue);
    handleSetTo(newValue[0]);
    handleSetFrom(newValue[1]);
  };

  console.log(value);

  return (
    <div className="bg-[#222222] min-h-[100vh] relative py-5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto my-0 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[20%] bg-[#2a2a2a] mt-0 md:mt-6 rounded-md py-2 px-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-100 text-xl underlined-blue">Category</h1>
            <i
              onClick={() => setDisplay(!display)}
              className="block md:hidden text-gray-100 text-lg cursor-pointer fa-solid fa-filter"
            ></i>
          </div>
          <ul className="mt-5">
            <Link
              to={`/products`}
              className={`${
                !type && "active"
              } capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
            >
              All Products
            </Link>
            {flag && flag && (
              <Link
                to={`/products/results`}
                className={`${
                  type === "results" && "active"
                } capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
              >
                Results
              </Link>
            )}
            {types?.map((item) => (
              <Link
                key={item._id}
                to={`/products/${item.type}?id=${item._id}`}
                className={`${
                  item.type === type ? "active" : ""
                } capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
              >
                {item.type}
              </Link>
            ))}
          </ul>

          <div className={`${display ? "block" : "hidden"} md:block`}>
         
          <div className="mt-3">
          <form action="" onSubmit={handleApply}>
           <TextField id="outlined-basic" InputLabelProps={{style : {color : 'white'} }} label="Search" size="small" value={text} onChange={(e) => dispatch(setText(e.target.value))} inputProps={{style:{color:'white', backgroundColor:'#222'}}} variant="outlined" />
           </form>
          </div>

            <ul className="mt-3">
              <h3 className="text-gray-100 text-lg">Prices</h3>

              <Slider
                getAriaLabel={() => "Prices range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={max}
              />
            </ul>

            <div className="mt-3">
              <h3 className="text-gray-100 text-lg">Types</h3>

              {types &&
                types.map((item) => (
                  <label
                    key={item._id}
                    htmlFor={`input-${item._id}`}
                    className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="inputType"
                      id={`input-${item._id}`}
                      onChange={() => handleSetKind(item._id)}
                    />
                    <p className="capitalize">{item.type}</p>
                  </label>
                ))}
              <label
                htmlFor={`input-none`}
                className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="inputType"
                  id={`input-none`}
                  onChange={() => handleSetKind(undefined)}
                />
                <p className="capitalize">All</p>
              </label>
            </div>
            <button
              onClick={handleApply}
              className="w-full mt-3 px-5 py-1 text-gray-100 bg-transparent border border-blue-400 rounded-md hover:bg-blue-700 transition-all"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="w-full md:w-[80%] px-5">
          <h1 className="text-gray-100 text-2xl p-5 underlined-blue uppercase">
            {(type && type) || "ALL PRODUCT"}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 p-2 sm:p-4 md:p-5">
            {loading && <SkeletonShoes item={8} />}

            {list &&
              list.length > 0 &&
              list.map((item, index) => <Shoe key={index} product={item} />)}
          </div>
          {list && list.length < 1 && (
            <img
              className="w-full text-center object-cover"
              src="https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png"
            ></img>
          )}
          {list && list.length > 0 && (
            <Pagination pagination={pagination} handle={handle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoesList;

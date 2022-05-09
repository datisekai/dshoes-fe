import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/index.css";
import Pagination from "../../components/Pagination/Pagination";
import SkeletonShoes from "../../components/Skeleton/SkeletonShoes";
import { setText } from "../../redux/searchReducer";
import Shoe from "./Shoe";
import { Slider, TextField } from "@mui/material";

const ShoesList = ({ type, list, pagination, handle, loading, types, max }) => {
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
  return (
    <div className='tw-bg-[#222222] tw-min-h-[100vh] tw-relative tw-py-5 tw-overflow-hidden'>
      <div className='tw-max-w-[1200px] tw-mx-auto tw-my-0 tw-flex tw-flex-col md:tw-flex-row tw-justify-between'>
        <div className='tw-w-full md:tw-w-[20%] tw-bg-[#2a2a2a] tw-mt-0 md:tw-mt-6 tw-rounded-md tw-py-2 tw-px-5'>
          <div className='tw-flex tw-justify-between tw-items-center'>
            <h1 className='tw-text-gray-100 tw-text-xl underlined-blue'>
              Category
            </h1>
            <i
              onClick={() => setDisplay(!display)}
              className='tw-block md:tw-hidden tw-text-gray-100 tw-text-lg tw-cursor-pointer fa-solid fa-filter'
            ></i>
          </div>
          <ul className='tw-mt-5'>
            <Link
              to={`/products`}
              className={`${
                !type && "active"
              } tw-capitalize tw-block tw-text-gray-100 tw-py-[4px] tw-mt-1 hover:tw-text-gray-300 tw-transition-all`}
            >
              All Products
            </Link>
            {flag && flag && (
              <Link
                to={`/products/results`}
                className={`${
                  type === "results" && "active"
                } tw-capitalize tw-block tw-text-gray-100 tw-py-[4px] tw-mt-1 hover:tw-text-gray-300 tw-transition-all`}
              >
                Results
              </Link>
            )}
            {types?.map((item) => {
              if (item.display && item.display) {
                return (
                  <Link
                    key={item._id}
                    to={`/products/${item.type}?id=${item._id}`}
                    className={`${
                      item.type === type ? "active" : ""
                    } tw-capitalize tw-block tw-text-gray-100 tw-py-[4px] tw-mt-1 hover:tw-text-gray-300 tw-transition-all`}
                  >
                    {item.type}
                  </Link>
                );
              }
              return <></>;
            })}
          </ul>

          <div className={`${display ? "tw-block" : "tw-hidden"} md:tw-block`}>
            <div className='tw-mt-3 tw-w-full'>
              <form action='' onSubmit={handleApply}>
                <TextField
                  id='outlined-basic'
                  InputLabelProps={{ style: { color: "white" } }}
                  label='Search'
                  size='small'
                  value={text}
                  onChange={(e) => dispatch(setText(e.target.value))}
                  inputProps={{
                    style: { color: "white", backgroundColor: "#222" },
                  }}
                  className='tw-w-full'
                  variant='outlined'
                />
              </form>
            </div>

            <ul className='tw-mt-3'>
              <h3 className='tw-text-gray-100 tw-text-lg'>Prices</h3>

              <Slider
                getAriaLabel={() => "Prices range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay='auto'
                min={0}
                max={max}
              />
            </ul>

            <div className='tw-mt-3'>
              <h3 className='tw-text-gray-100 tw-text-lg'>Types</h3>

              {types &&
                types.map((item) => (
                  <label
                    key={item._id}
                    htmlFor={`input-${item._id}`}
                    className='tw-flex tw-items-center tw-justify-between tw-mt-1 tw-text-gray-100 tw-px-5 tw-py-1 tw-bg-[#222] tw-rounded-md hover:tw-opacity-75 tw-transition-all tw-cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='inputType'
                      id={`input-${item._id}`}
                      onChange={() => handleSetKind(item._id)}
                    />
                    <p className='capitalize'>{item.type}</p>
                  </label>
                ))}
              <label
                htmlFor={`input-none`}
                className='tw-flex tw-items-center tw-justify-between tw-mt-1 tw-text-gray-100 tw-px-5 tw-py-1 tw-bg-[#222] tw-rounded-md hover:tw-opacity-75 tw-transition-all tw-cursor-pointer'
              >
                <input
                  type='radio'
                  name='inputType'
                  id={`input-none`}
                  onChange={() => handleSetKind(undefined)}
                />
                <p className='tw-capitalize'>All</p>
              </label>
            </div>
            <button
              onClick={handleApply}
              className='tw-w-full tw-mt-3 tw-px-5 tw-py-1 tw-text-gray-100 tw-bg-transparent tw-border tw-border-blue-400 tw-rounded-md hover:tw-bg-blue-700 tw-transition-all'
            >
              Apply
            </button>
          </div>
        </div>
        <div className='tw-w-full md:tw-w-[80%] tw-px-5'>
          <h1 className='tw-text-gray-100 tw-text-2xl tw-p-5 underlined-blue tw-uppercase'>
            {(type && type) || "ALL PRODUCT"}
          </h1>
          <div className='tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4 sm:tw-gap-8 tw-p-2 sm:tw-p-4 md:tw-p-5'>
            {loading && <SkeletonShoes item={8} />}

            {list &&
              list.length > 0 &&
              list.map((item, index) => {
                if (item.status === 1) {
                  return <Shoe key={index} product={item} />;
                }
                return <></>;
              })}
          </div>
          {list && list.length < 1 && (
            <img
              className='tw-w-full tw-text-center tw-object-cover'
              src='https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png'
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

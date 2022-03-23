import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { Link, NavLink } from "react-router-dom";
import "../../assets/css/index.css";
import Pagination from "../../components/Pagination/Pagination";
import SkeletonShoes from "../../components/Skeleton/SkeletonShoes";
import Shoe from "./Shoe";

const ShoesList = ({ type, list, pagination, handle, loading, types }) => {
  return (
    <div className="bg-[#222222] min-h-[100vh] relative py-5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto my-0 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[20%] bg-[#2a2a2a] mt-6 rounded-md py-2 px-5">
          <h1 className="text-gray-100 text-xl underlined-blue">Category</h1>
          <ul className="mt-5">
          <Link
                to={`/products`}
                className={`${!type && 'active'} capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
              >
                All Products
              </Link>
            {types?.map((item) => (
              <Link
                to={`/products/${item.type}?id=${item._id}`}
                className={`${item.type === type ? 'active' : ''} capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
              >
                {item.type}
              </Link>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-[80%] px-5">
          <h1 className="text-gray-100 text-2xl p-5 underlined-blue uppercase">
            {type && type || 'ALL PRODUCT'}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 p-2 sm:p-4 md:p-5">
            {loading && <SkeletonShoes item={8} />}

            {list &&
              list.length > 0 &&
              list.map((item, index) => <Shoe key={index} product={item} />)}
          </div>
          <Pagination pagination={pagination} handle={handle} />
        </div>
      </div>
    </div>
  );
};

export default ShoesList;

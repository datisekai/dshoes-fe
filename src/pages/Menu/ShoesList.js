import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/index.css";
import Back from "../../components/Back/Back";
import Pagination from "../../components/Pagination/Pagination";
import NumberFormat from "react-number-format";

const ShoesList = ({ type, list, pagination, handle }) => {
  return (
    <div className="bg-[#222222] min-h-[100vh] relative py-5">
      <div className="max-w-[1200px] mx-auto my-0">
        <h1 className="text-gray-100 text-2xl p-5 underlined-blue uppercase">
          {type}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 p-2 sm:p-4 md:p-5">
          {list &&
            list.length > 0 &&
            list.map((item, index) => (
              <Link to={`/detail/${item._id}`} key={item._id}>
                <div className="relative">
                  <img
                    src={item.image[0]}
                    className="w-[266px] h-[266px] rounded-md relative"
                  ></img>

                  <div className="absolute bottom-[20%] left-[25%]">
                    <NumberFormat
                      className="bg-transparent text-blue-400 text-lg outline-none"
                      thousandSeparator={true}
                      suffix=" VND"
                      value={item.prices}
                    />
                  </div>
                  <h2 className="text-gray-100 truncate py-2">{item.name}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Pagination pagination={pagination} handle={handle}/>
    </div>
  );
};

export default ShoesList;

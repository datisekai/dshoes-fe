import React from "react";
import "../../assets/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className="min-h-screen bg-[#222222]">
      <div className="max-w-[1200px] mx-auto py-10 pt-5">
        <div className="mx-auto w-[280px] sm:w-[400px] md:w-[450px] lg:w-[550px] bg-[#2A2A2A] p-4 md:px-5 rounded-md">
          <h1 className="text-gray-100 underlined-blue text-lg md:text-xl">
            Search
          </h1>
          <form action="">
            <h2 className="mt-3 text-gray-100 text-lg">Basic</h2>
            <div className="flex justify-center items-center mt-4">
              <input
                type="text"
                name=""
                id=""
                className="rounded-md w-full px-3 py-1 md:px-4 border-b text-gray-100 border-[#007BFF] outline-none bg-transparent"
                placeholder="Enter somethings..."
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="py-1 px-2 text-2xl text-red-400 hover:text-red-500 transition-all cursor-pointer"
              />
            </div>

            <div className="mt-2">
              <h2 className="text-gray-100 text-lg py-2">Advance</h2>
              <div className="flex justify-between items-center flex-col sm:flex-row">
                <select
                  name=""
                  id=""
                  className="rounded-md px-2 py-1 uppercase bg-transparent text-gray-300"
                >
                  <option value="">Chọn loại</option>
                  <option value="">nike</option>
                  <option value="">jordan</option>
                  <option value="">adidas</option>
                </select>
                <select name="" id="" className="rounded-md px-2 py-1 uppercase mt-2 sm:mt-0 bg-transparent text-gray-300">
                    <option value="">Chọn giá</option>
                    <option value="">Trên 5 Triệu</option>
                    <option value="">Từ 2 - 5 Triệu</option>
                    <option value="">Dưới 2 triệu</option>
                </select>
              </div>
              <button className="w-full uppercase px-5 py-1 mt-3 bg-[#007BFF] rounded-md text-gray-100 hover:bg-blue-600">Search Advance</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;

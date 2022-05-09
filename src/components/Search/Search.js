import React from "react";
import "../../assets/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className='tw-min-h-screen tw-bg-[#222222]'>
      <div className='tw-max-w-[1200px] tw-mx-auto tw-py-10 tw-pt-5'>
        <div className='tw-mx-auto tw-w-[280px] sm:tw-w-[400px] md:tw-w-[450px] lg:tw-w-[550px] tw-bg-[#2A2A2A] tw-p-4 md:tw-px-5 tw-rounded-md'>
          <h1 className='tw-text-gray-100 underlined-blue tw-text-lg md:tw-text-xl'>
            Search
          </h1>
          <form action=''>
            <h2 className='tw-mt-3 tw-text-gray-100 tw-text-lg'>Basic</h2>
            <div className='tw-flex tw-justify-center tw-items-center tw-mt-4'>
              <input
                type='text'
                name=''
                id=''
                className='tw-rounded-md tw-w-full tw-px-3 tw-py-1 md:tw-px-4 tw-border-b tw-text-gray-100 tw-border-[#007BFF] tw-outline-none tw-bg-transparent'
                placeholder='Enter somethings...'
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='tw-py-1 tw-px-2 tw-text-2xl tw-text-red-400 hover:tw-text-red-500 tw-transition-all tw-cursor-pointer'
              />
            </div>

            <div className='tw-mt-2'>
              <h2 className='tw-text-gray-100 tw-text-lg tw-py-2'>Advance</h2>
              <div className='tw-flex tw-justify-between tw-items-center tw-flex-col sm:tw-flex-row'>
                <select
                  name=''
                  id=''
                  className='tw-rounded-md tw-px-2 tw-py-1 tw-uppercase tw-bg-transparent tw-text-gray-300'
                >
                  <option value=''>Chọn loại</option>
                  <option value=''>nike</option>
                  <option value=''>jordan</option>
                  <option value=''>adidas</option>
                </select>
                <select
                  name=''
                  id=''
                  className='rounded-md px-2 py-1 uppercase mt-2 sm:mt-0 bg-transparent text-gray-300'
                >
                  <option value=''>Chọn giá</option>
                  <option value=''>Trên 5 Triệu</option>
                  <option value=''>Từ 2 - 5 Triệu</option>
                  <option value=''>Dưới 2 triệu</option>
                </select>
              </div>
              <button className='w-full uppercase px-5 py-1 mt-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-md text-gray-100 hover:opacity-90 transition-all'>
                Search Advance
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;

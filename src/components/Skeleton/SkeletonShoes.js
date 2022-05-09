import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonShoes = ({ item }) => {
  const arrayNumber = Array.from(Array(item).keys());
  return (
    <>
      {arrayNumber.map((item, index) => (
        <div key={index} className='relative'>
          <div className='tw-bg-white tw-w-full tw-h-[266px] tw-rounded-md tw-flex tw-flex-col tw-justify-end tw-pb-3'>
            <p className='tw-bg-gray-200 tw-rounded-md tw-mx-auto tw-w-[80%] tw-skeleton tw-h-[20px]'></p>
          </div>
          <h1 className='tw-w-full tw-h-[20px] tw-bg-gray-200 tw-rounded-md skeleton tw-mt-2'></h1>
        </div>
      ))}
    </>
  );
};

export default SkeletonShoes;

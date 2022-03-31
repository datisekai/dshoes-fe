import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonShoes = ({ item }) => {
  const arrayNumber = Array.from(Array(item).keys());
  return (
    <>
      {arrayNumber.map((item,index) => (
        <div key={index} className="relative">
          <div className="bg-white w-full h-[266px] rounded-md flex flex-col justify-end pb-3">
            <p className="bg-gray-200 rounded-md mx-auto w-[80%] skeleton h-[20px]"></p>
          </div>
          <h1 className="w-full h-[20px] bg-gray-200 rounded-md skeleton mt-2"></h1>
        </div>
      ))}
    </>
  );
};

export default SkeletonShoes;

import React from "react";
import "../../assets/css/index.css";
import ReviewDetail from "./ReviewDetail";

const DesDetail = () => {
  return (
    <div className="md:w-[50%] lg:w-[40%] px-0 py-5 md:px-5">
      <h3 className="text-red-400">Sustainable Materials</h3>
      <h1 className="underlined-blue text-gray-100 text-2xl mt-2">
        Nike Air Max 2021
      </h1>
      <h3 className="text-gray-100 mt-2">Women's Shoes</h3>
      <h2 className="text-gray-100 text-xl mt-3">4,699,000₫</h2>
      <div className="flex justify-start items-center mt-3">
        <input type="radio" name="color" id="1" className="cursor-pointer" />
        <label htmlFor="1" className="text-gray-100 px-2 cursor-pointer">
          Black
        </label>
        <input type="radio" name="color" id="2" className="cursor-pointer" />
        <label htmlFor="2" className="text-gray-100 px-2 cursor-pointer">
          White
        </label>
        <input type="radio" name="color" id="3" className="cursor-pointer" />
        <label htmlFor="3" className="text-gray-100 px-2 cursor-pointer">
          Pink
        </label>
      </div>
      <div className="mt-3">
        <h3 className="text-gray-100">Select Size</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
          <button className="border border-gray-100 px-5 py-1 rounded-md text-gray-100 hover:bg-[#007BFF] transition-transform active:bg-[#007BFF]">
            EU 109
          </button>
        </div>
      </div>
      <button className="w-full mt-3 px-4 py-1 rounded-lg text-gray-100 hover:opacity-90 bg-gradient-to-r from-blue-400 to-red-400 transition-all">
        ADD TO BAG
      </button>
      <p className="mt-3 py-2 text-[#ccc] text-md">
        We could use a lot of superlatives to describe the Nike Air Max 2021.We
        could tell you that we've incorporated recycled materials to design a
        sneaker with at least 20% recycled content.Or that the new Air
        cushioning unit underfoot is our most revolutionary.Perhaps we'd call it
        the "the pinnacle of comfort"; waxing poetic about the cored-out foam
        midsole that gives you the lightest, softest feel.But maybe we just say
        it's modern meets technical with a splash of heritage DNA.What fun is
        there in giving away the surprises?
      </p>
      <ReviewDetail/>
    </div>
  );
};

export default DesDetail;

import React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/css/index.css";

const Sumary = ({ carts }) => {
  const total = carts?.reduce((pre, cur) => pre + cur.prices * cur.quantify, 0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleCheckOut = () => {
    if (carts && carts.length > 0) {
      !user ? navigate("/login?action=check-out") : navigate("/check-out");
    } else {
      toast.error("No products in your shopping cart!");
    }
  };
  return (
    <div className='tw-w-full md:tw-w-[50%] lg:tw-w-[40%] tw-mt-4 tw-md:px-5 tw-md:mt-0'>
      <h1 className='underlined-blue tw-text-gray-100 tw-text-2xl'>SUMMARY</h1>
      <div className='tw-flex tw-justify-between tw-items-center tw-mt-2'>
        <p className='tw-flex tw-items-center tw-text-md tw-text-gray-300'>
          Count products{" "}
          <i className='tw-ml-1 tw-text-md fa-solid fa-circle-question'></i>
        </p>
        <p className='tw-text-gray-300'>{carts && carts.length} products</p>
      </div>
      <div className='tw-flex tw-justify-between tw-items-center tw-mt-2 tw-border-b tw-border-[#ccc] tw-pb-2'>
        <p className='tw-flex tw-items-center tw-text-gray-300'>
          Total <i className='tw-ml-1 fa-solid fa-coins'></i>
        </p>
        <p className='tw-text-gray-300'>
          {" "}
          <NumberFormat
            className='tw-bg-transparent tw-text-gray-300 tw-text-md  tw-text-right tw-outline-none tw-w-full'
            thousandSeparator={true}
            suffix=' VND'
            displayType='text'
            value={total}
          />
        </p>
      </div>
      <button
        onClick={handleCheckOut}
        className={`tw-uppercase tw-mt-3 tw-w-full tw-bg-gradient-to-r tw-from-blue-400 tw-to-red-400 tw-rounded-md tw-px-5 tw-py-1 tw-text-gray-200 hover:tw-opacity-90 hover:tw-text-gray-100 tw-transition-all`}
      >
        Check out
      </button>
    </div>
  );
};

export default Sumary;

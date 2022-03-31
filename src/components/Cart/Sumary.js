import React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/css/index.css";

const Sumary = ({ carts }) => {
  const total = carts?.reduce((pre, cur) => pre + cur.prices * cur.quantify, 0);
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.user.userInfo);

  const handleCheckOut = () => {
    if (carts && carts.length > 0) {
      !email ? navigate("/login?action=check-out") : navigate("/check-out");
    } else {
      toast.error("No products in your shopping cart!");
    }
  };
  return (
    <div className="w-full md:w-[50%] lg:w-[40%] mt-4 md:px-5 md:mt-0">
      <h1 className="underlined-blue text-gray-100 text-2xl">SUMMARY</h1>
      <div className="flex justify-between items-center mt-2">
        <h3 className="flex items-center text-gray-300">
          Count products <i className="ml-1 fa-solid fa-circle-question"></i>
        </h3>
        <h3 className="text-gray-300">{carts && carts.length} products</h3>
      </div>
      <div className="flex justify-between items-center mt-2 border-b border-[#ccc] pb-2">
        <h3 className="flex items-center text-gray-300">
          Total <i className="ml-1 fa-solid fa-coins"></i>
        </h3>
        <h3 className="text-gray-300">
          {" "}
          <NumberFormat
            className="bg-transparent text-gray-300 text-md  text-right outline-none w-full"
            thousandSeparator={true}
            suffix=" VND"
            displayType="text"
            value={total}
          />
        </h3>
      </div>
      <button
        onClick={handleCheckOut}
        className={`uppercase mt-3 w-full bg-gradient-to-r from-blue-400 to-red-400 rounded-md px-5 py-1 text-gray-200 hover:opacity-90 hover:text-gray-100 transition-all`}
      >
        Check out
      </button>
    </div>
  );
};

export default Sumary;

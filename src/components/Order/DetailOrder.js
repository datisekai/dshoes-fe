import axios from "axios";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import { base_orders } from "../../api/config";

const DetailOrder = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${base_orders}/detail/${id}`);
      setDetails(res.data.detail);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-[#222] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-5">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h1 className="underlined-blue uppercase text-gray-100 text-2xl">
              Detail
            </h1>
            <h3
              onClick={() => navigate(-1)}
              className="text-gray-300 text-md hover:text-gray-500 transition-all cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i> Back
            </h3>
          </div>
          <div className="mt-2">
            {details?.map((item) => (
              <div className="mt-3 border-b border-solid border-[#ccc] flex  py-5">
                <img
                  className="w-[120px] h-[120px] object-cover rounded-md"
                  src={item.productId.image[0]}
                ></img>
                <div className="px-5 w-[45%]">
                  <h2 className="text-gray-100 text-md">
                    {item.productId.name}
                  </h2>
                  <p className="text-red-300 text-sm">Women's Shoes</p>
                  <p className="text-gray-200 text-md">
                    <span className="capitalize">{item.color}</span> Shoes
                  </p>
                  <p className="text-gray-200 text-md">Size {item.size}</p>
                  <p className="text-gray-200 text-md">
                    Quantify {item.quantify}
                  </p>
                </div>
                <h3 className="text-gray-100">
                  <NumberFormat
                    className="bg-transparent text-gray-100 outline-none w-full"
                    thousandSeparator={true}
                    suffix=" VND"
                    value={item.productId.prices}
                    displayType="text"
                  />
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;

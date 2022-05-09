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
    <div className='tw-bg-[#222] tw-min-h-screen'>
      <div className='tw-max-w-[1200px] tw-mx-auto tw-p-5'>
        <div className='tw-w-full'>
          <div className='tw-flex tw-justify-between tw-items-center'>
            <h1 className='underlined-blue tw-uppercase tw-text-gray-100 tw-text-2xl'>
              Detail
            </h1>
            <h6
              onClick={() => navigate(-1)}
              className='tw-text-gray-300 tw-text-md hover:tw-text-gray-500 tw-transition-all tw-cursor-pointer'
            >
              <i className='fa-solid fa-arrow-left'></i> Back
            </h6>
          </div>
          <div className='mt-2'>
            {details?.map((item) => (
              <div className='tw-mt-3 tw-border-b tw-border-solid tw-border-[#ccc] tw-flex  tw-py-5'>
                <img
                  className='tw-w-[120px] tw-h-[120px] tw-object-cover tw-rounded-md'
                  src={item.productId.image[0]}
                ></img>
                <div className='tw-px-5 tw-w-[45%]'>
                  <h5 className='tw-text-gray-100 tw-text-md'>
                    {item.productId.name}
                  </h5>
                  <p className='tw-text-red-300 tw-text-sm'>Women's Shoes</p>
                  <p className='tw-text-gray-200 tw-text-md'>
                    <span className='tw-capitalize'>{item.color}</span> Shoes
                  </p>
                  <p className='tw-text-gray-200 tw-text-md'>
                    Size {item.size}
                  </p>
                  <p className='tw-text-gray-200 tw-text-md'>
                    Quantify {item.quantify}
                  </p>
                </div>
                <h5 className='tw-text-gray-100'>
                  <NumberFormat
                    className='tw-bg-transparent tw-text-gray-100 tw-outline-none tw-w-full'
                    thousandSeparator={true}
                    suffix=' VND'
                    value={item.productId.prices}
                    displayType='text'
                  />
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;

import axios from "axios";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { base_orders } from "../../api/config";
import "../../assets/css/index.css";
import { calculateCreatedTime } from "../../utils/changeTime";

const Order = () => {
  const [orders, setOrders] = useState();
  const userInfo = useSelector((state) => state.user.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${base_orders}`);
      setOrders(res.data.orderToken);
      console.log(res.data.orderToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='tw-min-h-screen tw-bg-[#222]'>
      <div className='tw-max-w-[1200px] tw-mx-auto tw-p-5'>
        <h2 className='tw-text-gray-100 tw-text-xl tw-uppercase underlined-blue'>
          Order
        </h2>
        <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3 md:tw-gap-5'>
          {orders?.map((item) => (
            <div
              key={item._id}
              className='tw-bg-[#2a2a2a] tw-p-3 tw-mt-3 tw-rounded-md'
            >
              <div className='tw-flex tw-justify-between tw-items-center'>
                <div>
                  <div className='tw-flex tw-items-center'>
                    {" "}
                    <h3 className='tw-pr-1 tw-text-gray-300 tw-text-sm tw-uppercase'>
                      {item.name || userInfo.email}
                    </h3>
                    <p
                      className={` tw-px-1 tw-rounded-md tw-text-[15px] tw-capitalize tw-text-gray-800 ${
                        item.status === 1
                          ? "tw-bg-yellow-400"
                          : "tw-bg-green-400"
                      }`}
                    >
                      {item.status === 1 ? "Process" : "Delivered"}
                    </p>
                  </div>
                  <p className='tw-text-gray-300'>Address: {item.address}</p>
                  <p className='tw-text-gray-300'>
                    Sum:{" "}
                    <NumberFormat
                      className='tw-bg-transparent tw-outline-none tw-w-full'
                      thousandSeparator={true}
                      suffix=' VND'
                      value={item.sum}
                      displayType='text'
                    />
                  </p>
                  <p className='tw-text-gray-300'>
                    CreateAt: {calculateCreatedTime(item.createdAt)}
                  </p>
                </div>
                <img
                  className='tw-w-[60px] tw-h-[60px] tw-rounded-full'
                  src={`https://joeschmoe.io/api/v1/${userInfo.email}`}
                  alt=''
                />
              </div>
              <button
                onClick={() => navigate(`/history-order/${item._id}`)}
                className='tw-uppercase tw-w-full tw-py-1 tw-px-5 tw-bg-gradient-to-r tw-from-red-400 tw-to-blue-400 tw-rounded-md tw-mt-2 tw-text-md tw-text-gray-300 hover:tw-opacity-80 tw-transition-all'
              >
                View Order
              </button>
            </div>
          ))}
        </div>
        {orders && orders.length === 0 && (
          <img
            className='tw-mx-auto tw-aspect-video tw-object-cover'
            src='https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png'
          ></img>
        )}
      </div>
    </div>
  );
};

export default Order;

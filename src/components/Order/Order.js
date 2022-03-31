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
  const navigate = useNavigate()

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
    <div className="min-h-screen bg-[#222]">
      <div className="max-w-[1200px] mx-auto p-5">
        <h2 className="text-gray-100 text-xl uppercase underlined-blue">
          Order
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
         {orders?.map(item =>  <div key={item._id} className="bg-[#2a2a2a] p-3 mt-3 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  {" "}
                  <h3 className="pr-1 text-gray-300 text-sm uppercase">{item.name || userInfo.email}</h3>
                  <p className="bg-green-400 px-1 rounded-md text-[15px] capitalize text-gray-800">{item.status === 1 ? 'Process' : 'Delivered'}</p>
                </div>
                <p className="text-gray-300">Address: {item.address}</p>
                <p className="text-gray-300">Sum: <NumberFormat
                  className="bg-transparent outline-none w-full"   
                  thousandSeparator={true}
                  suffix=" VND"
                  value={item.sum}
                  displayType='text'
                /></p>
                <p className="text-gray-300">CreateAt: {calculateCreatedTime(item.createdAt)}</p>
              </div>
              <img
                className="w-[60px] h-[60px] rounded-full"
                src={`https://joeschmoe.io/api/v1/${userInfo.email}`}
                alt=""
              />
            </div>
                <button onClick={() => navigate(`/history-order/${item._id}`)} className="uppercase w-full py-1 px-5 bg-gradient-to-r from-red-400 to-blue-400 rounded-md mt-2 text-md text-gray-300 hover:opacity-80 transition-all">View Order</button>
          </div>)}
        </div>
        {orders && orders.length === 0 && <img className="mx-auto aspect-video object-cover" src="https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png"></img>}
      </div>
    </div>
  );
};

export default Order;

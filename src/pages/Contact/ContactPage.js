import React from "react";
import Header from "../../components/Header/Header";
import "../../assets/css/index.css";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Back from "../../components/Back/Back";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className='min-h-screen bg-[#222222]'>
        <Back />
        <div className='max-w-[1200px] mx-auto p-5'>
          <h1 className='underlined-blue text-xl uppercase text-gray-100'>
            Contact
          </h1>
          <div className='py-5 flex flex-col md:flex-row border-b border-[#ccc]'>
            <h2 className='w-full md:w-[30%] text-2xl text-gray-300'>
              Infomation
            </h2>

            <div className='grid grid-cols-2 gap-5'>
              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Support</h2>
                <p className='text-gray-300 text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='text-gray-300 text-sm'>
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>

              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Converse</h2>
                <p className='text-gray-300 text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='text-gray-300 text-sm'>
                  {" "}
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>

              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Join Team</h2>
                <p className='text-gray-300 text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='text-gray-300 text-sm'>
                  {" "}
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>

              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Press</h2>
                <p className='text-gray-300 text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='text-gray-300 text-sm'>
                  {" "}
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>
            </div>
          </div>

          <div className='py-5 flex flex-col md:flex-row border-b border-[#ccc]'>
            <h2 className='w-full md:w-[30%] text-2xl text-gray-300'>
              Locations
            </h2>
            <div className='grid grid-cols-2 gap-5'>
              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Support</h2>
                <p className='text-gray-300 text-sm'>222 Vo Thanh Trang</p>
              </div>

              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Converse</h2>
                <p className='text-gray-300 text-sm'>222 Vo Thanh Trang</p>
              </div>

              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Join Team</h2>
                <p className='text-gray-300 text-sm'>222 Vo Thanh Trang</p>
              </div>

              <div className='px-5'>
                <h2 className='text-red-400 text-md'>Press</h2>
                <p className='text-gray-300 text-sm'>222 Vo Thanh Trang</p>
              </div>
            </div>
          </div>

          <button
            className='w-full uppercase text-gray-100 px-5 py-2 bg-gradient-to-r from-blue-400 to-red-400 hover:opacity-90 transition-all mt-3  rounded-md'
            onClick={() => navigate("/")}
          >
            Go back home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;

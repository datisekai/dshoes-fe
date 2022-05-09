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
      <div className='tw-min-h-screen tw-bg-[#222222]'>
        <Back />
        <div className='tw-max-w-[1200px] tw-mx-auto tw-p-5'>
          <h1 className='underlined-blue tw-text-xl tw-uppercase tw-text-gray-100'>
            Contact
          </h1>
          <div className='tw-py-5 tw-flex tw-flex-col md:tw-flex-row tw-border-b tw-border-[#ccc]'>
            <h2 className='tw-w-full md:tw-w-[30%] tw-text-2xl tw-text-gray-300'>
              Infomation
            </h2>

            <div className='tw-grid tw-grid-cols-2 tw-gap-5'>
              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Support</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='tw-text-gray-300 tw-text-sm'>
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>

              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Converse</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='tw-text-gray-300 tw-text-sm'>
                  {" "}
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>

              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Join Team</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='tw-text-gray-300 tw-text-sm'>
                  {" "}
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>

              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Press</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  <a href='mailto:dshoes@gmail.com'>dshoes@gmail.com</a>
                </p>
                <p className='tw-text-gray-300 tw-text-sm'>
                  {" "}
                  <a href='tel:+84000111222'>+84 000111222</a>
                </p>
              </div>
            </div>
          </div>

          <div className='tw-py-5 tw-flex tw-flex-col md:tw-flex-row tw-border-b tw-border-[#ccc]'>
            <h4 className='tw-w-full md:tw-w-[30%] tw-text-2xl tw-text-gray-300'>
              Locations
            </h4>
            <div className='tw-grid tw-grid-cols-2 tw-gap-5'>
              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Support</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  222 Vo Thanh Trang
                </p>
              </div>

              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Converse</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  222 Vo Thanh Trang
                </p>
              </div>

              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Join Team</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  222 Vo Thanh Trang
                </p>
              </div>

              <div className='tw-px-5'>
                <h4 className='tw-text-red-400 tw-text-md'>Press</h4>
                <p className='tw-text-gray-300 tw-text-sm'>
                  222 Vo Thanh Trang
                </p>
              </div>
            </div>
          </div>

          <button
            className='tw-w-full tw-uppercase tw-text-gray-100 tw-px-5 tw-py-2 tw-bg-gradient-to-r tw-from-blue-400 tw-to-red-400 hover:tw-opacity-90 tw-transition-all tw-mt-3  tw-rounded-md'
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

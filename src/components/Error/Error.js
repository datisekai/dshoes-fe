import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className='tw-min-h-screen tw-bg-[#222]'>
      <div className='tw-max-w-[1200px] tw-mx-auto tw-flex tw-justify-center tw-items-center'>
        <div className='tw-mt-10 tw-bg-gradient-to-r tw-from-red-400 tw-to-violet-400 tw-w-[90%] md:tw-w-[50%] tw-rounded-lg tw-flex tw-justify-center tw-flex-col tw-item-center'>
          <i className='tw-text-center tw-text-[150px] tw-p-5 tw-text-gray-800 fa-solid fa-bug'></i>
          <h2 className='tw-text-center tw-text-xl md:tw-text-2xl tw-font-semibold'>
            Oh no!
          </h2>
          <p className='tw-text-center tw-max-w-[70%] tw-mx-auto tw-text-lg'>
            We're usually a treasure chest of knowledge but we couldn't find
            what you're looking for!
          </p>
          <button
            onClick={() => navigate("/")}
            className='tw-w-full tw-uppercase tw-py-2 tw-px-5 tw-mt-3 tw-text-gray-200 tw-bg-gradient-to-r tw-from-slate-500 tw-to-fuchsia-500 tw-rounded-md hover:tw-opacity-80 tw-transition-all'
          >
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;

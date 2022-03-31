import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#222]">
      <div className="max-w-[1200px] mx-auto flex justify-center items-center">
        <div className="mt-10 bg-gradient-to-r from-red-400 to-violet-400 w-[90%] md:w-[50%] rounded-lg flex justify-center flex-col item-center">
          <i className="text-center text-[150px] p-5 text-gray-800 fa-solid fa-bug"></i>
          <h2 className="text-center text-xl md:text-2xl font-semibold">
            Oh no!
          </h2>
          <p className="text-center max-w-[70%] mx-auto text-lg">
            We're usually a treasure chest of knowledge but we couldn't find
            what you're looking for!
          </p>
          <button onClick={() => navigate('/')} className="w-full uppercase py-2 px-5 mt-3 text-gray-200 bg-gradient-to-r from-slate-500 to-fuchsia-500 rounded-md hover:opacity-80 transition-all">
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;

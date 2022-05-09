import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <div className='tw-max-w-[1200px] tw-mx-auto'>
      <h6
        className='tw-pl-8 py-4 tw-text-gray-100 hover:tw-text-gray-300 tw-cursor-pointer tw-transition-all'
        onClick={() => navigate(-1)}
      >
        {" "}
        <i className='fa-solid fa-arrow-left'></i> Back
      </h6>
    </div>
  );
};

export default Back;

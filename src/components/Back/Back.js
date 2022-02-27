import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {

    const navigate = useNavigate()

  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="pl-8 py-4 text-gray-100 hover:text-gray-300 cursor-pointer transition-all" onClick={() => navigate(-1)}>
        {" "}
        <i className="fa-solid fa-arrow-left"></i> Back
      </h2>
    </div>
  );
};

export default Back;

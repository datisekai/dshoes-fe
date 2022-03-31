import React from "react";
import "../../assets/css/index.css";

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#222] flex justify-center items-center">
      <div className="circle-loading"></div>
    </div>
  );
};

export default Loading; 
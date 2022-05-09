import React from "react";
import "../../assets/css/index.css";

const Loading = () => {
  return (
    <div className='tw-fixed tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-bg-[#222] tw-flex tw-justify-center tw-items-center'>
      <div className='circle-loading'></div>
    </div>
  );
};

export default Loading;

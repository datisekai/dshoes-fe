import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='tw-bg-[#2A2A2A] tw-w-full tw-text-center tw-py-3 tw-text-gray-200'>
      SGU @2022 -{" "}
      <a
        className='tw-underline tw-mr-1'
        href='https://www.facebook.com/datisekai/'
        target={"_blank"}
      >
        Datisekai
      </a>
      {"&"}
      <a className='tw-underline tw-ml-1' href='#' target={"_blank"}>
        Duccanhole
      </a>
    </div>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#2A2A2A] w-full text-center py-3 text-gray-200">
      SGU @2022 -{" "}
      <a
        className="underline mr-1"
        href="https://www.facebook.com/datisekai/"
        target={"_blank"}
      >
        Datisekai 
      </a>
      {'&'}
      <a
        className="underline ml-1"
        href="#"
        target={"_blank"}
      >
         Duccanhole
      </a>
    </div>
  );
};

export default Footer;

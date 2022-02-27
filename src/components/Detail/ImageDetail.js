import React from "react";
import { useNavigate } from "react-router-dom";

const ImageDetail = () => {

  const navigate = useNavigate()

  const imgTest = [
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
  ];
  return (
    <>
      <div className="hidden md:grid md:w-[50%] lg:w-[60%] grid-cols-2 gap-4">
        {imgTest.length > 0 &&
          imgTest.map((item, index) => (
            <img
              key={index}
              src={item}
              className="rounded-md object-cover"
            ></img>
          ))}
      </div>
      <img src={imgTest[0]} alt="" className="rounded-md block md:hidden w-full h-[300px] object-cover"/>
    </>
  );
};

export default ImageDetail;

import React from "react";
import { useNavigate } from "react-router-dom";

const ImageDetail = ({ image }) => {
  const navigate = useNavigate();

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
      <div className='tw-hidden md:tw-grid md:tw-w-[50%] lg:tw-w-[60%] tw-grid-cols-2 tw-gap-4'>
        {image &&
          image.length > 0 &&
          image.map((item, index) => (
            <img
              key={index}
              src={item}
              className='tw-rounded-md tw-object-cover tw-w-full tw-h-full'
            ></img>
          ))}
      </div>
      <img
        src={image && image[0]}
        alt=''
        className='tw-rounded-md tw-block md:tw-hidden tw-w-full tw-h-[300px] tw-object-cover'
      />
    </>
  );
};

export default ImageDetail;

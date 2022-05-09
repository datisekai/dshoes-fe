import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { to_slug } from "../../utils/toSlug";

const Shoe = ({ product }) => {
  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", img.alt);
      }
    });
    if (img) observer.observe(img);
    return () => {
      if (img) observer.unobserve(img);
    };
  }, []);

  return (
    <Link
      to={`/products/detail/${product?._id}/${
        product && to_slug(product?.name)
      }`}
    >
      <img
        className='tw-w-[100%] tw-h-[250px] md:tw-h-[300px] tw-rounded-md tw-relative tw-bg-no-repeat tw-bg-cover tw-aspect-video'
        alt={`${
          product?.image && product?.image?.length > 0 && product?.image[0]
        }`}
        ref={imgRef}
      ></img>
      <h1 className='tw-absolute tw-bottom-0 tw-py-3 tw-left-[25%] tw-text-md md:tw-text-xl tw-text-red-500 tw-uppercase'>
        {product?.name}
      </h1>
    </Link>
  );
};

export default Shoe;

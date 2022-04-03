import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
    <Link to={`/products/detail/${product._id}`}>
      <img
        className="w-[100%] h-[250px] md:h-[300px] rounded-md relative bg-no-repeat bg-cover aspect-video"
        alt={`${product.image && product.image.length > 0 && product.image[0]}`}
        ref={imgRef}
      ></img>
      <h1 className="absolute bottom-0 py-3 left-[25%] text-md md:text-xl text-red-500 uppercase">
        {product.name}
      </h1>
    </Link>
  );
};

export default Shoe;

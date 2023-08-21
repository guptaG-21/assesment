//a single card of the product
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className='flex flex-col justify-center items-center w-[200px] h-[250px] gap-2 border-2 border-black'>
      <h2 className='text-purple-800'>{product.category}</h2>
      <p>{product.brand}</p>
      <img className='w-[90px]' src={product.images[0]} alt='' />
      <p className='font-semibold '> price: ${`${product.price}`} </p>
    </div>
  );
};

export default ProductCard;

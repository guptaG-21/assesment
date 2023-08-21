//this is showing the all cards of the products
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className='flex flex-row flex-wrap gap-5 justify-center align-center '>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    });
  }, []);
  console.log(products);

  useEffect(() => {


    // setting the category filter
    let filtered = products;

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }


    //setting the price range 
    if (priceRangeFilter) {
      const [minPrice, maxPrice] = priceRangeFilter.split("-");
      filtered = filtered.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    }

    
    //filtering by brand name and their price
    let sortedProducts = [...filtered];

    if (sortOption === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "name") {
      sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
    }

    setFilteredProducts(sortedProducts);

  }, [categoryFilter, priceRangeFilter, sortOption, products]);

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-semibold mb-4'>Product Listing</h1>
      <div className='flex justify-between mb-4'>
        <div>
          <label className='mr-2'>Category:</label>
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
            className='border p-2 rounded'
          >
            <option value=''>All</option>
            {/* Add unique categories from products */}
            {Array.from(
              new Set(products.map((product) => product.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='mr-2'>Price Range:</label>
          <select
            onChange={(e) => setPriceRangeFilter(e.target.value)}
            value={priceRangeFilter}
            className='border p-2 rounded'
          >
            <option value=''>All</option>
            <option value='0-10'>$0 - $10</option>
            <option value='10-50'>$10 - $50</option>
            <option value='50-100'>$50 - $100</option>
            <option value='100-1000'>$100 - $1000</option>
            <option value='1000-2000'>$1000 - $2000</option>
          </select>
        </div>
        <div>
          <label className='mr-2'>Sort By:</label>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className='border p-2 rounded'
          >
            <option value='name'>Name</option>
            <option value='price'>Price</option>
          </select>
        </div>
      </div>

      {/* displaying the products */}
      <div className='flex flex-row flex-wrap gap-5 justify-center align-center '>
        {filteredProducts.map((items) => (
          <div className='flex flex-col justify-center items-center w-[200px] h-[250px] gap-2 border-2 border-black'>
            <h2 className='text-purple-800'>{items.category}</h2>
            <p>{items.brand}</p>
            <img className='w-[90px]' src={items.images[0]} alt='' />
            <p className='font-semibold '> price: ${`${items.price}`} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

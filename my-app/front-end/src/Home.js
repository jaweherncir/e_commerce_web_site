import React from "react";
import "./Home.css";
import Product from "./Product";

import { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("fetch of api ", data);
        setProducts(data.data);
      });
  }, []);
  return (
    <div className="home">
      <div className="home-container">
        <img
          src="https://img.freepik.com/free-photo/interior-design-neoclassical-style-with-furnishings-decor_23-2151199297.jpg?t=st=1714163566~exp=1714167166~hmac=82b7a05e095bd6ca529fd403f2e704761e34edce7ee4b27325c61100b299df6d&w=1060"
          alt="home"
          className="home-banner"
        />

        <div className="home-row">
          {products.map((product) => (
            <Product
              id={product.id}
              title={product.name}
              price={product.price}
              image={"http://localhost:4000/getPicture/" + product.image}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home; 
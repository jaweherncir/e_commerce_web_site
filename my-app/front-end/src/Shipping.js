import React, { useState } from "react";
import axios from "axios";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import "./Shipping.css";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [userName, setUserName] = useState("");
  const [{ basket }, dispatch] = useStateValue();
  const basketStorage = localStorage.getItem("basket");
  const parsedBasket = JSON.parse(basketStorage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const orderData = {
      ...parsedBasket,
      address,
      city,
      phoneNum,
      userName,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order created:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="shipping">
      <div className="review">
        <div className="review-title">
          <h3>Review items and delivery</h3>
        </div>
        <div className="review-items">
          {basket.products.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.product}
              title={item.title}
              image={item.image}
              rating={item.rating}
              price={item.price}
              qte={item.qte}
            />
          ))}
        </div>
      </div>
      <h3>Shipping Information</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            pattern="[0-9\s]{1,15}"
            placeholder="55 356 545"
            title="Please enter a valid phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="userName">UserName:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Buy Now</button>
      </form>
    </div>
  );
}

export default Shipping;

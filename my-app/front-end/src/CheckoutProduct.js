import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, rating, price, qte }) {
  const [{ basket }, dispatch] = useStateValue();
  const product = { id, image, title, rating, price, qte };
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      item: product,
    });
  };
  const increaseQuantity = () => {
    dispatch({
      type: "INCREASE_QUANTITY",
      item: product,
    });
  };

  const decreaseQuantity = () => {
    dispatch({
      type: "DECREASE_QUANTITY",
      item: product,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct-image" src={image} alt="" />
      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p className="checkoutProduct-price">
          <small>DT</small>
          <strong>{price}</strong>
        </p>
        <p className="checkoutProduct-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>
        <div className="checkoutProduct-quantity-button">
          <button onClick={decreaseQuantity}> - </button>
          <p className="checkoutProduct-quantity">{qte}</p>
          <button onClick={increaseQuantity}>+</button>
        </div>
        <p className="checkoutProduct-totalprice">
          <small>DT</small>
          <strong>{price * qte}</strong>
        </p>
        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;

import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';
function Products({id,title,image,price,rating,}) {
  const [state, dispatch] = useStateValue();

  const addToBasket = () =>{
    dispatch({
          type : "ADD_TO_BASKET",
          item :{
            product: id,
            title: title,
            image : image,
            price:price,
            rating:rating,
          },
  });
 
  };
  return (
    <div className='product'>
      <div className='product-info'>
        <p>{title}</p>
        <p className='product-price'>
          <small>DT</small>
          <strong>{price}</strong>
        </p>
        <div className='product-rating'>
          {Array(rating).fill().map((_, i)=>(<p>⭐</p>))}
          
          
        </div>
        
      </div>
      <img src={image} alt=''/>
      <button onClick={addToBasket}>add to basket</button>
    </div>
  )
}

export default Products

import React, { useEffect } from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';


function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  

  // Save basket items to local storage whenever basket state changes
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  return (
    <div className='checkout'>
      <div className='checkout-left'>
        <img src='https://i.pinimg.com/564x/41/6e/06/416e065fea387af02674deeaad815307.jpg' alt='' className='checkout-add'/>
        <div>
          <h3>HELLO , {user?.email}</h3>
          <h2 className='checkout-title'>
            Your Shopping Basket
          </h2>
          {basket.products.map(item => (
            <CheckoutProduct
              key={item.id}
              id={item.product}
              price={item.price}
              qte={item.qte}
              title={item.title}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className='checkout-right'>
        <Subtotal/>
      </div>
    </div>
  );
}

export default Checkout;

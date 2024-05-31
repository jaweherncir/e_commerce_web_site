import React from 'react';
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './Reducer';

import { useNavigate } from 'react-router-dom';


function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();

  const handleProceedToCheckout = () => {
    navigate('/shipping');
  };

  return (
    <div className='subtotal'>
      <CurrencyFormat 
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong>{value}</strong>
            </p>
            <small className='subtotal-gift'>
              <input type='checkbox'/>
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'DT '}
      />
      <button onClick={handleProceedToCheckout}>Proceed to checkout</button>
    </div> 
  );
}

export default Subtotal;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  return (
    <div>
      <h1>Order Management</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>{order._id} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
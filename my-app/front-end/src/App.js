import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import Footer from './Footer';
import Shipping from './Shipping'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { useStateValue } from './StateProvider';
//import axios from 'axios'; // Import Axios for making HTTP requests

function App() {
  

  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shipping" element={<Shipping />} />

          
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}


export default App;

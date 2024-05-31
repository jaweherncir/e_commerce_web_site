import React from 'react';
import './Header.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleSignOut = () => {
    // Implement sign-out functionality here
    // For example, you can clear user data from the global state
    dispatch({
      type: 'SET_USER',
      user: null,
    });
  };

  return (
    <div className='header'>
      <Link to="/">
        <span className='logo'>BORGI.MEUBLE</span>
      </Link>
      <div className='header-search'>
        <input className='header-searchInput' type='text'/>
        <SearchIcon className='header-searchIcon'/>
      </div>

      <div className='header-nav'>
        <Link to={!user && '/Login'}>
          <div onClick={user ? handleSignOut : null} className='header-option'>
            <span className='header-option-lineOne'>
              Hello {user ? user.email : 'Guest'}
            </span>
            <span className='header-option-lineTwo'>
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <div className='header-option'>
          <span className='header-option-lineOne'>
            Returns
          </span>
          <span className='header-option-lineTwo'>
            & Orders
          </span>
        </div>
        <div className='header-option'>
          <span className='header-option-lineOne'>
            Your
          </span>
          <span className='header-option-lineTwo'>
            Prime
          </span>
        </div>
        <Link to="/Checkout">
          <div className='header-option-basket'>
            <ShoppingBasketIcon/>
            <span className='header-optionlineTwo header-basketCount'>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
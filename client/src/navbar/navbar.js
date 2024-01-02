import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FaBars } from "react-icons/fa";
import { doSignOut } from '../firebase/functions';
import { AuthContext } from '../firebase/Auth';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const { currentUser } = useContext(AuthContext);


  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const handleClick = () => {
    setShowNavbar(false)
  }

  const handleLogout = async () => {
    setShowNavbar(false);
    await doSignOut();
  } 

  return (
    <nav className="navbar regular-theme">
      <div className="container">
        <div className="logo">
          <p>AirLine Reservation</p>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <FaBars/>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            {showNavbar && <p className="close-icon" onClick={handleClick}> X </p>}
            {!currentUser && <li>
              <NavLink to="/" onClick={handleClick}>Login</NavLink>
            </li>}
            {!currentUser && <li>
              <NavLink to="/Signup" onClick={handleClick}>Signup</NavLink>
            </li>}
            {!currentUser && <li>
              <NavLink to="/adminLogin" onClick={handleClick}>Admin</NavLink>
            </li>}
            {currentUser && <li>
              <NavLink to ="/" onClick={handleClick}>Home</NavLink>
            </li>}
            {currentUser && <li>
              <NavLink to ="/profile" onClick={handleClick}>Profile</NavLink>
            </li>}
            {currentUser && <li>
              <NavLink to ="/myBookings" onClick={handleClick}>My Bookings</NavLink>
            </li>}
            {currentUser && <li>
              <NavLink to ="/" onClick={handleLogout}>Logout</NavLink>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
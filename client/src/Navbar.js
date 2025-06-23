import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center shadow">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl">UniCart</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/my-listings" className="hover:underline">My Listings</Link>
        <Link to="/offers" className="hover:underline">Offers</Link>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

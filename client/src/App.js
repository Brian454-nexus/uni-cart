import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';

const Login = () => <div className="p-8">Login Page</div>;
const Signup = () => <div className="p-8">Signup Page</div>;
const Dashboard = () => <div className="p-8">Dashboard</div>;
const MyListings = () => <div className="p-8">My Listings</div>;
const Offers = () => <div className="p-8">Offers</div>;

function App() {
  // Replace with real auth logic
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

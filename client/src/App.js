import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Navbar, DashboardLayout, ItemCard, ItemForm } from './components';
import ToastProvider from './components/ToastProvider';
import Home from './Home';

const Login = () => <div className="p-8">Login Page</div>;
const Signup = () => <div className="p-8">Signup Page</div>;
const Dashboard = () => (
  <DashboardLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <ItemCard
        title="Textbook: Calculus I"
        price={25}
        description="A well-kept calculus textbook."
        imageUrl="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80"
        sellerBadge="Trusted Seller"
      />
      <ItemCard
        title="Dorm Lamp"
        price={10}
        description="LED lamp, perfect for late-night study."
        imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
      />
    </div>
    <div className="max-w-md mx-auto">
      <ItemForm onSubmit={handleItemSubmit} />
    </div>
  </DashboardLayout>
);
const MyListings = () => <div className="p-8">My Listings</div>;
const Offers = () => <div className="p-8">Offers</div>;

function handleItemSubmit(values, { resetForm }) {
  import('react-hot-toast').then(({ toast }) => toast.success('Item submitted!'));
  resetForm();
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ToastProvider />
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
    </div>
  );
}

export default App;
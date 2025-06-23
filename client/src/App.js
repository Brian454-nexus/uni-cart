import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import TradeOfferForm from './TradeOfferForm';
import UserDashboard from './UserDashboard';

const MOCK_USER_ID = 1;
const MOCK_ITEM_ID = 1;

const Home = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Welcome to UniCart</h1>
    <Link to="/item/1" className="btn btn-primary mr-2">View Item 1</Link>
    <Link to="/dashboard" className="btn btn-secondary">My Dashboard</Link>
  </div>
);

const ItemDetails = () => {
  const { itemId } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Item Details (ID: {itemId})</h2>
      {/* Item details would go here */}
      <TradeOfferForm itemId={parseInt(itemId)} offerUserId={MOCK_USER_ID} />
    </div>
  );
};

const Dashboard = () => <UserDashboard userId={MOCK_USER_ID} />;

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 mb-4">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

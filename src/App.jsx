import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import AddProduct from "./pages/seller/AddProduct";
import SellerInbox from "./pages/seller/SellerInbox";
import ProductDetail from "./pages/ProductDetail";
import LikedProducts from "./pages/LikedProducts";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App Component
const AppContent = () => {
  const { user, loading, showOnboarding } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in or onboarding not complete, show Auth page only
  if (!user || showOnboarding) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* Favourites route for buyers */}
          <Route path="/liked-products" element={<LikedProducts />} />

          {/* Protected Seller Routes */}
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/products"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/add"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/inbox"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerInbox />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

// Root App Component with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

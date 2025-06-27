import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Bell, Plus, Store, ShoppingBag } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    return user.role === 'seller' ? '/seller/dashboard' : '/dashboard';
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">UniCart</span>
              <span className="text-xs text-gray-500 -mt-1">
                Campus Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              
              {user && (
                <>
                  {user.role === 'buyer' ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        Browse
                      </Link>
                      <Link
                        to="/liked-products"
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        Favourites
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/seller/dashboard"
                        className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/seller/products"
                        className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                      >
                        Products
                      </Link>
                      <Link
                        to="/seller/inbox"
                        className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                      >
                        Messages
                      </Link>
                    </>
                  )}
                </>
              )}
            </nav>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'seller' && (
                  <Link to="/seller/add">
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                )}

                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>

                <div className="relative group">
                  <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-medium text-sm">
                        {user.name.split(" ")[0]}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        {user.role === 'seller' ? (
                          <>
                            <Store className="w-3 h-3 mr-1" />
                            Seller
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 h-3 mr-1" />
                            Buyer
                          </>
                        )}
                      </span>
                    </div>
                  </button>

                  {/* Enhanced Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                    
                    {user.role === 'seller' ? (
                      <>
                        <Link
                          to="/seller/products"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4 mr-3" />
                          My Products
                        </Link>
                        <Link
                          to="/seller/inbox"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <Bell className="w-4 h-4 mr-3" />
                          Messages
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/liked-products"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4 mr-3" />
                          Favourites
                        </Link>
                      </>
                    )}
                    
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Search bar for non-authenticated users */}
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </form>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {user && (
                <>
                  {user.role === 'buyer' ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Browse
                      </Link>
                      <Link
                        to="/liked-products"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Favourites
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/seller/dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/seller/products"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Products
                      </Link>
                      <Link
                        to="/seller/inbox"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Messages
                      </Link>
                      <Link
                        to="/seller/add"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Add Product
                      </Link>
                    </>
                  )}
                  
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="px-3 py-2">
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

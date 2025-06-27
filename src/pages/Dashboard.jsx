import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProductCard from "../components/ProductCard";
import CategoryDropdown from "../components/CategoryDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Filter,
  Search,
  ShoppingBag,
  Heart,
  TrendingUp,
  Star,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    trendingProducts: 0,
  });

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("unicart_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("unicart_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  // Enhanced search: filter by name or category
  const filteredProducts = useMemo(() => {
    return (products || []).filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesSearch =
        !search ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search, products]);

  // Get featured products
  const featuredProducts = (products || [])
    .filter((product) => product.featured)
    .slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the filteredProducts memo
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-blue-100">
                Discover amazing deals from fellow students
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalProducts}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalCategories}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Trending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.trendingProducts}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </form>
            </div>

            <div className="flex gap-3">
              <CategoryDropdown
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">All Prices</option>
                    <option value="0-1000">Under KES 1,000</option>
                    <option value="1000-5000">KES 1,000 - 5,000</option>
                    <option value="5000-10000">KES 5,000 - 10,000</option>
                    <option value="10000+">Over KES 10,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">All Conditions</option>
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="recent">Most Recent</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Products */}
        {(featuredProducts || []).length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Featured Products
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredProducts || []).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory
                ? `${selectedCategory} Products`
                : "All Products"}
            </h2>
            <p className="text-gray-600">
              {(filteredProducts || []).length} product
              {(filteredProducts || []).length !== 1 ? "s" : ""} found
            </p>
          </div>

          {(filteredProducts || []).length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(filteredProducts || []).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

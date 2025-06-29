import React, { useState, useMemo, useEffect } from "react";
import { mockProducts, categories } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { useRef } from "react";

const typewriterPhrases = [
  "iPhone 13",
  "Books",
  "Adidas Track Jacket",
  "Electronics",
  "Winter Jacket",
  "Seller: John Doe",
  "Calculator",
  "Beauty",
  "Merchant: Campus Store",
  "Football",
  "Stethoscope",
  "Furniture",
  "Evening Gown",
  "Microscope",
  "Lab Coat",
];

function useTypewriter(phrases, speed = 35, pause = 700) {
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    const phrase = phrases[phraseIdx % phrases.length];
    if (!deleting && display.length < phrase.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(phrase.slice(0, display.length + 1));
      }, speed);
    } else if (!deleting && display.length === phrase.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(phrase.slice(0, display.length - 1));
      }, Math.max(15, speed / 2));
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setPhraseIdx((prev) => prev + 1);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [display, deleting, phraseIdx, phrases, speed, pause]);

  return display;
}

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState(mockProducts);

  // Enhanced search: filter by name or category
  const filteredProducts = useMemo(() => {
    return (allProducts || []).filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesSearch = search.trim()
        ? product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search, allProducts]);

  // Get featured products
  let featuredProducts = (mockProducts || []).filter(
    (product) => product.featured
  );
  if (featuredProducts.length < 3) {
    // Add non-featured products to fill up to 3, avoiding duplicates
    const nonFeatured = (mockProducts || []).filter(
      (product) =>
        !product.featured && !featuredProducts.some((f) => f.id === product.id)
    );
    featuredProducts = [
      ...featuredProducts,
      ...nonFeatured.slice(0, 3 - featuredProducts.length),
    ];
  }

  const typewriterText = useTypewriter(typewriterPhrases);

  // Add two states: one for pending filters (UI), one for applied filters (used for fetching products)
  const [pendingFilters, setPendingFilters] = useState({
    priceMin: "",
    priceMax: "",
    condition: "",
    sort: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    priceMin: "",
    priceMax: "",
    condition: "",
    sort: "",
  });

  // Update pendingFilters on filter control change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setPendingFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply button handler: set appliedFilters to pendingFilters
  const handleApplyFilters = () => {
    setAppliedFilters({ ...pendingFilters });
  };

  // Fetch products when appliedFilters change
  useEffect(() => {
    // Build query params from appliedFilters
    const params = {};
    if (appliedFilters.priceMin) params.priceMin = appliedFilters.priceMin;
    if (appliedFilters.priceMax) params.priceMax = appliedFilters.priceMax;
    if (appliedFilters.condition) params.condition = appliedFilters.condition;
    if (appliedFilters.sort) params.sort = appliedFilters.sort;
    // Add other filters as needed

    // Fetch products with applied filters
    fetch(`/api/products?${new URLSearchParams(params)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, [appliedFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Campus Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Buy and sell with fellow students at the best prices
            </p>
            {/* Search bar in hero section */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={typewriterText}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-2xl font-semibold placeholder:text-2xl placeholder:font-semibold placeholder:text-blue-900"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Only the filter button remains, category dropdown removed */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    name="priceRange"
                    value={pendingFilters.priceRange || ""}
                    onChange={(e) => {
                      // Parse price range into priceMin and priceMax
                      const value = e.target.value;
                      let priceMin = "",
                        priceMax = "";
                      if (value === "0-1000") {
                        priceMin = "0";
                        priceMax = "1000";
                      } else if (value === "1000-5000") {
                        priceMin = "1000";
                        priceMax = "5000";
                      } else if (value === "5000-10000") {
                        priceMin = "5000";
                        priceMax = "10000";
                      } else if (value === "10000+") {
                        priceMin = "10000";
                        priceMax = "";
                      } else if (value === "") {
                        priceMin = "";
                        priceMax = "";
                      }
                      setPendingFilters((prev) => ({
                        ...prev,
                        priceRange: value,
                        priceMin,
                        priceMax,
                      }));
                    }}
                  >
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
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    name="condition"
                    value={pendingFilters.condition}
                    onChange={handleFilterChange}
                  >
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
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    name="sort"
                    value={pendingFilters.sort}
                    onChange={handleFilterChange}
                  >
                    <option value="">Most Recent</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
              {/* Filters UI */}
              <div className="filters-section">
                {/* Existing horizontally placed filter controls (keep these, remove the new ones) */}
                <button
                  className="apply-filters-btn w-full bg-blue-600 text-white rounded-md px-3 py-2 mt-4 hover:bg-blue-700 transition"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featuredProducts || []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

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
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
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

export default Home;

import React, { useState, useMemo } from "react";
import { mockProducts, categories } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import CategoryDropdown from "../components/CategoryDropdown";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [selectedCategory]);

  // Get featured products
  let featuredProducts = mockProducts.filter((product) => product.featured);
  if (featuredProducts.length < 3) {
    // Add non-featured products to fill up to 3, avoiding duplicates
    const nonFeatured = mockProducts.filter(
      (product) =>
        !product.featured && !featuredProducts.some((f) => f.id === product.id)
    );
    featuredProducts = [
      ...featuredProducts,
      ...nonFeatured.slice(0, 3 - featuredProducts.length),
    ];
  }

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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Shopping
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Sell Your Items
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Filters Button and Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowFilters((prev) => !prev)}
              variant="outline"
              className="flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            {showFilters && (
              <CategoryDropdown
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => {
                  setSelectedCategory(cat);
                  setShowFilters(false);
                }}
              />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? "Filtered Products" : "All Products"}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} items found</p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

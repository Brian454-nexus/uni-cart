import React, { useState, useMemo } from "react";
import { mockProducts, categories } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import CategoryDropdown from "../components/CategoryDropdown";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useFormik } from "formik";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [isSeller, setIsSeller] = useState(false); // sync with Header if needed
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [allProducts, setAllProducts] = useState(mockProducts);

  // Enhanced search: filter by name or category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
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

  // Seller Formik logic
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      category: "",
      condition: "good",
      description: "",
      location: "",
      images: [],
    },
    onSubmit: (values, { resetForm }) => {
      const newProduct = {
        ...values,
        id: Date.now().toString(),
        price: Number(values.price),
        images: values.images.length
          ? values.images
          : ["/images/placeholder.svg"],
        seller: {
          id: "seller-demo",
          name: "Demo Seller",
          university: "Demo University",
          rating: 5,
          totalSales: 0,
        },
        createdAt: new Date().toISOString(),
      };
      setAllProducts([newProduct, ...allProducts]);
      setShowSellerForm(false);
      resetForm();
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Seller Dashboard Modal */}
      {isSeller && showSellerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Post New Item</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <input
                name="title"
                placeholder="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={formik.handleChange}
                value={formik.values.price}
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                name="condition"
                onChange={formik.handleChange}
                value={formik.values.condition}
                className="w-full border p-2 rounded"
              >
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
              <input
                name="location"
                placeholder="Location"
                onChange={formik.handleChange}
                value={formik.values.location}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="images"
                type="text"
                placeholder="Image URL (optional)"
                onChange={(e) =>
                  formik.setFieldValue(
                    "images",
                    e.target.value ? [e.target.value] : []
                  )
                }
                className="w-full border p-2 rounded"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSellerForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Post Item</Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for products by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              />
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
              No products found matching your search.
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

      {/* Seller Button */}
      {isSeller && (
        <div className="fixed bottom-8 right-8 z-40">
          <Button
            onClick={() => setShowSellerForm(true)}
            className="bg-green-600 text-white shadow-lg"
          >
            + Post New Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;

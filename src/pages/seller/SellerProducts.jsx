import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Heart, 
  Search,
  Filter,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/seller/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('unicart_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProductAvailability = async (productId, currentStatus) => {
    try {
      const response = await fetch(`/api/seller/products/${productId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('unicart_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ available: !currentStatus })
      });

      if (response.ok) {
        // Update local state
        setProducts(prev => prev.map(product => 
          product.id === productId 
            ? { ...product, available: !currentStatus }
            : product
        ));
      }
    } catch (error) {
      console.error('Failed to toggle product availability:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/seller/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('unicart_token')}`
        }
      });

      if (response.ok) {
        setProducts(prev => prev.filter(product => product.id !== productId));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = search.trim() === "" || 
      product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "" || 
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
              <p className="text-gray-600">Manage your inventory</p>
            </div>
            <Link to="/seller/add">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search your products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                <option value="clothing">Clothing</option>
                <option value="sports">Sports</option>
                <option value="furniture">Furniture</option>
                <option value="beauty">Beauty</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {products.length === 0 
                ? "You haven't added any products yet." 
                : "Try adjusting your search or filters."
              }
            </p>
            {products.length === 0 && (
              <Link to="/seller/add">
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.images[0] || "/images/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 truncate flex-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center space-x-2 ml-2">
                      <button
                        onClick={() => toggleProductAvailability(product.id, product.available)}
                        className={`p-1 rounded ${
                          product.available 
                            ? 'text-green-600 hover:text-green-700' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title={product.available ? 'Available' : 'Unavailable'}
                      >
                        {product.available ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-lg font-bold text-orange-600 mb-2">
                    {formatCurrency(product.price)}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="capitalize">{product.category}</span>
                    <span className="capitalize">{product.condition}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {product.views || 0}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {product.likes || 0}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Link 
                      to={`/seller/products/${product.id}/edit`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                  <p className="text-sm text-gray-600">Total Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {products.filter(p => p.available).length}
                  </p>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">
                    {products.filter(p => !p.available).length}
                  </p>
                  <p className="text-sm text-gray-600">Unavailable</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {products.reduce((sum, p) => sum + (p.views || 0), 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts; 
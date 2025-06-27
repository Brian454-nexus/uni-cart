import React, { useEffect, useState } from "react";
import { mockProducts } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const likedIds = JSON.parse(localStorage.getItem("likedProducts") || "[]");
    setLikedProducts(mockProducts.filter((p) => likedIds.includes(p.id)));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Liked Products
        </h1>
        {likedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              You haven't liked any products yet.
            </p>
            <Link to="/">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(likedProducts || []).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedProducts;

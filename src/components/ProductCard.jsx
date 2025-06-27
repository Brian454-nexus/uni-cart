import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Heart, Share2 } from "lucide-react";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getConditionBadge = (condition) => {
    const colors = {
      new: "bg-green-100 text-green-800",
      "like-new": "bg-blue-100 text-blue-800",
      good: "bg-yellow-100 text-yellow-800",
      fair: "bg-orange-100 text-orange-800",
    };
    return colors[condition] || "bg-gray-100 text-gray-800";
  };

  const handleLike = (e) => {
    e.preventDefault();
    setLiked((prev) => !prev);
    // Optionally: Save to localStorage or context for Liked Products page
    let likedProducts = JSON.parse(
      localStorage.getItem("likedProducts") || "[]"
    );
    if (!liked) {
      likedProducts.push(product.id);
    } else {
      likedProducts = likedProducts.filter((id) => id !== product.id);
    }
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  };

  const handleShare = (e) => {
    e.preventDefault();
    const url = window.location.origin + `/product/${product.id}`;
    if (navigator.share) {
      navigator.share({ title: product.title, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Product link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              Featured
            </div>
          )}
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${getConditionBadge(
              product.condition
            )}`}
          >
            {product.condition.charAt(0).toUpperCase() +
              product.condition.slice(1).replace("-", " ")}
          </div>
          {/* Like & Share Buttons - moved lower for better spacing */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-2 z-10 opacity-80 group-hover:opacity-100 transition-all">
            <button
              onClick={handleLike}
              className="bg-white rounded-full p-1 shadow hover:bg-blue-50"
            >
              <Heart
                className={`w-5 h-5 ${
                  liked ? "text-blue-600 fill-blue-600" : "text-gray-400"
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="bg-white rounded-full p-1 shadow hover:bg-blue-50"
            >
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{product.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                {product.seller.avatar ? (
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <span className="text-xs font-medium text-gray-600">
                    {product.seller.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600 truncate">
                {product.seller.name}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {product.seller.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

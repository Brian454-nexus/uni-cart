import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import PaymentModal from '../components/PaymentModal';
import { Button } from '@/components/ui/button';
import { MapPin, Star, MessageCircle, Share2, Heart, ArrowLeft, User, Shield, Clock } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getConditionColor = (condition) => {
    const colors = {
      'new': 'text-green-600 bg-green-100',
      'like-new': 'text-blue-600 bg-blue-100',
      'good': 'text-yellow-600 bg-yellow-100',
      'fair': 'text-orange-600 bg-orange-100'
    };
    return colors[condition] || 'text-gray-600 bg-gray-100';
  };

  const similarProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(product.condition)}`}>
                  {product.condition.charAt(0).toUpperCase() + product.condition.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{product.location}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                Buy Now - {formatPrice(product.price)}
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Seller
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  {product.seller.avatar ? (
                    <img src={product.seller.avatar} alt={product.seller.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.seller.name}</h4>
                  <p className="text-sm text-gray-600">{product.seller.university}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">{product.seller.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{product.seller.totalSales} sales</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Safety Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Meet in a public place on campus</li>
                    <li>• Inspect the item before payment</li>
                    <li>• Use secure payment methods</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none text-gray-700">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((similarProduct) => (
                <Link
                  key={similarProduct.id}
                  to={`/product/${similarProduct.id}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={similarProduct.images[0]}
                      alt={similarProduct.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {similarProduct.title}
                      </h3>
                      <p className="text-lg font-bold text-blue-600">
                        {formatPrice(similarProduct.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;

import React from 'react';

const ItemCard = ({ title, price, description, imageUrl, sellerBadge }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-indigo-500">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {sellerBadge && (
          <span className="ml-2 px-2 py-1 text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">{sellerBadge}</span>
        )}
      </div>
      <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">${price}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  </div>
);

export default ItemCard; 
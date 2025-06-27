import React from 'react';
import { categories } from '../data/mockData';

const CategorySidebar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>All Categories</span>
            <span className="text-sm text-gray-500">
              {(categories || []).reduce((sum, cat) => sum + (cat.count || 0), 0)}
            </span>
          </div>
        </button>
        
        {(categories || []).map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">{category.count}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;

import React from "react";

const CategoryDropdown = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="absolute z-20 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`w-full text-left px-3 py-2 rounded-md transition-colors mb-1 ${
          selectedCategory === null
            ? "bg-blue-100 text-blue-700 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <span>All Categories</span>
          <span className="text-sm text-gray-500">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </div>
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors mb-1 ${
            selectedCategory === category.id
              ? "bg-blue-100 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
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
  );
};

export default CategoryDropdown;

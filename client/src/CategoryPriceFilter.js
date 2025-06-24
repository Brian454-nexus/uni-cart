import React, { useEffect, useState } from 'react';

const CategoryPriceFilter = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({ categoryId, minPrice, maxPrice });
  };

  return (
    <form className="flex flex-wrap gap-4 items-center mb-6" onSubmit={handleFilter}>
      <select
        className="border rounded px-2 py-1"
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input
        type="number"
        className="border rounded px-2 py-1"
        placeholder="Min Price"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
        min="0"
      />
      <input
        type="number"
        className="border rounded px-2 py-1"
        placeholder="Max Price"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        min="0"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Filter</button>
    </form>
  );
};

export default CategoryPriceFilter;

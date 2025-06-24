import React, { useEffect, useState } from 'react';
import CategoryPriceFilter from './CategoryPriceFilter';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({});

  const fetchItems = (params = {}) => {
    const query = new URLSearchParams();
    if (params.categoryId) query.append('category_id', params.categoryId);
    if (params.minPrice) query.append('min_price', params.minPrice);
    if (params.maxPrice) query.append('max_price', params.maxPrice);
    fetch(`/api/items?${query.toString()}`)
      .then(res => res.json())
      .then(setItems);
  };

  useEffect(() => {
    fetchItems(filter);
  }, [filter]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <CategoryPriceFilter onFilter={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.length === 0 && <div className="col-span-2 text-gray-500">No items found.</div>}
        {items.map(item => (
          <div key={item.id} className="border rounded p-4 shadow bg-white">
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-gray-700">{item.description}</p>
            <div className="mt-2 font-bold">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

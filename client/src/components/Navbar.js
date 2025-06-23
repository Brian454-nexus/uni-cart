import React from 'react';

const Navbar = () => (
  <nav className="bg-white dark:bg-gray-800 shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600 dark:text-indigo-400">
            UniCart
          </div>
          <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <a href="#" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 dark:text-gray-100 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:border-indigo-700 transition">Home</a>
            <a href="#" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 dark:text-gray-100 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:border-indigo-700 transition">Dashboard</a>
            <a href="#" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 dark:text-gray-100 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:border-indigo-700 transition">Items</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar; 
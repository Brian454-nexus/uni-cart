import React from 'react';

const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <aside className="w-64 bg-white dark:bg-gray-800 p-4 hidden md:block">
      <nav className="space-y-4">
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 text-gray-900 dark:text-gray-100 transition">Dashboard</a>
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 text-gray-900 dark:text-gray-100 transition">My Items</a>
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 text-gray-900 dark:text-gray-100 transition">Offers</a>
      </nav>
    </aside>
    <main className="flex-1 p-6">{children}</main>
  </div>
);

export default DashboardLayout; 
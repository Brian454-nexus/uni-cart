import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => <Toaster position="top-right" toastOptions={{
  style: { background: '#fff', color: '#333' },
  className: 'dark:bg-gray-800 dark:text-gray-100',
}} />;

export default ToastProvider; 
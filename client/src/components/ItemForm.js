import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'Required';
  if (!values.price) errors.price = 'Required';
  else if (isNaN(values.price) || Number(values.price) <= 0) errors.price = 'Must be a positive number';
  if (!values.description) errors.description = 'Required';
  if (!values.imageUrl) errors.imageUrl = 'Required';
  return errors;
};

const ItemForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ title: '', price: '', description: '', imageUrl: '' }}
    validate={validate}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Title</label>
          <Field name="title" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100" />
          <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Price</label>
          <Field name="price" type="number" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100" />
          <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Description</label>
          <Field name="description" as="textarea" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100" />
          <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Image URL</label>
          <Field name="imageUrl" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100" />
          <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-800 text-white font-semibold rounded transition disabled:opacity-50">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </Form>
    )}
  </Formik>
);

export default ItemForm; 
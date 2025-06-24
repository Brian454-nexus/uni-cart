import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TradeOfferForm = ({ itemId, offerUserId, onSuccess }) => {
  return (
    <Formik
      initialValues={{ offer_price: '', message: '' }}
      validationSchema={Yup.object({
        offer_price: Yup.number().required('Required').min(0, 'Must be positive'),
        message: Yup.string().max(500, 'Too long'),
      })}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        try {
          const res = await fetch('/offers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              item_id: itemId,
              offer_user_id: offerUserId,
              offer_price: values.offer_price,
              message: values.message,
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Error');
          setStatus({ success: 'Offer submitted!' });
          resetForm();
          if (onSuccess) onSuccess();
        } catch (err) {
          setStatus({ error: err.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4 p-4 border rounded bg-white">
          <div>
            <label htmlFor="offer_price">Offer Price</label>
            <Field name="offer_price" type="number" className="input" />
            <ErrorMessage name="offer_price" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <Field name="message" as="textarea" className="input" />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
          </div>
          {status && status.error && <div className="text-red-600">{status.error}</div>}
          {status && status.success && <div className="text-green-600">{status.success}</div>}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Offer'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TradeOfferForm; 
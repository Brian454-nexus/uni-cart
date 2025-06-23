import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./TradeOfferModal.css";

const TradeOfferSchema = Yup.object().shape({
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters")
    .required("Message is required"),
  offerPrice: Yup.number()
    .positive("Price must be positive")
    .required("Offer price is required"),
});

const TradeOfferModal = ({ isOpen, onClose, itemId, userId, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit({
        item_id: itemId,
        offer_user_id: userId,
        message: values.message,
        offer_price: parseFloat(values.offerPrice),
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting offer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Make an Offer</h2>

        <Formik
          initialValues={{
            message: "",
            offerPrice: "",
          }}
          validationSchema={TradeOfferSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="trade-offer-form">
              <div className="form-group">
                <label htmlFor="message">Message to Seller</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="Introduce yourself and explain why you're interested..."
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="offerPrice">Your Offer ($)</label>
                <Field
                  type="number"
                  id="offerPrice"
                  name="offerPrice"
                  step="0.01"
                  min="0"
                />
                <ErrorMessage
                  name="offerPrice"
                  component="div"
                  className="error"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? "Submitting..." : "Submit Offer"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TradeOfferModal;

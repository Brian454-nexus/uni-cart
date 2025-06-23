import React, { useState, useEffect } from "react";
import "./TradeOffersList.css";

const TradeOffersList = ({ userId }) => {
  const [offers, setOffers] = useState({ sent: [], received: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, [userId]);

  const fetchOffers = async () => {
    try {
      const response = await fetch(`/api/offers/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch offers");
      const data = await response.json();
      setOffers({
        sent: data.sent_offers,
        received: data.received_offers,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (offerId, newStatus) => {
    try {
      const response = await fetch(`/api/offers/${offerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update offer status");
      await fetchOffers(); // Refresh the offers list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (offerId) => {
    try {
      const response = await fetch(`/api/offers/${offerId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete offer");
      await fetchOffers(); // Refresh the offers list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading offers...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="trade-offers-container">
      <section className="offers-section">
        <h2>Received Offers</h2>
        {offers.received.length === 0 ? (
          <p>No offers received yet</p>
        ) : (
          <div className="offers-grid">
            {offers.received.map((offer) => (
              <div key={offer.id} className="offer-card">
                <div className="offer-header">
                  <span className={`status ${offer.status}`}>
                    {offer.status}
                  </span>
                  <span className="price">${offer.offer_price}</span>
                </div>
                <p className="message">{offer.message}</p>
                {offer.status === "pending" && (
                  <div className="action-buttons">
                    <button
                      className="accept-btn"
                      onClick={() => handleStatusUpdate(offer.id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleStatusUpdate(offer.id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="offers-section">
        <h2>Sent Offers</h2>
        {offers.sent.length === 0 ? (
          <p>No offers sent yet</p>
        ) : (
          <div className="offers-grid">
            {offers.sent.map((offer) => (
              <div key={offer.id} className="offer-card">
                <div className="offer-header">
                  <span className={`status ${offer.status}`}>
                    {offer.status}
                  </span>
                  <span className="price">${offer.offer_price}</span>
                </div>
                <p className="message">{offer.message}</p>
                {offer.status === "pending" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(offer.id)}
                  >
                    Cancel Offer
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TradeOffersList;

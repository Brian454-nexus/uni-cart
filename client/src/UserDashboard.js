import React, { useEffect, useState } from 'react';

const UserDashboard = ({ userId }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`/offers/user/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch offers');
        setOffers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, [userId]);

  if (loading) return <div>Loading offers...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Trade Offers</h2>
      {offers.length === 0 ? (
        <div>No offers yet.</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Price</th>
              <th>Message</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-t">
                <td>{offer.item_id}</td>
                <td>${offer.offer_price.toFixed(2)}</td>
                <td>{offer.message}</td>
                <td>{offer.status}</td>
                <td>{new Date(offer.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileOrphanage = () => {
  const [orphanage, setOrphanage] = useState(null);
  const [activeDonations, setActiveDonations] = useState([]); // Store active donations
  const [requests, setRequests] = useState([]); // Store orphanage requests
  const [loading, setLoading] = useState(true);
  const [donationStatus, setDonationStatus] = useState(null);
  const token = localStorage.getItem('authToken');

  // Function to fetch orphanage profile, active donations & requests
  const fetchOrphanageProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/orphanage/profile', {
        headers: { Authorization: `Bearer ${token}` }, // Auth token
      });

      setOrphanage(response.data.orphanage);
      setActiveDonations(response.data.activeDonations);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch orphanage requests
  const fetchOrphanageRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(response.data.requests); // Store orphanage requests
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // Delete a request
  const handleDeleteRequest = async (requestId) => {
    try {
      await axios.delete(`http://localhost:5000/api/requests/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted request from state
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  useEffect(() => {
    fetchOrphanageProfile();
    fetchOrphanageRequests();
    setLoading(false);
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!orphanage) return <div>You need to be logged in to view this page.</div>;

  return (
    <div className="container mt-5">
      <h2>Orphanage Profile</h2>
      <div className="row">
        <div className="col-md-4">
          <img
            src={orphanage.profileImage || 'default-profile-image.png'}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        <div className="col-md-8">
          <h4>{orphanage.name}</h4>
          <p>Email: {orphanage.email}</p>
          <p>Location: {orphanage.location}</p>
          <p>Phone: {orphanage.phoneNo}</p>

          {/* Accepted Donations */}
          <h5>Accepted Donations:</h5>
          <ul>
            {activeDonations.length > 0 ? (
              activeDonations.map((donation) => (
                <li key={donation._id} className="mb-3">
                  <div className="donation-item-container">
                    {donation.imageUrls?.length > 0 ? (
                      <img
                        src={donation.imageUrls[0]}
                        alt={donation.itemName}
                        className="img-fluid"
                        style={{ width: '200px', height: '200px' }}
                      />
                    ) : (
                      <div>No Image Available</div>
                    )}
                    <p>{donation.itemName} - {donation.quantity}</p>
                    {donation.status === 'active' && (
                      <Link to={`/complete-donation/${donation._id}`} className="btn btn-success btn-sm mt-2">
                        Complete Donation
                      </Link>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <p>No accepted donations.</p>
            )}
          </ul>

          {/* Orphanage Requests */}
          <h5 className="mt-4">Pending Requests:</h5>
          <ul>
            {requests.length > 0 ? (
              requests.map((request) => (
                <li key={request._id} className="mb-3">
                  <div className="d-flex align-items-center">
                    <p className="mb-0 flex-grow-1">{request.itemNames} - {request.status}</p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteRequest(request._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No pending requests.</p>
            )}
          </ul>

          {donationStatus && <p>{donationStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileOrphanage;

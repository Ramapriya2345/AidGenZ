import React, { useState, useEffect } from "react";
import axios from "axios";

const TOP_DONORS_API_URL = "http://localhost:5000/api/leaderboard/top-donors"; // Adjust the URL as needed

const TopDonors = () => {
  const [topDonors, setTopDonors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch top 10 donors on component mount
    const fetchTopDonors = async () => {
      try {
        const response = await axios.get(TOP_DONORS_API_URL, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setTopDonors(response.data);
      } catch (err) {
        setError('Failed to fetch top donors');
      }
    };

    fetchTopDonors();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Top 10 Donors</h1>
      {error && <p className="text-danger">{error}</p>}

      {topDonors.length === 0 ? (
        <p>No top donors available.</p>
      ) : (
        <ul className="list-group">
          {topDonors.map((donor, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {/* Donor Profile Image */}
                <img
                  src={donor.profileImage || "https://via.placeholder.com/50"} // Placeholder image if no profile image available
                  alt={`${donor.name}'s profile`}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <h5>{donor.name}</h5>
                  <p>Points: {donor.points}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopDonors;

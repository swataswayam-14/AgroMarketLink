import React, { useState, useEffect } from 'react';
import './FarmerListStyle.css';
import { useNavigate } from 'react-router-dom';

function FarmersList() {
  const navigate = useNavigate()
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    async function fetchFarmers() {
      const response = await fetch('http://localhost:3000/api/v1/buyer/bulk');
      const data = await response.json();
      setFarmers(data.farmers);
    }
    fetchFarmers();
  }, []);

  const handleSeeDetailsClick = (farmerId) => {
    navigate(`/farmers/${farmerId}`);
  };

  return (
    <div className="farmers-list">
      {farmers.map((farmer) => (
        <FarmerCard key={farmer._id} farmer={farmer} handleSeeDetailsClick={handleSeeDetailsClick} />
      ))}
    </div>
  );
}

function FarmerCard({ farmer, handleSeeDetailsClick , navigate}) {
  return (
    <div className="farmer-card">
      <h3>{farmer.username}</h3>
      <p>Phone No: {farmer.phoneno}</p>
      <p>Address: {farmer.address}</p>
      <button className="see-details-btn" onClick={() => handleSeeDetailsClick(farmer._id, navigate)}>
        See Details
      </button>
    </div>
  );
}

export default FarmersList;
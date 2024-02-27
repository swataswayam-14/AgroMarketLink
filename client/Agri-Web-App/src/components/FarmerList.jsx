import React, { useState, useEffect } from 'react';
import './FarmerListStyle.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem; /* Adjust this value based on design preferences */
`;

const StyledH1 = styled.h1`
  font-size: 5rem; /* Adjust this value based on design preferences */
  color: green; /* Change this color according to your desired palette */
  font-weight: bold;
`;
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
    <div>
      <TitleContainer>
        <StyledH1>Farmer&apos;s List</StyledH1>
      </TitleContainer>
    <div className="farmers-list">
      {farmers.map((farmer) => (
        <FarmerCard key={farmer._id} farmer={farmer} handleSeeDetailsClick={handleSeeDetailsClick} />
      ))}
    </div>
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
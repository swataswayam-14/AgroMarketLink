import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./FarmerDetails.css"
function FarmerDetails({ match }) {
  const classes = 'farmer-detail container';
  const { id } = useParams()
  const [farmerData, setFarmerData] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchFarmerData() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/buyer/${id}`);
        if (!response.ok) throw Error("Failed to fetch farmer data");
        const jsonResponse = await response.json();
        setFarmerData(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFarmerData();
  }, [id]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3000/api/v1/farmer/bulk/${id}`);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  if (!farmerData) return null;

  return (
    <div className={classes}>
  <header className='page-header' style={{ backgroundColor: '#8db600', color: '#fff', padding: '1rem' }}>
    <h1 style={{ fontSize: '2rem' }}>Farmers Detail Page</h1>
  </header>
  <main>
    <section className='details' style={{ border: '1px solid #8db600', padding: '1rem', margin: '1rem 0', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#8db600' }}>Farmer Details</h2>
      <ul>
        <li><strong>Username:</strong> {farmerData.farmer.username}</li>
        <li><strong>Address:</strong> {farmerData.farmer.address}</li>
        <li><strong>Phone Number:</strong> {farmerData.farmer.phoneNumber}</li>
      </ul>
    </section>

    <hr />

    <section className='crops' style={{ border: '1px solid #8db600', padding: '1rem', margin: '1rem 0', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#8db600' }}>Crop Details</h2>
      {farmerData.crop.length > 0 ? (
        <ul>
          {farmerData.crop.map((crop, index) => (
            <li key={index}>
              <strong>{crop.nameOfCrop}</strong> ({crop.startMonth}-{crop.endMonth})
            </li>
          ))}
        </ul>
      ) : (
        <p>No crops available for this farmer.</p>
      )}
      <h1 style={{ color: '#8db600' }}>Ready to Sell</h1>
      <ul>
        {data.readyToSell &&
          data.readyToSell.map((crop) => (
            <li key={crop._id} style={{ marginBottom: '10px', backgroundColor: '#fff', padding: '0.5rem', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
              {crop.nameOfcrop} ({crop.amountAvailable} kg available at {crop.pricePerKg} per kg)
            </li>
          ))}
      </ul>
    </section>

    <nav style={{ textAlign: 'center' }}>
      <Link to="/farmers" className='back-link' style={{ color: '#6789b6', fontWeight: 'bold', textDecoration: 'none', transition: 'all 0.2s ease' }}>Back</Link>
    </nav>
  </main>
</div>
  );
}

export default FarmerDetails;
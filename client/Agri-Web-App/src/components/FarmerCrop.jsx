import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function FarmerCrop() {
  const [data, setData] = useState([]);
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3000/api/v1/farmer/bulk/${id}`);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>Crops</h1>
      <ul>
        {data.crop &&
          data.crop.map((crop) => (
            <li key={crop._id} style={{ marginBottom: '10px' }}>
              {crop.nameOfcrop} ({crop.startmonth} - {crop.endmonth})
              <button onClick={async()=>{
                  try {
                    const response = await axios.delete(`http://localhost:3000/api/v1/farmer/deletefuturecrop/${crop._id}`);
                  } catch (err) {
                    console.error("Error deleting ready crop:", err);
                  }
                  navigate(`/deletecurrent/${id}`)
              }} style={{ backgroundColor: 'lightgray', padding: '5px', marginLeft: '10px', color:'black' }}>Delete</button>
            </li>
          ))}
      </ul>
      <h1>Ready to Sell</h1>
      <ul>
        {data.readyToSell &&
          data.readyToSell.map((crop) => (
            <li key={crop._id} style={{ marginBottom: '10px' }}>
              {crop.nameOfcrop} ({crop.amountAvailable} kg available at Rs.{crop.pricePerKg} per kg)
              <button onClick = {async()=>{
                try {
                  const response = await axios.delete(`http://localhost:3000/api/v1/farmer/deletereadycrop/${crop._id}`);
                } catch (err) {
                  console.error("Error deleting future crop:", err);
                }
                navigate(`/deletecurrent/${id}`)
              }} style={{ backgroundColor: 'lightgray', padding: '5px', marginLeft: '10px', color:'black' }}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FarmerCrop;
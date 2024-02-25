import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FarmerCrop() {
  const [data, setData] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3000/api/v1/farmer/bulk/${id}`);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);
// the first button should navigate another page , to update the futureCrop details. And updation should happen by making a POST request to /editfuturecrop/:id end point. 

//the second button should navigate to another page , to update the ready to sell crop details . And updation should happend by making a POST request to /editreadycrop/:id end point.
  return (
    <div>
      <h1>Crops</h1>
      <ul>
        {data.crop &&
          data.crop.map((crop) => (
            <li key={crop._id} style={{ marginBottom: '10px' }}>
              {crop.nameOfcrop} ({crop.startmonth} - {crop.endmonth})
              <button style={{ backgroundColor: 'lightgray', padding: '5px', marginLeft: '10px', color:'black' }}>Edit details</button>
            </li>
          ))}
      </ul>
      <h1>Ready to Sell</h1>
      <ul>
        {data.readyToSell &&
          data.readyToSell.map((crop) => (
            <li key={crop._id} style={{ marginBottom: '10px' }}>
              {crop.nameOfcrop} ({crop.amountAvailable} kg available at {crop.pricePerKg} per kg)
              <button style={{ backgroundColor: 'lightgray', padding: '5px', marginLeft: '10px', color:'black' }}>Edit details</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FarmerCrop;
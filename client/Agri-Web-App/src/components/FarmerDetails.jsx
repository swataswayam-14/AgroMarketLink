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
     <header className='page-header'>
       <h1>Farmers Detail Page</h1>
     </header>
     <main>
       <section className='details'>
         <h2>Farmer Details</h2>
         <ul>
           <li><strong>Username:</strong> {farmerData.farmer.username}</li>
           <li><strong>Address:</strong> {farmerData.farmer.address}</li>
           <li><strong>Phone Number:</strong> {farmerData.farmer.phoneNumber}</li>
         </ul>
       </section>

       <hr />

       <section className='crops'>
         <h2>Crop Details</h2>
         {farmerData.crop.length > 0 ? (
           <ul>
             {farmerData.crop.map((crop, index) => (
               <li key={index}>
                 <strong>{crop.nameOfCrop}</strong> (
                 {crop.startMonth}-{crop.endMonth})
                 </li>
             ))}
           </ul>
         ) : (
           <p>No crops available for this farmer.</p>
         )}
         <h1>Ready to Sell</h1>
      <ul>
        {data.readyToSell &&
          data.readyToSell.map((crop) => (
            <li key={crop._id} style={{ marginBottom: '10px' }}>
              {crop.nameOfcrop} ({crop.amountAvailable} kg available at {crop.pricePerKg} per kg)
            </li>
          ))}
      </ul>
       </section>

       <nav>
         <Link to="/farmerlist" className='back-link'>Back</Link>
       </nav>
     </main>
   </div>
  );
}

export default FarmerDetails;
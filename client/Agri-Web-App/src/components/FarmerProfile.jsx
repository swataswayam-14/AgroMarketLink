import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./FarmerDetails.css"
function FarmerProfile({ match }) {
  const classes = 'farmer-detail container';
  const { id } = useParams()
  const [farmerData, setFarmerData] = useState(null);

  useEffect(() => {
    async function fetchFarmerData() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/farmer/profile/${id}`);
        if (!response.ok) throw Error("Failed to fetch farmer data");
        const jsonResponse = await response.json();
        setFarmerData(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFarmerData();
  }, [id]);

  if (!farmerData) return null;

  return (
    <div className={classes}>
     <header className='page-header'>
       <h1>Your Account Details</h1>
     </header>
     <main>
       <section className='details'>
         <h2>Account info</h2>
         <ul>
           <li><strong>Username:</strong> {farmerData.username}</li>
           <li><strong>Address:</strong> {farmerData.address}</li>
           <li><strong>Phone Number:</strong> {farmerData.phoneNumber}</li>
         </ul>
       </section>

       <hr />
       <nav>
         <Link to="/" className='back-link'>Back</Link>
       </nav>
     </main>
   </div>
  );
}

export default FarmerProfile;
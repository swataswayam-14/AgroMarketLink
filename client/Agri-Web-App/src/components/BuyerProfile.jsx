import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import "./FarmerDetails.css"
const ButtonContainer = styled.div`
display: flex;
justify-content: space-around; /* Space evenly instead of stretching */
align-items: center;
max-width: 50%; /* Adjust the maximum width according to your preference */
margin: 0 auto; /* Center the button container */
`;

const Button = styled.button`
background-color: #4CAF50;
color: white;
border: none;
border-radius: 10px; /* Keep the same radius for consistency */
padding: 10px 20px; /* Increase padding for larger buttons */
font-size: 14px; /* Increase font size for better visibility */
cursor: pointer;
transition: all 0.3s ease-in-out;
&:hover {
  transform: scale(1.05);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
};

background-color: #69B3A2;
&:hover {
  background-color: #4E9D86;
}
`;


function BuyerProfile({ match }) {


  const classes = 'farmer-detail container';
  const { id } = useParams()
  const [buyerData, setBuyerData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBuyerData() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/buyer/profile/${id}`);
        if (!response.ok) throw Error("Failed to fetch farmer data");
        const jsonResponse = await response.json();
        setBuyerData(jsonResponse.buyer);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBuyerData();
  }, [id]);

  if (!buyerData) return null;

  return (
    <div className={classes}>
     <header className='page-header'>
       <h1>Your Account Details</h1>
     </header>
     <main>
       <section className='details'>
         <h2>Account info</h2>
         <ul>
           <li><strong>Username:</strong> {buyerData.username}</li>
           <li><strong>Address:</strong> {buyerData.address}</li>
           <li><strong>Phone Number:</strong> {buyerData.phoneno}</li>
         </ul>
        <ButtonContainer>
        <Button onClick={()=>{
            navigate('/farmers')
        }}>See Farmer Details</Button>
        <Button onClick={()=>{
          navigate(`/editbuyer/${id}`)
        }}>Edit Account Info</Button>
      </ButtonContainer>
       </section>

       <hr />
       <nav>
         <Link to="/" className='back-link'>Back</Link>
       </nav>
     </main>
   </div>
  );
}

export default BuyerProfile
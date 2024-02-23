import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';



const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  animation: ${fadeIn} 1s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around; /* Space evenly instead of stretching */
  align-items: center;
  max-width: 70%; /* Adjust the maximum width according to your preference */
  margin: 0 auto; /* Center the button container */
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px; /* Keep the same radius for consistency */
  padding: 20px 30px; /* Increase padding for larger buttons */
  font-size: 24px; /* Increase font size for better visibility */
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #3e8e41;
  }
`;

const Description = styled.p`
  font-size: 18px;
  margin: 20px 0;
`;

const Copyright = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const DashBoard = () => {
  const navigate = useNavigate();

  const handleBuyerSignIn = () => {
    navigate('/buyersignin');
  };

  const handleBuyerSignUp = () => {
    navigate('/buyersignup');
  };

  const handleFarmerSignIn = () => {
    navigate('/farmersignin');
  };

  const handleFarmerSignUp = () => {
    navigate('/farmersignup');
  };
  const agroImage = 'backgroundImage.jpg'
  return (
    <div className="container" style={{ backgroundImage: `url('${agroImage}')` }}>
      {/* Your remaining content goes here */}
    <Container>
      <ButtonContainer>
        <Button onClick={handleBuyerSignIn}>Buyer Sign In</Button>
        <Button onClick={handleBuyerSignUp}>Buyer Sign Up</Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={handleFarmerSignIn}>Farmer Sign In</Button>
        <Button onClick={handleFarmerSignUp}>Farmer Sign Up</Button>
      </ButtonContainer>
      <Description>
        Welcome to our website! We connect buyers and farmers to promote sustainable agriculture and healthy food choices.
      </Description>
      <Copyright>
        &copy; {new Date().getFullYear()} Our Company. All rights reserved.
      </Copyright>
    </Container>
    </div>
  );
};

export default DashBoard;
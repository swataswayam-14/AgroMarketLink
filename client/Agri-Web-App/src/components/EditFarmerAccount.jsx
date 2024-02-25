import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFarmerAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneno: '',
  });

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function getFarmerDetails() {
    console.log('get farmer details called');
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/farmer/profile/${id}`);
      const data = await response.data.farmer;
      setFormData(data); // Update formData inside the function
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFarmerDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dataToSend = {};

    Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" && key === e.target.name) {
            dataToSend[key] = value;
        }
    });
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/farmer/updateaccount/${id}`, dataToSend);
        console.log(response.data); 
    } catch (error) {
        console.error(error); 
    }
};

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#f0f0f0' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Edit Farmer Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }}
        />
        <br /><br />
        <label htmlFor='password'>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }}
        />
        <br /><br />
        <label htmlFor='phoneNumber'>Phone Number:</label>
        <input
          type="text"
          name="phoneno"
          value={formData.phoneno}
          onChange={handleChange}
          style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }}
        />
        <br /><br />
        {/* Add other optional input fields here */}
        <button type="submit" style={{ backgroundColor: '#3498db', color: '#fff', padding: '8px 15px', borderRadius: '5px', border: 'none' }}>Update Account</button>
      </form>
    </div>
  </div>
  );
};

export default EditFarmerAccount;






















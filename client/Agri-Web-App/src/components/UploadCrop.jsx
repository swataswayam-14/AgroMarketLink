import React, { useState } from 'react';
import axios from 'axios'; // Adding dependency for making HTTP requests
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';

const UploadCrop = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [formData, setFormData] = useState({
    userId:id,
    nameOfcrop: '',
    pricePerKg: null,
    amountAvailable: null,
  });

  const onInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/farmer/readytosell/${id}`, formData);
      console.log(response.data);
      navigate(`/farmercrop/${id}`)
      setFormData({
        userId:id,
        nameOfcrop: '',
        pricePerKg: null,
        amountAvailable: null,
      })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <main>
        <section className="image-container">
          <img className="product-image" src="default-image.jpg" alt="Product Image" />
          <input
            className="image-upload"
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={event => {}} //handeling it separately 
          />
          <label className="upload-button" htmlFor="image-upload">
            <span className="upload-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </span>
            <span className="upload-text">Upload Image</span>
          </label>
        </section>
        <section className="product-info">
          <label htmlFor="name-of-crop">Name of Crop:</label>
          <input
            type="text"
            id="name-of-crop"
            name="nameOfcrop"
            value={formData.nameOfcrop}
            onChange={onInputChange}
            placeholder="crop-name"
          />
          <label htmlFor="price-per-kg">Price per kg:</label>
          <input
            type="number"
            id="price-per-kg"
            name="pricePerKg"
            value={formData.pricePerKg || ''}
            onChange={onInputChange}
            step="0.01"
            placeholder="0.00"
          />
          <label htmlFor="available-amount">Available amount:</label>
          <input
            type="number"
            id="available-amount"
            name="amountAvailable"
            value={formData.amountAvailable || 0}
            onChange={onInputChange}
            placeholder="0"
          />
        </section>
        <button onClick={submitForm}>Submit</button>
      </main>
    </div>
  );
};

export default UploadCrop;
import React from "react";

import './styles.css';

function UploadCrop() {
  return (
    <div>
      <header>
        <button className="dashboard-button">Go to Dashboard</button>
        <button className="logout-button">Logout</button>
      </header>
      <main>
        <section className="image-container">
          <img className="product-image" src="default-image.jpg" alt="Product Image" />
          <input className="image-upload" type="file" id="image-upload" accept="image/*" />
          <label className="upload-button" htmlFor="image-upload">
            <span className="upload-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </span>
            <span className="upload-text">Upload Image</span>
          </label>
        </section>
        <section className="product-info">
          <label htmlFor="price-per-kg">Price per kg:</label>
          <input type="number" id="price-per-kg" name="price-per-kg" step="0.01" placeholder="0.00" />
          <label htmlFor="available-amount">Available amount:</label>
          <input type="number" id="available-amount" name="available-amount" placeholder="0" />
        </section>
      </main>
    </div>
  );
}

export default UploadCrop;
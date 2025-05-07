import React, { useState } from 'react';

function ProviderRequest({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ProviderRequest function");
    // Submit provider request logic
  };

  return (
    <div className="provider-request-component">
      <h2>בקשת ספק</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם מלא</label>
          <input 
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>אימייל</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>טלפון</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>הודעה</label>
          <textarea 
            name="message"
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">שלח בקשה</button>
      </form>
      <button onClick={onClose}>סגור</button>
    </div>
  );
}

export default ProviderRequest;

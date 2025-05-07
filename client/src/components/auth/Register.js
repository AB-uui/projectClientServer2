import React, { useState } from 'react';
import VerifyRegister from './VerifyRegister';

function Register({ onBack, onClose }) {
  const [showVerify, setShowVerify] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register function");
    setShowVerify(true);
  };

  if (showVerify) {
    return <VerifyRegister email={formData.email} onClose={onClose} />;
  }

  return (
    <div className="register-component">
      <h2>הרשמה</h2>
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
          <label>סיסמה</label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>אימות סיסמה</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">הירשם</button>
      </form>
      <button onClick={onBack}>חזרה</button>
    </div>
  );
}

export default Register;
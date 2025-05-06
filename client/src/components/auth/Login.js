import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';
import Register from './Register';
import { AuthContext } from '../../context/AuthContext';

function Login({ onClose }) {
  const { setUser, setIsAdmin } = useContext(AuthContext);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login function");
    
    // Simulate login success
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: email,
      role: email.includes('admin') ? 'admin' : 'user'
    };
    
    setUser(mockUser);
    setIsAdmin(mockUser.role === 'admin');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    onClose();
  };

  if (showForgetPassword) {
    return <ForgetPassword onBack={() => setShowForgetPassword(false)} />;
  }

  if (showRegister) {
    return <Register onBack={() => setShowRegister(false)} onClose={onClose} />;
  }

  return (
    <div className="login-component">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>אימייל</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>סיסמה</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">התחבר</button>
      </form>
      <div className="auth-links">
        <button onClick={() => setShowForgetPassword(true)}>שכחתי סיסמה</button>
        <button onClick={() => setShowRegister(true)}>הרשם</button>
      </div>
      <button onClick={onClose}>סגור</button>
    </div>
  );
}

export default Login;


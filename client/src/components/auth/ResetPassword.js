import React, { useState } from 'react';

function ResetPassword({ email, code }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ResetPassword function");
    // Reset password logic
  };

  return (
    <div className="reset-password-component">
      <h2>הגדרת סיסמה חדשה</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>סיסמה חדשה</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>אימות סיסמה</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">עדכן סיסמה</button>
      </form>
    </div>
  );
}

export default ResetPassword;
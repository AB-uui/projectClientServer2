import React, { useState } from 'react';
import ResendActivationCode from './ResendActivationCode';

function VerifyRegister({ email, onClose }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [showResend, setShowResend] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("VerifyRegister function");
    // Verification logic
  };

  if (showResend) {
    return <ResendActivationCode email={email} onBack={() => setShowResend(false)} />;
  }

  return (
    <div className="verify-register-component">
      <h2>אימות הרשמה</h2>
      <p>קוד אימות נשלח ל-{email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>קוד אימות</label>
          <input 
            type="text" 
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">אמת</button>
      </form>
      <button onClick={() => setShowResend(true)}>שלח קוד חדש</button>
      <button onClick={onClose}>סגור</button>
    </div>
  );
}

export default VerifyRegister;

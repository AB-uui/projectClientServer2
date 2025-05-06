import React, { useState } from 'react';
import ResetPassword from './ResetPassword';

function ForgetPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    console.log("ForgetPassword function");
    setCodeSent(true);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    // Verification logic
  };

  return (
    <div className="forget-password-component">
      <h2>שחזור סיסמה</h2>
      {!codeSent ? (
        <form onSubmit={handleSendCode}>
          <div>
            <label>אימייל</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">שלח קוד</button>
        </form>
      ) : (
        <ResetPassword email={email} code={verificationCode} />
      )}
      <button onClick={onBack}>חזרה</button>
    </div>
  );
}

export default ForgetPassword;

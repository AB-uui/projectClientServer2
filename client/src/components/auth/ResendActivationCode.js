import React, { useState } from 'react';

function ResendActivationCode({ email, onBack }) {
  const handleResend = () => {
    console.log("ResendActivationCode function");
    // Resend code logic
  };

  return (
    <div className="resend-activation-code-component">
      <h2>שליחת קוד אימות חדש</h2>
      <p>האימייל הרשום: {email}</p>
      <button onClick={handleResend}>שלח קוד חדש</button>
      <button onClick={onBack}>חזרה</button>
    </div>
  );
}

export default ResendActivationCode;
import React from 'react';

function Profile({ onClose }) {
  return (
    <div className="profile-component">
      <h2>פרופיל משתמש</h2>
      <div className="profile-details">
        {/* Profile details */}
        <div>
          <strong>שם:</strong> שם המשתמש
        </div>
        <div>
          <strong>אימייל:</strong> email@example.com
        </div>
      </div>
      <div className="profile-actions">
        <button>עדכן פרטים</button>
        <button>שנה סיסמה</button>
      </div>
      <button onClick={onClose}>סגור</button>
    </div>
  );
}

export default Profile;

import React from 'react';

function CustomerFormPage() {
  return (
    <div className="customer-form-page">
      <h1>יצירת טופס לקוח</h1>
      <form>
        {/* Form fields */}
        <div className="form-group">
          <label>שם</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>אימייל</label>
          <input type="email" />
        </div>
        <button type="submit">שלח</button>
      </form>
    </div>
  );
}

export default CustomerFormPage;

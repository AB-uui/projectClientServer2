// קובץ הכניסה של האפליקציה

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // לניווט
import App from './App';
import './index.css'; // קובץ CSS גלובלי 
// import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter> 
       <AuthProvider>
        <App />
       </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);




// הסבר:
// - BrowserRouter: מאפשר ניווט בין דפים באפליקציה.
// - Provider: מחבר את ה-Store של Redux לכל הרכיבים באפליקציה.
// - store: ה-Store של Redux, בו מאוחסן המצב הגלובלי.
// - React.StrictMode: עוזר לאתר בעיות פוטנציאליות באפליקציה.
// function sendToAnalytics({ id, name, value, delta, entries }) {
//   // כאן תכתבי את הקוד לשליחת הנתונים למערכת הניתוח שלך
//   console.log({ id, name, value, delta, entries }); // לדוגמה, הדפסה לקונסולה
// }

// reportWebVitals(sendToAnalytics);
// reportWebVitals();

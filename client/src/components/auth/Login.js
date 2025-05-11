// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import ForgetPassword from './ForgetPassword';
// import Register from './Register';
// import { AuthContext } from '../../context/AuthContext';

// function Login({ onClose }) {
//   const { setUser, setIsAdmin } = useContext(AuthContext);
//   const [showForgetPassword, setShowForgetPassword] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login function");
    
//     // Simulate login success
//     const mockUser = {
//       id: 1,
//       name: 'Test User',
//       email: email,
//       role: email.includes('admin') ? 'admin' : 'user'
//     };
    
//     setUser(mockUser);
//     setIsAdmin(mockUser.role === 'admin');
//     localStorage.setItem('user', JSON.stringify(mockUser));
    
//     onClose();
//   };

//   if (showForgetPassword) {
//     return <ForgetPassword onBack={() => setShowForgetPassword(false)} />;
//   }

//   if (showRegister) {
//     return <Register onBack={() => setShowRegister(false)} onClose={onClose} />;
//   }

//   return (
//     <div className="login-component">
//       <h2>התחברות</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>אימייל</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>סיסמה</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">התחבר</button>
//       </form>
//       <div className="auth-links">
//         <button onClick={() => setShowForgetPassword(true)}>שכחתי סיסמה</button>
//         <button onClick={() => setShowRegister(true)}>הרשם</button>
//       </div>
//       <button onClick={onClose}>סגור</button>
//     </div>
//   );
// }

// export default Login;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaTimes } from 'react-icons/fa';

// const LoginForm = ({ onLoginSuccess }) => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [showCard, setShowCard] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     if (!userName || !password) {
//       setMessage('יש למלא את כל השדות');
//       return;
//     }

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/auth/login',
//         { userName, password },
//         { withCredentials: true }
//       );

//       setMessage(res.data.message || 'התחברת בהצלחה');
//       setShowCard(false); // Hide card on success
//       onLoginSuccess?.(res.data.user);
//     } catch (err) {
//       const msg = err.response?.data?.message;
//       if (msg === 'Unauthorized' || msg === 'No authorized user found') {
//         setMessage('לא נמצאה משתמשת, רוצה להירשם?');
//       } else {
//         setMessage(msg || 'שגיאה בהתחברות');
//       }
//     }
//   };

//   if (!showCard) return null;

//   return (
//     <div className="container mt-5 d-flex justify-content-center">
//       <div className="card shadow-sm position-relative" style={{ width: '100%', maxWidth: '400px' }}>
//         <button
//           type="button"
//           className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
//           onClick={() => setShowCard(false)}
//         >
//           <FaTimes />
//         </button>
//         <div className="card-body">
//           <h3 className="card-title text-center mb-3">התחברות</h3>

//           {message && (
//             <div className="alert alert-warning text-center" role="alert">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="userName" className="form-label">שם משתמש</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="userName"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">סיסמה</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">התחבר</button>
//           </form>

//           <div className="text-center mt-3">
//             <button
//               className="btn btn-outline-danger w-100"
//               onClick={() => alert('Google login coming soon!')}
//               disabled
//             >
//               המשך עם Google (בקרוב)
//             </button>
//           </div>

//           <div className="mt-4 d-flex justify-content-between">
//             <button
//               className="btn btn-link p-0"
//               onClick={() => navigate('/ForgetPassword')}
//             >
//               שכחת סיסמה?
//             </button>
//             <span>
//               אין לך חשבון?
//               <button
//                 className="btn btn-link p-0 ms-1"
//                 onClick={() => navigate('/Register')}
//               >
//                 הירשם
//               </button>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Corrected import path

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showCard, setShowCard] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setUser } = useAuth(); // Use setUser instead of setCurrentUser

  useEffect(() => {
    // Optional: Check session or fetch current user from server
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => {
        if (res.data?.userName) setUser(res.data);
      })
      .catch(() => setUser(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!userName || !password) {
      setMessage('יש למלא את כל השדות');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { userName, password },
        { withCredentials: true }
      );
      setUser({ userName });
      setShowCard(false);
      setMessage('');
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg === 'Unauthorized' || msg === 'No authorized user found') {
        setMessage('לא נמצאה משתמשת, רוצה להירשם?');
      } else {
        setMessage(msg || 'שגיאה בהתחברות');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      setShowCard(true);
      setUserName('');
      setPassword('');
    } catch {
      setMessage('שגיאה בהתנתקות');
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  if (!showCard) return null;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-sm position-relative" style={{ width: '100%', maxWidth: '400px' }}>
        <button
          type="button"
          className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
          onClick={() => setShowCard(false)}
        >
          <FaTimes />
        </button>
        <div className="card-body">
          {currentUser ? (
            <>
              <h5 className="text-center mb-3">שלום, {currentUser.userName}</h5>
              <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-outline-secondary" onClick={toggleDropdown}>
                  {dropdownVisible ? '▲' : '▼'} פרופיל
                </button>
              </div>
              {dropdownVisible && (
                <div className="text-center mb-3">
                  <button
                    className="btn btn-link"
                    onClick={() => navigate('/UserDetailsPage')}
                  >
                    See and edit your account
                  </button>
                </div>
              )}
              <div className="d-grid">
                <button className="btn btn-danger" onClick={handleLogout}>
                  התנתק
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="card-title text-center mb-3">התחברות</h3>

              {message && (
                <div className="alert alert-warning text-center" role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">שם משתמש</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">סיסמה</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">התחבר</button>
              </form>

              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => alert('Google login coming soon!')}
                  disabled
                >
                  המשך עם Google (בקרוב)
                </button>
              </div>

              <div className="mt-4 d-flex justify-content-between">
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate('/ForgetPassword')}
                >
                  שכחת סיסמה?
                </button>
                <span>
                  אין לך חשבון?
                  <button
                    className="btn btn-link p-0 ms-1"
                    onClick={() => navigate('/Register')}
                  >
                    הירשם
                  </button>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

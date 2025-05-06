import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../auth/Login';
import Profile from '../user/Profile';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Implement logout logic
    console.log("Logout");
  };

  const handleProfile = () => {
    setShowProfileModal(true);
  };

  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">דף הבית</Link></li>
          <li><Link to="/tools">כלים</Link></li>
          <li><Link to="/topics">נושאים</Link></li>
          <li><Link to="/customer-form">יצירת טופס לקוח</Link></li>
        </ul>
      </nav>
      <div className="user-controls">
        {!isLoggedIn ? (
          <button onClick={handleLogin}>התחברות</button>
        ) : (
          <>
            <button onClick={handleProfile}>פרופיל</button>
            <button onClick={handleLogout}>התנתקות</button>
          </>
        )}
      </div>

      {/* Modals */}
      {showLoginModal && (
        <div className="modal">
          <Login onClose={() => setShowLoginModal(false)} />
        </div>
      )}
      
      {showProfileModal && (
        <div className="modal">
          <Profile onClose={() => setShowProfileModal(false)} />
        </div>
      )}
    </header>
  );
}

export default Header;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';


// function Header() {
  

//   return (
//     <header className="site-header">
//       <div className="logo">
//         <Link to="/">Logo</Link>
//       </div>
//       <nav className="main-nav">
//         <ul>
//           <li><Link to="/">דף הבית</Link></li>
         
//         </ul>
//       </nav>
      
//     </header>
//   );
// }

// export default Header;
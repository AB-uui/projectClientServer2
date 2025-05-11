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

  return (<>
    {/* <header className="navbar navbar-expand-lg navbar-light bg-light px-3"> */}
    <header className="d-flex flex-wrap justify-content-center bg-light py-3 mb-4 border-bottom">
        {/* לוגו בצד שמאל */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/MYLOGO.png"
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2"
          />
          <span className="fw-bold d-none d-md-inline">LEARNBUTTONS</span>
        </Link>

        {/* שורת חיפוש */}
        <form className="d-flex mx-auto w-50">
          <input
            className="form-control me-2"
            type="search"
            placeholder="חפש כפתור, נושא או כלי..."
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">חיפוש</button>
        </form>
      <div className="ms-auto">
        {!isLoggedIn ? (
          <button className="btn btn-primary" onClick={handleLogin}>התחברות</button>
        ) : (
          <>
            <button className="btn btn-outline-secondary me-2" onClick={handleProfile}>פרופיל</button>
            <button className="btn btn-danger" onClick={handleLogout}>התנתקות</button>
          </>
        )}
      </div>

    </header>
      {/* שורת תמונה מתחת לניווט */}
      <div className="w-100">
        <img
          src="/banner-image.jpg" // החליפי לתמונה שבחרת
          alt="Banner"
          className="img-fluid w-100"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>

      {/* Modals */}
      {showLoginModal && (
        <div className="modal d-block">
          <Login onClose={() => setShowLoginModal(false)} />
        </div>
      )}
      
      {showProfileModal && (
        <div className="modal d-block">
          <Profile onClose={() => setShowProfileModal(false)} />
        </div>
      )}
    </>
  );
}

export default Header;




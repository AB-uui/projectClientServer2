import React, { useState } from 'react';
import Requests from '../requests/Requests';
import ProviderRequest from '../requests/ProviderRequest';

function Footer() {
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showProviderRequestModal, setShowProviderRequestModal] = useState(false);

  const handleShowRequests = () => {
    setShowRequestsModal(true);
  };

  const handleShowProviderRequest = () => {
    setShowProviderRequestModal(true);
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <button onClick={handleShowRequests}>בקשות</button>
          <button onClick={handleShowProviderRequest}>בקשת ספק</button>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} כל הזכויות שמורות
        </div>
      </div>

      {/* Modals */}
      {showRequestsModal && (
        <div className="modal">
          <Requests onClose={() => setShowRequestsModal(false)} />
        </div>
      )}
      
      {showProviderRequestModal && (
        <div className="modal">
          <ProviderRequest onClose={() => setShowProviderRequestModal(false)} />
        </div>
      )}
    </footer>
  );
}

export default Footer;
// import React from 'react';

// const Footer = () => {
//   return (
//     <footer style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
//       <p>© 2025 האתר שלי</p>
//     </footer>
//   );
// };

// export default Footer;

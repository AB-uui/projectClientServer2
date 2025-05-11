import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import TopicsPage from './pages/TopicsPage';
import CustomerFormPage from './pages/CustomerFormPage';
import UserDetailsPage from './pages/UserDetailsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ToolPage from './pages/ToolPage';
import TopicPage from './pages/TopicPage';
import PostPage from './pages/PostPage';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyRegister from './components/auth/VerifyRegister';
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';
import ResendActivationCode from './components/auth/ResendActivationCode';

// User Components
import Profile from './components/user/Profile';

// Request Components
import Requests from './components/requests/Requests';
import ProviderRequest from './components/requests/ProviderRequest';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Routes>
        <Route element={<MainLayout />}>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/customer-form" element={<CustomerFormPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/tool/:id" element={<ToolPage />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Layouts
// import MainLayout from '../layouts/MainLayout';

// // Pages
// import HomePage from './pages/HomePage';
// import ToolsPage from './pages/ToolsPage';
// import TopicsPage from './pages/TopicsPage';
// import CustomerFormPage from './pages/CustomerFormPage';
// import UserDetailsPage from './pages/UserDetailsPage';
// import SubscriptionPage from './pages/SubscriptionPage';
// import ToolPage from './pages/ToolPage';
// import TopicPage from './pages/TopicPage';
// import PostPage from './pages/PostPage';
// import PostsPage from './pages/PostsPage';

// // Context
// // import { AuthContext } from './context/AuthContext';

// function App() {
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // Simulate checking for logged-in user from localStorage or sessionStorage
//     const loggedUser = localStorage.getItem('user');
//     if (loggedUser) {
//       const parsedUser = JSON.parse(loggedUser);
//       setUser(parsedUser);
//       setIsAdmin(parsedUser.role === 'admin');
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
//       <Routes>
//         <Route element={<MainLayout />}>
//           {/* Main Pages */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/tools" element={<ToolsPage />} />
//           <Route path="/topics" element={<TopicsPage />} />
//           <Route path="/customer-form" element={<CustomerFormPage />} />
//           <Route path="/user-details" element={<UserDetailsPage />} />
//           <Route path="/subscription" element={<SubscriptionPage />} />
//           <Route path="/tool/:id" element={<ToolPage />} />
//           <Route path="/topic/:id" element={<TopicPage />} />
//           <Route path="/posts" element={<PostsPage />} />
//           <Route path="/post/:id" element={<PostPage />} />
//         </Route>
//       </Routes>
//     </AuthContext.Provider>
//   );
// }

// export default App;
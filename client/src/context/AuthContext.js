// import { createContext } from 'react';

// export const AuthContext = createContext({
//   user: null,
//   setUser: () => {},
//   isAdmin: false,
//   setIsAdmin: () => {}
// });// File: src/store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import userReducer from './slices/userSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     user: userReducer,
//   },
// });

// export default store;
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // בקשת /me ברגע שהאפליקציה עולה
  useEffect(() => {
    axios.get("/api/auth/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (userName, password) => {
    await axios.post("/api/auth/login", { userName, password }, { withCredentials: true });
    const res = await axios.get("/api/auth/me", { withCredentials: true });
    setUser(res.data);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


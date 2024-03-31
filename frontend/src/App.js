import React, { useState } from 'react';
import AddEmployeeComponent from "./component/AddEmployeeComponent";
import FooterComponent from "./component/FooterComponent";
import HeaderComponent from "./component/HeaderComponent";
import ListEmployeeComponent from "./component/ListEmployeeComponent";
import Register from './component/Register';
import Login from './component/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios'; // Import Axios

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRegister = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default auth header
    setIsAuthenticated(true); // Update state to trigger redirect
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default auth header
    setIsAuthenticated(true); // Update state to trigger redirect
  };

  return (
    <BrowserRouter>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employee" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          <Route path="/add-employee/:id" element={<AddEmployeeComponent />} />
          <Route path="/register" element={!isAuthenticated ? <Register onRegister={handleRegister} /> : <Navigate to="/employee" replace />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/employee" replace />} />
          {/* Other routes */}
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

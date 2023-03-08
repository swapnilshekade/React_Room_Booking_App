import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import './LoginForm.css'
// import { Navigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/roombooking");
    // Handle login logic here
  };

  const handleSSOLogin = () => {
    // Handle SSO login logic here
    
  };

  const handleAdminLogin = () => {
    // Handle admin login logic here
    navigate("/adminpage");
  };

  return (
    <div className="container">
      <h2>LOGIN</h2>
      <form className="form" onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button className="login-button" type="submit">Login</button>
          <button className="sso-button" onClick={handleSSOLogin}>SSO Login</button>
        </div>
      </form>
      <button className="admin-button" onClick={handleAdminLogin}>Admin Login</button>
    </div>
  );
};

export default Login;

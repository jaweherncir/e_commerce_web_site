import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e  ) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email: email,
        password: password,
    });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      navigate("/"); // Redirect to home page
    } catch (error) {
      alert("Invalid email or password. Please try again.");
    }
  
  };

  const createAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/register", {
        email: email,
        password: password,
      });

      alert("Account created successfully! Please sign in."); // Display alert message
      setEmail(""); // Clear email field
      setPassword(""); // Clear password field
    } catch (error) {
      alert("Error creating account. Please try again.");
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          alt=""
          src="https://i.pinimg.com/564x/90/57/9d/90579d1244283a1b5dbf9c0ddcd2c9a9.jpg"
          className="login-logo"
        />
      </Link>
      <div className="login-container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn} className="login-signupButton">
            Sign In
          </button>
          <button
            type="submit"
            onClick={createAccount}
            className="login-accountButton"
          >
            Create Your Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

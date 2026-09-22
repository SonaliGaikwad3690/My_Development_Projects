import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setMessage("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);
      await api.login({ username: username.trim(), password });
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("loggedInUsername", username.trim());
      setMessage("Login successful!");
      setTimeout(() => navigate("/dashboard", { replace: true }), 400);
    } catch (error) {
      setMessage(error.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <section className="auth-card">
        <div className="logo">EMS</div>
        <h1>Employee Management System</h1>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" autoComplete="off" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="new-password" required />
          </div>

          <button className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <Message text={message} type={message === "Login successful!" ? "success" : "error"} />
        </form>

        <Link className="auth-link" to="/register">Create an account</Link>
      </section>
    </main>
  );
}

function Message({ text, type }) {
  return text ? <p className={`auth-message ${type}`}>{text}</p> : null;
}
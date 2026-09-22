import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();

    if (!form.username.trim()) return setMessage("Please enter username.");
    if (form.password !== form.confirmPassword) return setMessage("Passwords do not match.");
    if (form.password.length < 6) return setMessage("Password must contain at least 6 characters.");

    try {
      setMessage("Creating account...");
      await api.register({ username: form.username.trim(), password: form.password });
      setSuccess(true);
      setMessage("Registration successful!");
      setForm({ username: "", password: "", confirmPassword: "" });
      setTimeout(() => navigate("/login", { replace: true }), 1000);
    } catch (error) {
      setSuccess(false);
      setMessage(error.message || "Registration failed.");
    }
  }

  return (
    <main className="auth-container">
      <section className="auth-card">
        <div className="logo">EMS</div>
        <h1>Create Account</h1>
        <p className="subtitle">Register for Employee Management System</p>

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Username</label>
            <input name="username" value={form.username} onChange={change} placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={change} placeholder="Enter password" required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={change} placeholder="Confirm password" required />
          </div>

          <button className="auth-btn">Register</button>
          <p className={`auth-message ${success ? "success" : "error"}`}>{message}</p>
        </form>

        <div className="login-link">Already have an account? <Link to="/login">Login</Link></div>
      </section>
    </main>
  );
}
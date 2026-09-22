import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Layout({ title, subtitle, children }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("loggedInUsername") || "Admin";

  function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUsername");
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">EMS</div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-gauge-high" /> Dashboard
          </NavLink>
          <NavLink to="/employees" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-users" /> Employees
          </NavLink>
          <NavLink to="/holidays" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <i className="fa-solid fa-calendar-days" /> Holidays
          </NavLink>
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          <i className="fa-solid fa-right-from-bracket" /> Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <button className="profile-link" onClick={() => navigate("/profile")}>
            <span className="avatar">{username.charAt(0).toUpperCase()}</span>
            <span>{username}</span>
            <i className="fa-solid fa-chevron-down" />
          </button>
        </header>

        <section className="page-content">{children}</section>
      </main>
    </div>
  );
}
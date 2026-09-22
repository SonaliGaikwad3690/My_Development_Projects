import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    salary: 0,
    holidays: 0
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [all, active, inactive, holidays] = await Promise.all([
          api.getEmployees(),
          api.getActiveEmployees(),
          api.getInactiveEmployees(),
          api.getActiveHolidays()
        ]);

        const employees = Array.isArray(all) ? all : [];

        const salary = employees.reduce(
          (sum, e) => sum + Number(e.salary || 0),
          0
        );

        setStats({
          total: employees.length,
          active: Array.isArray(active) ? active.length : 0,
          inactive: Array.isArray(inactive) ? inactive.length : 0,
          salary,
          holidays: Array.isArray(holidays) ? holidays.length : 0
        });
      } catch (e) {
        setError(e.message || "Unable to load dashboard.");
      }
    }

    load();
  }, []);

  const activePercentage =
    stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;

  const inactivePercentage =
    stats.total > 0 ? Math.round((stats.inactive / stats.total) * 100) : 0;

  return (
    <Layout
      title="Dashboard"
      subtitle="Employee Management System"
    >
      <div className="dashboard-container">

        <div className="dashboard-welcome">
          <div>
            <span className="welcome-small">
              Welcome back 👋
            </span>

            <h2>Employee Management Dashboard</h2>

            <p>
              Here’s an overview of your organization today.
            </p>
          </div>

          <div className="dashboard-date">
            <i className="fa-solid fa-chart-line"></i>
            <span>Overview</span>
          </div>
        </div>

        {error && (
          <div className="message error">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        <div className="dashboard-stats">

          <DashboardCard
            icon="fa-users"
            title="Total Employees"
            value={stats.total}
            subtitle="All employees"
            type="blue"
          />

          <DashboardCard
            icon="fa-user-check"
            title="Active Employees"
            value={stats.active}
            subtitle={`${activePercentage}% of total employees`}
            type="green"
          />

          <DashboardCard
            icon="fa-user-slash"
            title="Inactive Employees"
            value={stats.inactive}
            subtitle={`${inactivePercentage}% of total employees`}
            type="red"
          />

          <DashboardCard
            icon="fa-indian-rupee-sign"
            title="Total Salary"
            value={`₹${stats.salary.toLocaleString("en-IN", {
              maximumFractionDigits: 2
            })}`}
            subtitle="Total employee salary"
            type="purple"
          />

          <DashboardCard
            icon="fa-calendar-days"
            title="Active Holidays"
            value={stats.holidays}
            subtitle="Available holidays"
            type="orange"
          />

        </div>

        <div className="dashboard-main-grid">

          <div className="dashboard-panel employee-overview">

            <div className="panel-header">
              <div>
                <h3>Employee Overview</h3>
                <p>Current employee distribution</p>
              </div>

              <div className="panel-icon">
                <i className="fa-solid fa-users"></i>
              </div>
            </div>

            <div className="overview-content">

              <div className="circle-container">

                <div
                  className="employee-circle"
                  style={{
                    background: `conic-gradient(
                      #15803d ${activePercentage}%,
                      #fee2e2 ${activePercentage}% 100%
                    )`
                  }}
                >
                  <div className="circle-inner">
                    <strong>{stats.total}</strong>
                    <span>Employees</span>
                  </div>
                </div>

              </div>

              <div className="employee-status">

                <div className="status-row">
                  <div className="status-label">
                    <span className="status-dot active-dot"></span>
                    <span>Active Employees</span>
                  </div>

                  <strong>{stats.active}</strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-active"
                    style={{
                      width: `${activePercentage}%`
                    }}
                  ></div>
                </div>

                <div className="status-row">
                  <div className="status-label">
                    <span className="status-dot inactive-dot"></span>
                    <span>Inactive Employees</span>
                  </div>

                  <strong>{stats.inactive}</strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-inactive"
                    style={{
                      width: `${inactivePercentage}%`
                    }}
                  ></div>
                </div>

              </div>

            </div>
          </div>

          <div className="dashboard-panel quick-summary">

            <div className="panel-header">
              <div>
                <h3>Quick Summary</h3>
                <p>System information</p>
              </div>

              <div className="panel-icon">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
            </div>

            <div className="summary-list">

              <div className="summary-item">
                <div className="summary-icon employee-summary">
                  <i className="fa-solid fa-user-group"></i>
                </div>

                <div>
                  <span>Total Employees</span>
                  <strong>{stats.total}</strong>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon active-summary">
                  <i className="fa-solid fa-circle-check"></i>
                </div>

                <div>
                  <span>Active Employees</span>
                  <strong>{stats.active}</strong>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon holiday-summary">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>

                <div>
                  <span>Active Holidays</span>
                  <strong>{stats.holidays}</strong>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon salary-summary">
                  <i className="fa-solid fa-money-bill-wave"></i>
                </div>

                <div>
                  <span>Total Salary</span>
                  <strong>
                    ₹{stats.salary.toLocaleString("en-IN", {
                      maximumFractionDigits: 2
                    })}
                  </strong>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="dashboard-bottom-grid">

          <div className="dashboard-info-card">
            <div className="info-card-icon">
              <i className="fa-solid fa-user-tie"></i>
            </div>

            <div>
              <span>Employee Management</span>
              <h3>{stats.total} Employees</h3>
              <p>
                Manage employee information, status and salary details.
              </p>
            </div>
          </div>

          <div className="dashboard-info-card">
            <div className="info-card-icon holiday-card-icon">
              <i className="fa-solid fa-calendar-days"></i>
            </div>

            <div>
              <span>Holiday Management</span>
              <h3>{stats.holidays} Active Holidays</h3>
              <p>
                Manage company holidays and employee holiday records.
              </p>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  subtitle,
  type
}) {
  return (
    <div className={`dashboard-card ${type}`}>

      <div className="dashboard-card-top">

        <div className="dashboard-card-icon">
          <i className={`fa-solid ${icon}`}></i>
        </div>

        <div className="dashboard-card-arrow">
          <i className="fa-solid fa-arrow-up-right"></i>
        </div>

      </div>

      <div className="dashboard-card-content">

        <span>{title}</span>

        <strong>{value}</strong>

        <small>
          <i className="fa-solid fa-circle"></i>
          {subtitle}
        </small>

      </div>

    </div>
  );
}
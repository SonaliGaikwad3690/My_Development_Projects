import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api.getActiveEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Unable to load employees.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function deactivate(id) {
    if (!window.confirm("Are you sure you want to deactivate this employee?")) return;

    try {
      await api.toggleEmployee(id);
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Layout
      title="Employee Management"
      subtitle="Manage employees and employee records"
    >
      <div className="page-header-row">
        <div>
          <h2>Active Employees</h2>
          <p>Currently active employees</p>
        </div>
      </div>

      <EmployeeNav active="active" />

      {error && <div className="message error">{error}</div>}

      <div className="table-card">
        <div className="table-title">
          <i className="fa-solid fa-users" /> Active Employees
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No active employees found.
                  </td>
                </tr>
              ) : (
                employees.map((e, i) => (
                  <tr key={e.id}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.department}</td>
                    <td>
                      ₹
                      {Number(e.salary || 0).toLocaleString("en-IN", {
                        maximumFractionDigits: 2
                      })}
                    </td>

                    <td className="actions">
                      <Link
                        className="icon-btn view"
                        to={`/employees/view/${e.id}`}
                        title="View"
                      >
                        <i className="fa-solid fa-eye" />
                      </Link>

                      <Link
                        className="icon-btn edit"
                        to={`/employees/edit/${e.id}`}
                        title="Edit"
                      >
                        <i className="fa-solid fa-pen" />
                      </Link>

                      <button
                        className="icon-btn danger"
                        onClick={() => deactivate(e.id)}
                        title="Inactive"
                      >
                        <i className="fa-solid fa-user-slash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export function EmployeeNav({ active }) {
  return (
    <div className="employee-nav">
      <Link
        className={active === "active" ? "active" : ""}
        to="/employees"
      >
        <i className="fa-solid fa-user-check" /> Active Employees
      </Link>

      <Link
        className={active === "inactive" ? "active" : ""}
        to="/employees/inactive"
      >
        <i className="fa-solid fa-user-slash" /> Inactive Employees
      </Link>

      <Link
        className={active === "add" ? "active add-link" : "add-link"}
        to="/employees/add"
      >
        <i className="fa-solid fa-user-plus" /> Add Employee
      </Link>
    </div>
  );
}
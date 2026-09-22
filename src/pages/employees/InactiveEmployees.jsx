import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";
import { EmployeeNav } from "./EmployeeList";

export default function InactiveEmployees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      setEmployees(await api.getInactiveEmployees());
    } catch (e) {
      setError(e.message || "Unable to load inactive employees.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function activate(id) {
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
      <div className="page-header">
        <h2>Inactive Employees</h2>
        <p>Employees who are currently inactive</p>
      </div>

      <EmployeeNav active="inactive" />

      {error && <div className="message error">{error}</div>}

      <div className="table-card">
        <div className="table-title">
          <i className="fa-solid fa-user-slash" /> Inactive Employees
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
                    No inactive employees found.
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
                      <button
                        className="icon-btn activate"
                        onClick={() => activate(e.id)}
                        title="Activate"
                      >
                        <i className="fa-solid fa-user-check" />
                      </button>

                      <Link
                        className="icon-btn view"
                        to={`/employees/edit/${e.id}`}
                        title="View"
                      >
                        <i className="fa-solid fa-eye" />
                      </Link>
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
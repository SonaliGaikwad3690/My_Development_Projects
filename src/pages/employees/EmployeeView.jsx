import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";

export default function EmployeeView() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployee() {
      try {
        const data = await api.getEmployee(id);
        setEmployee(data);
      } catch (e) {
        setError(e.message || "Unable to load employee.");
      }
    }

    loadEmployee();
  }, [id]);

  return (
    <Layout
      title="Employee Details"
      subtitle="View employee information"
    >
      {error && <div className="message error">{error}</div>}

      {employee && (
        <div className="table-card">
          <div className="table-title">
            <i className="fa-solid fa-user" /> Employee Details
          </div>

          <div className="employee-details">
            <div className="detail-row">
              <span>Employee ID</span>
              <strong>{employee.id}</strong>
            </div>

            <div className="detail-row">
              <span>Employee Name</span>
              <strong>{employee.name}</strong>
            </div>

            <div className="detail-row">
              <span>Department</span>
              <strong>{employee.department}</strong>
            </div>

            <div className="detail-row">
              <span>Salary</span>
              <strong>
                ₹
                {Number(employee.salary || 0).toLocaleString("en-IN", {
                  maximumFractionDigits: 2
                })}
              </strong>
            </div>

            <div className="detail-row">
              <span>Status</span>
              <strong>
                {Number(employee.status) === 1 ? "Active" : "Inactive"}
              </strong>
            </div>
          </div>

          <div className="view-actions">
            <Link className="btn btn-secondary" to="/employees">
              <i className="fa-solid fa-arrow-left" /> Back
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
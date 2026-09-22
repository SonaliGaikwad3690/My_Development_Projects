import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";
import { EmployeeNav } from "./EmployeeList";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", department: "", salary: "" });
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await api.addEmployee({
        name: form.name.trim(),
        department: form.department.trim(),
        salary: Number(form.salary),
        status: 1
      });
      navigate("/employees");
    } catch (e) {
      setMessage(e.message || "Unable to add employee.");
    }
  }

  return (
    <Layout title="Employee Management" subtitle="Manage employees and employee records">
      <div className="page-header"><h2>Add Employee</h2><p>Create a new employee record</p></div>
      <EmployeeNav active="add" />
      <div className="form-wrapper">
        <section className="form-card">
          <div className="form-title"><div className="form-icon"><i className="fa-solid fa-user-plus" /></div><h2>Add Employee</h2><p>Create a new employee record</p></div>
          {message && <div className="message error">{message}</div>}
          <form onSubmit={submit}>
            <div className="form-group"><label>Full Name</label><div className="input-box"><i className="fa-solid fa-user" /><input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Enter full name" required /></div><small>Enter first name and last name</small></div>
            <div className="form-group"><label>Department</label><div className="input-box"><i className="fa-solid fa-building" /><input value={form.department} onChange={e => setForm({...form, department:e.target.value})} placeholder="Enter department" required /></div></div>
            <div className="form-group"><label>Salary</label><div className="input-box"><i className="fa-solid fa-indian-rupee-sign" /><input type="number" min="0" step="0.01" value={form.salary} onChange={e => setForm({...form, salary:e.target.value})} placeholder="Enter salary" required /></div></div>
            <div className="info-box"><i className="fa-solid fa-circle-check" /> New employees are added as <strong>Active</strong> automatically.</div>
            <div className="form-buttons"><Link className="btn btn-cancel" to="/employees"><i className="fa-solid fa-arrow-left" /> Cancel</Link><button className="btn btn-primary"><i className="fa-solid fa-plus" /> Add Employee</button></div>
          </form>
        </section>
      </div>
    </Layout>
  );
}
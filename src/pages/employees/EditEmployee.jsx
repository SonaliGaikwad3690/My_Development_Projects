import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";
import { EmployeeNav } from "./EmployeeList";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", department: "", salary: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.getEmployee(id).then(employee => {
      if (Number(employee.status) !== 1) {
        alert("Inactive employee cannot be edited!");
        navigate("/employees/inactive", { replace: true });
        return;
      }
      setForm({ name: employee.name || "", department: employee.department || "", salary: employee.salary || "" });
    }).catch(() => {
      alert("Employee not found!");
      navigate("/employees", { replace: true });
    });
  }, [id, navigate]);

  async function submit(e) {
    e.preventDefault();
    try {
      await api.updateEmployee(id, {
        name: form.name.trim(),
        department: form.department.trim(),
        salary: Number(form.salary),
        status: 1
      });
      navigate("/employees");
    } catch (e) {
      setMessage(e.message || "Unable to update employee.");
    }
  }

  return (
    <Layout title="Employee Management" subtitle="Manage employees and employee records">
      <div className="page-header"><h2>Edit Employee</h2><p>Update employee information</p></div>
      <EmployeeNav active="active" />
      <div className="form-wrapper">
        <section className="form-card">
          <div className="form-title"><div className="form-icon edit-icon"><i className="fa-solid fa-user-pen" /></div><h2>Edit Employee</h2><p>Update employee information</p></div>
          {message && <div className="message error">{message}</div>}
          <form onSubmit={submit}>
            <div className="form-group"><label>Full Name</label><div className="input-box"><i className="fa-solid fa-user" /><input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required /></div></div>
            <div className="form-group"><label>Department</label><div className="input-box"><i className="fa-solid fa-building" /><input value={form.department} onChange={e => setForm({...form,department:e.target.value})} required /></div></div>
            <div className="form-group"><label>Salary</label><div className="input-box"><i className="fa-solid fa-indian-rupee-sign" /><input type="number" min="0" step="0.01" value={form.salary} onChange={e => setForm({...form,salary:e.target.value})} required /></div></div>
            <div className="form-buttons"><Link className="btn btn-cancel" to="/employees"><i className="fa-solid fa-arrow-left" /> Cancel</Link><button className="btn btn-primary"><i className="fa-solid fa-floppy-disk" /> Update Employee</button></div>
          </form>
        </section>
      </div>
    </Layout>
  );
}
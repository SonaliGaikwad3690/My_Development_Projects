import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";

const types = ["National", "Festival", "Optional", "Company", "Other"];

export default function AddHoliday() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ name:"", type:"", duration:"", description:"" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.getEmployees().then(setEmployees).catch(e => setMessage(e.message));
  }, []);

  function toggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.addHoliday({
        name: form.name.trim(),
        type: form.type,
        duration: Number(form.duration),
        description: form.description.trim(),
        status: 1,
        employees: selected.map(id => ({ id }))
      });
      navigate("/holidays");
    } catch (e) {
      setMessage(e.message || "Unable to add holiday.");
    }
  }

  return (
    <Layout title="Holiday Management" subtitle="Manage holidays and events">
      <HolidayFormHeader title="Add Holiday" subtitle="Create a new company holiday" icon="fa-calendar-plus" />
      {message && <div className="message error">{message}</div>}
      <div className="form-wrapper">
        <section className="form-card holiday-form-card">
          <form onSubmit={submit}>
            <div className="form-grid">
              <Field label="Holiday Name"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter holiday name" required /></Field>
              <Field label="Holiday Type"><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} required><option value="">Select Holiday Type</option>{types.map(t=><option key={t}>{t}</option>)}</select></Field>
              <Field label="Duration"><input type="number" step="0.5" min="0.5" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} placeholder="Enter duration" required /></Field>
              <div className="form-group employee-section"><label>Employees</label><div className="employee-list">{employees.length ? employees.map(e=><label className="employee-check" key={e.id}><input type="checkbox" checked={selected.includes(e.id)} onChange={()=>toggle(e.id)} /><span>{e.name}</span></label>) : <span className="employee-loading">No employees found.</span>}</div></div>
              <Field label="Description" full><textarea rows="4" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Enter holiday description" /></Field>
            </div>
            <div className="form-actions"><button className="btn btn-primary"><i className="fa-solid fa-check" /> Add Holiday</button><Link className="btn btn-cancel" to="/holidays"><i className="fa-solid fa-xmark" /> Cancel</Link></div>
          </form>
        </section>
      </div>
    </Layout>
  );
}

function Field({label,children,full}) {
  return <div className={`form-group ${full ? "full-width" : ""}`}><label>{label}</label>{children}</div>;
}
function HolidayFormHeader({title,subtitle,icon}) {
  return <div className="page-header holiday-form-header"><div className="form-icon"><i className={`fa-solid ${icon}`} /></div><div><h2>{title}</h2><p>{subtitle}</p></div></div>;
}
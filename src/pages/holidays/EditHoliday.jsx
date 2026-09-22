import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";

const types = ["National", "Festival", "Optional", "Company", "Other"];

export default function EditHoliday() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    duration: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([api.getEmployees(), api.getHoliday(id)])
      .then(([emps, h]) => {
        setEmployees(emps || []);
        setForm({
          name: h.name || "",
          type: h.type || "",
          duration: h.duration || "",
          description: h.description || ""
        });
        setSelected((h.employees || []).map(e => Number(e.id)));
      })
      .catch(e => setMessage(e.message || "Unable to load holiday."));
  }, [id]);

  function toggle(empId) {
    setSelected(prev =>
      prev.includes(empId)
        ? prev.filter(x => x !== empId)
        : [...prev, empId]
    );
  }

  async function submit(e) {
    e.preventDefault();

    try {
      await api.updateHoliday(id, {
        name: form.name.trim(),
        type: form.type,
        duration: Number(form.duration),
        description: form.description.trim(),
        status: 1,
        employees: selected.map(x => ({ id: x }))
      });

      navigate("/holidays", { replace: true });
    } catch (e) {
      setMessage(e.message || "Unable to update holiday.");
    }
  }

  return (
    <Layout
      title="Holiday Management"
      subtitle="Manage holidays and events"
    >
      <div className="page-header holiday-form-header">
        <div className="form-icon edit-icon">
          <i className="fa-solid fa-pen" />
        </div>

        <div>
          <h2>Edit Holiday</h2>
          <p>Update holiday information</p>
        </div>
      </div>

      {message && <div className="message error">{message}</div>}

      <div className="form-wrapper">
        <section className="form-card holiday-form-card">
          <form onSubmit={submit}>
            <div className="form-grid">
              <Field label="Holiday Name">
                <input
                  value={form.name}
                  onChange={e =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </Field>

              <Field label="Holiday Type">
                <select
                  value={form.type}
                  onChange={e =>
                    setForm({ ...form, type: e.target.value })
                  }
                  required
                >
                  <option value="">Select Type</option>
                  {types.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Duration">
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={form.duration}
                  onChange={e =>
                    setForm({ ...form, duration: e.target.value })
                  }
                  required
                />
              </Field>

              <div className="form-group employee-section">
                <label>Employees</label>

                <div className="employee-list">
                  {employees.map(e => (
                    <label className="employee-check" key={e.id}>
                      <input
                        type="checkbox"
                        checked={selected.includes(Number(e.id))}
                        onChange={() => toggle(Number(e.id))}
                      />
                      <span>{e.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Field label="Description" full>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </Field>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary">
                <i className="fa-solid fa-rotate" /> Update Holiday
              </button>

              <Link className="btn btn-cancel" to="/holidays">
                <i className="fa-solid fa-arrow-left" /> Cancel
              </Link>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}

function Field({ label, children, full }) {
  return (
    <div className={`form-group ${full ? "full-width" : ""}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}
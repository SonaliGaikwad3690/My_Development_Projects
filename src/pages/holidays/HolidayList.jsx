import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";

export default function HolidayList() {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try { setHolidays(await api.getActiveHolidays()); }
    catch (e) { setError(e.message || "Unable to load holidays."); }
  }

  useEffect(() => { load(); }, []);

  async function deactivate(id) {
    if (!window.confirm("Are you sure you want to make this holiday inactive?")) return;
    try { await api.toggleHoliday(id, 0); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <Layout title="Holiday Management" subtitle="Manage holidays and events">
      <div className="page-header-row">
        <div><h2>Holiday Management</h2><p>Manage company holidays and events</p></div>
        <div className="holiday-actions"><Link className="btn btn-primary" to="/holidays/add"><i className="fa-solid fa-plus" /> Add Holiday</Link><Link className="btn btn-danger" to="/holidays/inactive"><i className="fa-solid fa-ban" /> Inactive</Link></div>
      </div>
      {error && <div className="message error">{error}</div>}
      <div className="table-card holiday-card">
        <div className="table-title"><i className="fa-solid fa-calendar-days" /> Active Holidays</div>
        <div className="table-responsive">
          <table>
            <thead><tr><th>Sr. No.</th><th>Holiday Name</th><th>Type</th><th>Duration</th><th>Action</th></tr></thead>
            <tbody>
              {holidays.length === 0 ? <tr><td colSpan="5" className="empty">No active holidays found.</td></tr> :
              holidays.map((h,i) => <tr key={h.id}>
                <td>{i+1}</td><td>{h.name}</td><td>{h.type}</td><td>{h.duration}</td>
                <td className="actions"><Link className="icon-btn view" to={`/holidays/view/${h.id}`} title="View"><i className="fa-solid fa-eye" /></Link><Link className="icon-btn edit" to={`/holidays/edit/${h.id}`} title="Edit"><i className="fa-solid fa-pen" /></Link><button className="icon-btn danger" onClick={() => deactivate(h.id)} title="Inactive"><i className="fa-solid fa-ban" /></button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
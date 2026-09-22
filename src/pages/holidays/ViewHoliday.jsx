import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../api";

export default function ViewHoliday() {
  const {id} = useParams();
  const [holiday,setHoliday] = useState(null);
  const [error,setError] = useState("");

  useEffect(()=>{ api.getHoliday(id).then(setHoliday).catch(e=>setError(e.message||"Unable to load holiday.")); },[id]);

  return <Layout title="Holiday Management" subtitle="Manage holidays and events">
    <div className="view-wrapper"><section className="view-card">
      <div className="form-page-header"><div className="form-icon view-icon"><i className="fa-solid fa-eye"/></div><div><h2>Holiday Details</h2><p>View complete holiday information</p></div></div>
      {error && <div className="message error">{error}</div>}
      {!holiday ? <div className="employee-loading">Loading holiday details...</div> :
      <div className="details-grid">
        <Detail label="Holiday Name" value={holiday.name}/>
        <Detail label="Holiday Type" value={holiday.type}/>
        <Detail label="Duration" value={holiday.duration}/>
        <Detail label="Status" value={Number(holiday.status)===1?"Active":"Inactive"}/>
        <div className="detail-box full-width"><span>Description</span><strong>{holiday.description || "No description"}</strong></div>
        <div className="detail-box full-width"><span>Employees</span><strong>{(holiday.employees||[]).map(e=>e.name).join(", ") || "No employees assigned"}</strong></div>
      </div>}
      <div className="view-actions"><Link className="btn btn-cancel" to="/holidays"><i className="fa-solid fa-arrow-left"/> Back to Holidays</Link></div>
    </section></div>
  </Layout>;
}
function Detail({label,value}) { return <div className="detail-box"><span>{label}</span><strong>{value}</strong></div>; }
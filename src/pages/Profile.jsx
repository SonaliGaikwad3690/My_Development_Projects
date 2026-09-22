import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { api } from "../api";

export default function Profile() {
  const navigate = useNavigate();
  const [user,setUser] = useState(null);
  const [edit,setEdit] = useState(false);
  const [form,setForm] = useState({username:"",password:""});
  const [message,setMessage] = useState("");

  useEffect(()=>{
    const username=localStorage.getItem("loggedInUsername");
    if(!username){navigate("/login",{replace:true});return;}
    api.profile(username).then(u=>{setUser(u);setForm({username:u.username||"",password:""});}).catch(e=>setMessage(e.message||"Unable to load profile."));
  },[navigate]);

  async function update(e){
    e.preventDefault();
    if(!form.username.trim()) return setMessage("Username cannot be empty.");
    if(!form.password) return setMessage("Password cannot be empty.");
    try{
      const old=localStorage.getItem("loggedInUsername");
      const result=await api.updateProfile(old,{username:form.username.trim(),password:form.password});
      localStorage.setItem("loggedInUsername",form.username.trim());
      setMessage(typeof result==="string"?result:"Profile updated successfully.");
      setEdit(false);
      const u=await api.profile(form.username.trim());
      setUser(u);
    }catch(e){setMessage(e.message||"Unable to update profile.");}
  }

  function logout(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUsername");
    navigate("/login",{replace:true});
  }

  return <Layout title="Admin Profile" subtitle="Manage your administrator account">
    <div className="view-wrapper"><section className="view-card">
      <div className="profile"><div className="large-avatar">{(user?.username||"A").charAt(0).toUpperCase()}</div><h2>{user?.username||"Loading..."}</h2><p>Administrator</p></div>
      <div className="details-grid"><div className="detail-box"><span>Username</span><strong>{user?.username||"Loading..."}</strong></div><div className="detail-box"><span>Role</span><strong>Administrator</strong></div></div>
      <div className="view-buttons"><button className="btn btn-primary" onClick={()=>{setEdit(true);setMessage("");}}><i className="fa-solid fa-pen"/> Edit Profile</button><button className="btn btn-cancel" onClick={logout}><i className="fa-solid fa-right-from-bracket"/> Logout</button></div>
      {message && <p className="message success">{message}</p>}
      {edit && <div className="edit-profile"><h2>Edit Profile</h2><form onSubmit={update}><div className="form-group"><label>Username</label><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required/></div><div className="form-group"><label>New Password</label><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Enter new password" required/></div><div className="view-buttons"><button className="btn btn-primary"><i className="fa-solid fa-check"/> Update Profile</button><button type="button" className="btn btn-cancel" onClick={()=>setEdit(false)}>Cancel</button></div></form></div>}
    </section></div>
  </Layout>;
}
import React from "react";

export default function Message({ text, type = "error" }) {
  if (!text) return null;
  return <div className={`message ${type}`}>{text}</div>;
}
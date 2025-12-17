import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

export default function LogForm() {
  const { id } = useParams(); // รับ ID ถ้าเป็นการแก้ไข
  const navigate = useNavigate();
  const [form, setForm] = useState({
    action: "",
    user_name: "",
    details: "",
    status: "SUCCESS",
  });

  useEffect(() => {
    if (id) getLog();
  }, [id]);

  const getLog = async () => {
    const { data } = await supabase
      .from("system_logs")
      .select("*")
      .eq("id", id)
      .single();
    if (data) setForm(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Update
      await supabase.from("system_logs").update(form).eq("id", id);
    } else {
      // Create
      await supabase.from("system_logs").insert([form]);
    }
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="auth-box" style={{ maxWidth: "600px" }}>
        <h2>{id ? "Edit Log" : "New Log"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Action (e.g. LOGIN)"
            value={form.action}
            onChange={(e) => setForm({ ...form, action: e.target.value })}
          />
          <input
            placeholder="Username"
            value={form.user_name}
            onChange={(e) => setForm({ ...form, user_name: e.target.value })}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
          </select>
          <textarea
            placeholder="Details..."
            rows="4"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
          />
          <button className="btn">Save Data</button>
        </form>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-sm"
          style={{ marginTop: "10px", background: "#94a3b8" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Edit, LogOut } from "lucide-react";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    let { data } = await supabase
      .from("system_logs")
      .select("*")
      .order("created_at", { ascending: false });
    setLogs(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm delete?")) return;
    await supabase.from("system_logs").delete().eq("id", id);
    fetchLogs();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)" }}>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h3>Admin Portal</h3>
        </div>
        <button onClick={handleLogout} className="btn btn-sm btn-danger">
          <LogOut size={16} /> Logout
        </button>
      </nav>

      {/* Main Container */}
      <div className="container">
        {/* Header */}
        <div className="flex-between">
          <div>
            <h2 style={{ margin: 0 }}>Audit Logs</h2>
            <p
              style={{
                margin: "5px 0 0",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Monitor system activities and user actions.
            </p>
          </div>
          <Link to="/create">
            <button className="btn">+ New Log</button>
          </Link>
        </div>

        {/* Table Card */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>User</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th style={{ textAlign: "right" }}>Tools</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#94a3b8",
                    }}
                  >
                    No logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 500 }}>{log.action}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "#e0e7ff",
                            color: "#4f46e5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {log.user_name
                            ? log.user_name.charAt(0).toUpperCase()
                            : "?"}
                        </div>
                        {log.user_name}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          log.status === "SUCCESS" ? "success" : "failed"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {new Date(log.created_at).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link
                        to={`/edit/${log.id}`}
                        style={{ marginRight: "12px" }}
                      >
                        <Edit
                          size={18}
                          color="#64748b"
                          style={{ cursor: "pointer" }}
                        />
                      </Link>
                      <span onClick={() => handleDelete(log.id)}>
                        <Trash2
                          size={18}
                          color="#ef4444"
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

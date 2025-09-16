import React, { useState, useEffect } from "react";
import "../styles/dashboard.css"; // optional CSS file for styling

function RecruiterDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "VivekListOfFeedback123"; // ⚡ Keep secret

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("Incorrect password!");
    }
  };

  // Fetch messages only if authorized
  useEffect(() => {
    if (!isAuthorized) return;

    fetch("http://localhost:5000/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: ADMIN_PASSWORD }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.data);
        else setError(data.error || "Failed to fetch messages");
      })
      .catch((err) => setError("Server error: " + err.message));
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="dashboard-login" style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", fontSize: "1rem" }}
          />
          <button type="submit" style={{ padding: "10px", fontSize: "1rem", cursor: "pointer" }}>
            Login
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="dashboard" style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>Recruiter Messages</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table className="messages-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ background: "#667eea", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Full Name</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Email</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Message</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{msg.id}</td>
                <td style={{ padding: "8px" }}>{msg.fullName}</td>
                <td style={{ padding: "8px" }}>{msg.email}</td>
                <td style={{ padding: "8px" }}>{msg.message}</td>
                <td style={{ padding: "8px" }}>{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecruiterDashboard;

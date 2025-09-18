import React, { useState, useEffect } from "react";

function RecruiterDashboard() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "VivekListOfFeedback123";

  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setAuthorized(true);
    else setError("Wrong password");
  };

  useEffect(() => {
    if (!authorized) return;
    fetch("/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: ADMIN_PASSWORD }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setMessages(data.data);
        else setError(data.error || "Error");
      })
      .catch(err => setError(err.message));
  }, [authorized]);

  if (!authorized)
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );

  return (
    <div>
      <h2>Messages</h2>
      {messages.length === 0 ? <p>No messages</p> :
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.fullName}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </div>
  );
}

export default RecruiterDashboard;

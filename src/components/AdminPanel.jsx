import React, { useEffect, useState } from "react";
import { buildApiUrl, parseApiResponse } from "../lib/api";

const ADMIN_TOKEN_KEY = "portfolio_admin_token";
const ADMIN_EMAIL_KEY = "portfolio_admin_email";

export default function AdminPanel({ addReveal }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [busyAction, setBusyAction] = useState("");
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [adminEmail, setAdminEmail] = useState(
    () => sessionStorage.getItem(ADMIN_EMAIL_KEY) || "tejumahajan1008@gmail.com"
  );
  const [password, setPassword] = useState("");

  const buildAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminToken}`,
  });

  const loadContacts = async (token = adminToken) => {
    if (!token) {
      setContacts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(buildApiUrl("/api/contact"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await parseApiResponse(response, "Failed to load contacts.");

      if (!response.ok) {
        throw new Error(result.message || "Failed to load contacts.");
      }

      setContacts(result.data || []);
    } catch (error) {
      setContacts([]);
      setStatusMessage(error.message || "Unable to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      loadContacts(adminToken);
    }
  }, [adminToken]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(buildApiUrl("/api/admin/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminEmail.trim(),
          password,
        }),
      });
      const result = await parseApiResponse(response, "Admin login failed.");

      if (!response.ok) {
        throw new Error(result.message || "Admin login failed.");
      }

      sessionStorage.setItem(ADMIN_TOKEN_KEY, result.data.token);
      sessionStorage.setItem(ADMIN_EMAIL_KEY, result.data.email);
      setAdminToken(result.data.token);
      setPassword("");
      setStatusMessage("Admin login successful.");
    } catch (error) {
      setStatusMessage(error.message || "Unable to log in to the admin portal.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_KEY);
    setAdminToken("");
    setContacts([]);
    setPassword("");
    setStatusMessage("Logged out from admin portal.");
    setLoading(false);
  };

  const updateStatus = async (contactId, nextStatus) => {
    setBusyAction(`status-${contactId}`);
    setStatusMessage("");

    try {
      const response = await fetch(buildApiUrl(`/api/contact/${contactId}/status`), {
        method: "PATCH",
        headers: buildAuthHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await parseApiResponse(response, "Failed to update status.");

      if (!response.ok) {
        throw new Error(result.message || "Failed to update status.");
      }

      setContacts((current) =>
        current.map((contact) => (contact._id === contactId ? result.data : contact))
      );
      setStatusMessage("Contact status updated.");
    } catch (error) {
      setStatusMessage(error.message || "Unable to update contact status.");
    } finally {
      setBusyAction("");
    }
  };

  const sendReply = async (contactId) => {
    const replyMessage = (replyDrafts[contactId] || "").trim();

    if (!replyMessage) {
      setStatusMessage("Write a reply message before sending.");
      return;
    }

    setBusyAction(`reply-${contactId}`);
    setStatusMessage("");

    try {
      const response = await fetch(buildApiUrl(`/api/contact/${contactId}/reply`), {
        method: "POST",
        headers: buildAuthHeaders(),
        body: JSON.stringify({ message: replyMessage }),
      });
      const result = await parseApiResponse(response, "Failed to send reply.");

      if (!response.ok) {
        throw new Error(result.message || "Failed to send reply.");
      }

      setContacts((current) =>
        current.map((contact) => (contact._id === contactId ? result.data : contact))
      );
      setReplyDrafts((current) => ({ ...current, [contactId]: "" }));
      setStatusMessage("Reply email sent.");
    } catch (error) {
      setStatusMessage(
        error.message || "Unable to send reply email. Add SMTP credentials to enable this."
      );
    } finally {
      setBusyAction("");
    }
  };

  const deleteContact = async (contactId) => {
    setBusyAction(`delete-${contactId}`);
    setStatusMessage("");

    try {
      const response = await fetch(buildApiUrl(`/api/contact/${contactId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const result = await parseApiResponse(response, "Failed to delete contact.");

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete contact.");
      }

      setContacts((current) => current.filter((contact) => contact._id !== contactId));
      setStatusMessage("Contact deleted.");
    } catch (error) {
      setStatusMessage(error.message || "Unable to delete contact.");
    } finally {
      setBusyAction("");
    }
  };

  return (
    <section id="admin" className="section-admin">
      <div className="section-inner">
        <div className="admin-header reveal" ref={addReveal}>
          <div>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              Admin Portal
            </h2>
            <p className="admin-subtitle">
              Saved messages appear here after admin login. Public visitors can no longer read the inbox.
            </p>
          </div>
          {adminToken ? (
            <div className="admin-toolbar">
              <button className="btn-secondary admin-refresh" onClick={() => loadContacts()}>
                Refresh Inbox
              </button>
              <button className="btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
        </div>

        <p className="admin-banner" aria-live="polite">
          {statusMessage}
        </p>

        {!adminToken ? (
          <form className="admin-login-card reveal" ref={addReveal} onSubmit={handleLogin}>
            <div>
              <label className="field-label" htmlFor="admin-email">
                Admin Email
              </label>
              <input
                id="admin-email"
                className="field-input"
                type="email"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                placeholder="tejumahajan1008@gmail.com"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                className="field-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            <div className="admin-login-actions">
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Open Admin Portal"}
              </button>
            </div>
          </form>
        ) : loading ? (
          <div className="admin-empty reveal" ref={addReveal}>
            Loading contacts...
          </div>
        ) : contacts.length === 0 ? (
          <div className="admin-empty reveal" ref={addReveal}>
            No contact messages yet.
          </div>
        ) : (
          <div className="admin-grid">
            {contacts.map((contact) => (
              <article key={contact._id} className="admin-card reveal" ref={addReveal}>
                <div className="admin-card-top">
                  <div>
                    <h3 className="admin-name">{contact.name}</h3>
                    <a className="admin-email" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </div>
                  <div className="admin-badges">
                    <span className={`admin-badge status-${contact.status}`}>{contact.status}</span>
                    <span className={`admin-badge notification-${contact.notificationStatus || "pending"}`}>
                      {contact.notificationStatus || "pending"}
                    </span>
                  </div>
                </div>

                <p className="admin-message">{contact.message}</p>

                <div className="admin-meta">
                  <span>Received: {new Date(contact.createdAt).toLocaleString()}</span>
                  {contact.repliedAt && (
                    <span>Replied: {new Date(contact.repliedAt).toLocaleString()}</span>
                  )}
                </div>

                {contact.lastReplyMessage && (
                  <div className="admin-last-reply">
                    <div className="admin-last-reply-label">Last Reply</div>
                    <p>{contact.lastReplyMessage}</p>
                  </div>
                )}

                <div className="admin-actions">
                  {["new", "reviewed", "replied"].map((status) => (
                    <button
                      key={status}
                      className={`admin-action-btn ${contact.status === status ? "active" : ""}`}
                      onClick={() => updateStatus(contact._id, status)}
                      disabled={busyAction === `status-${contact._id}`}
                    >
                      Mark {status}
                    </button>
                  ))}
                </div>

                <div className="admin-reply-box">
                  <label className="field-label" htmlFor={`reply-${contact._id}`}>
                    Send Reply
                  </label>
                  <textarea
                    id={`reply-${contact._id}`}
                    className="field-textarea"
                    rows={4}
                    placeholder="Write a reply email for this contact..."
                    value={replyDrafts[contact._id] || ""}
                    onChange={(event) =>
                      setReplyDrafts((current) => ({
                        ...current,
                        [contact._id]: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="admin-bottom-actions">
                  <button
                    className="btn-primary"
                    onClick={() => sendReply(contact._id)}
                    disabled={busyAction === `reply-${contact._id}`}
                  >
                    {busyAction === `reply-${contact._id}` ? "Sending..." : "Send Reply"}
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => deleteContact(contact._id)}
                    disabled={busyAction === `delete-${contact._id}`}
                  >
                    {busyAction === `delete-${contact._id}` ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

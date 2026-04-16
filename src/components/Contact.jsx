import React, { useState } from "react";
import { buildApiUrl, parseApiResponse } from "../lib/api";

export default function Contact({ addReveal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.message) {
      setStatus({ type: "error", message: "Please fill in all the contact fields." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(buildApiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedData),
      });

      const result = await parseApiResponse(
        response,
        "Unable to send your message right now."
      );

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      setFormData({ name: "", email: "", message: "" });
      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been saved successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-contact">
      <div className="contact-inner">
        <h2 className="contact-title reveal" ref={addReveal}>Let's Connect</h2>
        <p className="contact-sub reveal" ref={addReveal}>
          Have a project in mind or want to discuss technical challenges? Reach out and TK will get back to you shortly.
        </p>
        <form className="contact-form reveal" ref={addReveal} onSubmit={handleSubmit} noValidate>
          <div>
            <label className="field-label" htmlFor="contact-name">Full Name</label>
            <input
              id="contact-name"
              className="field-input"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="contact-email">Email Address</label>
            <input
              id="contact-email"
              className="field-input"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="field-full">
            <label className="field-label" htmlFor="contact-message">Your Message</label>
            <textarea
              id="contact-message"
              className="field-textarea"
              rows={4}
              name="message"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <div className="field-full">
            <p className={`contact-status ${status.type}`} aria-live="polite">
              {status.message}
            </p>
          </div>
          <div className="field-full contact-submit">
            <button className="btn-primary" type="submit" disabled={isSubmitting}>
              Send Message →
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

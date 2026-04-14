import React from "react";

export default function Contact({ addReveal }) {
  return (
    <section id="contact" className="section-contact">
      <div className="contact-inner">
        <h2 className="contact-title reveal" ref={addReveal}>Let's Connect</h2>
        <p className="contact-sub reveal" ref={addReveal}>
          Have a project in mind or want to discuss technical challenges? Reach out and TK will get back to you shortly.
        </p>
        <div className="contact-form reveal" ref={addReveal}>
          <div>
            <label className="field-label">Full Name</label>
            <input className="field-input" type="text" placeholder="Your name" />
          </div>
          <div>
            <label className="field-label">Email Address</label>
            <input className="field-input" type="email" placeholder="your@email.com" />
          </div>
          <div className="field-full">
            <label className="field-label">Your Message</label>
            <textarea className="field-textarea" rows={4} placeholder="Tell me about your project..." />
          </div>
          <div className="field-full contact-submit">
            <button className="btn-primary">
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

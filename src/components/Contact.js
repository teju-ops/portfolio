import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/tejumahajan1008@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`,
        }),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="container contact">
      <h2 className="section-title center reveal">Contact</h2>
      <form className="card contact-form reveal" onSubmit={handleSubmit} style={{ '--d': '100ms' }}>
        <div className="row">
          <label>
            <span>Your Name</span>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            <span>Your Email</span>
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>
        <label>
          <span>Your Message</span>
          <textarea name="message" rows="6" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'} <span className="arrow">➤</span>
        </button>
        {status === 'success' && <p className="form-success">Message sent! I will get back to you soon.</p>}
        {status === 'error' && <p className="form-error">Something went wrong. Please email me directly at tejumahajan1008@gmail.com</p>}
        <p className="form-note">This sends directly to tejumahajan1008@gmail.com inbox.</p>
      </form>
    </div>
  );
}

export default Contact;

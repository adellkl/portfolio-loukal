import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contact.css';

export const Contact = ({ isOpen, onClose, language = 'fr' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const translations = {
    fr: {
      title: "CONTACTEZ-MOI",
      subtitle: "Créons quelque chose d'incroyable ensemble",
      name: "Nom",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      message: "Message",
      messagePlaceholder: "Parlez-moi de votre projet...",
      send: "ENVOYER",
      sending: "ENVOI...",
      sent: "ENVOYÉ ✓",
      error: "ERREUR ✗",
      or: "Ou contactez-moi directement à :",
    },
    en: {
      title: "GET IN TOUCH",
      subtitle: "Let's create something amazing together",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
      send: "SEND MESSAGE",
      sending: "SENDING...",
      sent: "SENT ✓",
      error: "ERROR ✗",
      or: "Or reach me directly at:",
    }
  };

  const t = translations[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      'service_e22vuqz',
      'template_yuw54r4',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'Sd6qtk3ZZ8OuP3eLR'
    )
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setStatus('');
        onClose();
      }, 2000);
    })
    .catch(() => {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <span>✕</span>
        </button>

        <div className="contact-header">
          <h2 className="contact-title">{t.title}</h2>
          <p className="contact-subtitle">{t.subtitle}</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t.namePlaceholder}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t.emailPlaceholder}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t.message}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder={t.messagePlaceholder}
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? t.sending : 
             status === 'success' ? t.sent : 
             status === 'error' ? t.error : t.send}
          </button>
        </form>

        <div className="contact-info">
          <p>{t.or}</p>
          <a href="mailto:adelloukal2@gmail.com" className="email-link">adelloukal2@gmail.com</a>
        </div>
      </div>
    </div>
  );
};

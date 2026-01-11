import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contact.css';

export const Contact = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const translations = {
    title: "Contact",
    subtitle: "Un projet ? Une question ?",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "votre@email.com",
    subject: "Sujet",
    subjectPlaceholder: "Sélectionnez un sujet",
    message: "Message",
    messagePlaceholder: "Votre message...",
    send: "Envoyer",
    sending: "Envoi...",
    sent: "Envoyé",
    error: "Erreur",
    or: "Ou contactez-moi directement :",
    subjects: {
      project: "Nouveau projet",
      quote: "Demande de devis",
      collaboration: "Collaboration",
      question: "Question",
      other: "Autre"
    }
  };

  const t = translations;

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
        subject: formData.subject,
        message: formData.message,
      },
      'Sd6qtk3ZZ8OuP3eLR'
    )
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
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
        <button className="close-btn" onClick={onClose} type="button" aria-label="Fermer">
          <span>×</span>
        </button>

        <div className="contact-header">
          <h2 className="contact-title">{t.title}</h2>
          <p className="contact-subtitle">{t.subtitle}</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t.namePlaceholder}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t.emailPlaceholder}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="" disabled>{t.subjectPlaceholder}</option>
              <option value={t.subjects.project}>{t.subjects.project}</option>
              <option value={t.subjects.quote}>{t.subjects.quote}</option>
              <option value={t.subjects.collaboration}>{t.subjects.collaboration}</option>
              <option value={t.subjects.question}>{t.subjects.question}</option>
              <option value={t.subjects.other}>{t.subjects.other}</option>
            </select>
          </div>

          <div className="form-group">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder={t.messagePlaceholder}
              className="form-textarea"
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

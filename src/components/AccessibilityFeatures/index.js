import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, Badge } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import './style.css';

const AccessibilityFeatures = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Voice Navigation
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (voiceEnabled) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [voiceEnabled]);

  const handleVoiceCommand = (command) => {
    console.log('Commande vocale:', command);
    
    if (command.includes('accueil') || command.includes('home')) {
      window.location.href = '/';
    } else if (command.includes('à propos') || command.includes('about')) {
      window.location.href = '/about';
    } else if (command.includes('portfolio') || command.includes('projets')) {
      window.location.href = '/portfolio';
    } else if (command.includes('contact')) {
      window.location.href = '/contact';
    } else if (command.includes('thème sombre') || command.includes('dark mode')) {
      document.querySelector('.theme-toggle')?.click();
    } else if (command.includes('thème clair') || command.includes('light mode')) {
      document.querySelector('.theme-toggle')?.click();
    } else if (command.includes('qr code') || command.includes('partager')) {
      setShowQRModal(true);
    } else if (command.includes('fermer') || command.includes('close')) {
      setShowQRModal(false);
      setShowAccessibilityPanel(false);
    }
  };

  const toggleVoiceNavigation = () => {
    if (!voiceEnabled) {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
    setVoiceEnabled(!voiceEnabled);
  };

  // Dyslexia Mode
  useEffect(() => {
    if (dyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
  }, [dyslexiaMode]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + raccourcis
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            window.location.href = '/';
            break;
          case '2':
            e.preventDefault();
            window.location.href = '/about';
            break;
          case '3':
            e.preventDefault();
            window.location.href = '/portfolio';
            break;
          case '4':
            e.preventDefault();
            window.location.href = '/contact';
            break;
          case '5':
            e.preventDefault();
            window.location.href = '/current';
            break;
          case 'a':
            e.preventDefault();
            setShowAccessibilityPanel(!showAccessibilityPanel);
            break;
          case 't':
            e.preventDefault();
            document.querySelector('.theme-toggle')?.click();
            break;
          case 'q':
            e.preventDefault();
            setShowQRModal(true);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showAccessibilityPanel]);

  const currentUrl = window.location.href;

  return (
    <>
      {/* Bouton d'accessibilité flottant */}
      <div className="accessibility-fab">
        <Button
          variant="primary"
          className="fab-button"
          onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
          aria-label="Ouvrir le panneau d'accessibilité"
        >
          ♿
        </Button>
        
        {showAccessibilityPanel && (
          <div className="accessibility-panel">
            <h6>🔧 Accessibilité</h6>
            
            <div className="accessibility-option">
              <Form.Check
                type="switch"
                id="voice-nav"
                label={
                  <span>
                    🎤 Navigation vocale
                    {isListening && <Badge bg="success" className="ms-2">Écoute</Badge>}
                  </span>
                }
                checked={voiceEnabled}
                onChange={toggleVoiceNavigation}
              />
              {voiceEnabled && (
                <small className="text-muted">
                  Dites "accueil", "à propos", "portfolio", "contact"...
                </small>
              )}
            </div>

            <div className="accessibility-option">
              <Form.Check
                type="switch"
                id="dyslexia-mode"
                label="📖 Mode dyslexie"
                checked={dyslexiaMode}
                onChange={(e) => setDyslexiaMode(e.target.checked)}
              />
              {dyslexiaMode && (
                <small className="text-muted">
                  Police et espacement adaptés
                </small>
              )}
            </div>

            <div className="accessibility-option">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowQRModal(true)}
                className="w-100"
              >
                📱 QR Code de partage
              </Button>
            </div>

            <div className="keyboard-shortcuts">
              <h6>⌨️ Raccourcis clavier</h6>
              <div className="shortcuts-list">
                <div><kbd>Alt + 1</kbd> Accueil</div>
                <div><kbd>Alt + 2</kbd> À propos</div>
                <div><kbd>Alt + 3</kbd> Portfolio</div>
                <div><kbd>Alt + 4</kbd> Contact</div>
                <div><kbd>Alt + A</kbd> Accessibilité</div>
                <div><kbd>Alt + T</kbd> Changer thème</div>
                <div><kbd>Alt + Q</kbd> QR Code</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal QR Code */}
      <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📱 Partager le portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="qr-container">
            <QRCode
              value={currentUrl}
              size={200}
              level="M"
              includeMargin={true}
              renderAs="svg"
            />
          </div>
          <p className="mt-3">
            Scannez ce QR code pour accéder au portfolio sur mobile
          </p>
          <div className="url-display">
            <small className="text-muted">{currentUrl}</small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigator.clipboard.writeText(currentUrl);
              // Vous pouvez ajouter une notification ici
            }}
          >
            📋 Copier le lien
          </Button>
          <Button variant="secondary" onClick={() => setShowQRModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Skip Links pour lecteurs d'écran */}
      <div className="skip-links">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <a href="#navigation" className="skip-link">
          Aller à la navigation
        </a>
      </div>
    </>
  );
};

export default AccessibilityFeatures;

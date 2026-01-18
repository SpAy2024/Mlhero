import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './VideoModal.css';

const VideoModal = ({ hero, onClose }) => {
  useEffect(() => {
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="video-modal-content">
          <div className="video-header">
            <h2>{hero?.nombre || 'Héroe'} Spotlight</h2>
            <p>Descubre las habilidades y combos de {hero?.nombre || 'este héroe'}</p>
          </div>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Hero Spotlight"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
          
          <div className="video-info">
            <h3>Sobre {hero?.nombre || 'este héroe'}</h3>
            <p>
              En este video spotlight, aprenderás las mejores estrategias, combos y builds para 
              dominar con {hero?.nombre || 'este héroe'} en Mobile Legends. Cubrimos desde las 
              habilidades básicas hasta las técnicas avanzadas.
            </p>
            
            {hero?.guia && (
              <div className="video-actions">
                <a href={hero.guia} target="_blank" rel="noopener noreferrer" className="guide-link">
                  📖 Ver guía completa
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
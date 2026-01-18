import React from 'react';
import { FaCrown, FaDiscord, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <FaCrown />
              <h2>ML Heroes</h2>
            </div>
            <p>La mejor guía de héroes para Mobile Legends. Estadísticas actualizadas, builds, counters y más.</p>
            <div className="social-links">
              <a href="#" aria-label="Discord"><FaDiscord /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Recursos</h3>
            <ul>
              <li><a href="#">Tier List</a></li>
              <li><a href="#">Guías de Build</a></li>
              <li><a href="#">Combos</a></li>
              <li><a href="#">Actualizaciones</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>API</h3>
            <p>Datos proporcionados por la API oficial</p>
            <small>Actualizado automáticamente</small>
            <div className="api-status">
              <span className="status-dot online"></span>
              <span>API Conectada</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ML Heroes. Todos los derechos reservados. Mobile Legends es una marca registrada de Moonton.</p>
          <p>Este sitio no está afiliado con Moonton.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
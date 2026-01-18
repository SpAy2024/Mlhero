import React, { useState, useEffect } from 'react';
import { FaEye, FaBook, FaPlay } from 'react-icons/fa';
import './HeroBanner.css';

const HeroBanner = ({ hero, onViewDetails, onPlayVideo }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hero) {
      setIsLoading(false);
    }
  }, [hero]);

  if (isLoading || !hero) {
    return (
      <section className="hero-banner loading">
        <div className="container">
          <div className="banner-content">
            <div className="loading-spinner"></div>
            <p>Cargando héroe destacado...</p>
          </div>
        </div>
      </section>
    );
  }

  const getRoleColor = (role) => {
    const colors = {
      'Tanque': '#ff6b6b',
      'Asesino': '#9b59b6',
      'Tirador': '#f1c40f',
      'Mago': '#3498db',
      'Soporte': '#2ecc71',
      'Combatiente': '#e67e22'
    };
    return colors[role] || '#666';
  };

  return (
    <section 
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${hero.imagen}')`
      }}
    >
      <div className="banner-overlay"></div>
      <div className="container">
        <div className="banner-content fade-in">
          <div className="banner-tags">
            <span className="tag new">DESTACADO</span>
            <span className="tag winrate">{hero.winRate || '--%'} WR</span>
          </div>
          <h1 className="banner-title text-gradient">{hero.nombre}</h1>
          <p className="banner-description">
            Descubre las habilidades únicas de {hero.nombre}. {hero.rol?.[0] || 'Héroe'} con gran versatilidad.
          </p>
          
          <div className="banner-stats">
            <div className="stat">
              <span className="stat-label">ROL</span>
              <span 
                className="stat-value"
                style={{ color: getRoleColor(hero.rol?.[0]) }}
              >
                {hero.rol?.[0] || '--'}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">WIN RATE</span>
              <span className="stat-value">{hero.winRate || '--%'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">LINEA</span>
              <span className="stat-value">{hero.linea || 'Varias'}</span>
            </div>
          </div>
          
          <div className="banner-buttons">
            <button className="btn-primary" onClick={onViewDetails}>
              <FaEye />
              Ver Detalles
            </button>
            <button className="btn-secondary" onClick={() => window.open(hero.guia, '_blank')}>
              <FaBook />
              Guía
            </button>
            <button className="btn-play" onClick={onPlayVideo}>
              <FaPlay />
              Spotlight
            </button>
          </div>
        </div>
        
        <div className="banner-image">
          <div className="hero-preview">
            <img 
              src={hero.imagen} 
              alt={hero.nombre}
              className="hero-image"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          
          {hero.skills && hero.skills.length > 0 && (
            <div className="hero-skills">
              {hero.skills.slice(0, 4).map((skill, index) => (
                <div key={index} className="skill-preview" title={skill.nombre}>
                  <img src={skill.imagen} alt={skill.nombre} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
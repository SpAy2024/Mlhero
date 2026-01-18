import React from 'react';
import './HeroCard.css';

const HeroCard = ({ hero, onClick }) => {
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

  const primaryRole = hero.rol?.[0] || 'Combatiente';
  const winRate = hero.winRate || '--%';

  return (
    <div className="hero-card" onClick={() => onClick(hero)}>
      <div className="role-badge" style={{ backgroundColor: getRoleColor(primaryRole) }}>
        {primaryRole.charAt(0)}
      </div>
      
      <div className="hero-image-container">
        <img 
          src={hero.imagen} 
          alt={hero.nombre}
          className="hero-image"
          loading="lazy"
        />
        <div className="hero-overlay">
          <span className="view-details">Ver detalles</span>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-header">
          <h3 className="hero-name">{hero.nombre}</h3>
          <span className="hero-role">{primaryRole}</span>
        </div>
        
        <div className="hero-footer">
          <span className="winrate-badge">{winRate}</span>
          <div className="hero-meta">
            {hero.skills && (
              <span className="meta-item">
                <i className="skill-icon"></i>
                {hero.skills.length} habilidades
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
import React from 'react';
import HeroCard from '../HeroCard/HeroCard';
import './RolesSection.css';

const ROLE_CONFIG = {
  'Tanque': {
    color: '#ff6b6b',
    icon: '🛡️',
    description: 'Alta resistencia y control'
  },
  'Asesino': {
    color: '#9b59b6',
    icon: '🗡️',
    description: 'Alto daño, baja defensa'
  },
  'Tirador': {
    color: '#f1c40f',
    icon: '🎯',
    description: 'Daño a distancia sostenido'
  },
  'Mago': {
    color: '#3498db',
    icon: '🔮',
    description: 'Daño mágico y control'
  },
  'Soporte': {
    color: '#2ecc71',
    icon: '❤️',
    description: 'Curación y utilidad'
  },
  'Combatiente': {
    color: '#e67e22',
    icon: '🥊',
    description: 'Daño cuerpo a cuerpo'
  }
};

const RolesSection = ({ heroes = [], onHeroClick }) => {
  // Agrupar héroes por rol
  const heroesByRole = {};
  
  heroes.forEach(hero => {
    if (hero.rol && Array.isArray(hero.rol)) {
      hero.rol.forEach(role => {
        if (!heroesByRole[role]) {
          heroesByRole[role] = [];
        }
        if (!heroesByRole[role].find(h => h.id === hero.id)) {
          heroesByRole[role].push(hero);
        }
      });
    }
  });

  // Ordenar roles por cantidad de héroes
  const sortedRoles = Object.keys(ROLE_CONFIG).sort((a, b) => {
    const countA = heroesByRole[a]?.length || 0;
    const countB = heroesByRole[b]?.length || 0;
    return countB - countA;
  });

  return (
    <div className="roles-section">
      <div className="section-header">
        <h2>Héroes por Rol</h2>
        <p className="section-description">
          Explora los héroes organizados por su rol principal en el juego
        </p>
      </div>
      
      <div className="roles-container">
        {sortedRoles.map((role) => {
          const config = ROLE_CONFIG[role];
          const roleHeroes = heroesByRole[role] || [];
          
          if (roleHeroes.length === 0) return null;
          
          return (
            <div key={role} className="role-category">
              <div className="role-header" style={{ borderLeftColor: config.color }}>
                <div className="role-title">
                  <span className="role-icon">{config.icon}</span>
                  <h3>{role}</h3>
                  <span className="role-count">{roleHeroes.length} héroes</span>
                </div>
                <p className="role-description">{config.description}</p>
              </div>
              
              <div className="role-heroes">
                {roleHeroes.slice(0, 6).map((hero) => (
                  <HeroCard 
                    key={hero.id} 
                    hero={hero} 
                    onClick={onHeroClick}
                  />
                ))}
                
                {roleHeroes.length > 6 && (
                  <div className="view-more">
                    <span>+{roleHeroes.length - 6} más</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RolesSection;
import React from 'react';
import RolesSection from '../components/RolesSection/RolesSection';

const RolesPage = ({ heroes, onHeroClick }) => {
  const roles = {
    'Tanque': 'Alta resistencia y control de masas',
    'Asesino': 'Alto daño, movilidad y eliminación de objetivos',
    'Tirador': 'Daño a distancia sostenido',
    'Mago': 'Daño mágico y control de área',
    'Soporte': 'Curación, utilidad y protección',
    'Combatiente': 'Daño cuerpo a cuerpo y durabilidad'
  };

  return (
    <div className="roles-page">
      <div className="container">
        <div className="page-header">
          <h1>Héroes por Rol</h1>
          <p>
            Cada rol tiene un propósito único en el campo de batalla. 
            Elige el que mejor se adapte a tu estilo de juego.
          </p>
        </div>
        
        <div className="roles-intro">
          <div className="roles-grid-intro">
            {Object.entries(roles).map(([role, description]) => (
              <div key={role} className="role-card-intro">
                <h3>{role}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <RolesSection 
          heroes={heroes}
          onHeroClick={onHeroClick}
        />
      </div>
    </div>
  );
};

export default RolesPage;
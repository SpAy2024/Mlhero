import React, { useState } from 'react';
import { FaTimes, FaBolt, FaSkullCrossbones, FaInfoCircle, FaBookOpen, FaYoutube, FaShieldAlt, FaCrosshairs, FaUserNinja, FaHatWizard, FaHandsHelping, FaFistRaised } from 'react-icons/fa';
import './HeroModal.css';

const HeroModal = ({ hero, onClose }) => {
  const [activeTab, setActiveTab] = useState('skills');

  if (!hero) return null;

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Tanque': return <FaShieldAlt />;
      case 'Asesino': return <FaUserNinja />;
      case 'Tirador': return <FaCrosshairs />;
      case 'Mago': return <FaHatWizard />;
      case 'Soporte': return <FaHandsHelping />;
      case 'Combatiente': return <FaFistRaised />;
      default: return <FaInfoCircle />;
    }
  };

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

  const tabs = [
    { id: 'skills', label: 'Habilidades', icon: <FaBolt />, show: hero.skills?.length > 0 },
    { id: 'counters', label: 'Counters', icon: <FaSkullCrossbones />, show: hero.counters?.length > 0 },
    { id: 'info', label: 'Información', icon: <FaInfoCircle />, show: true }
  ].filter(tab => tab.show);

  return (
    <div className="hero-modal-overlay" onClick={onClose}>
      <div className="hero-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        {/* Header del Modal */}
        <div className="modal-header" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${hero.imagen}')`
        }}>
          <div className="header-content">
            <div className="hero-basic-info">
              <img src={hero.imagen} alt={hero.nombre} className="hero-modal-img" />
              <div className="hero-info">
                <h2 className="hero-name">{hero.nombre}</h2>
                
                <div className="hero-roles">
                  {hero.rol?.map((role, index) => (
                    <span 
                      key={index} 
                      className="role-tag"
                      style={{ backgroundColor: getRoleColor(role) }}
                    >
                      {getRoleIcon(role)} {role}
                    </span>
                  ))}
                </div>
                
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-label">Win Rate</span>
                    <span className="stat-value">{hero.winRate || '--%'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Línea</span>
                    <span className="stat-value">{hero.linea || 'Varias'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hero-actions">
              {hero.guia && (
                <a href={hero.guia} target="_blank" rel="noopener noreferrer" className="action-btn guide-btn">
                  <FaBookOpen /> Guía Completa
                </a>
              )}
              <button className="action-btn video-btn">
                <FaYoutube /> Spotlight
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs de Contenido */}
        <div className="modal-tabs">
          <div className="tabs-header">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          
          <div className="tabs-content">
            {/* Tab Habilidades */}
            {activeTab === 'skills' && hero.skills?.length > 0 && (
              <div className="tab-pane skills-tab">
                <h3>Habilidades</h3>
                <div className="skills-grid">
                  {hero.skills.map((skill, index) => (
                    <div key={index} className="skill-card">
                      <div className="skill-header">
                        <div className="skill-icon">
                          <img src={skill.imagen} alt={skill.nombre} />
                          <span className="skill-number">{index + 1}</span>
                        </div>
                        <div className="skill-info">
                          <h4>{skill.nombre || `Habilidad ${index + 1}`}</h4>
                          <span className="skill-type">{getSkillType(skill.nombre)}</span>
                        </div>
                      </div>
                      <p className="skill-description">
                        {skill.descripcion || 'Sin descripción disponible'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tab Counters */}
            {activeTab === 'counters' && hero.counters?.length > 0 && (
              <div className="tab-pane counters-tab">
                <h3>Counters</h3>
                <p className="counters-description">
                  Estos héroes son efectivos contra {hero.nombre}
                </p>
                <div className="counters-grid">
                  {hero.counters.slice(0, 6).map((counter, index) => (
                    <div key={index} className="counter-card">
                      <div className="counter-img-container">
                        <img src={counter} alt={`Counter ${index + 1}`} />
                        <span className="counter-badge">{index + 1}</span>
                      </div>
                      <div className="counter-info">
                        <h4>Counter {index + 1}</h4>
                        <p>Efectivo contra {hero.nombre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tab Información */}
            {activeTab === 'info' && (
              <div className="tab-pane info-tab">
                <h3>Información General</h3>
                <div className="info-grid">
                  <div className="info-section">
                    <h4>Estadísticas</h4>
                    <div className="info-list">
                      <div className="info-item">
                        <span>Win Rate</span>
                        <span className="info-value">{hero.winRate || '--%'}</span>
                      </div>
                      <div className="info-item">
                        <span>Habilidades</span>
                        <span className="info-value">{hero.skills?.length || 0}</span>
                      </div>
                      <div className="info-item">
                        <span>Counters</span>
                        <span className="info-value">{hero.counters?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-section">
                    <h4>Roles</h4>
                    <div className="roles-list">
                      {hero.rol?.map((role, index) => (
                        <div key={index} className="role-item">
                          <span style={{ color: getRoleColor(role) }}>
                            {getRoleIcon(role)} {role}
                          </span>
                        </div>
                      )) || <p>Sin roles especificados</p>}
                    </div>
                  </div>
                  
                  <div className="info-section">
                    <h4>Recursos</h4>
                    <div className="resources-list">
                      {hero.guia && (
                        <a href={hero.guia} target="_blank" rel="noopener noreferrer" className="resource-item">
                          <FaBookOpen /> Guía completa
                        </a>
                      )}
                      <button className="resource-item">
                        <FaYoutube /> Video spotlight
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Función auxiliar para determinar tipo de habilidad
const getSkillType = (skillName) => {
  if (!skillName) return 'Habilidad';
  const name = skillName.toLowerCase();
  
  if (name.includes('buff')) return 'Mejora';
  if (name.includes('aoe')) return 'Área de efecto';
  if (name.includes('speed')) return 'Movimiento';
  if (name.includes('cc')) return 'Control';
  if (name.includes('heal')) return 'Curación';
  if (name.includes('shield')) return 'Escudo';
  if (name.includes('stun')) return 'Aturdimiento';
  if (name.includes('damage')) return 'Daño';
  if (name.includes('passive')) return 'Pasiva';
  
  return 'Habilidad';
};

export default HeroModal;
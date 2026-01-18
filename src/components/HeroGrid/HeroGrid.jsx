import React, { useState } from 'react';
import { FaTh, FaList } from 'react-icons/fa';
import HeroCard from '../HeroCard/HeroCard';
import './HeroGrid.css';

const HeroGrid = ({ heroes = [], onHeroClick }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name-asc');

  if (!heroes || heroes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay héroes disponibles</h3>
        <p>Intenta recargar la página o verificar la conexión.</p>
      </div>
    );
  }

  // Ordenar héroes
  const sortedHeroes = [...heroes].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.nombre.localeCompare(b.nombre);
      case 'name-desc':
        return b.nombre.localeCompare(a.nombre);
      case 'winrate-asc':
        return (parseFloat(a.winRate) || 0) - (parseFloat(b.winRate) || 0);
      case 'winrate-desc':
        return (parseFloat(b.winRate) || 0) - (parseFloat(a.winRate) || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="hero-grid-container">
      {/* Controles de vista y ordenamiento */}
      <div className="grid-controls">
        <div className="sort-controls">
          <span>Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="winrate-desc">Win Rate (Mayor)</option>
            <option value="winrate-asc">Win Rate (Menor)</option>
          </select>
        </div>
        
        <div className="view-controls">
          <span className="results-count">
            {sortedHeroes.length} héroes
          </span>
          
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Vista cuadrícula"
            >
              <FaTh />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Vista lista"
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="heroes-grid">
          {sortedHeroes.map(hero => (
            <HeroCard
              key={hero.id}
              hero={hero}
              onClick={onHeroClick}
            />
          ))}
        </div>
      ) : (
        <div className="heroes-list">
          {sortedHeroes.map(hero => {
            const primaryRole = hero.rol?.[0] || 'Combatiente';
            return (
              <div
                key={hero.id}
                className="list-item"
                onClick={() => onHeroClick(hero)}
              >
                <img
                  src={hero.imagen}
                  alt={hero.nombre}
                  className="list-item-img"
                />
                <div className="list-item-content">
                  <div className="list-item-header">
                    <div>
                      <h4>{hero.nombre}</h4>
                      <span className="list-item-role">{primaryRole}</span>
                    </div>
                    <span className="winrate-badge">{hero.winRate || '--%'}</span>
                  </div>
                  <div className="list-item-stats">
                    {hero.linea && <span>{hero.linea}</span>}
                    <span>{hero.skills?.length || 0} habilidades</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeroGrid;
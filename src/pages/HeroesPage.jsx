import React, { useState } from 'react';
import HeroGrid from '../components/HeroGrid/HeroGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import './HeroesPage.css';

const HeroesPage = ({ heroes, onHeroClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Filtrar héroes basado en búsqueda y rol
  const filteredHeroes = heroes.filter(hero => {
    // Filtrar por búsqueda
    const matchesSearch = !searchQuery || 
      hero.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hero.rol && hero.rol.some(role => 
        role.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    // Filtrar por rol
    const matchesRole = !selectedRole || 
      (hero.rol && hero.rol.includes(selectedRole));
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="heroes-page">
      <div className="container">
        <div className="page-header">
          <h1>Todos los Héroes</h1>
          <p>Explora todos los héroes de Mobile Legends</p>
        </div>
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          heroes={heroes}
        />
        
        <div className="results-info">
          <p>
            Mostrando <strong>{filteredHeroes.length}</strong> de <strong>{heroes.length}</strong> héroes
            {searchQuery && ` para "${searchQuery}"`}
            {selectedRole && ` en rol "${selectedRole}"`}
          </p>
        </div>
        
        {filteredHeroes.length > 0 ? (
          <HeroGrid 
            heroes={filteredHeroes}
            onHeroClick={onHeroClick}
          />
        ) : (
          <div className="no-results">
            <h3>😕 No se encontraron héroes</h3>
            <p>Intenta con otros términos de búsqueda o selecciona un rol diferente.</p>
            <button 
              className="reset-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('');
              }}
            >
              Mostrar todos los héroes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroesPage;
import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedRole, 
  setSelectedRole,
  heroes = [] 
}) => {
  // Obtener roles únicos de los héroes
  const uniqueRoles = [...new Set(heroes.flatMap(hero => hero.rol || []))].sort();

  return (
    <div className="search-bar-container">
      <div className="search-filters">
        {/* Barra de búsqueda */}
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar héroe por nombre o rol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        {/* Filtro de roles */}
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="role-select"
          >
            <option value="">Todos los roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Botón para limpiar filtros */}
      {(searchQuery || selectedRole) && (
        <button 
          className="clear-filters-btn"
          onClick={() => {
            setSearchQuery('');
            setSelectedRole('');
          }}
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default SearchBar;
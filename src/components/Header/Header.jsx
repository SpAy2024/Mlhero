import React, { useState, useEffect } from 'react';
import { FaCrown, FaSearch, FaMoon, FaSun, FaHome, FaUsers, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import './Header.css';

const Header = ({ theme, toggleTheme, setActiveSection, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: <FaHome /> },
    { id: 'heroes', label: 'Todos los Héroes', icon: <FaUsers /> },
    { id: 'roles', label: 'Por Roles', icon: <FaShieldAlt /> },
    { id: 'tierlist', label: 'Tier List', icon: <FaChartBar /> }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    // Scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <div className="logo" onClick={() => handleNavClick('inicio')}>
            <FaCrown />
            <h1>ML Heroes</h1>
            <span className="beta-tag">BETA</span>
          </div>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <button className="btn-theme" onClick={toggleTheme}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
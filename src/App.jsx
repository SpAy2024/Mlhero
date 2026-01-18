import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import HeroModal from './components/HeroModal/HeroModal';
import VideoModal from './components/VideoModal/VideoModal';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import HeroesPage from './pages/HeroesPage';
import RolesPage from './pages/RolesPage';
import { fetchHeroes, getRandomHero } from './services/api';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('inicio');
  const [heroes, setHeroes] = useState([]);
  const [featuredHero, setFeaturedHero] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar tema del localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Cargar héroes
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchHeroes();
      setHeroes(data);
      if (data.length > 0) {
        setFeaturedHero(getRandomHero(data));
      }
    } catch (error) {
      console.error('Error loading heroes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleViewDetails = (hero) => {
    setSelectedHero(hero);
    setShowHeroModal(true);
  };

  const handlePlayVideo = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowHeroModal(false);
    setShowVideoModal(false);
  };

  if (isLoading) {
    return (
      <div className="app" data-theme={theme}>
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Cargando héroes...</p>
          <small>Conectando con la API...</small>
        </div>
      </div>
    );
  }

  return (
    <div className="app" data-theme={theme}>
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      
      <main>
        {activeSection === 'inicio' && (
          <HomePage 
            featuredHero={featuredHero}
            heroes={heroes}
            onViewDetails={handleViewDetails}
            onPlayVideo={handlePlayVideo}
          />
        )}
        
        {activeSection === 'heroes' && (
          <HeroesPage 
            heroes={heroes}
            onHeroClick={handleViewDetails}
          />
        )}
        
        {activeSection === 'roles' && (
          <RolesPage 
            heroes={heroes}
            onHeroClick={handleViewDetails}
          />
        )}
      </main>
      
      <Footer />
      
      {showHeroModal && selectedHero && (
        <HeroModal 
          hero={selectedHero}
          onClose={handleCloseModal}
        />
      )}
      
      {showVideoModal && (
        <VideoModal 
          hero={featuredHero}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
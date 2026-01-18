import React from 'react';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import QuickStats from '../components/QuickStats/QuickStats';
import HeroSlider from '../components/HeroSlider/HeroSlider';

const HomePage = ({ 
  featuredHero, 
  heroes, 
  onViewDetails, 
  onPlayVideo 
}) => {
  // Filtrar héroes populares (win rate >= 50%)
  const popularHeroes = heroes.filter(h => {
    const winRate = parseFloat(h.winRate) || 0;
    return winRate >= 50;
  }).slice(0, 10);

  // Héroes con mayor win rate
  const topWinRateHeroes = [...heroes]
    .sort((a, b) => {
      const winRateA = parseFloat(a.winRate) || 0;
      const winRateB = parseFloat(b.winRate) || 0;
      return winRateB - winRateA;
    })
    .slice(0, 10);

  // Héroes "nuevos" (últimos 10)
  const newHeroes = [...heroes]
    .reverse()
    .slice(0, 10);

  return (
    <div className="home-page">
      <HeroBanner 
        hero={featuredHero}
        onViewDetails={() => onViewDetails(featuredHero)}
        onPlayVideo={onPlayVideo}
      />
      
      <div className="container">
        <QuickStats heroes={heroes} />
        
        {popularHeroes.length > 0 && (
          <HeroSlider 
            title="Héroes Populares"
            heroes={popularHeroes}
            onHeroClick={onViewDetails}
          />
        )}
        
        {topWinRateHeroes.length > 0 && (
          <HeroSlider 
            title="Mayor Win Rate"
            heroes={topWinRateHeroes}
            onHeroClick={onViewDetails}
          />
        )}
        
        {newHeroes.length > 0 && (
          <HeroSlider 
            title="Nuevos Héroes"
            heroes={newHeroes}
            onHeroClick={onViewDetails}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
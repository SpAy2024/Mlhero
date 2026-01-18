import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeroCard from '../HeroCard/HeroCard';
import './HeroSlider.css';

const HeroSlider = ({ title, heroes = [], onHeroClick }) => {
  const sliderRef = useRef(null);

  if (!heroes || heroes.length === 0) {
    return (
      <section className="slider-section">
        <div className="section-header">
          <h2>{title}</h2>
        </div>
        <p className="no-heroes">No hay héroes disponibles</p>
      </section>
    );
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="slider-section">
      <div className="section-header">
        <h2>{title}</h2>
        <span className="hero-count">{heroes.length} héroes</span>
      </div>
      
      <div className="slider-wrapper">
        <button className="slider-btn slider-btn-prev" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        
        <div className="slider" ref={sliderRef}>
          {heroes.map((hero) => (
            <div key={hero.id} className="slider-item">
              <HeroCard hero={hero} onClick={onHeroClick} />
            </div>
          ))}
        </div>
        
        <button className="slider-btn slider-btn-next" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
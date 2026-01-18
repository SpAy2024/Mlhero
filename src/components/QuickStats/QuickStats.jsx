import React from 'react';
import { FaUsers, FaTrophy, FaStar, FaFire } from 'react-icons/fa';
import './QuickStats.css';

const QuickStats = ({ heroes = [] }) => {
  // Calcular estadísticas
  const totalHeroes = heroes.length;
  
  const avgWinRate = heroes.length > 0 
    ? (heroes.reduce((sum, hero) => {
        const winRate = parseFloat(hero.winRate) || 0;
        return sum + winRate;
      }, 0) / heroes.length).toFixed(1)
    : 0;
  
  // Encontrar rol más popular
  const roleCount = {};
  heroes.forEach(hero => {
    if (hero.rol && Array.isArray(hero.rol)) {
      hero.rol.forEach(role => {
        roleCount[role] = (roleCount[role] || 0) + 1;
      });
    }
  });
  
  const mostPopularRole = Object.keys(roleCount).reduce((a, b) => 
    roleCount[a] > roleCount[b] ? a : b, 'Tanque'
  );

  const stats = [
    {
      icon: <FaUsers />,
      value: totalHeroes,
      label: 'Héroes Totales',
      color: '#e50914'
    },
    {
      icon: <FaTrophy />,
      value: `${avgWinRate}%`,
      label: 'Win Rate Promedio',
      color: '#2ecc71'
    },
    {
      icon: <FaStar />,
      value: Math.min(heroes.length, 5),
      label: 'Héroes Nuevos',
      color: '#f1c40f'
    },
    {
      icon: <FaFire />,
      value: mostPopularRole,
      label: 'Rol Más Popular',
      color: '#3498db'
    }
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
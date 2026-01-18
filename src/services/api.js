const API_URL = 'https://api-ml-0pw4.onrender.com/api/heroes';

export const fetchHeroes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Procesar datos
    return data.map(hero => ({
      ...hero,
      winRateNumber: parseWinRate(hero.winRate),
      rol: Array.isArray(hero.rol) ? hero.rol : [hero.rol].filter(Boolean)
    }));
  } catch (error) {
    console.error('Error fetching heroes:', error);
    // Retornar datos de ejemplo como fallback
    return getSampleData();
  }
};

const parseWinRate = (winRate) => {
  if (!winRate) return 0;
  const match = winRate.toString().match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 0;
};

export const getRandomHero = (heroes) => {
  if (!heroes || heroes.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * heroes.length);
  return heroes[randomIndex];
};

const getSampleData = () => {
  return [
    {
      id: 22,
      nombre: "Obsidia",
      rol: ["Tirador"],
      winRate: "51.08%",
      imagen: "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage_2_1_18/100_92bcc9ad2c4c8165a888d34f086a4d28.png",
      icon: "https://akmweb.youngjoygame.com/web/gms/image/025c69a764924f4bac526a2662f1a0b9.png",
      guia: "https://akmweb.youngjoygame.com/web/gms/image/0c5f86cf0aeef2f35f4693b8840e0949.jpg",
      counters: [
        "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_b4a5e537894bdc00787e80e4d3ada5dd.png",
        "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_6abf0c552b59b8ca4cbc1af3662ef176.png",
        "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_3391df36d6dcc54dd1c417098e15ec59.png",
        "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_9cc074562291a02644a0ddae28eeaa42.png",
        "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_9012ee9f73fbb4db4e1953e5fb5172e1.png"
      ],
      skills: [
        {
          nombre: "Buff",
          descripcion: "Regreso al hueso",
          imagen: "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage_2_1_18/100_636c671e6ea7c9fd89e992c42fb9f4dc.png"
        },
        {
          nombre: "AOE",
          descripcion: "Aguja de hueso abisal",
          imagen: "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage_2_1_18/100_6a6cfd77d892164ae8fbb98819a7233b.png"
        },
        {
          nombre: "Speed Up",
          descripcion: "Fusion de sombra fantasma",
          imagen: "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage_2_1_18/100_27b8bf74b5f22a09a7ae1e4d0c69c056.png"
        },
        {
          nombre: "CC",
          descripcion: "La caza del hueso",
          imagen: "https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage_2_1_18/100_4b023cbf620869d7596b5e87e467c7c8.png"
        }
      ],
      linea: "",
      winRateNumber: 51.08
    }
  ];
};

export default {
  fetchHeroes,
  getRandomHero
};
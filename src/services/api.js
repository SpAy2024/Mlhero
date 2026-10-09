// src/api.js
import { db } from '../firebase';
import { ref, get } from 'firebase/database';

// ============================================================
// MAPEO DE ROLES: inglés → español
// ============================================================
const ROLE_TRANSLATIONS = {
  'Tank': 'Tanque',
  'Fighter': 'Luchador',
  'Assassin': 'Asesino',
  'Mage': 'Mago',
  'Marksman': 'Tirador',
  'Support': 'Soporte'
};

const translateRole = (role) => {
  return ROLE_TRANSLATIONS[role] || role;
};

// ============================================================
// CACHE
// ============================================================
let heroesCache = null;

// ============================================================
// FETCH HEROES DESDE FIREBASE
// ============================================================
export const fetchHeroes = async () => {
  if (heroesCache) return heroesCache;

  try {
    const snapshot = await get(ref(db, 'mlbb/heroes-detailed'));
    
    if (!snapshot.exists()) {
      console.warn('No hay datos en mlbb/heroes-detailed');
      return getSampleData();
    }

    const data = snapshot.val();
    const heroesArray = Array.isArray(data)
      ? data.filter(Boolean)
      : Object.values(data).filter(Boolean);

    // ============================================================
    // PRIMERA PASADA: Crear un mapa de ID → héroe para búsquedas rápidas
    // ============================================================
    const heroesMap = new Map();
    heroesArray.forEach(h => {
      const hid = h.data?.hero_id;
      const info = h.data?.hero?.data || {};
      const detail = h.detail || {};
      const stats = detail.stats || {};
      
      if (hid) {
        heroesMap.set(hid, {
          id: hid,
          nombre: info.name || detail.name || `Hero ${hid}`,
          rol: detail.role ? [translateRole(detail.role)] : ['Desconocido'],
          imagen: info.smallmap || '',
          icon: info.head || '',
          winRate: stats.winRate || '0%',
          pickRate: stats.pickRate || '0%',
          banRate: stats.banRate || '0%'
        });
      }
    });

    // ============================================================
    // SEGUNDA PASADA: Transformar cada héroe con counters como objetos
    // ============================================================
    const heroes = heroesArray.map((hero, index) => {
      const info = hero.data?.hero?.data || {};
      const detail = hero.detail || {};
      const stats = detail.stats || {};
      const relations = hero.data?.relation || {};

      // Convertir las skills
      const skills = (detail.skills || []).map(skill => ({
        nombre: skill.type || 'Passive',
        descripcion: skill.description || '',
        imagen: ''
      }));

      // ✅ Convertir IDs de counters a objetos completos de héroe
      const strongIds = relations.strong?.target_hero_id || [];
      const weakIds = relations.weak?.target_hero_id || [];
      const assistIds = relations.assist?.target_hero_id || [];

      const counters = strongIds
        .map(id => heroesMap.get(id))
        .filter(Boolean);

      const weakAgainst = weakIds
        .map(id => heroesMap.get(id))
        .filter(Boolean);

      const assists = assistIds
        .map(id => heroesMap.get(id))
        .filter(Boolean);

      return {
        id: hero.data?.hero_id || index,
        nombre: info.name || detail.name || `Hero ${index}`,
        rol: detail.role ? [translateRole(detail.role)] : ['Desconocido'],
        winRate: stats.winRate || '0%',
        pickRate: stats.pickRate || '0%',
        banRate: stats.banRate || '0%',
        imagen: info.smallmap || '',
        icon: info.head || '',
        guia: '',
        lore: detail.lore || '',
        combos: detail.combos || [],
        counters: counters,        // ✅ Objetos con id, nombre, imagen, etc.
        weakAgainst: weakAgainst,  // ✅ Objetos
        assists: assists,          // ✅ Objetos
        skills: skills,
        winRateNumber: parseWinRate(stats.winRate)
      };
    });

    // Ordenar alfabéticamente
    heroes.sort((a, b) => a.nombre.localeCompare(b.nombre));

    heroesCache = heroes;
    console.log(`✅ ${heroes.length} héroes cargados desde Firebase`);
    return heroes;

  } catch (error) {
    console.error('❌ Error fetching heroes from Firebase:', error);
    return getSampleData();
  }
};

// ============================================================
// UTILIDADES
// ============================================================
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

// ============================================================
// SAMPLE DATA (fallback por si Firebase falla)
// ============================================================
const getSampleData = () => {
  return [
    {
      id: 130,
      nombre: "Obsidia",
      rol: ["Tirador"],
      winRate: "53.63%",
      pickRate: "2.26%",
      banRate: "16.76%",
      imagen: "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9c3daef5625bfade5c4cb8a219845dd3.png",
      icon: "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_92bcc9ad2c4c8165a888d34f086a4d28.png",
      guia: "",
      lore: "The ancient Sovereign of the Abyss, risen from ruin...",
      combos: [],
      counters: [],
      weakAgainst: [],
      assists: [],
      skills: [
        {
          nombre: "Buff",
          descripcion: "Obsidia gains Bone Energy whenever she deals damage...",
          imagen: ""
        }
      ],
      winRateNumber: 53.63
    }
  ];
};

export default {
  fetchHeroes,
  getRandomHero
};
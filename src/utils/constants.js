export const ROLE_CONFIG = {
  'Tanque': {
    color: '#ff6b6b',
    icon: 'fas fa-shield-alt',
    description: 'Alta resistencia y control'
  },
  'Asesino': {
    color: '#9b59b6',
    icon: 'fas fa-user-ninja',
    description: 'Alto daño, baja defensa'
  },
  'Tirador': {
    color: '#f1c40f',
    icon: 'fas fa-crosshairs',
    description: 'Daño a distancia sostenido'
  },
  'Mago': {
    color: '#3498db',
    icon: 'fas fa-hat-wizard',
    description: 'Daño mágico y control'
  },
  'Soporte': {
    color: '#2ecc71',
    icon: 'fas fa-hands-helping',
    description: 'Curación y utilidad'
  },
  'Combatiente': {
    color: '#e67e22',
    icon: 'fas fa-fist-raised',
    description: 'Daño cuerpo a cuerpo'
  }
};

export const getRoleColor = (role) => {
  return ROLE_CONFIG[role]?.color || '#666666';
};

export const getRoleIcon = (role) => {
  return ROLE_CONFIG[role]?.icon || 'fas fa-user';
};
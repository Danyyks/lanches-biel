import burger1 from '../../assets/28b4c54730b935b5f01ce44fea3dd0b8f721c52c.png';
import burger2 from '../../assets/1accdf30ffaa462b4fe2329cf0fa884d91e9d5b0.png';
import burger3 from '../../assets/5f168483bf3dffe5fc431528b1c76973c80d58c5.png';
import burger4 from '../../assets/1381504f460c565780b909d22f8818a7e5de865c.png';
import burger5 from '../../assets/150f9a73ef4707d2c2c8370830102ef590a8b940.png';
import costelao from '../../assets/costelão.jpeg';
import logoDefault from '../../assets/logo.jpeg';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  active: boolean;
}

export interface SiteProfile {
  logo: string;
}

const INITIAL_FOODS: MenuItem[] = [
  {
    id: 'f1',
    name: 'Rib Street Raiz',
    description: 'Pão de tapioca, purê de batata da casa, costela suína desfiada, catupiry, maionese, queijo quente e espinafre.',
    price: 30.0,
    image: burger1,
    active: true,
  },
  {
    id: 'f2',
    name: 'Mineirão Raiz',
    description: 'Pão de tapioca, purê de batata da casa, linguiça Toscana, maionese de bacon, cebola roxa e queijo quente.',
    price: 27.0,
    image: burger2,
    active: true,
  },
  {
    id: 'f3',
    name: 'Mortadelão',
    description: 'Pão de tapioca, fatias de mortadela e mussarela, cebola roxa e maionese.',
    price: 22.0,
    image: burger3,
    active: true,
  },
  {
    id: 'f4',
    name: 'Chicken Street',
    description: 'Pão de tapioca, purê de batata da casa, frango desfiado, catupiry, maionese e fatias de bacon.',
    price: 27.0,
    image: burger4,
    active: true,
  },
  {
    id: 'f5',
    name: 'Calabresa Broken',
    description: 'Pão de tapioca, purê de batata da casa, calabresa, maionese de bacon, cebola roxa e queijo quente.',
    price: 27.0,
    image: burger5,
    active: true,
  },
  {
    id: 'f6',
    name: 'Costelão',
    description: 'Pão de tapioca, purê de batata da casa, costela bovina misturada com queijo e catupiry, maionese, cebola roxa, fatias de bacon e queijo quente.',
    price: 35.0,
    image: costelao,
    active: true,
  },
];

const INITIAL_DRINKS: MenuItem[] = [
  { id: 'd1', name: 'Coca Cola lata', price: 7.0, active: true },
  { id: 'd2', name: 'Sprite lata', price: 7.0, active: true },
  { id: 'd3', name: 'Sprite Lemon Fresh', price: 8.0, active: true },
  { id: 'd4', name: 'Guaraná lata', price: 6.0, active: true },
  { id: 'd5', name: 'Skol lata 269', price: 5.0, active: true },
  { id: 'd6', name: 'Original lata 269', price: 6.0, active: true },
];

function loadItem<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as T;
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage cheio ou desabilitado — ignora silenciosamente
  }
}

export function getFoods(): MenuItem[] {
  return loadItem('ldb_foods', INITIAL_FOODS);
}
export function saveFoods(items: MenuItem[]): void {
  saveItem('ldb_foods', items);
}

export function getDrinks(): MenuItem[] {
  return loadItem('ldb_drinks', INITIAL_DRINKS);
}
export function saveDrinks(items: MenuItem[]): void {
  saveItem('ldb_drinks', items);
}

export function getCombos(): MenuItem[] {
  return loadItem('ldb_combos', []);
}
export function saveCombos(items: MenuItem[]): void {
  saveItem('ldb_combos', items);
}

export function getProfile(): SiteProfile {
  return loadItem('ldb_profile', { logo: logoDefault });
}
export function saveProfile(profile: SiteProfile): void {
  saveItem('ldb_profile', profile);
}

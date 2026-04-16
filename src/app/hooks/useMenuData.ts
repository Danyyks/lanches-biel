/**
 * Hook: useMenuData
 *
 * Centraliza o carregamento do cardápio + perfil do Supabase.
 *
 * Por que usar um hook?
 * - Evita repetir o código de fetch em vários componentes
 * - Gerencia loading/erro automaticamente
 * - Expõe refresh() para recarregar após o admin salvar alterações
 *
 * Como usar:
 *   const { foods, drinks, combos, profile, loading, refresh } = useMenuData();
 */
import { useState, useEffect, useCallback } from 'react';
import { MenuItem, SiteProfile } from '../utils/storage';
import { fetchMenuItems } from '../services/menuService';
import { fetchProfile } from '../services/profileService';
import logoDefault from '../../assets/logo.jpeg';

const DEFAULT_PROFILE: SiteProfile = { logo: logoDefault };

export function useMenuData() {
  const [foods, setFoods] = useState<MenuItem[]>([]);
  const [drinks, setDrinks] = useState<MenuItem[]>([]);
  const [combos, setCombos] = useState<MenuItem[]>([]);
  const [profile, setProfile] = useState<SiteProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Busca tudo em paralelo para ser mais rápido
      const [f, d, c, p] = await Promise.all([
        fetchMenuItems('food'),
        fetchMenuItems('drink'),
        fetchMenuItems('combo'),
        fetchProfile(),
      ]);

      setFoods(f);
      setDrinks(d);
      setCombos(c);
      // Se não tiver logo no banco, usa o logo padrão dos assets
      setProfile(p?.logo ? p : DEFAULT_PROFILE);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[useMenuData] Erro ao carregar:', msg);
      setError('Não foi possível carregar o cardápio. Verifique o .env.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega na primeira vez que o componente aparece
  useEffect(() => {
    refresh();
  }, [refresh]);

  return { foods, drinks, combos, profile, loading, error, refresh };
}

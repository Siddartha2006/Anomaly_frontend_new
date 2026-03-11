import { useEffect, useState } from 'react';
import { getDashboardSnapshot } from '../services/dashboardService';
import { useAppContext } from '../context/AppContext';

export function useDashboardData() {
  const { refreshKey } = useAppContext();
  const [state, setState] = useState({ loading: true, error: '', data: null });

  useEffect(() => {
    let active = true;

    async function loadData() {
      setState({ loading: true, error: '', data: null });
      try {
        const data = await getDashboardSnapshot();
        if (active) {
          setState({ loading: false, error: '', data });
        }
      } catch {
        if (active) {
          setState({
            loading: false,
            error: 'Unable to load dashboard metrics right now.',
            data: null
          });
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [refreshKey]);

  return state;
}

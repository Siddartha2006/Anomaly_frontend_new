import { useEffect, useState } from 'react';
import ActivityList from '../components/ActivityList';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { getActivityFeed } from '../services/dashboardService';

function ActivityPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadActivity() {
      try {
        setLoading(true);
        const data = await getActivityFeed();
        setItems(data.items);
      } catch {
        setError('Failed to fetch activity feed.');
      } finally {
        setLoading(false);
      }
    }

    loadActivity();
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Activity Feed</h2>
        <p className="text-sm text-slate-400">Most recent detections and operator updates.</p>
      </div>
      {loading ? <LoadingState label="Loading activity..." /> : null}
      {error ? <ErrorState message={error} /> : null}
      {!loading && !error ? <ActivityList items={items} /> : null}
    </section>
  );
}

export default ActivityPage;

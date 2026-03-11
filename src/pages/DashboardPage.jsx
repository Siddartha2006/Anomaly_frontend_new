import StatCard from '../components/StatCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useDashboardData } from '../hooks/useDashboardData';

function DashboardPage() {
  const { loading, error, data } = useDashboardData();

  if (loading) return <LoadingState label="Loading dashboard snapshot..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Overview</h2>
        <p className="mt-1 text-sm text-slate-400">Real-time business anomaly monitoring.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;

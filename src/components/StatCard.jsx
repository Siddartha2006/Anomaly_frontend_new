function StatCard({ label, value, trend }) {
  const trendColor = trend.startsWith('+') ? 'text-emerald-300' : 'text-rose-300';

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-soft">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className={`mt-2 text-sm ${trendColor}`}>{trend} vs last week</p>
    </article>
  );
}

export default StatCard;

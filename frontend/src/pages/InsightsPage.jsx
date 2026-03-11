function InsightsPage() {
  const insights = [
    'Error volume is 22% lower after deployment 2.3.4.',
    'Fulfillment anomalies spike between 16:00 and 18:00 UTC.',
    'Two supplier channels are responsible for 67% of delays.'
  ];

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold">Insights</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight) => (
          <article key={insight} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-200">{insight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InsightsPage;

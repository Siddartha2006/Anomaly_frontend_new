function ActivityList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3">
          <p className="text-sm text-slate-100">{item.title}</p>
          <p className="text-xs text-slate-400">{item.timestamp}</p>
        </li>
      ))}
    </ul>
  );
}

export default ActivityList;

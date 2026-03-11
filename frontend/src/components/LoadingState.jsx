function LoadingState({ label = 'Loading data...' }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-slate-300">
      <p>{label}</p>
    </div>
  );
}

export default LoadingState;

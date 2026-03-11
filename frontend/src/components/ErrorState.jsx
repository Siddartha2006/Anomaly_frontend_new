function ErrorState({ message }) {
  return (
    <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-rose-100">
      {message}
    </div>
  );
}

export default ErrorState;

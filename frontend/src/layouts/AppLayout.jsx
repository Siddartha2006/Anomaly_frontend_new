import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { label: 'Dashboard', path: '/' },
  { label: 'Insights', path: '/insights' },
  { label: 'Activity', path: '/activity' }
];

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold tracking-wide text-brand-500">Anomaly Platform</h1>
          <ul className="flex gap-2">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm transition ${
                      isActive ? 'bg-brand-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

type NavItem = 'home' | 'alerts' | 'report' | 'sos' | 'map';

type Props = {
  active: NavItem;
  onNavigate: (screen: string) => void;
};

const items: Array<{ id: NavItem; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'report', label: 'Report' },
  { id: 'sos', label: 'SOS' },
  { id: 'map', label: 'Map' },
];

function NavIcon({ name, active }: { name: NavItem; active: boolean }) {
  const stroke = active ? '#0d6956' : '#42574f';

  if (name === 'report') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8">
        <path d="M16 3.5 29 27H3L16 3.5Z" fill="#fff4f1" stroke="#d92d20" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M16 11v7" stroke="#d92d20" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="16" cy="22" r="1.5" fill="#d92d20" />
      </svg>
    );
  }

  if (name === 'home') {
    return (
      <svg aria-hidden="true" viewBox="0 0 28 28" className="size-[26px]" fill="none">
        <path d="m4 12 10-8 10 8v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 4 22V12Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 23.5v-8h6v8" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'alerts') {
    return (
      <svg aria-hidden="true" viewBox="0 0 28 28" className="size-[26px]" fill="none">
        <path d="M21.5 18H6.5l2-2.3V12a5.5 5.5 0 0 1 11 0v3.7l2 2.3Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        <path d="M11.5 21a2.7 2.7 0 0 0 5 0" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        {active && <circle cx="21" cy="7" r="3" fill="#d92d20" stroke="white" strokeWidth="1.5" />}
      </svg>
    );
  }

  if (name === 'sos') {
    return (
      <svg aria-hidden="true" viewBox="0 0 28 28" className="size-[26px]" fill="none">
        <path d="M9 4.5 12 9l-2.2 2.2a16 16 0 0 0 7 7l2.2-2.2 4.5 3v3a1.8 1.8 0 0 1-2 1.8A19 19 0 0 1 4.2 7a1.8 1.8 0 0 1 1.8-2h3Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M17.5 5.5a7 7 0 0 1 5 5M18 2.5a11 11 0 0 1 8 8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 28 28" className="size-[28px]" fill="none">
      <path d="m3 7 7-3 8 3 7-3v17l-7 3-8-3-7 3V7Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 4v17m8-14v17" stroke={stroke} strokeWidth="2" />
      <path d="M6.5 11h.01M21.5 9h.01" stroke={active ? '#d92d20' : stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function BottomNav({ active, onNavigate }: Props) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/70 bg-[rgba(248,250,247,0.92)] px-3 pt-2 shadow-[0_-8px_28px_rgba(25,45,38,0.14)] backdrop-blur-xl"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex h-[58px] max-w-[520px] items-end justify-between">
        {items.map(({ id, label }) => {
          const selected = active === id;
          const report = id === 'report';

          return (
            <button
              key={id}
              type="button"
              aria-label={report ? 'Report an issue' : label}
              aria-current={selected ? 'page' : undefined}
              onClick={() => onNavigate(id)}
              className={`group flex min-w-0 flex-1 flex-col items-center justify-end gap-0.5 rounded-xl text-center transition-transform active:scale-95 ${
                report ? '-translate-y-2' : 'py-1'
              }`}
            >
              <span
                className={`flex items-center justify-center transition-all duration-200 ${
                  report
                    ? 'size-[58px] rounded-full border-[3px] border-white bg-[#f1f4f0] shadow-[0_4px_14px_rgba(30,50,42,0.2)]'
                    : `size-9 rounded-xl ${selected ? 'bg-[#e1f1eb]' : 'bg-transparent'}`
                }`}
              >
                <NavIcon name={id} active={selected} />
              </span>
              <span
                className={`leading-none transition-colors ${
                  report
                    ? 'text-[10px] font-bold text-[#b42318]'
                    : `text-[10px] ${selected ? 'font-bold text-[#0d6956]' : 'font-medium text-[#53645d]'}`
                }`}
                style={{ fontFamily: "'Jersey 15:Regular'" }}
              >
                {report ? <>Report<br />Issue</> : label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

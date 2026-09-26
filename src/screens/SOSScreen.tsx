const assetPathPrefix = "/assets";
const imgMainPage = `${assetPathPrefix}/5bd47.png`;

type Props = {
  onNavigate: (screen: string) => void;
};

const shelters = [
  { name: "Government High School", dist: "1.2 km", capacity: "388/400" },
  { name: "Hillview Public School", dist: "1.8 km", capacity: "214/250" },
  { name: "Safe Haven Emergency Shelter", dist: "2.4 km", capacity: "256/400" },
];

export default function SOSScreen({ onNavigate }: Props) {
  return (
    <div className="relative w-full min-h-full overflow-hidden">
      {/* Dark forest background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1a2a1a]" />
        <img alt="" className="absolute size-full max-w-none object-cover opacity-60" src={imgMainPage} />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.45)]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-full pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-4">
          <button onClick={() => onNavigate('home')} className="text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 26 }} className="text-white">
            Emergency
          </span>
          <button className="text-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* SOS button */}
        <div className="flex flex-col items-center justify-center py-8">
          <button className="relative flex items-center justify-center">
            {/* Outer rings */}
            <div className="absolute size-[200px] rounded-full border-[3px] border-red-500 opacity-20 animate-ping" />
            <div className="absolute size-[170px] rounded-full border-[3px] border-red-500 opacity-30" />
            <div className="absolute size-[145px] rounded-full border-[3px] border-red-400 opacity-50" />
            {/* Main circle */}
            <div className="relative size-[120px] rounded-full bg-[#cc0000] shadow-[0_0_40px_rgba(200,0,0,0.6)] flex items-center justify-center">
              <span
                style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 38, letterSpacing: 2 }}
                className="text-white"
              >
                SOS
              </span>
            </div>
          </button>
          <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-[rgba(255,255,255,0.7)] mt-6 text-center">
            Hold to send emergency alert
          </p>
        </div>

        {/* Share live location */}
        <div className="mx-5 mb-4">
          <div className="bg-[rgba(255,255,255,0.12)] backdrop-blur-sm rounded-[10px] flex items-center justify-between px-4 py-3">
            <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 16 }} className="text-white">
              Share live location
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        {/* Nearby shelters */}
        <div className="mx-5">
          <h2
            style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 22 }}
            className="text-white mb-3"
          >
            Nearby shelters
          </h2>

          {/* Location input */}
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[8px] px-4 py-2 mb-2">
            <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-[rgba(255,255,255,0.5)]">
              Location
            </span>
          </div>

          {/* Time input */}
          <div className="bg-[rgba(255,255,255,0.1)] rounded-[8px] px-4 py-2 mb-4">
            <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-[rgba(255,255,255,0.5)]">
              Time
            </span>
          </div>

          {/* Shelter list */}
          <div className="flex flex-col gap-2">
            {shelters.map((s, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-[8px] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="white" strokeWidth="1.8" fill="none"/>
                    <path d="M9 21V12h6v9" stroke="white" strokeWidth="1.8"/>
                  </svg>
                  <div>
                    <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-white m-0">{s.name}</p>
                    <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 11 }} className="text-[rgba(255,255,255,0.6)] m-0">
                      {s.dist} · {s.capacity}
                    </p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            ))}
          </div>

          {/* Seen something unusual */}
          <div className="mt-4 flex items-center justify-between bg-[rgba(255,255,255,0.08)] rounded-[8px] px-4 py-3">
            <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-[rgba(255,255,255,0.7)]">
              seen something unusual?
            </span>
            <div className="size-6 rounded-full border border-[rgba(255,255,255,0.4)] flex items-center justify-center">
              <span className="text-white text-xs">?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav onNavigate={onNavigate} active="sos" />
    </div>
  );
}

function BottomNav({ onNavigate, active }: { onNavigate: (s: string) => void; active: string }) {
  const assetPathPrefix = "/assets";
  const imgEllipse14 = `${assetPathPrefix}/9a383.svg`;
  const imgReportIssue = `${assetPathPrefix}/fe6a7.svg`;

  return (
    <div className="hidden">
      <div className="flex items-center justify-between w-full relative">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-0.5 cursor-pointer">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M9 21V12h6v9" stroke="white" strokeWidth="2"/>
          </svg>
          <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">Home</span>
        </button>
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-0.5 cursor-pointer">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="white" strokeWidth="1.5"/>
            <path d="M13.73 21a2 2 0 01-3.46 0" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">Alerts</span>
        </button>
        <button onClick={() => onNavigate('report')} className="flex flex-col items-center gap-0 cursor-pointer absolute left-1/2 -translate-x-1/2 -translate-y-4">
          <div className="relative size-[68px] flex items-center justify-center">
            <img alt="" src={imgEllipse14} className="absolute inset-0 size-full" />
            <img alt="" src={imgReportIssue} className="relative size-[38px]" />
          </div>
          <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px', lineHeight: '10px' }} className="text-[#ff0909] text-center mt-0.5">
            Report<br />Issue
          </span>
        </button>
        <div className="w-[68px]" />
        <button onClick={() => onNavigate('sos')} className="flex flex-col items-center gap-0.5 cursor-pointer">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.26 12 19.79 19.79 0 011.21 3.43a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91" stroke={active === 'sos' ? '#ff4444' : 'white'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className={active === 'sos' ? 'text-red-400' : 'text-white'}>SOS</span>
        </button>
        <button onClick={() => onNavigate('map')} className="flex flex-col items-center gap-0.5 cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="8" y1="2" x2="8" y2="18" stroke="white" strokeWidth="1.5"/>
            <line x1="16" y1="6" x2="16" y2="22" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">Map</span>
        </button>
      </div>
    </div>
  );
}

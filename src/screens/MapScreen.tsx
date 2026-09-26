import { useState } from 'react';
import LocalLlamaChat from '../components/LocalLlamaChat';

const assetPathPrefix = "/assets";
const imgEllipse14 = `${assetPathPrefix}/9a383.svg`;
const imgReportIssue = `${assetPathPrefix}/fe6a7.svg`;

type Props = {
  onNavigate: (screen: string) => void;
};

const shelters = [
  { name: "Government High School", dist: "1.2 km", cap: "388/400", icon: "🏫" },
  { name: "Hillview Public School", dist: "1.8 km", cap: "214/250", icon: "🏫" },
  { name: "Safe Haven Emergency Shelter", dist: "2.4 km", cap: "256/400", icon: "🏠" },
];

const legendItems = [
  { color: "#c62828", label: "Very High Risk" },
  { color: "#ef6c00", label: "High Risk" },
  { color: "#f9a825", label: "Medium Risk" },
  { color: "#558b2f", label: "Low Risk" },
  { color: "#1565c0", label: "Safe Zone" },
];

export default function MapScreen({ onNavigate }: Props) {
  const [view, setView] = useState<'rescue' | 'helper' | 'guide'>('rescue');

  return (
    <div className="relative w-full min-h-full overflow-hidden bg-[#e8f0e8]">
      <div className="flex flex-col min-h-full pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-3 bg-white shadow-sm">
          <button onClick={() => onNavigate('home')} className="text-black">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 24 }} className="text-black">
              {view === 'rescue' ? 'Rescue Map' : view === 'helper' ? 'Helper map' : 'General Guide'}
            </span>
            {view === 'rescue' && (
              <div className="bg-[#cc0000] rounded-full px-3 py-0.5">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 14 }} className="text-white">
                  SOS
                </span>
              </div>
            )}
            {view === 'helper' && (
              <button
                onClick={() => onNavigate('sos')}
                className="bg-[#cc0000] rounded-[6px] px-3 py-1"
              >
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 14 }} className="text-white">Report</span>
              </button>
            )}
          </div>
          <button className="text-black">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Sub-nav tabs */}
        <div className="flex bg-white border-b border-gray-200">
          {(['rescue', 'helper', 'guide'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 py-2 text-center ${view === v ? 'border-b-2 border-[#0d47a1]' : ''}`}
              style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }}
            >
              {v === 'rescue' ? 'Rescue Map' : v === 'helper' ? 'Helper Map' : 'Guide'}
            </button>
          ))}
        </div>

        {view === 'rescue' && <RescueMapView onNavigate={onNavigate} />}
        {view === 'helper' && <HelperMapView />}
        {view === 'guide' && <GeneralGuideView />}
      </div>

      {/* Bottom nav */}
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
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.26 12 19.79 19.79 0 011.21 3.43a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">SOS</span>
          </button>
          <button onClick={() => onNavigate('map')} className="flex flex-col items-center gap-0.5 cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" stroke="#4fc3f7" strokeWidth="1.5" fill="none"/>
              <line x1="8" y1="2" x2="8" y2="18" stroke="#4fc3f7" strokeWidth="1.5"/>
              <line x1="16" y1="6" x2="16" y2="22" stroke="#4fc3f7" strokeWidth="1.5"/>
            </svg>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-[#4fc3f7]">Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function RescueMapView({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <div className="flex flex-col flex-1">
      {/* Topographic risk map (SVG illustration) */}
      <div className="w-full h-[260px] bg-[#c8e6c9] relative overflow-hidden">
        <svg viewBox="0 0 400 260" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Background */}
          <rect width="400" height="260" fill="#e8f5e9"/>
          {/* Risk zones */}
          <ellipse cx="160" cy="100" rx="80" ry="60" fill="#c62828" opacity="0.7"/>
          <ellipse cx="240" cy="130" rx="70" ry="50" fill="#ef6c00" opacity="0.6"/>
          <ellipse cx="120" cy="160" rx="60" ry="40" fill="#f9a825" opacity="0.6"/>
          <ellipse cx="300" cy="80" rx="50" ry="35" fill="#f9a825" opacity="0.5"/>
          <ellipse cx="60" cy="80" rx="45" ry="30" fill="#558b2f" opacity="0.6"/>
          <ellipse cx="340" cy="200" rx="55" ry="40" fill="#1565c0" opacity="0.4"/>
          {/* Road */}
          <path d="M50 130 Q200 80 350 180" stroke="white" strokeWidth="3" fill="none" opacity="0.8"/>
          <path d="M100 220 Q180 160 280 120" stroke="#fff9c4" strokeWidth="2" fill="none" opacity="0.7" strokeDasharray="8 4"/>
          {/* Shelter icons */}
          <circle cx="180" cy="190" r="8" fill="white" stroke="#0d47a1" strokeWidth="2"/>
          <text x="180" y="194" textAnchor="middle" fontSize="8" fill="#0d47a1">H</text>
          <circle cx="250" cy="160" r="8" fill="white" stroke="#0d47a1" strokeWidth="2"/>
          <text x="250" y="164" textAnchor="middle" fontSize="8" fill="#0d47a1">H</text>
          <circle cx="300" cy="200" r="8" fill="white" stroke="#0d47a1" strokeWidth="2"/>
          <text x="300" y="204" textAnchor="middle" fontSize="8" fill="#0d47a1">H</text>
          {/* Current location */}
          <circle cx="200" cy="130" r="10" fill="#0d47a1" opacity="0.3"/>
          <circle cx="200" cy="130" r="5" fill="#0d47a1"/>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 px-4 py-2 bg-white">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: item.color }} />
            <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 10 }} className="text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Nearest Shelters */}
      <div className="px-4 py-3 flex-1">
        <h2 style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 22 }} className="text-black mb-3">
          Nearest Shelters
        </h2>
        <div className="flex flex-col gap-2">
          {shelters.map((s, i) => (
            <div key={i} className="bg-[rgba(227,242,253,0.6)] rounded-[10px] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0d47a1] rounded-full flex items-center justify-center text-white text-sm">
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-black m-0 font-medium">{s.name}</p>
                  <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 11 }} className="text-gray-600 m-0">
                    {s.dist} · {s.cap}
                  </p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#0d47a1" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Report shelter issue button */}
        <button
          onClick={() => onNavigate('shelter-report')}
          className="w-full mt-4 bg-[#cc0000] rounded-[8px] py-3 flex items-center justify-center"
        >
          <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 18 }} className="text-white">
            Report Shelter Issue
          </span>
        </button>
      </div>
    </div>
  );
}

function HelperMapView() {
  return (
    <div className="flex flex-col flex-1 pb-4">
      {/* Map */}
      <div className="w-full h-[280px] bg-[#c8e6c9] relative overflow-hidden">
        <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="280" fill="#dcedc8"/>
          <ellipse cx="180" cy="110" rx="90" ry="70" fill="#c62828" opacity="0.6"/>
          <ellipse cx="260" cy="150" rx="75" ry="55" fill="#ef6c00" opacity="0.5"/>
          <ellipse cx="100" cy="180" rx="65" ry="45" fill="#f9a825" opacity="0.5"/>
          <ellipse cx="320" cy="90" rx="60" ry="40" fill="#558b2f" opacity="0.5"/>
          <ellipse cx="350" cy="220" rx="50" ry="35" fill="#1565c0" opacity="0.4"/>
          <path d="M40 140 Q200 90 370 190" stroke="white" strokeWidth="3" fill="none" opacity="0.8"/>
        </svg>
      </div>

      <div className="px-4 py-3">
        {/* Alerts list */}
        <div className="flex flex-col gap-2 mb-3">
          {[
            { label: "SOS Alerts", count: 3, color: "#cc0000" },
            { label: "Shelters", count: 8, color: "#0d47a1" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between bg-white rounded-[8px] px-4 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-black">{item.label}</span>
              </div>
              <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 18 }} className="text-black">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Evacuate risk area button */}
        <button className="w-full bg-[#0d47a1] rounded-[8px] py-2 flex items-center justify-between px-4 mb-3">
          <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 16 }} className="text-white">Evacuate Risk Area</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Add shelters / alerts */}
        {["Add new shelters", "Add new alerts"].map((label) => (
          <button key={label} className="w-full bg-white rounded-[8px] py-2 flex items-center justify-between px-4 mb-2 shadow-sm">
            <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-black">{label}</span>
            <div className="size-6 rounded-full bg-[#0d47a1] flex items-center justify-center">
              <span className="text-white text-lg leading-none">+</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function GeneralGuideView() {
  const dos = [
    "Follow screening and evacuation protocols.",
    "Watch out for wildlife such as snakes.",
    "Take only essential items and evacuate to shelter.",
  ];
  const donts = [
    "Don't walk through receding water.",
    "Stay away from trees in an area.",
    "Don't enter building that are not accessible as shelter.",
  ];

  return (
    <div className="flex flex-col flex-1 px-4 py-4 gap-4">
      {/* Do / Don't columns */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="bg-[#e8f5e9] rounded-[8px] p-3">
            <p style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 16 }} className="text-[#2e7d32] m-0 mb-2">DO</p>
            {dos.map((d, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#2e7d32] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="white"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                </div>
                <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 11 }} className="text-black m-0 leading-tight">{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-[#ffebee] rounded-[8px] p-3">
            <p style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 16 }} className="text-[#c62828] m-0 mb-2">DON'T</p>
            {donts.map((d, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#c62828] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 11 }} className="text-black m-0 leading-tight">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LocalLlamaChat />
    </div>
  );
}

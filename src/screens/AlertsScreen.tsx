const assetPathPrefix = "/assets";
const imgMainPage = `${assetPathPrefix}/5bd47.png`;
const imgEllipse14 = `${assetPathPrefix}/9a383.svg`;
const imgReportIssue = `${assetPathPrefix}/fe6a7.svg`;

type Props = {
  onNavigate: (screen: string) => void;
};

export default function AlertsScreen({ onNavigate }: Props) {
  return (
    <div className="relative w-full min-h-full overflow-hidden bg-[#fffbfb]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#fffbfb] inset-0" />
        <img alt="" className="absolute max-w-none object-cover opacity-50 size-full" src={imgMainPage} />
      </div>

      <div className="relative z-10 flex flex-col min-h-full pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-4">
          <button onClick={() => onNavigate('home')} className="text-black">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 26 }} className="text-black">
            Notifications
          </span>
          <button className="text-black">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Emergency alert banner */}
        <div className="mx-5 mb-4 bg-[#cc0000] rounded-[8px] px-4 py-3 flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L1 21h22L12 2z"/>
              <path d="M12 9v5M12 17h.01" stroke="red" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 16 }} className="text-white m-0 mb-0.5">
              EMERGENCY ALERT
            </p>
            <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }} className="text-[rgba(255,255,255,0.9)] m-0">
              range
            </p>
          </div>
        </div>

        {/* Notification content */}
        <div className="mx-5 bg-[rgba(254,251,246,0.7)] rounded-[12px] p-4 mb-4">
          <p style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 18 }} className="text-black m-0 mb-2">
            Severe Cyclone Warning
          </p>
          <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-black m-0 mb-3 leading-relaxed">
            A Severe Cyclone Storm is expected to make landfall near Sikkim close, with the Northeastern provinces. The maximum wind speeds in the area could lead to extremely severe weather conditions.
          </p>
          <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-black m-0 mb-3 leading-relaxed">
            Residents affected, local citizens, and fire-prone areas are advised to remain alert. Emergency instructions issued by local authorities. Fishermen are strictly advised not to venture into the sea.
          </p>
          <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-black m-0 mb-3 leading-relaxed">
            People are advised to stay indoors of the day or the shelter in the absence of the usual and keep and essential documents in easily.
          </p>
          <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-black m-0 leading-relaxed">
            Stay alert, follow official notices and do not spread unverified information. Contact the disaster helpline immediately.
          </p>
        </div>

        {/* Warning note */}
        <div className="mx-5 bg-[rgba(255,235,230,0.8)] rounded-[8px] px-4 py-3 mb-4 flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#cc0000" className="shrink-0 mt-0.5">
            <path d="M12 2L1 21h22L12 2z"/>
          </svg>
          <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }} className="text-[#cc0000] m-0 leading-relaxed">
            This is a pre-emergency warning. Follow all instructions from the update from the news.
          </p>
        </div>

        {/* More alerts */}
        {[
          { title: "Heavy Rainfall Alert", time: "2h ago", desc: "Landslide risk elevated near hillside communities." },
          { title: "River Level Warning", time: "4h ago", desc: "Tista River water level rising. Evacuation may be needed." },
          { title: "Shelter Update", time: "6h ago", desc: "Government High School shelter now at 97% capacity." },
        ].map((alert, i) => (
          <div key={i} className="mx-5 bg-[rgba(254,251,246,0.6)] rounded-[10px] px-4 py-3 mb-2 flex items-start gap-3">
            <div className="shrink-0 w-2 h-2 rounded-full bg-[#ec8d01] mt-1.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 15 }} className="text-black m-0">{alert.title}</p>
                <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 11 }} className="text-gray-500 m-0">{alert.time}</p>
              </div>
              <p style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }} className="text-gray-700 m-0">{alert.desc}</p>
            </div>
          </div>
        ))}
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
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#ff4444" strokeWidth="1.5"/>
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#ff4444" strokeWidth="1.5"/>
            </svg>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-red-400">Alerts</span>
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
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" stroke="white" strokeWidth="1.5" fill="none"/>
              <line x1="8" y1="2" x2="8" y2="18" stroke="white" strokeWidth="1.5"/>
              <line x1="16" y1="6" x2="16" y2="22" stroke="white" strokeWidth="1.5"/>
            </svg>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}

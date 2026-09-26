const assetPathPrefix = "/assets";
const imgMainPage = `${assetPathPrefix}/5bd47.png`;
const imgRectangle12 = `${assetPathPrefix}/44ced.png`;
const imgCloudDrizzle = `${assetPathPrefix}/866c0.svg`;
const imgRectangle6 = `${assetPathPrefix}/5dbcb.svg`;
const imgEmojioneV1SunWithFace = `${assetPathPrefix}/422bc.svg`;
const imgEmojioneV1UmbrellaWithRainDrops = `${assetPathPrefix}/553ef.svg`;
const imgGroup = `${assetPathPrefix}/cb00f.svg`;
const imgGroup1 = `${assetPathPrefix}/ec3c9.svg`;
const imgSvGa7DgPttN = `${assetPathPrefix}/72dfc.svg`;
const imgSvGo1FHjXnb = `${assetPathPrefix}/82dac.svg`;
const imgGroup2 = `${assetPathPrefix}/499f6.svg`;
const imgGroup3 = `${assetPathPrefix}/a968f.svg`;
const imgGroup4 = `${assetPathPrefix}/6787e.svg`;
const imgSvgt3O6GemU = `${assetPathPrefix}/87713.svg`;
const imgSunset = `${assetPathPrefix}/7f26a.svg`;
const imgSunrise = `${assetPathPrefix}/50725.svg`;
const imgGroup7 = `${assetPathPrefix}/8118d.svg`;
const imgReportIssue = `${assetPathPrefix}/fe6a7.svg`;
const imgEllipse14 = `${assetPathPrefix}/9a383.svg`;

type Props = {
  danger?: boolean;
  onNavigate: (screen: string) => void;
};

export default function HomeScreen({ danger = false, onNavigate }: Props) {
  const safeColor = danger ? '#b71c1c' : '#0d47a1';
  const statusText = danger ? 'Danger' : 'SAFE';
  const warningText = danger
    ? 'FLASH FLOOD — EVACUATE IMMEDIATELY'
    : 'WARNING : HEAVY RAIN AT 5:30 PM';

  return (
    <div className="relative w-full min-h-full overflow-hidden bg-[#fffbfb]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: danger ? '#3b0000' : '#fffbfb' }} />
        <img
          alt=""
          className="absolute max-w-none object-cover size-full"
          style={{ opacity: danger ? 0.35 : 0.5 }}
          src={imgMainPage}
        />
        {danger && <div className="absolute inset-0 bg-[rgba(120,0,0,0.35)]" />}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-5 pt-8 pb-24">
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          {/* Location */}
          <div
            className="flex flex-col leading-tight"
            style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 18, color: danger ? 'white' : 'black' }}
          >
            <span>GANGTOK, SIKKIM</span>
            <span>27°19′57″N</span>
            <span>88°36′50″E</span>
          </div>

          {/* SAFE / Danger badge — tap to toggle state */}
          <button
            onClick={() => onNavigate(danger ? 'home' : 'danger')}
            className="relative mx-2 -translate-y-8"
            title="Tap to toggle alert level"
          >
            <div
              className="rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[6px] rounded-br-[6px] px-6 py-2 min-w-[120px] flex items-center justify-center"
              style={{ background: danger ? '#b71c1c' : '#fefbf6' }}
            >
              <span
                className="leading-none"
                style={{
                  fontFamily: "'League Gothic:Regular'",
                  fontVariationSettings: '"wdth" 100',
                  fontSize: 64,
                  color: danger ? 'white' : safeColor,
                }}
              >
                {statusText}
              </span>
            </div>
          </button>

          {/* Sunrise / Sunset */}
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1">
              <img alt="Sunrise" src={imgSunrise} className="size-9" />
              <span
                style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 17, color: danger ? 'white' : 'black' }}
              >
                5:32 AM
              </span>
            </div>
            <div className="flex items-center gap-1">
              <img alt="Sunset" src={imgSunset} className="size-9" />
              <span
                style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 17, color: danger ? 'white' : 'black' }}
              >
                6:02 PM
              </span>
            </div>
          </div>
        </div>

        {/* Weather card */}
        <div className="mt-5 mb-1 rounded-[18px] border border-white/80 bg-[rgba(254,251,246,0.24)] px-3 pb-[18px] pt-3 backdrop-blur-[2px]">
          <div className="flex items-start justify-between mb-3">
            {/* Precipitation stats */}
            <div
              style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }}
              className="text-black leading-snug"
            >
              <p className="m-0">Precipitation: 57%</p>
              <p className="m-0">Humidity: 98%</p>
              <p className="m-0">Wind: 18 km/h</p>
            </div>
            {/* Weather description */}
            <div
              style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 19 }}
              className="text-black text-right leading-snug"
            >
              <p className="m-0">Weather</p>
              <p className="m-0">Wednesday, 8:00 pm</p>
              <p className="m-0">Light rain</p>
            </div>
          </div>
          {/* Temperature row */}
          <div className="mb-3 flex items-center gap-4">
            <div className="flex size-[76px] shrink-0 items-center justify-center rounded-[10px] bg-[#ec8d01]">
              <img alt="Weather icon" src={imgCloudDrizzle} className="size-[52px]" />
            </div>
            <span
              style={{ fontFamily: "'Lexend Giga:Regular'", fontSize: 38 }}
              className="text-black"
            >
              24°C
            </span>
          </div>
          <div className="flex items-center justify-center rounded-[6px] bg-[#ec221f] py-2">
            <span
              style={{ fontFamily: "'Kreon:Regular'", fontSize: 17 }}
              className="px-2 text-center text-white"
            >
              {warningText}
            </span>
          </div>
        </div>

        {/* 5-day forecast */}
        <div className="mb-7 rounded-[18px] border border-white/80 bg-[rgba(254,251,246,0.22)] p-2 backdrop-blur-[2px]">
          <div className="flex items-stretch justify-between gap-2">
            {/* Sun */}
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full flex-col items-center rounded-[10px] border border-[#8ccafa] bg-[#e4f3ff] p-1">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">WED</span>
                <img alt="Sunny" src={imgEmojioneV1SunWithFace} className="size-10" />
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">24°C</span>
              </div>
            </div>
            {/* Umbrella/Rain */}
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full flex-col items-center rounded-[10px] border border-[#8ccafa] bg-[#e4f3ff] p-1">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">WED</span>
                <img alt="Rain" src={imgEmojioneV1UmbrellaWithRainDrops} className="size-9" />
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">24°C</span>
              </div>
            </div>
            {/* Wind */}
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full flex-col items-center rounded-[10px] border border-[#8ccafa] bg-[#e4f3ff] p-1">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">WED</span>
                <div className="size-10 overflow-hidden flex items-center justify-center">
                  <img alt="Wind" src={imgGroup} className="size-full" />
                </div>
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">24°C</span>
              </div>
            </div>
            {/* Cloudy */}
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full flex-col items-center rounded-[10px] border border-[#8ccafa] bg-[#e4f3ff] p-1">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">WED</span>
                <div className="size-10 overflow-hidden flex items-center justify-center">
                  <img alt="Cloudy" src={imgGroup1} className="size-full" />
                </div>
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">24°C</span>
              </div>
            </div>
            {/* Thundersnow */}
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full flex-col items-center rounded-[10px] border border-[#8ccafa] bg-[#e4f3ff] p-1">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">WED</span>
                <div className="relative size-10 overflow-hidden">
                  <div className="absolute" style={{ inset: '28.32% 8.82% 28.32% 13.45%', overflow: 'clip' }}>
                    <div className="absolute" style={{ inset: '0 51.93% 43.2% -2.26%' }}>
                      <img alt="" src={imgSvGa7DgPttN} className="block max-w-none size-full" />
                    </div>
                    <div className="absolute" style={{ inset: '0 16.58% 0 -4.52%' }}>
                      <img alt="" src={imgSvGo1FHjXnb} className="block max-w-none size-full" />
                    </div>
                  </div>
                  <div className="absolute" style={{ inset: '65.92% 34.75% 24.51% 34.75%', overflow: 'clip' }}>
                    <div className="absolute" style={{ inset: '0.92% 72% 0.82% 0.29%' }}>
                      <img alt="" src={imgGroup2} className="block max-w-none size-full" />
                    </div>
                    <div className="absolute" style={{ inset: '0.92% 36.14% 1.02% 36.14%' }}>
                      <img alt="" src={imgGroup3} className="block max-w-none size-full" />
                    </div>
                    <div className="absolute" style={{ inset: '0.92% 0.29% 1.02% 72%' }}>
                      <img alt="" src={imgGroup4} className="block max-w-none size-full" />
                    </div>
                  </div>
                  <div className="absolute" style={{ inset: '56.84% 39.86% 6.68% 40.08%' }}>
                    <img alt="" src={imgSvgt3O6GemU} className="block max-w-none size-full" />
                  </div>
                </div>
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 12 }} className="text-black">24°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hazard alert section */}
        <div className="flex items-end justify-around gap-3">
          {/* Hazard card */}
          <button
            onClick={() => onNavigate('alerts')}
            className="flex w-[164px] shrink-0 flex-col items-center rounded-[12px] border border-white/80 bg-[rgba(255,255,255,0.34)] p-[10px] text-left backdrop-blur-sm"
          >
            <img
              alt="Landslide"
              src={imgRectangle12}
              className="mb-2 h-[128px] w-full rounded-[10px] object-cover"
            />
            <span
              style={{ fontFamily: "'Doppio One:Regular'", fontSize: 20 }}
              className="text-center leading-tight text-[#463737]"
            >
              Land slide{'\n'}near rocks
            </span>
          </button>

          {/* Officer card */}
          <button
            onClick={() => onNavigate('guide')}
            className="mb-1 flex h-[80px] w-[90px] shrink-0 items-center justify-center rounded-l-[16px] rounded-r-none bg-[#d9d9d9]"
          >
            <div className="size-[60px] overflow-hidden flex items-center justify-center">
              <img alt="Officer" src={imgGroup7} className="size-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="hidden">
        <div className="flex items-center justify-between w-full relative">
          {/* Home */}
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-0.5 cursor-pointer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M9 21V12h6v9" stroke="white" strokeWidth="2"/>
            </svg>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">Home</span>
          </button>

          {/* Alerts */}
          <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-0.5 cursor-pointer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5" stroke="white" strokeWidth="1.5"/>
              <path d="M13.73 21a1.999 1.999 0 01-3.46 0M6 8.5A6 6 0 006 17h12" stroke="white" strokeWidth="1.5"/>
            </svg>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">Alerts</span>
          </button>

          {/* Report Issue (center elevated) */}
          <button
            onClick={() => onNavigate('report')}
            className="flex flex-col items-center gap-0 cursor-pointer absolute left-1/2 -translate-x-1/2 -translate-y-4"
          >
            <div className="relative size-[68px] flex items-center justify-center">
              <img alt="" src={imgEllipse14} className="absolute inset-0 size-full" />
              <img alt="" src={imgReportIssue} className="relative size-[38px]" />
            </div>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px', lineHeight: '10px' }} className="text-[#ff0909] text-center mt-0.5">
              Report<br />Issue
            </span>
          </button>

          {/* Invisible spacer for center */}
          <div className="w-[68px]" />

          {/* SOS */}
          <button onClick={() => onNavigate('sos')} className="flex flex-col items-center gap-0.5 cursor-pointer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.26 12 19.79 19.79 0 011.21 3.43a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "'Jersey 15:Regular'", fontSize: 11, letterSpacing: '-0.43px' }} className="text-white">SOS</span>
          </button>

          {/* Map */}
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

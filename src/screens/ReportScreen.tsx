import { useState } from 'react';

const assetPathPrefix = "/assets";
const imgEllipse14 = `${assetPathPrefix}/9a383.svg`;
const imgReportIssue = `${assetPathPrefix}/fe6a7.svg`;

type Props = {
  onNavigate: (screen: string) => void;
  shelterMode?: boolean;
};

const issueCategories = [
  { icon: "🏗️", label: "Structural\ndamage" },
  { icon: "👥", label: "Over\ncrowding" },
  { icon: "🌊", label: "Flood\ndamage" },
  { icon: "🏥", label: "Medical\nIssue" },
];

export default function ReportScreen({ onNavigate, shelterMode = false }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [tab, setTab] = useState<'updates' | 'recent'>('updates');
  const [selected, setSelected] = useState<number[]>([]);
  const [other, setOther] = useState(false);

  return (
    <div className="relative w-full min-h-full overflow-hidden bg-white">
      <div className="flex flex-col min-h-full pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-4 bg-white shadow-sm">
          <button onClick={() => onNavigate(shelterMode ? 'map' : 'home')} className="text-black">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 24 }} className="text-black">
            {shelterMode ? 'Report Shelter Issue' : 'Report issue'}
          </span>
          <button className="text-black">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-3">
          {shelterMode ? (
            <>
              {/* Affected Shelter field */}
              <div>
                <label style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-black block mb-1">
                  Affected Shelter<span className="text-[#cc0000]">(Required)</span>
                </label>
                <div className="border border-gray-300 rounded-[6px] flex items-center px-3 py-2 gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#888" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Govt. School, Safe House sector III"
                    className="flex-1 outline-none bg-transparent"
                    style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Issue category */}
              <div>
                <label style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-black block mb-2">
                  Issue category<span className="text-gray-500">(Select all that apply):</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {issueCategories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(prev =>
                        prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
                      )}
                      className={`rounded-[8px] p-3 flex flex-col items-center border-2 transition-colors ${
                        selected.includes(i) ? 'border-[#0d47a1] bg-[#e3f2fd]' : 'border-gray-200 bg-[#f5f5f5]'
                      }`}
                    >
                      <span className="text-2xl mb-1">{cat.icon}</span>
                      <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 11 }} className="text-black text-center whitespace-pre-line">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Other checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="other"
                  checked={other}
                  onChange={(e) => setOther(e.target.checked)}
                  className="w-4 h-4 accent-[#0d47a1]"
                />
                <label htmlFor="other" style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }} className="text-black">Other</label>
                {other && (
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-2 py-1 outline-none"
                    style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }}
                    placeholder="Describe..."
                  />
                )}
              </div>

              {/* Detailed description */}
              <div>
                <label style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-black block mb-1">
                  Detailed Description <span className="text-[#cc0000]">(Required)</span>
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-[6px] px-3 py-2 outline-none resize-none"
                  style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }}
                  rows={3}
                  placeholder="Add specific details about the issue eg. direct type of medical supply needed, specific area of damage..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Optional extras */}
              <div>
                <label style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }} className="text-black block mb-1">
                  Optional Extras:
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-[8px] py-4 flex flex-col items-center justify-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 17l4-4 4 4 4-8 4 8" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="8" r="2" stroke="#888" strokeWidth="1.5"/>
                  </svg>
                  <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }} className="text-gray-400">Add photos</span>
                </div>
              </div>

              {/* Submit */}
              <button className="w-full bg-[#cc0000] rounded-[8px] py-3 mt-2">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 18 }} className="text-white">
                  SUBMIT REPORT
                </span>
              </button>
            </>
          ) : (
            <>
              {/* Title */}
              <div>
                <div className="border border-gray-200 rounded-[6px] px-3 py-2">
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full outline-none bg-transparent"
                    style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="border border-gray-200 rounded-[6px] px-3 py-2">
                  <textarea
                    placeholder="Description"
                    className="w-full outline-none bg-transparent resize-none"
                    style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }}
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="border border-gray-200 rounded-[6px] px-3 py-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="govt. secondary school"
                    className="flex-1 outline-none bg-transparent"
                    style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#888" strokeWidth="1.5"/>
                    <circle cx="12" cy="9" r="2.5" stroke="#888" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>

              {/* Time */}
              <div>
                <div className="border border-gray-200 rounded-[6px] px-3 py-2">
                  <input
                    type="text"
                    placeholder="capacity 400"
                    className="w-full outline-none bg-transparent"
                    style={{ fontFamily: "'Kreon:Regular'", fontSize: 14 }}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setTab('updates')}
                  className={`flex-1 py-2 text-center ${tab === 'updates' ? 'border-b-2 border-[#0d47a1]' : ''}`}
                  style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }}
                >
                  New Updates
                </button>
                <button
                  onClick={() => setTab('recent')}
                  className={`flex-1 py-2 text-center ${tab === 'recent' ? 'border-b-2 border-[#0d47a1]' : ''}`}
                  style={{ fontFamily: "'Kreon:Regular'", fontSize: 13 }}
                >
                  Recent
                </button>
              </div>

              {/* Tab content */}
              <div className="bg-[#f9f9f9] rounded-[8px] p-4 min-h-[120px] flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Kreon:Regular'", fontSize: 12 }} className="text-gray-400 text-center">
                  {tab === 'updates' ? 'drag and drop your files' : 'No recent reports'}
                </span>
              </div>

              {/* Submit */}
              <button className="w-full bg-[#0d47a1] rounded-[8px] py-3 mt-1">
                <span style={{ fontFamily: "'League Gothic:Regular'", fontVariationSettings: '"wdth" 100', fontSize: 18 }} className="text-white">
                  Submit Report
                </span>
              </button>
            </>
          )}
        </div>
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

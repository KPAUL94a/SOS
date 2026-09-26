import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import SOSScreen from './screens/SOSScreen';
import AlertsScreen from './screens/AlertsScreen';
import MapScreen from './screens/MapScreen';
import ReportScreen from './screens/ReportScreen';
import BottomNav from './components/BottomNav';

type Screen = 'home' | 'danger' | 'sos' | 'alerts' | 'map' | 'report' | 'shelter-report' | 'guide';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  function navigate(to: string) {
    setScreen(to as Screen);
  }

  return (
    <div className="flex h-dvh w-screen items-center justify-center overflow-hidden bg-[#14221d]">
      <div
        className="relative isolate h-full overflow-hidden bg-[#fffbfb] shadow-[0_24px_80px_rgba(0,0,0,0.35)] min-[600px]:rounded-[30px]"
        style={{
          width: 'min(100vw, 402px, 46.0183dvh)',
          height: 'min(100vh, 100dvh, 874px, 217.3913vw)',
          aspectRatio: '402 / 874',
          transform: 'translateZ(0)',
        }}
      >
        {(screen === 'home' || screen === 'danger') && (
          <HomeScreen
            danger={screen === 'danger'}
            onNavigate={navigate}
          />
        )}
        {screen === 'sos' && <SOSScreen onNavigate={navigate} />}
        {screen === 'alerts' && <AlertsScreen onNavigate={navigate} />}
        {screen === 'map' && <MapScreen onNavigate={navigate} />}
        {screen === 'report' && <ReportScreen onNavigate={navigate} />}
        {screen === 'shelter-report' && <ReportScreen onNavigate={navigate} shelterMode />}
        <BottomNav
          onNavigate={navigate}
          active={
            screen === 'alerts'
              ? 'alerts'
              : screen === 'sos'
                ? 'sos'
                : screen === 'map'
                  ? 'map'
                  : screen === 'report' || screen === 'shelter-report'
                    ? 'report'
                    : 'home'
          }
        />
      </div>
    </div>
  );
}

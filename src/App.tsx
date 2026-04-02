import { useRef } from 'react';
import ThreeScene from './components/ThreeScene';
import CustomCursor from './components/CustomCursor';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import StatsPanel from './components/StatsPanel';

export default function App() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}
    >
      {/* Layer 0: 3D canvas */}
      <ThreeScene mouse={mouse} />

      {/* Layer 1: Noise overlay */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.04,
        }}
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Layer 10: Main UI */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100vw',
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '260px 1fr 280px',
          overflow: 'hidden',
        }}
      >
        <Sidebar />
        <ChatArea />
        <StatsPanel />
      </div>

      {/* Custom cursor */}
      <CustomCursor />
    </div>
  );
}

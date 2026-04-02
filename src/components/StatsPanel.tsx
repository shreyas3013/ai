import { useEffect, useRef, useState } from 'react';

const LOGS = [
  '[SYS] Token buffer initialized',
  '[NET] Embedding layer active',
  '[INF] Context window: 128K',
  '[OPT] Beam search depth: 12',
  '[MEM] KV cache hit rate: 94%',
  '[SYS] Attention heads: 96',
  '[NET] Gradient checkpointing: ON',
  '[INF] Positional encoding: RoPE',
  '[OPT] Flash attention v2 enabled',
  '[MEM] VRAM utilization: 87%',
];

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [displayed, setDisplayed] = useState('0');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayed(value);
      setAnimate(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      style={{
        background: 'rgba(0,245,255,0.04)',
        border: '1px solid var(--glass-border)',
        borderRadius: '12px',
        padding: '14px 10px',
        textAlign: 'center',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-3px)';
        el.style.borderColor = 'var(--accent-cyan)';
        el.style.boxShadow = '0 0 20px rgba(0,245,255,0.15)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'var(--glass-border)';
        el.style.boxShadow = 'none';
      }}
    >
      <div
        className={animate ? 'stat-count' : ''}
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--accent-cyan)',
          lineHeight: 1.2,
        }}
      >
        {displayed}
      </div>
      <div
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '9px',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginTop: '4px',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function RadarChart() {
  const axes = ['Reasoning', 'Creativity', 'Code', 'Math', 'Language', 'Vision'];
  const values = [0.92, 0.85, 0.95, 0.88, 0.97, 0.80];
  const cx = 100, cy = 100, r = 70;
  const n = axes.length;
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setScale(1), 800);
    return () => clearTimeout(t);
  }, []);

  const getPoint = (i: number, val: number) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + r * val * Math.cos(angle),
      y: cy + r * val * Math.sin(angle),
    };
  };

  const gridPoints = (val: number) =>
    Array.from({ length: n }, (_, i) => {
      const pt = getPoint(i, val);
      return `${pt.x},${pt.y}`;
    }).join(' ');

  const filledPoints = values.map((v, i) => {
    const pt = getPoint(i, v * scale);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: '200px', margin: '0 auto', display: 'block' }}>
      {/* Grid */}
      {[0.25, 0.5, 0.75, 1].map((val) => (
        <polygon
          key={val}
          points={gridPoints(val)}
          fill="none"
          stroke="rgba(0,245,255,0.1)"
          strokeWidth="1"
        />
      ))}
      {/* Axes */}
      {Array.from({ length: n }, (_, i) => {
        const pt = getPoint(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="rgba(0,245,255,0.1)" strokeWidth="1" />;
      })}
      {/* Filled polygon */}
      <polygon
        className="radar-polygon"
        points={filledPoints}
        fill="rgba(0,245,255,0.15)"
        stroke="#00F5FF"
        strokeWidth="1.5"
        style={{ transition: 'all 0.8s ease', transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Labels */}
      {axes.map((label, i) => {
        const pt = getPoint(i, 1.2);
        return (
          <text
            key={label}
            x={pt.x}
            y={pt.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-muted)"
            fontSize="8"
            fontFamily="Space Mono, monospace"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

export default function StatsPanel() {
  const [logs, setLogs] = useState(LOGS.slice(0, 5));
  const logIndexRef = useRef(5);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextLog = LOGS[logIndexRef.current % LOGS.length];
      logIndexRef.current += 1;
      setLogs((prev) => [...prev.slice(-4), nextLog]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sectionLabel = (text: string) => (
    <div
      style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '9px',
        color: 'var(--text-muted)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '10px',
      }}
    >
      {text}
    </div>
  );

  return (
    <aside
      className="anim-rightpanel"
      style={{
        background: 'rgba(8,13,20,0.85)',
        backdropFilter: 'blur(24px)',
        borderLeft: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '24px 14px',
        gap: '20px',
        zIndex: 10,
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      {/* Neural Metrics */}
      <div>
        {sectionLabel('NEURAL METRICS')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <StatCard value="98.7%" label="Accuracy" delay={400} />
          <StatCard value="1.2ms" label="Response" delay={600} />
          <StatCard value="4.1B" label="Parameters" delay={800} />
          <StatCard value="99.9%" label="Uptime" delay={1000} />
        </div>
      </div>

      {/* Token Usage */}
      <div>
        {sectionLabel('TOKEN USAGE')}
        <div style={{ marginBottom: '6px' }}>
          <div
            style={{
              height: '6px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              className="token-bar-fill"
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
                borderRadius: '3px',
                width: '0%',
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
          }}
        >
          3,421 / 5,000 tokens
        </div>
      </div>

      {/* Capability Radar */}
      <div>
        {sectionLabel('CAPABILITY RADAR')}
        <RadarChart />
      </div>

      {/* Live Activity */}
      <div style={{ flex: 1 }}>
        {sectionLabel('LIVE ACTIVITY')}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {logs.map((log, i) => (
            <div
              key={`${log}-${i}`}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '9px',
                color: 'var(--text-muted)',
                letterSpacing: '0.5px',
                opacity: 0.6 + i * 0.1,
                transition: 'all 0.3s ease',
              }}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

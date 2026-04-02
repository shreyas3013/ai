import { useState } from 'react';

const HISTORY_ITEMS = [
  { title: 'Neural Networks Deep Dive', time: '2h ago', tokens: '2.4K' },
  { title: 'Python ML Pipeline', time: '5h ago', tokens: '1.8K' },
  { title: 'Future of AI Discussion', time: '1d ago', tokens: '3.1K' },
  { title: 'Quantum Computing Q&A', time: '2d ago', tokens: '1.2K' },
  { title: 'Ethics in AI Systems', time: '3d ago', tokens: '2.7K' },
];

export default function Sidebar() {
  const [model, setModel] = useState('gpt4o');

  return (
    <aside
      className="anim-sidebar"
      style={{
        background: 'rgba(8,13,20,0.85)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '24px 16px',
        gap: '20px',
        zIndex: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div>
        <h1
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
            fontSize: '24px',
            background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '2px',
          }}
        >
          AI STATION
        </h1>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            color: 'var(--accent-lime)',
            letterSpacing: '3px',
            marginTop: '4px',
          }}
        >
          v2.4.1 NEURAL
        </div>
        <div
          style={{
            marginTop: '12px',
            height: '1px',
            background: 'linear-gradient(90deg, var(--accent-cyan), transparent)',
          }}
        />
      </div>

      {/* Model Selector */}
      <div>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          ACTIVE MODEL
        </div>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(8,13,20,0.9)',
            border: '1px solid var(--accent-cyan)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '11px',
            padding: '8px 10px',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="gpt4o">★ GPT-4o Ultra</option>
          <option value="claude">★ Claude Sonnet</option>
          <option value="gemini">★ Gemini Pro 1.5</option>
        </select>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 6px #22c55e',
              animation: 'glowPulse 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              color: '#22c55e',
              letterSpacing: '1px',
            }}
          >
            ONLINE · 12ms latency
          </span>
        </div>
      </div>

      {/* Chat History */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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
          RECENT SESSIONS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
          {HISTORY_ITEMS.map((item, i) => (
            <div
              key={i}
              data-interactive="true"
              style={{
                background: 'rgba(0,245,255,0.04)',
                border: '1px solid transparent',
                borderRadius: '8px',
                padding: '10px 10px 10px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderLeft: '0px solid var(--accent-cyan)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-2px)';
                el.style.borderLeft = '3px solid var(--accent-cyan)';
                el.style.background = 'rgba(0,245,255,0.07)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderLeft = '0px solid var(--accent-cyan)';
                el.style.background = 'rgba(0,245,255,0.04)';
              }}
            >
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {item.time}
                </span>
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '9px',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0,245,255,0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(0,245,255,0.2)',
                  }}
                >
                  {item.tokens} tokens
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {[
          { icon: '⚙', label: 'Settings' },
          { icon: '◑', label: 'Theme' },
          { icon: '↗', label: 'Export' },
        ].map((btn) => (
          <button
            key={btn.label}
            title={btn.label}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0,245,255,0.06)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = 'var(--accent-cyan)';
              el.style.boxShadow = 'var(--glow-cyan)';
              el.style.borderColor = 'var(--accent-cyan)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = 'var(--text-muted)';
              el.style.boxShadow = 'none';
              el.style.borderColor = 'var(--glass-border)';
            }}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </aside>
  );
}

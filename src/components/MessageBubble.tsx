import { useEffect, useRef, useState } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  complete?: boolean;
}

interface Props {
  message: Message;
  isNew?: boolean;
}

export default function MessageBubble({ message, isNew }: Props) {
  const [displayed, setDisplayed] = useState(
    message.role === 'user' || message.complete ? message.text : ''
  );
  const indexRef = useRef(0);

  useEffect(() => {
    if (message.role !== 'ai' || message.complete) {
      setDisplayed(message.text);
      return;
    }
    indexRef.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(message.text.slice(0, indexRef.current));
      if (indexRef.current >= message.text.length) {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [message.text, message.role, message.complete]);

  if (message.role === 'user') {
    return (
      <div
        className={isNew ? 'anim-msg-user' : ''}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '4px',
        }}
      >
        <div
          style={{
            maxWidth: '70%',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.13), rgba(0,245,255,0.07))',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: '16px 4px 16px 16px',
            padding: '12px 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: 'var(--text-primary)',
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '4px 0 20px rgba(0,245,255,0.15)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div
      className={isNew ? 'anim-msg-ai' : ''}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        marginBottom: '4px',
      }}
    >
      {/* AI Avatar */}
      <div
        className="glow-pulse"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '10px',
          color: '#fff',
          fontWeight: 700,
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        AI
      </div>
      <div
        style={{
          maxWidth: '75%',
          background: 'rgba(8,13,20,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '4px 16px 16px 16px',
          padding: '12px 16px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
          lineHeight: '1.7',
          color: 'var(--text-primary)',
        }}
      >
        {displayed}
        {displayed.length < message.text.length && (
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '14px',
              background: 'var(--accent-cyan)',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'pulse 0.7s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  );
}

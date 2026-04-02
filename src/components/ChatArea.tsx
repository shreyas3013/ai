import { useState, useRef, useEffect, useCallback } from 'react';
import { getSimulatedResponse } from '../lib/simulatedAI';
import MessageBubble, { type Message } from './MessageBubble';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    text: 'Welcome to AI STATION. I am your neural intelligence assistant. How can I assist you today?',
    complete: true,
  },
  {
    id: '2',
    role: 'user',
    text: 'Tell me about artificial intelligence.',
    complete: true,
  },
];

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  // Show second AI message with typewriter on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const aiMsg: Message = {
        id: '3',
        role: 'ai',
        text: 'Artificial intelligence refers to the simulation of human intelligence in machines programmed to think and learn. Modern AI systems use deep learning — neural networks with many layers — to recognize patterns in massive datasets. Today, AI powers everything from recommendation systems to autonomous vehicles and large language models like myself.',
        complete: false,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isProcessing) return;

    const userText = input.trim();
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userId = Date.now().toString();
    const userMsg: Message = { id: userId, role: 'user', text: userText, complete: true };
    setNewMessageIds((prev) => new Set(prev).add(userId));
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);
    setShowTyping(true);

    setTimeout(() => {
      setShowTyping(false);
      const responseText = getSimulatedResponse(userText);
      const aiId = (Date.now() + 1).toString();
      const aiMsg: Message = { id: aiId, role: 'ai', text: responseText, complete: false };
      setNewMessageIds((prev) => new Set(prev).add(aiId));
      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1500);
  }, [input, isProcessing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setNewMessageIds(new Set());
  };

  return (
    <div
      className="anim-chat"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          height: '56px',
          background: 'rgba(8,13,20,0.7)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          NEW CONVERSATION
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isProcessing && (
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                color: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span
                className="processing-dot"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  display: 'inline-block',
                }}
              />
              PROCESSING
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['CLEAR', 'EXPORT'].map((label) => (
            <button
              key={label}
              onClick={label === 'CLEAR' ? clearChat : undefined}
              style={{
                background: 'rgba(0,245,255,0.06)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                color: 'var(--text-muted)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '1px',
                padding: '5px 10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = 'var(--accent-cyan)';
                el.style.borderColor = 'var(--accent-cyan)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = 'var(--text-muted)';
                el.style.borderColor = 'var(--glass-border)';
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isNew={newMessageIds.has(msg.id)}
          />
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
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
              }}
            >
              AI
            </div>
            <div
              style={{
                background: 'rgba(8,13,20,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '4px 16px 16px 16px',
                padding: '12px 16px',
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
              }}
            >
              <span className="dot1" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block' }} />
              <span className="dot2" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block' }} />
              <span className="dot3" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          borderTop: '1px solid var(--accent-cyan)',
          background: 'rgba(8,13,20,0.85)',
          backdropFilter: 'blur(20px)',
          padding: '12px 16px 8px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-end',
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI STATION anything..."
            rows={1}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '13px',
              resize: 'none',
              lineHeight: '1.6',
              minHeight: '24px',
              maxHeight: '120px',
              overflowY: 'auto',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isProcessing || !input.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
              border: 'none',
              color: '#fff',
              fontSize: '18px',
              cursor: isProcessing || !input.trim() ? 'not-allowed' : 'pointer',
              opacity: isProcessing || !input.trim() ? 0.5 : 1,
              transition: 'all 0.15s ease',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && input.trim()) {
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-cyan)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(0.92)';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            →
          </button>
        </div>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '8px',
            letterSpacing: '1px',
          }}
        >
          AI STATION · Simulated Neural Engine · Not connected to live API
        </div>
      </div>
    </div>
  );
}

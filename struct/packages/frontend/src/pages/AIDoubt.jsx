import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DashboardLayout from '../components/DashboardLayout';
import { aiAPI } from '../api';
import { Send, Trash2, Brain, Clock, ChevronRight, Copy, Check, RotateCcw } from 'lucide-react';

// ─── Storage key ────────────────────────────────────────────────────────────
const STORAGE_KEY = 'gatexpress_doubt_history';

// ─── Styles ─────────────────────────────────────────────────────────────────
const S = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 },
  mainCard: { background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', minHeight: 540 },
  chatArea: { flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 480 },
  inputBar: { borderTop: '1.5px solid #F1F5F9', padding: '16px 24px', display: 'flex', gap: 10, alignItems: 'flex-end' },
  textarea: { flex: 1, resize: 'none', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 14, color: '#1e293b', fontFamily: 'inherit', outline: 'none', lineHeight: 1.5, maxHeight: 120, overflowY: 'auto' },
  sendBtn: { width: 42, height: 42, borderRadius: 10, background: '#22C58B', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s' },
  sendBtnDisabled: { background: '#D1FAE5', cursor: 'not-allowed' },
  userBubble: { alignSelf: 'flex-end', background: '#22C58B', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '11px 16px', maxWidth: '75%', fontSize: 14, lineHeight: 1.6, wordBreak: 'break-word' },
  aiBubble: { alignSelf: 'flex-start', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '4px 16px 16px 16px', padding: '14px 18px', maxWidth: '85%', fontSize: 14, lineHeight: 1.7, wordBreak: 'break-word', position: 'relative' },
  errorBubble: { alignSelf: 'flex-start', background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', maxWidth: '75%', fontSize: 14, color: '#DC2626', lineHeight: 1.5 },
  thinkingBubble: { alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 10, background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '4px 16px 16px 16px', padding: '12px 18px', fontSize: 13, color: '#64748B' },
  dot: { width: 7, height: 7, borderRadius: '50%', background: '#22C58B', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out' },
  aiLabel: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 },
  aiLabelText: { fontSize: 11, fontWeight: 700, color: '#22C58B', textTransform: 'uppercase', letterSpacing: '0.05em' },
  actionRow: { display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  actionBtn: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#64748B', background: '#F1F5F9', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', transition: 'background .15s' },
  sideCard: { background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', height: 'fit-content' },
  sideTitle: { fontSize: 13, fontWeight: 800, color: '#1e293b', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  historyItem: { padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #F1F5F9' },
  historyQ: { fontSize: 12, color: '#475569', fontWeight: 600, lineHeight: 1.4, marginBottom: 3 },
  historyTime: { fontSize: 11, color: '#94A3B8' },
  emptyHistory: { fontSize: 12, color: '#CBD5E1', textAlign: 'center', padding: '16px 0' },
  welcome: { textAlign: 'center', padding: '40px 24px', color: '#94A3B8' },
  welcomeIcon: { width: 56, height: 56, borderRadius: '50%', background: '#EEF9F4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' },
  tip: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#F8FAFC', borderRadius: 8, marginBottom: 8, cursor: 'pointer', border: '1.5px solid transparent', transition: 'border-color .15s' },
  tipText: { fontSize: 12, color: '#475569', fontWeight: 500 },
};

// ─── Markdown renderer with syntax highlighting ──────────────────────────────
function MdContent({ content }) {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div"
              customStyle={{ borderRadius: 8, fontSize: 13, margin: '8px 0' }} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code style={{ background: '#EEF9F4', color: '#065F46', padding: '2px 6px', borderRadius: 4, fontSize: 13, fontFamily: 'monospace' }} {...props}>
              {children}
            </code>
          );
        },
        p: ({ children }) => <p style={{ margin: '4px 0', lineHeight: 1.7 }}>{children}</p>,
        ul: ({ children }) => <ul style={{ margin: '6px 0', paddingLeft: 20 }}>{children}</ul>,
        ol: ({ children }) => <ol style={{ margin: '6px 0', paddingLeft: 20 }}>{children}</ol>,
        li: ({ children }) => <li style={{ marginBottom: 3, fontSize: 14 }}>{children}</li>,
        h1: ({ children }) => <h3 style={{ margin: '10px 0 4px', color: '#1e293b', fontSize: 15 }}>{children}</h3>,
        h2: ({ children }) => <h4 style={{ margin: '10px 0 4px', color: '#1e293b', fontSize: 14 }}>{children}</h4>,
        h3: ({ children }) => <h4 style={{ margin: '8px 0 4px', color: '#1e293b', fontSize: 14 }}>{children}</h4>,
        blockquote: ({ children }) => (
          <blockquote style={{ borderLeft: '3px solid #22C58B', paddingLeft: 12, margin: '8px 0', color: '#475569' }}>
            {children}
          </blockquote>
        ),
        strong: ({ children }) => <strong style={{ color: '#1e293b' }}>{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ─── Typing dots animation ───────────────────────────────────────────────────
function ThinkingBubble() {
  return (
    <div style={S.thinkingBubble}>
      <Brain size={14} color="#22C58B" />
      <span>AI is thinking</span>
      <span style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ ...S.dot, animationDelay: `${i * 0.2}s` }} />
        ))}
      </span>
    </div>
  );
}

// ─── Copy button ─────────────────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button style={S.actionBtn} onClick={copy}>
      {copied ? <Check size={11} color="#22C58B" /> : <Copy size={11} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

// ─── Suggested starter questions ─────────────────────────────────────────────
const TIPS = [
  'What is the time complexity of Dijkstra with a binary heap?',
  'Explain the difference between process and thread in OS.',
  'How does CSMA/CD work in Ethernet?',
  'What is deadlock? What are the necessary conditions?',
];

function fmt(ts) {
  const diff = Date.now() - ts;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AIDoubt() {
  const [messages, setMessages] = useState([]);   // { role, content, ts, error? }
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]); // { question, ts }
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Load saved session history from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setSessionHistory(saved);
    } catch { /* ignore */ }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  const handleInput = (e) => {
    setQuestion(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const send = useCallback(async (text) => {
    const q = (text || question).trim();
    if (!q || loading) return;

    // Add user message
    const userMsg = { role: 'user', content: q, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setQuestion('');
    if (textareaRef.current) { textareaRef.current.style.height = 'auto'; }
    setLoading(true);

    // Build history for API (only role + content from prior turns)
    const historyForAPI = messages
      .filter(m => !m.error)
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await aiAPI.solveDoubt(q, historyForAPI);
      const reply = res.data?.reply || 'No response received.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply, ts: Date.now() }]);

      // Persist to sidebar history
      const updated = [{ question: q, ts: Date.now() }, ...sessionHistory].slice(0, 20);
      setSessionHistory(updated);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }

    } catch (err) {
      const status = err?.response?.status;
      let errMsg = 'AI is busy, please try again.';
      if (status === 429) errMsg = 'AI rate limit reached. Please wait a moment and try again.';
      else if (status === 503) errMsg = err?.response?.data?.detail || 'AI service unavailable.';
      else if (status === 401) errMsg = 'Session expired. Please log in again.';
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg, ts: Date.now(), error: true }]);
    } finally {
      setLoading(false);
    }
  }, [question, loading, messages, sessionHistory]);

  // Submit on Enter (Shift+Enter = newline)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const retryLast = () => {
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (lastUser) {
      // Remove last assistant turn then re-ask
      setMessages(prev => {
        const idx = [...prev].reverse().findIndex(m => m.role === 'user');
        return prev.slice(0, prev.length - idx);
      });
      send(lastUser.content);
    }
  };

  return (
    <DashboardLayout title="AI Doubt Solver" subtitle="Ask any GATE CS question and get instant AI explanations">
      {/* Bounce animation keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div style={S.grid}>
        {/* ── Main chat panel ── */}
        <div style={S.mainCard}>
          {/* Chat messages area */}
          <div style={S.chatArea}>
            {messages.length === 0 ? (
              /* Welcome / suggestions screen */
              <div style={S.welcome}>
                <div style={S.welcomeIcon}>
                  <Brain size={26} color="#22C58B" />
                </div>
                <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 15, marginBottom: 6 }}>
                  Ask me anything about GATE CS
                </p>
                <p style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                  I can help with Data Structures, Algorithms, DBMS,<br />
                  OS, CN, OOP, and all GATE CS topics.
                </p>
                <div style={{ textAlign: 'left' }}>
                  {TIPS.map((t, i) => (
                    <div key={i} style={S.tip}
                      onClick={() => send(t)}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#22C58B'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                      <ChevronRight size={13} color="#22C58B" />
                      <span style={S.tipText}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                m.role === 'user' ? (
                  <div key={i} style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <div style={S.userBubble}>{m.content}</div>
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{fmt(m.ts)}</span>
                  </div>
                ) : m.error ? (
                  <div key={i} style={S.errorBubble}>
                    {m.content}
                    <button style={{ ...S.actionBtn, marginTop: 8, background: '#FECACA', color: '#DC2626' }} onClick={retryLast}>
                      <RotateCcw size={11} /> Try again
                    </button>
                  </div>
                ) : (
                  <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                    <div style={S.aiLabel}>
                      <Brain size={12} color="#22C58B" />
                      <span style={S.aiLabelText}>GATExpress AI</span>
                      <span style={{ fontSize: 10, color: '#CBD5E1', marginLeft: 4 }}>{fmt(m.ts)}</span>
                    </div>
                    <div style={S.aiBubble}>
                      <MdContent content={m.content} />
                      <div style={S.actionRow}>
                        <CopyBtn text={m.content} />
                        <button style={S.actionBtn} onClick={retryLast}>
                          <RotateCcw size={11} /> Explain again
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))
            )}
            {loading && <ThinkingBubble />}
            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <div style={S.inputBar}>
            <textarea
              ref={textareaRef}
              value={question}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask a GATE CS question… (Enter to send, Shift+Enter for new line)"
              rows={1}
              style={S.textarea}
              onFocus={e => e.target.style.borderColor = '#22C58B'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={loading || !question.trim()}
              style={{ ...S.sendBtn, ...(loading || !question.trim() ? S.sendBtnDisabled : {}) }}
              title="Send (Enter)"
            >
              <Send size={16} color="#fff" />
            </button>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div>
          <div style={S.sideCard}>
            <div style={S.sideTitle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={13} color="#22C58B" /> Recent Questions
              </span>
              {sessionHistory.length > 0 && (
                <button
                  onClick={() => {
                    setSessionHistory([]);
                    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  title="Clear history"
                >
                  <Trash2 size={13} color="#CBD5E1" />
                </button>
              )}
            </div>

            {sessionHistory.length === 0 ? (
              <div style={S.emptyHistory}>No questions yet</div>
            ) : (
              sessionHistory.slice(0, 10).map((h, i) => (
                <div
                  key={i}
                  style={{ ...S.historyItem, borderBottom: i < Math.min(sessionHistory.length, 10) - 1 ? '1px solid #F1F5F9' : 'none' }}
                  onClick={() => send(h.question)}
                >
                  <p style={S.historyQ}>{h.question.length > 70 ? h.question.slice(0, 70) + '…' : h.question}</p>
                  <p style={S.historyTime}>{fmt(h.ts)}</p>
                </div>
              ))
            )}
          </div>

          {/* Clear chat button */}
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              style={{ width: '100%', marginTop: 12, padding: '10px', borderRadius: 10, border: '1.5px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'border-color .2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#FCA5A5'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
            >
              <Trash2 size={13} /> Clear Chat
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testsAPI, resultsAPI } from '../api';

const SECTION_COLORS = {
  GA:          { bg: '#FDF4FF', color: '#7C3AED', border: '#E9D5FF' },
  Mathematics: { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  Subject:     { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
};
const TYPE_COLORS = {
  MCQ: { bg: '#EFF6FF', color: '#1D4ED8' },
  MSQ: { bg: '#F0FDF4', color: '#15803D' },
  NAT: { bg: '#FFF7ED', color: '#C2410C' },
};

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function TakeTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const startTime = useRef(Date.now());

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState({});
  const [markedReview, setMarkedReview] = useState(new Set());

  useEffect(() => { loadTest(); }, [id]);

  useEffect(() => {
    if (!timeLeft || result) return;
    const t = setInterval(() => {
      setTimeLeft(p => { if (p <= 1) { handleSubmit(); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [timeLeft, result]);

  const loadTest = async () => {
    try {
      const res = await testsAPI.getById(id);
      setTest(res.data);
      setTimeLeft((res.data.duration_minutes || 180) * 60);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleMCQ = (qId, n) => setAnswers(p => ({ ...p, [qId]: String(n) }));

  const handleMSQ = (qId, n) => setAnswers(p => {
    const prev = (p[qId] || '').split(',').filter(Boolean);
    const sn = String(n);
    const updated = prev.includes(sn) ? prev.filter(x => x !== sn) : [...prev, sn];
    return { ...p, [qId]: updated.sort().join(',') };
  });

  const handleNAT = (qId, val) => setAnswers(p => ({ ...p, [qId]: val }));
  const clearAnswer = (qId) => setAnswers(p => ({ ...p, [qId]: '' }));

  const toggleReview = (qId) => setMarkedReview(p => {
    const next = new Set(p);
    next.has(qId) ? next.delete(qId) : next.add(qId);
    return next;
  });

  const handleSubmit = useCallback(async () => {
    if (submitting || result) return;
    setSubmitting(true);
    try {
      const timeTaken = Math.round((Date.now() - startTime.current) / 1000);
      const answersArray = (test && test.questions ? test.questions : []).map(q => ({
        question_id: q.id,
        answer: answers[q.id] || '',
      }));
      const res = await resultsAPI.submit({
        test_id: parseInt(id),
        answers: answersArray,
        time_taken: timeTaken,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again.');
    } finally { setSubmitting(false); }
  }, [submitting, result, test, answers, id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#64748B', fontWeight: 600 }}>Loading test...</p>
    </div>
  );

  if (!test) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#EF4444', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Test not found.</p>
        <button onClick={() => navigate('/tests')} style={{ background: '#22C58B', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
          Back to Tests
        </button>
      </div>
    </div>
  );

  if (result) {
    const pct = result.total > 0 ? ((result.score / result.total) * 100).toFixed(1) : '0.0';
    const accuracy = (result.correct_count + result.wrong_count) > 0
      ? ((result.correct_count / (result.correct_count + result.wrong_count)) * 100).toFixed(1)
      : '0.0';
    const timeTakenMin = Math.floor((result.time_taken || 0) / 60);
    const timeTakenSec = (result.time_taken || 0) % 60;
    const passed = parseFloat(pct) >= 25;

    const sectionRows = [
      { label: 'Gen. Aptitude', score: result.ga_score, max: 15, color: '#7C3AED', bg: '#FDF4FF' },
      { label: 'Engg. Maths', score: result.math_score, max: 13, color: '#1D4ED8', bg: '#EFF6FF' },
      { label: 'Subject', score: result.subject_score, max: 72, color: '#15803D', bg: '#F0FDF4' },
    ];
    const statRows = [
      { label: 'Correct', val: result.correct_count, bg: '#D1FAE5', color: '#065F46' },
      { label: 'Wrong', val: result.wrong_count, bg: '#FEE2E2', color: '#991B1B' },
      { label: 'Skipped', val: result.unattempted_count, bg: '#F1F5F9', color: '#475569' },
      { label: 'Accuracy', val: accuracy + '%', bg: '#FFF7ED', color: '#C2410C' },
    ];

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0a1a12,#0f2318,#064e3b)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 24px 64px rgba(0,0,0,0.3)', padding: '40px 36px', maxWidth: 640, width: '100%' }}>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{passed ? '🎯' : '📚'}</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>
              {passed ? 'Well Done!' : 'Keep Practicing!'}
            </h1>
            <p style={{ color: '#94A3B8', fontSize: 14 }}>{test.title}</p>
          </div>

          <div style={{ background: 'linear-gradient(135deg,#0a1a12,#064e3b)', borderRadius: 18, padding: '28px 24px', textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>TOTAL SCORE</p>
            <div style={{ fontSize: 60, fontWeight: 900, color: '#4ade80', lineHeight: 1 }}>
              {result.score}
              <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>/{result.total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
              <span style={{ background: passed ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)', color: passed ? '#4ade80' : '#FBbf24', padding: '4px 16px', borderRadius: 20, fontWeight: 700, fontSize: 14 }}>
                {pct}%
              </span>
              {result.negative_marks > 0 && (
                <span style={{ background: 'rgba(239,68,68,0.2)', color: '#F87171', padding: '4px 16px', borderRadius: 20, fontWeight: 700, fontSize: 14 }}>
                  -{result.negative_marks} marks deducted
                </span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 10, letterSpacing: 1 }}>SECTION BREAKDOWN</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {sectionRows.map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>{s.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.score}<span style={{ fontSize: 12, color: '#94A3B8' }}>/{s.max}</span></p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
            {statRows.map(s => (
              <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
            <p style={{ fontSize: 13, color: '#94A3B8' }}>Time: {timeTakenMin}m {timeTakenSec}s</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => navigate('/results')} style={{ padding: '10px 20px', background: '#22C58B', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                All Results
              </button>
              <button onClick={() => navigate('/tests')} style={{ padding: '10px 20px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                More Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const questions = test.questions || [];
  const totalQ = questions.length;
  const q = questions[currentQ];
  const qt = (q && q.question_type ? q.question_type : 'MCQ').toUpperCase();
  const sec = (q && q.section) ? q.section : 'Subject';
  const sc = SECTION_COLORS[sec] || SECTION_COLORS.Subject;
  const tc = TYPE_COLORS[qt] || TYPE_COLORS.MCQ;
  const answeredCount = questions.filter(q2 => answers[q2.id] && answers[q2.id] !== '').length;
  const unansweredCount = totalQ - answeredCount;
  const isTimeCritical = timeLeft < 300;
  const isTimeRed = timeLeft < 60;

  const msqSelected = (qId) => {
    const val = answers[qId] || '';
    return new Set(val.split(',').filter(Boolean));
  };

  const legendItems = [
    { bg: '#D1FAE5', border: '#6EE7B7', textColor: '#065F46', label: `${answeredCount} Answered` },
    { bg: '#F8FAFC', border: '#E2E8F0', textColor: '#94A3B8', label: `${unansweredCount} Unanswered` },
    { bg: '#FEF3C7', border: '#FDE68A', textColor: '#92400E', label: `${markedReview.size} For Review` },
    { bg: '#1e293b', border: '#1e293b', textColor: '#fff', label: 'Current Question' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Top Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <button onClick={() => { if (window.confirm('Exit test? Your progress will be lost.')) navigate('/tests'); }}
              style={{ width: 36, height: 36, border: '1.5px solid #E2E8F0', background: '#fff', borderRadius: 8, cursor: 'pointer', flexShrink: 0, fontSize: 16 }}>
              &#8592;
            </button>
            <div>
              <p style={{ fontWeight: 800, color: '#1e293b', fontSize: 15 }}>{test.title}</p>
              <p style={{ fontSize: 11, color: '#94A3B8' }}>Q {currentQ + 1}/{totalQ} &middot; {(q && q.marks) ? q.marks : 1} mark(s)</p>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>
              <span>Answered: {answeredCount}</span>
              <span>Pending: {unansweredCount}</span>
            </div>
            <div style={{ height: 6, background: '#E2E8F0', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${totalQ > 0 ? (answeredCount / totalQ) * 100 : 0}%`, background: 'linear-gradient(90deg,#22C58B,#4ade80)', borderRadius: 6, transition: 'width 0.3s' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, fontWeight: 800, fontSize: 18,
            background: isTimeRed ? '#EF4444' : isTimeCritical ? '#F59E0B' : '#F1F5F9',
            color: isTimeCritical ? '#fff' : '#1e293b',
            transition: 'background 0.5s' }}>
            {fmt(timeLeft)}
          </div>
        </div>

        {isTimeCritical && !isTimeRed && (
          <div style={{ background: '#FEF3C7', borderTop: '1px solid #FDE68A', padding: '6px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#92400E' }}>
            Warning: Only {Math.floor(timeLeft / 60)} minutes remaining!
          </div>
        )}
        {isTimeRed && (
          <div style={{ background: '#FEE2E2', borderTop: '1px solid #FECACA', padding: '6px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#991B1B' }}>
            Less than 1 minute! Test will auto-submit.
          </div>
        )}
      </div>

      {/* Question Palette */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8px 24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 6, paddingBottom: 2 }}>
            {questions.map((q2, i) => {
              const isAns = answers[q2.id] && answers[q2.id] !== '';
              const isRev = markedReview.has(q2.id);
              const isCur = i === currentQ;
              return (
                <button key={q2.id} onClick={() => setCurrentQ(i)}
                  style={{ minWidth: 36, height: 36, borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', border: '1.5px solid', flexShrink: 0,
                    background: isCur ? '#1e293b' : isRev ? '#FEF3C7' : isAns ? '#D1FAE5' : '#F8FAFC',
                    borderColor: isCur ? '#1e293b' : isRev ? '#FDE68A' : isAns ? '#6EE7B7' : '#E2E8F0',
                    color: isCur ? '#fff' : isRev ? '#92400E' : isAns ? '#065F46' : '#94A3B8' }}>
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>

        {q && (
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 20px rgba(0,0,0,0.06)', padding: 28 }}>

            {/* Meta badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{sec}</span>
              <span style={{ padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: tc.bg, color: tc.color }}>{qt}</span>
              <span style={{ padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: '#F1F5F9', color: '#475569' }}>{q.marks || 1}M</span>
              {qt === 'MCQ' && <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 'auto' }}>Negative marking applies</span>}
              {qt === 'MSQ' && <span style={{ fontSize: 11, color: '#15803D', marginLeft: 'auto' }}>No negative - Select all correct</span>}
              {qt === 'NAT' && <span style={{ fontSize: 11, color: '#C2410C', marginLeft: 'auto' }}>No negative - Enter numerical answer</span>}
            </div>

            {/* Question text */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#1e293b,#334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                {currentQ + 1}
              </div>
              <p style={{ fontSize: 17, color: '#1e293b', lineHeight: 1.65, fontWeight: 500, flex: 1 }}>{q.question}</p>
            </div>

            {/* MCQ */}
            {qt === 'MCQ' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginLeft: 54 }}>
                {[1, 2, 3, 4].map(n => {
                  const sel = answers[q.id] === String(n);
                  return (
                    <div key={n} onClick={() => handleMCQ(q.id, n)}
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', borderRadius: 12, cursor: 'pointer',
                        background: sel ? 'rgba(34,197,139,0.06)' : '#F8FAFC',
                        border: `2px solid ${sel ? '#22C58B' : 'transparent'}`,
                        transition: 'all 0.15s' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${sel ? '#22C58B' : '#CBD5E1'}`, background: sel ? '#22C58B' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: sel ? 700 : 400, color: sel ? '#065F46' : '#475569' }}>
                        <strong style={{ marginRight: 6 }}>{n}.</strong>{q[`option${n}`]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* MSQ */}
            {qt === 'MSQ' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginLeft: 54 }}>
                <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Select ALL correct options (partial credit = 0 marks)</p>
                {[1, 2, 3, 4].map(n => {
                  const sel = msqSelected(q.id).has(String(n));
                  return (
                    <div key={n} onClick={() => handleMSQ(q.id, n)}
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', borderRadius: 12, cursor: 'pointer',
                        background: sel ? 'rgba(21,128,61,0.05)' : '#F8FAFC',
                        border: `2px solid ${sel ? '#15803D' : 'transparent'}`,
                        transition: 'all 0.15s' }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${sel ? '#15803D' : '#CBD5E1'}`, background: sel ? '#15803D' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <span style={{ color: '#fff', fontSize: 13, fontWeight: 900, lineHeight: 1 }}>&#10003;</span>}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: sel ? 700 : 400, color: sel ? '#15803D' : '#475569' }}>
                        <strong style={{ marginRight: 6 }}>{n}.</strong>{q[`option${n}`]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* NAT */}
            {qt === 'NAT' && (
              <div style={{ marginLeft: 54 }}>
                <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10 }}>Enter the numerical answer (decimals allowed)</p>
                <input
                  type="number"
                  step="any"
                  value={answers[q.id] || ''}
                  onChange={e => handleNAT(q.id, e.target.value)}
                  placeholder="Type your answer here..."
                  style={{ padding: '14px 18px', borderRadius: 12, border: '2px solid #E2E8F0', fontSize: 17, fontWeight: 700, color: '#1e293b', width: '100%', maxWidth: 280, outline: 'none', boxSizing: 'border-box', background: '#F8FAFC' }}
                />
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 8 }}>Example: 42, 3.14, -5.5</p>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => clearAnswer(q.id)}
                  style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer', fontSize: 12 }}>
                  Clear
                </button>
                <button onClick={() => toggleReview(q.id)}
                  style={{ padding: '9px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 12,
                    border: `1.5px solid ${markedReview.has(q.id) ? '#FDE68A' : '#E2E8F0'}`,
                    background: markedReview.has(q.id) ? '#FEF3C7' : '#fff',
                    color: markedReview.has(q.id) ? '#92400E' : '#475569' }}>
                  {markedReview.has(q.id) ? 'Marked for Review' : 'Mark for Review'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setCurrentQ(p => Math.max(0, p - 1))} disabled={currentQ === 0}
                  style={{ padding: '10px 18px', borderRadius: 10, border: '1.5px solid #E2E8F0', background: '#fff', color: '#475569', fontWeight: 600, cursor: currentQ === 0 ? 'not-allowed' : 'pointer', opacity: currentQ === 0 ? 0.4 : 1, fontSize: 13 }}>
                  &#8592; Prev
                </button>
                {currentQ < totalQ - 1
                  ? (
                    <button onClick={() => setCurrentQ(p => p + 1)}
                      style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#22C58B', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                      Next &#8594;
                    </button>
                  ) : (
                    <button onClick={() => { if (window.confirm(`Submit test? ${unansweredCount} question(s) unanswered.`)) handleSubmit(); }}
                      disabled={submitting}
                      style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: submitting ? '#94A3B8' : '#EF4444', color: '#fff', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', fontSize: 13 }}>
                      {submitting ? 'Submitting...' : 'Submit Test'}
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E2E8F0', padding: '16px 18px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 12, letterSpacing: 0.5 }}>MARKING SCHEME</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#1D4ED8', fontWeight: 700 }}>MCQ 1M</span>
                <span style={{ color: '#475569' }}>+1 / <span style={{ color: '#EF4444' }}>-1/3</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#1D4ED8', fontWeight: 700 }}>MCQ 2M</span>
                <span style={{ color: '#475569' }}>+2 / <span style={{ color: '#EF4444' }}>-2/3</span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#15803D', fontWeight: 700 }}>MSQ</span>
                <span style={{ color: '#475569' }}>+full / 0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#C2410C', fontWeight: 700 }}>NAT</span>
                <span style={{ color: '#475569' }}>+full / 0</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E2E8F0', padding: '16px 18px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 10, letterSpacing: 0.5 }}>STATUS LEGEND</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12 }}>
              {legendItems.map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: s.bg, border: `1.5px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: s.textColor }}>1</span>
                  </div>
                  <span style={{ color: '#475569', fontWeight: 500 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { if (window.confirm(`Submit test? ${unansweredCount} question(s) unanswered.`)) handleSubmit(); }}
            disabled={submitting}
            style={{ padding: 14, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#EF4444,#DC2626)', color: '#fff', fontWeight: 800, cursor: submitting ? 'not-allowed' : 'pointer', fontSize: 14, boxShadow: '0 4px 14px rgba(239,68,68,0.3)' }}>
            {submitting ? 'Submitting...' : 'Submit Test'}
          </button>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testsAPI, questionsAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

const SECTIONS = ['GA', 'Mathematics', 'Subject'];
const TYPES = ['MCQ', 'MSQ', 'NAT'];

const BADGE_COLORS = {
  MCQ: { bg: '#EFF6FF', color: '#1D4ED8', label: 'MCQ' },
  MSQ: { bg: '#F0FDF4', color: '#15803D', label: 'MSQ' },
  NAT: { bg: '#FFF7ED', color: '#C2410C', label: 'NAT' },
};
const SECTION_COLORS = {
  GA: { bg: '#FDF4FF', color: '#7C3AED' },
  Mathematics: { bg: '#EFF6FF', color: '#1D4ED8' },
  Subject: { bg: '#F0FDF4', color: '#15803D' },
};

const S = {
  label: { fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' },
  input: { width: '100%', padding: '10px 14px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, color: '#1e293b', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
  textarea: { width: '100%', padding: '10px 14px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, color: '#1e293b', background: '#F8FAFC', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' },
};

export default function AddQuestions() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [questionText, setQuestionText] = useState('');
  const [opts, setOpts] = useState(['', '', '', '']);
  const [qtype, setQtype] = useState('MCQ');
  const [marks, setMarks] = useState(1);
  const [section, setSection] = useState('Subject');
  // MCQ answer: single number string e.g. "1"
  // MSQ answer: set of numbers e.g. {1,3}
  const [mcqAnswer, setMcqAnswer] = useState('1');
  const [msqAnswer, setMsqAnswer] = useState(new Set());
  const [natAnswer, setNatAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => { loadTest(); }, [testId]);

  const loadTest = async () => {
    try {
      const res = await testsAPI.getById(testId);
      setTest(res.data);
      setQuestions(res.data.questions || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const toggleMsq = (n) => {
    setMsqAnswer(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  const getAnswerString = () => {
    if (qtype === 'MCQ') return mcqAnswer;
    if (qtype === 'MSQ') return [...msqAnswer].sort().join(',');
    return natAnswer.trim();
  };

  const resetForm = () => {
    setQuestionText(''); setOpts(['', '', '', '']);
    setMcqAnswer('1'); setMsqAnswer(new Set()); setNatAnswer('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const ans = getAnswerString();
    if (!ans) { setError('Please provide the correct answer.'); return; }
    if (qtype !== 'NAT' && opts.some(o => !o.trim())) { setError('All 4 options are required for MCQ/MSQ.'); return; }
    setSubmitting(true);
    try {
      await questionsAPI.create({
        test_id: parseInt(testId),
        question: questionText,
        option1: opts[0], option2: opts[1], option3: opts[2], option4: opts[3],
        answer: ans,
        question_type: qtype,
        marks: parseInt(marks),
        section,
      });
      setSuccess('Question added!');
      resetForm();
      loadTest();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add question');
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '4px solid #D1FAE5', borderTopColor: '#22C58B', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#64748B' }}>Loading test...</p>
        </div>
      </div>
    </DashboardLayout>
  );

  if (!test) return (
    <DashboardLayout>
      <div style={{ padding: 32, textAlign: 'center' }}>
        <p style={{ color: '#EF4444', fontWeight: 700 }}>Test not found.</p>
        <button onClick={() => navigate('/admin')} style={{ marginTop: 16, padding: '10px 24px', background: '#22C58B', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>Back to Admin</button>
      </div>
    </DashboardLayout>
  );

  // Section marks summary
  const summary = { GA: { count: 0, marks: 0 }, Mathematics: { count: 0, marks: 0 }, Subject: { count: 0, marks: 0 } };
  questions.forEach(q => {
    const sec = q.section || 'Subject';
    if (summary[sec]) { summary[sec].count++; summary[sec].marks += (q.marks || 1); }
  });
  const totalMarks = questions.reduce((s, q) => s + (q.marks || 1), 0);

  return (
    <DashboardLayout>
      <div style={{ padding: '28px 32px', maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <button onClick={() => navigate('/admin')} style={{ width: 38, height: 38, border: '1.5px solid #E2E8F0', background: '#fff', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: 16, height: 16 }} fill="none" stroke="#475569" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 2 }}>Add Questions — {test.title}</h1>
            <p style={{ fontSize: 13, color: '#94A3B8' }}>{questions.length} questions · {totalMarks} marks total</p>
          </div>
        </div>

        {/* GATE marks summary bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'General Aptitude', key: 'GA', target: 15, color: '#7C3AED' },
            { label: 'Engineering Maths', key: 'Mathematics', target: 13, color: '#1D4ED8' },
            { label: 'Subject', key: 'Subject', target: 72, color: '#15803D' },
            { label: 'Total', key: null, target: 100, color: '#0F172A' },
          ].map(({ label, key, target, color }) => {
            const m = key ? summary[key].marks : totalMarks;
            return (
              <div key={label} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #E2E8F0' }}>
                <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 20, fontWeight: 800, color }}>{m}<span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>/{target}</span></p>
                <div style={{ height: 4, background: '#F1F5F9', borderRadius: 4, marginTop: 6 }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (m / target) * 100)}%`, background: color, borderRadius: 4, transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* ── Add Question Form ── */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E2E8F0', padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>Add New Question</h3>

            {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#DC2626' }}>{error}</div>}
            {success && <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#15803D' }}>✓ {success}</div>}

            <form onSubmit={handleSubmit}>
              {/* Row: Type + Section + Marks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={S.label}>Question Type</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {TYPES.map(t => (
                      <button key={t} type="button" onClick={() => { setQtype(t); setMsqAnswer(new Set()); setMcqAnswer('1'); setNatAnswer(''); }}
                        style={{ flex: 1, padding: '8px 4px', borderRadius: 8, border: '1.5px solid', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
                          borderColor: qtype === t ? BADGE_COLORS[t].color : '#E2E8F0',
                          background: qtype === t ? BADGE_COLORS[t].bg : '#fff',
                          color: qtype === t ? BADGE_COLORS[t].color : '#94A3B8',
                        }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={S.label}>Section</label>
                  <select value={section} onChange={e => setSection(e.target.value)} style={{ ...S.input, padding: '9px 14px' }}>
                    {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>Marks</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1, 2].map(m => (
                      <button key={m} type="button" onClick={() => setMarks(m)}
                        style={{ flex: 1, padding: '9px 4px', borderRadius: 8, border: '1.5px solid', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                          borderColor: marks === m ? '#0F172A' : '#E2E8F0',
                          background: marks === m ? '#0F172A' : '#fff',
                          color: marks === m ? '#fff' : '#94A3B8',
                        }}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div style={{ marginBottom: 14 }}>
                <label style={S.label}>Question *</label>
                <textarea value={questionText} onChange={e => setQuestionText(e.target.value)} rows={3} required style={S.textarea} placeholder="Enter question text..." />
              </div>

              {/* Options (MCQ / MSQ) */}
              {qtype !== 'NAT' && (
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Options {qtype === 'MSQ' ? '(select all correct answers below)' : ''}</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>{i + 1}.</span>
                        <input type="text" value={opts[i]} onChange={e => { const o = [...opts]; o[i] = e.target.value; setOpts(o); }}
                          required style={{ ...S.input, paddingLeft: 28 }} placeholder={`Option ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Answer input based on type */}
              <div style={{ marginBottom: 20 }}>
                <label style={S.label}>
                  {qtype === 'MCQ' && 'Correct Answer (single)'}
                  {qtype === 'MSQ' && 'Correct Answers (select all that apply — exact match required)'}
                  {qtype === 'NAT' && 'Correct Numerical Value'}
                </label>

                {qtype === 'MCQ' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[1, 2, 3, 4].map(n => (
                      <button key={n} type="button" onClick={() => setMcqAnswer(String(n))}
                        style={{ padding: '9px', borderRadius: 8, border: '1.5px solid', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                          borderColor: mcqAnswer === String(n) ? '#22C58B' : '#E2E8F0',
                          background: mcqAnswer === String(n) ? '#D1FAE5' : '#F8FAFC',
                          color: mcqAnswer === String(n) ? '#065F46' : '#94A3B8',
                        }}>
                        Opt {n}
                      </button>
                    ))}
                  </div>
                )}

                {qtype === 'MSQ' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[1, 2, 3, 4].map(n => (
                      <button key={n} type="button" onClick={() => toggleMsq(n)}
                        style={{ padding: '9px', borderRadius: 8, border: '1.5px solid', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                          borderColor: msqAnswer.has(n) ? '#15803D' : '#E2E8F0',
                          background: msqAnswer.has(n) ? '#F0FDF4' : '#F8FAFC',
                          color: msqAnswer.has(n) ? '#15803D' : '#94A3B8',
                        }}>
                        {msqAnswer.has(n) ? '✓ ' : ''}Opt {n}
                      </button>
                    ))}
                  </div>
                )}

                {qtype === 'NAT' && (
                  <input type="number" step="any" value={natAnswer} onChange={e => setNatAnswer(e.target.value)} required
                    style={S.input} placeholder="e.g. 42.5" />
                )}
              </div>

              {/* Marking hint */}
              <div style={{ background: qtype === 'MCQ' ? '#FFF7ED' : '#F0FDF4', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: qtype === 'MCQ' ? '#C2410C' : '#15803D' }}>
                {qtype === 'MCQ' && marks === 1 && '⚡ MCQ 1-mark: +1 correct, −⅓ wrong'}
                {qtype === 'MCQ' && marks === 2 && '⚡ MCQ 2-mark: +2 correct, −⅔ wrong'}
                {qtype === 'MSQ' && '✅ MSQ: Full marks only if ALL correct options selected. No negative.'}
                {qtype === 'NAT' && '🔢 NAT: Exact numerical match. No negative marking.'}
              </div>

              <button type="submit" disabled={submitting} style={{ width: '100%', padding: '12px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1, fontFamily: 'inherit' }}>
                {submitting ? 'Adding...' : '+ Add Question'}
              </button>
            </form>
          </div>

          {/* ── Questions List ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Questions Added</h3>
              <span style={{ background: '#F1F5F9', color: '#475569', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{questions.length} total</span>
            </div>

            {questions.length === 0 ? (
              <div style={{ background: '#fff', border: '1.5px dashed #E2E8F0', borderRadius: 16, padding: '48px 24px', textAlign: 'center' }}>
                <p style={{ color: '#94A3B8', fontWeight: 500 }}>No questions yet. Add your first one!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 'calc(100vh - 280px)', overflowY: 'auto', paddingRight: 4 }}>
                {questions.map((q, i) => {
                  const qt = q.question_type || 'MCQ';
                  const sec = q.section || 'Subject';
                  const bc = BADGE_COLORS[qt] || BADGE_COLORS.MCQ;
                  const sc = SECTION_COLORS[sec] || SECTION_COLORS.Subject;
                  return (
                    <div key={q.id} style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #E2E8F0', padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: bc.bg, color: bc.color }}>{qt}</span>
                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color }}>{sec}</span>
                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: '#F1F5F9', color: '#475569' }}>{q.marks || 1}M</span>
                          </div>
                          <p style={{ fontSize: 13, color: '#1e293b', fontWeight: 500, lineHeight: 1.5 }}>{q.question}</p>
                        </div>
                      </div>
                      {qt !== 'NAT' && (
                        <div style={{ marginLeft: 38, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                          {[1, 2, 3, 4].map(n => {
                            const correctSet = new Set((q.answer || '').split(',').map(s => s.trim()));
                            const isCorrect = correctSet.has(String(n));
                            return (
                              <div key={n} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, background: isCorrect ? '#D1FAE5' : '#F8FAFC', color: isCorrect ? '#065F46' : '#64748B', fontWeight: isCorrect ? 700 : 400 }}>
                                {n}. {q[`option${n}`]} {isCorrect ? '✓' : ''}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {qt === 'NAT' && (
                        <div style={{ marginLeft: 38 }}>
                          <span style={{ fontSize: 12, background: '#FFF7ED', color: '#C2410C', padding: '4px 10px', borderRadius: 6, fontWeight: 700 }}>Answer: {q.answer}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {questions.length > 0 && (
              <button onClick={() => navigate('/admin')} style={{ width: '100%', marginTop: 16, padding: '12px', background: '#22C58B', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                ✓ Done — Back to Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { materialsAPI } from '../api';
import { BookOpen, Download, Search, Filter, FileText, Code2, StickyNote, FileQuestion } from 'lucide-react';

const SUBJECTS = ['All', 'OS', 'DBMS', 'CN', 'DS', 'Algorithms', 'TOC', 'Maths', 'Digital Logic'];
const TYPES    = ['All', 'PDF', 'Notes', 'Code', 'PYQ'];

const TYPE_META = {
  PDF:   { icon: FileText,    bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  Notes: { icon: StickyNote,  bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  Code:  { icon: Code2,       bg: '#FDF4FF', color: '#9333EA', border: '#E9D5FF' },
  PYQ:   { icon: FileQuestion, bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
};

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [search, setSearch]       = useState('');
  const [subject, setSubject]     = useState('All');
  const [type, setType]           = useState('All');

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const subj = subject !== 'All' ? subject : undefined;
        const res  = await materialsAPI.getAll(subj);
        setMaterials(res.data);
      } catch (e) {
        setError('Failed to load resources. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [subject]);

  const filtered = materials.filter(m => {
    const q = search.toLowerCase();
    const matchSearch  = !q || m.title.toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q);
    const matchType    = type === 'All' || m.type === type;
    return matchSearch && matchType;
  });

  return (
    <DashboardLayout>
      <div style={{ padding: '32px', fontFamily: "'Poppins', sans-serif", maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>Study Materials</h1>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>Download PDFs, notes, code snippets and previous year questions</p>
        </div>

        {/* Filters */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>

            {/* Search */}
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by title or description..."
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px 10px 40px', borderRadius: 10, border: '1.8px solid #E5E7EB', fontSize: 13, outline: 'none', fontFamily: "'Poppins', sans-serif", background: '#F9FAFB', color: '#111827' }} />
            </div>

            {/* Subject filter */}
            <div style={{ position: 'relative' }}>
              <Filter size={14} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <select value={subject} onChange={e => setSubject(e.target.value)}
                style={{ padding: '10px 14px 10px 32px', borderRadius: 10, border: '1.8px solid #E5E7EB', fontSize: 13, background: '#F9FAFB', color: '#374151', outline: 'none', fontFamily: "'Poppins', sans-serif", cursor: 'pointer' }}>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Type filter */}
            <div style={{ display: 'flex', gap: 6 }}>
              {TYPES.map(t => (
                <button key={t} onClick={() => setType(t)}
                  style={{ padding: '8px 16px', borderRadius: 20, border: '1.8px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .15s',
                    borderColor: type === t ? '#22C58B' : '#E5E7EB',
                    background:  type === t ? '#22C58B' : '#fff',
                    color:       type === t ? '#fff'    : '#6B7280' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #E5E7EB', borderTop: '3px solid #22C58B', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <p style={{ color: '#9CA3AF', marginTop: 16 }}>Loading resources...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
            <p style={{ color: '#EF4444' }}>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
            <BookOpen size={48} color="#D1D5DB" />
            <p style={{ color: '#6B7280', marginTop: 12, fontWeight: 600 }}>No resources found</p>
            <p style={{ color: '#9CA3AF', fontSize: 13 }}>{materials.length === 0 ? 'The admin has not uploaded any resources yet.' : 'Try adjusting your filters.'}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {filtered.map(m => {
              const meta = TYPE_META[m.type] || TYPE_META.PDF;
              const Icon = meta.icon;
              return (
                <div key={m.id}
                  style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #F3F4F6', transition: 'transform .2s, box-shadow .2s', display: 'flex', flexDirection: 'column', gap: 12 }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';   e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}>

                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: meta.bg, border: `1px solid ${meta.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={22} color={meta.color} strokeWidth={1.8} />
                    </div>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>{m.type}</span>
                  </div>

                  {/* Title + description */}
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>{m.title}</h3>
                    {m.subject && <span style={{ fontSize: 12, color: '#6366F1', fontWeight: 600, marginTop: 3, display: 'block' }}>{m.subject}</span>}
                    {m.description && <p style={{ fontSize: 12, color: '#6B7280', marginTop: 6, lineHeight: 1.5 }}>{m.description}</p>}
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #F3F4F6' }}>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{new Date(m.uploaded_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <a href={materialsAPI.getFileUrl(m.id)}
                      download
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#22C58B,#4FD1A5)', color: '#fff', textDecoration: 'none', fontSize: 12, fontWeight: 700, boxShadow: '0 3px 10px rgba(34,197,139,0.3)', transition: 'box-shadow .15s' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 16px rgba(34,197,139,0.45)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 3px 10px rgba(34,197,139,0.3)'}>
                      <Download size={13} /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CSS for spinner */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </DashboardLayout>
  );
}

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { materialsAPI } from '../api';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const SUBJECTS = ['OS', 'DBMS', 'CN', 'DS', 'Algorithms', 'TOC', 'Maths', 'Digital Logic', 'Programming', 'Other'];
const TYPES    = ['PDF', 'Notes', 'Code', 'PYQ'];

const TYPE_COLORS = {
  PDF:   '#2563EB',
  Notes: '#16A34A',
  Code:  '#9333EA',
  PYQ:   '#EA580C',
};

export default function UploadMaterial() {
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  const [form, setForm] = useState({ title: '', subject: '', type: 'PDF', description: '' });
  const [file, setFile]       = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState('');
  const [error, setError]       = useState('');

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!file)          return setError('Please select a file to upload.');
    if (!form.title.trim()) return setError('Title is required.');

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title',       form.title.trim());
      fd.append('subject',     form.subject);
      fd.append('type',        form.type);
      fd.append('description', form.description.trim());
      fd.append('file',        file);

      await materialsAPI.upload(fd);
      setSuccess('Resource uploaded successfully!');
      setForm({ title: '', subject: '', type: 'PDF', description: '' });
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', boxSizing: 'border-box',
    padding: '11px 14px', borderRadius: 10,
    border: '1.8px solid #E5E7EB', fontSize: 13,
    background: '#F9FAFB', color: '#111827',
    outline: 'none', fontFamily: "'Poppins', sans-serif",
    transition: 'border-color .18s',
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '32px', fontFamily: "'Poppins', sans-serif", maxWidth: 680, margin: '0 auto' }}>

        {/* Back */}
        <button onClick={() => navigate('/admin')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', marginBottom: 20, padding: 0 }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ background: '#fff', borderRadius: 20, padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.09)' }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Upload Study Resource</h1>
            <p style={{ color: '#6B7280', marginTop: 6, fontSize: 13 }}>Upload materials for students — PDFs, notes, code files, or previous year questions.</p>
          </div>

          {success && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
              <CheckCircle size={18} /> {success}
            </div>
          )}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: '#FEF2F2', border: '1px solid #FEE2E2', color: '#EF4444', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Title */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Title *</label>
              <input value={form.title} onChange={set('title')} placeholder="e.g. OS Process Scheduling Notes"
                style={inp} onFocus={e => e.target.style.borderColor = '#22C58B'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>

            {/* Subject + Type row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Subject</label>
                <select value={form.subject} onChange={set('subject')} style={{ ...inp, cursor: 'pointer' }}>
                  <option value="">Select subject...</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Type</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {TYPES.map(t => (
                    <button key={t} type="button" onClick={() => setForm(prev => ({ ...prev, type: t }))}
                      style={{ padding: '8px 14px', borderRadius: 20, border: '1.8px solid', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .15s',
                        borderColor: form.type === t ? TYPE_COLORS[t] : '#E5E7EB',
                        background:  form.type === t ? TYPE_COLORS[t] : '#fff',
                        color:       form.type === t ? '#fff' : '#6B7280' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Description <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></label>
              <textarea value={form.description} onChange={set('description')}
                placeholder="Brief description of the content..."
                rows={3}
                style={{ ...inp, resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = '#22C58B'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>

            {/* File Drop Zone */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>File *</label>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{ border: `2px dashed ${dragging ? '#22C58B' : file ? '#22C58B' : '#D1D5DB'}`, borderRadius: 12, padding: '32px 24px', textAlign: 'center', cursor: 'pointer', background: dragging ? '#F0FDF4' : file ? '#F0FDF4' : '#FAFAFA', transition: 'all .2s' }}>
                <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                {file ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <CheckCircle size={32} color="#22C58B" />
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{file.name}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>{(file.size / 1024).toFixed(1)} KB — click to change</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <Upload size={32} color="#D1D5DB" />
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Drop file here or click to browse</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>PDF, DOCX, TXT, ZIP, PY, etc.</div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px', borderRadius: 12, border: 'none', background: loading ? '#D1FAE5' : 'linear-gradient(135deg,#22C58B,#4FD1A5)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(34,197,139,0.3)', transition: 'all .2s' }}>
              {loading ? (
                <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Uploading...</>
              ) : (
                <><FileText size={18} /> Upload Resource</>
              )}
            </button>
          </form>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </DashboardLayout>
  );
}

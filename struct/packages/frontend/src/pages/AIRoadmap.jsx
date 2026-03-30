import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const SUBJECTS_MAP = {
  'Data Structures': ['Arrays & Strings','Linked Lists','Stacks & Queues','Trees (BST, AVL, Heap)','Graphs (BFS/DFS)','Hashing','Tries'],
  'Algorithms': ['Sorting Algorithms','Searching','Divide & Conquer','Dynamic Programming','Greedy Algorithms','Graph Algorithms','NP-Completeness'],
  'Operating Systems': ['Process Management','CPU Scheduling','Memory Management','Virtual Memory','File Systems','I/O Management','Deadlocks'],
  'Computer Networks': ['OSI Model','TCP/IP Stack','Routing Protocols','Congestion Control','Application Layer','Network Security','Wireless Networks'],
  'Databases': ['Relational Model','SQL','Normalization','Transactions','Indexing & Hashing','Query Optimization','NoSQL'],
};

const COLORS = ['#22C58B','#3B82F6','#F59E0B','#EF4444','#8B5CF6','#EC4899','#14B8A6'];

export default function AIRoadmap() {
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [roadmap, setRoadmap] = useState(null);

  const generate = () => {
    const topics = SUBJECTS_MAP[subject] || [];
    setRoadmap({ subject, level, topics });
  };

  return (
    <DashboardLayout title="AI Roadmap Generator" subtitle="Get a structured learning path for any GATE subject">
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 18 }}> Settings</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6 }}>SUBJECT</label>
            <select value={subject} onChange={e=>setSubject(e.target.value)} className="form-input" style={{ cursor: 'pointer' }}>
              <option value="">Select a subject...</option>
              {Object.keys(SUBJECTS_MAP).map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 8 }}>LEVEL</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Beginner','Intermediate','Advanced'].map(l => (
                <button key={l} onClick={()=>setLevel(l)} style={{ flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: level===l ? '#22C58B' : '#F1F5F9', color: level===l ? '#fff' : '#64748B', fontFamily: 'inherit' }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={!subject} className="btn-ai" style={{ width: '100%', padding: 12, opacity: !subject ? 0.5 : 1 }}>
             Generate Roadmap
          </button>
        </div>

        {roadmap ? (
          <div>
            <div style={{ background: 'linear-gradient(135deg,#0a1a12,#0f2318)', borderRadius: 16, padding: 24, marginBottom: 20, color: '#fff' }}>
              <p style={{ fontSize: 11, color: '#6EE7B7', fontWeight: 700, marginBottom: 4 }}>AI ROADMAP</p>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>{roadmap.subject}</h2>
              <p style={{ color: '#a7f3d0', fontSize: 13 }}>{roadmap.level} Level  {roadmap.topics.length} Topics</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 16 }}> Learning Path</h3>
              <div style={{ position: 'relative' }}>
                {roadmap.topics.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < roadmap.topics.length-1 ? 0 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: COLORS[i % COLORS.length], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0, zIndex: 1 }}>{i+1}</div>
                      {i < roadmap.topics.length-1 && <div style={{ width: 2, flex: 1, background: '#E2E8F0', minHeight: 32 }}/>}
                    </div>
                    <div style={{ paddingBottom: 24, flex: 1 }}>
                      <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '12px 16px', border: '1px solid #F0F9F4' }}>
                        <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{t}</p>
                        <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                          {level === 'Beginner' ? 'Start with fundamentals and basic examples' : level === 'Intermediate' ? 'Focus on problem solving and GATE patterns' : 'Deep-dive into advanced proofs and edge cases'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}></div>
            <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 16, marginBottom: 6 }}>Select a subject to generate your roadmap</p>
            <p style={{ fontSize: 13, color: '#94A3B8' }}>AI will create a structured learning path tailored to your level</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

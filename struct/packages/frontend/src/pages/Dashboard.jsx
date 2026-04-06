import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { testsAPI, resultsAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';
import {
  CheckCircle, BarChart2, BookOpen, Award, Play, FileText,
  TrendingUp, Calendar, Brain, Map, Zap, ChevronRight, ArrowRight, ClipboardList
} from 'lucide-react';

const S = {
  statsRow: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20, marginBottom:28 },
  statCard: { background:'#fff', borderRadius:14, padding:'22px 24px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', display:'flex', alignItems:'center', gap:16 },
  statIcon: { width:48, height:48, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  statInfo: { flex:1 },
  statValue: { fontSize:26, fontWeight:700, color:'#1a1a2e', lineHeight:1.1 },
  statLabel: { fontSize:13, color:'#888', marginTop:2 },
  statDelta: { fontSize:12, fontWeight:600, color:'#22C58B', marginTop:4 },
  twoCol: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:28 },
  card: { background:'#fff', borderRadius:14, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.07)' },
  sectionTitle: { fontSize:16, fontWeight:700, color:'#1a1a2e', marginBottom:16, display:'flex', alignItems:'center', gap:8 },
  courseList: { display:'flex', flexDirection:'column', gap:12 },
  courseCard: { border:'1.5px solid #f0f0f0', borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:14, transition:'border-color .2s' },
  courseTag: { display:'inline-block', fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, marginBottom:6 },
  courseName: { fontSize:14, fontWeight:600, color:'#1a1a2e', marginBottom:2 },
  courseProgress: { fontSize:12, color:'#888' },
  progressWrap: { background:'#f0f0f0', borderRadius:4, height:4, marginTop:6 },
  progressFill: { height:4, borderRadius:4, background:'#22C58B', transition:'width .4s' },
  quickGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 },
  quickBtn: { display:'flex', alignItems:'center', gap:10, padding:'13px 16px', borderRadius:12, border:'1.5px solid #f0f0f0', background:'#fff', cursor:'pointer', textDecoration:'none', transition:'all .2s', fontSize:13, fontWeight:600, color:'#1a1a2e' },
  aiGrid: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 },
  aiCard: { padding:'16px', borderRadius:12, border:'1.5px solid #f0f0f0', display:'flex', flexDirection:'column', gap:8 },
  aiCardTitle: { fontSize:14, fontWeight:700, color:'#1a1a2e' },
  aiCardDesc: { fontSize:12, color:'#888', lineHeight:1.5 },
  aiCardLink: { display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:700, color:'#22C58B', textDecoration:'none', marginTop:4 },
  activityTable: { width:'100%', borderCollapse:'collapse' },
  th: { textAlign:'left', fontSize:12, color:'#aaa', fontWeight:600, padding:'0 12px 10px', borderBottom:'1.5px solid #f5f5f5' },
  td: { padding:'11px 12px', fontSize:13, color:'#333', borderBottom:'1px solid #f8f8f8' },
  badge: { display:'inline-block', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 },
};

function StatCard({ icon: Icon, iconBg, iconColor, value, label, delta }) {
  return (
    <div style={S.statCard}>
      <div style={{ ...S.statIcon, background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div style={S.statInfo}>
        <div style={S.statValue}>{value}</div>
        <div style={S.statLabel}>{label}</div>
        {delta && <div style={S.statDelta}>{delta}</div>}
      </div>
    </div>
  );
}

const COURSES = [
  { name:'Engineering Mathematics', code:'MA', tag:'Core', tagColor:'#EEF9F4', tagText:'#22C58B', progress:72 },
  { name:'Digital Logic & Design',  code:'DL', tag:'Core', tagColor:'#EEF9F4', tagText:'#22C58B', progress:55 },
  { name:'Theory of Computation',   code:'TOC',tag:'Hard', tagColor:'#FFF4ED', tagText:'#F97316', progress:38 },
  { name:'Operating Systems',       code:'OS', tag:'Core', tagColor:'#EEF9F4', tagText:'#22C58B', progress:81 },
];

const AI_TOOLS = [
  { icon: Calendar, title:'Study Planner', desc:'AI-generated schedule based on your pace and weak topics.', to:'/ai-planner', bg:'#EEF9F4', iconColor:'#22C58B' },
  { icon: Brain,    title:'Doubt Solver',  desc:'Instant explanations for any concept or problem.', to:'/ai-doubt', bg:'#EDE9FE', iconColor:'#7C3AED' },
  { icon: Map,      title:'Roadmap',       desc:'Personalised GATE roadmap with milestones and targets.', to:'/ai-roadmap', bg:'#FFF4ED', iconColor:'#F97316' },
  { icon: BarChart2,title:'Analysis',      desc:'Deep dive into your strengths and improvement areas.', to:'/ai-analysis', bg:'#EFF6FF', iconColor:'#3B82F6' },
];

const QUICK_ACTIONS = [
  { icon: Play,          label:'Resume Test',     to:'/tests',     bg:'#EEF9F4', color:'#22C58B' },
  { icon: FileText,      label:'Study Materials', to:'/materials', bg:'#EFF6FF', color:'#3B82F6' },
  { icon: TrendingUp,    label:'View Results',    to:'/results',   bg:'#FFF4ED', color:'#F97316' },
  { icon: Calendar,      label:'AI Planner',      to:'/ai-planner',bg:'#EDE9FE', color:'#7C3AED' },
  { icon: Brain,         label:'Doubt Solver',    to:'/ai-doubt',  bg:'#FEF2F2', color:'#EF4444' },
  { icon: ClipboardList, label:'All Tests',       to:'/tests',     bg:'#F0FFF4', color:'#22C58B' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [tests, setTests]     = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      testsAPI.getAll().catch(() => ({ data: [] })),
      resultsAPI.getMine().catch(() => ({ data: [] })),
    ]).then(([t, r]) => {
      setTests(t.data || []);
      setResults(r.data || []);
    }).catch(err => {
      console.error('Dashboard error:', err);
      setTests([]);
      setResults([]);
    }).finally(() => setLoading(false));
  }, []);

  const totalTests   = tests.length;
  const attempted    = results.length;
  const passedCount  = results.filter(r => r.score / r.total >= 0.6).length;
  const avgScore     = attempted > 0
    ? Math.round(results.reduce((s, r) => s + (r.score / r.total * 100), 0) / attempted) : 0;

  const recentActivity = results.slice(0, 5).map(r => {
    const test = tests.find(t => t.id === r.test_id);
    const pct  = Math.round(r.score / r.total * 100);
    const pass = pct >= 60;
    return { name: test?.title || 'Unknown Test', score: pct, pass, date: new Date(r.created_at || Date.now()).toLocaleDateString() };
  });

  const firstName = user?.full_name?.split(' ')[0] || user?.username || 'Student';

  return (
    <DashboardLayout title={`Welcome back, ${firstName}`} subtitle="Here is your GATE preparation overview.">
      {loading ? (
        <div style={{ textAlign:'center', padding:60, color:'#aaa', fontSize:15 }}>Loading dashboard...</div>
      ) : (
        <>
          {/* Stats Row */}
          <div style={S.statsRow}>
            <StatCard icon={BookOpen}    iconBg="#EEF9F4" iconColor="#22C58B" value={totalTests}  label="Total Tests"    delta="Available" />
            <StatCard icon={CheckCircle} iconBg="#EFF6FF" iconColor="#3B82F6" value={attempted}   label="Tests Attempted" delta={`${passedCount} passed`} />
            <StatCard icon={BarChart2}   iconBg="#FFF4ED" iconColor="#F97316" value={`${avgScore}%`} label="Average Score" delta={avgScore >= 60 ? 'Above pass mark' : 'Keep practising'} />
            <StatCard icon={Award}       iconBg="#EDE9FE" iconColor="#7C3AED" value={passedCount} label="Tests Passed"   delta={attempted > 0 ? `${Math.round(passedCount/attempted*100)}% pass rate` : '--'} />
          </div>

          {/* Middle Row: Courses + Quick Actions */}
          <div style={S.twoCol}>
            {/* Course Progress */}
            <div style={S.card}>
              <div style={S.sectionTitle}>
                <BookOpen size={16} color="#22C58B" /> Course Progress
              </div>
              <div style={S.courseList}>
                {COURSES.map(c => (
                  <div key={c.code} style={S.courseCard}>
                    <div style={{ width:38, height:38, borderRadius:10, background:'#EEF9F4', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:12, color:'#22C58B', flexShrink:0 }}>{c.code}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ ...S.courseTag, background:c.tagColor, color:c.tagText }}>{c.tag}</span>
                      </div>
                      <div style={S.courseName}>{c.name}</div>
                      <div style={S.progressWrap}><div style={{ ...S.progressFill, width:`${c.progress}%` }} /></div>
                      <div style={S.courseProgress}>{c.progress}% complete</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={S.card}>
              <div style={S.sectionTitle}>
                <Zap size={16} color="#22C58B" /> Quick Actions
              </div>
              <div style={S.quickGrid}>
                {QUICK_ACTIONS.map(q => (
                  <Link key={q.label} to={q.to} style={S.quickBtn}>
                    <div style={{ width:32, height:32, borderRadius:8, background:q.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <q.icon size={16} color={q.color} />
                    </div>
                    {q.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tools */}
          <div style={{ ...S.card, marginBottom:28 }}>
            <div style={S.sectionTitle}>
              <Brain size={16} color="#22C58B" /> AI-Powered Tools
            </div>
            <div style={S.aiGrid}>
              {AI_TOOLS.map(t => (
                <div key={t.title} style={{ ...S.aiCard, background: t.bg.replace(')', ', 0.4)').replace('rgb', 'rgba') || '#fafafa' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:8, background:'rgba(255,255,255,0.8)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <t.icon size={18} color={t.iconColor} />
                    </div>
                    <div style={S.aiCardTitle}>{t.title}</div>
                  </div>
                  <div style={S.aiCardDesc}>{t.desc}</div>
                  <Link to={t.to} style={S.aiCardLink}>
                    Try Now <ChevronRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={S.card}>
            <div style={{ ...S.sectionTitle, justifyContent:'space-between' }}>
              <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                <ClipboardList size={16} color="#22C58B" /> Recent Activity
              </span>
              <Link to="/results" style={{ fontSize:13, color:'#22C58B', textDecoration:'none', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {recentActivity.length === 0 ? (
              <div style={{ textAlign:'center', padding:'32px 0', color:'#bbb', fontSize:14 }}>
                No tests attempted yet. <Link to="/tests" style={{ color:'#22C58B' }}>Start your first test</Link>
              </div>
            ) : (
              <table style={S.activityTable}>
                <thead>
                  <tr>
                    <th style={S.th}>Test Name</th>
                    <th style={S.th}>Score</th>
                    <th style={S.th}>Status</th>
                    <th style={S.th}>Date</th>
                    <th style={S.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((a, i) => (
                    <tr key={i}>
                      <td style={S.td}>{a.name}</td>
                      <td style={S.td}><strong>{a.score}%</strong></td>
                      <td style={S.td}>
                        <span style={{ ...S.badge, background: a.pass ? '#EEF9F4' : '#FEF2F2', color: a.pass ? '#22C58B' : '#EF4444' }}>
                          {a.pass ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                      <td style={{ ...S.td, color:'#aaa' }}>{a.date}</td>
                      <td style={S.td}>
                        <Link to="/results" style={{ color:'#22C58B', textDecoration:'none', fontWeight:600, fontSize:12, display:'flex', alignItems:'center', gap:4 }}>
                          Details <ArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

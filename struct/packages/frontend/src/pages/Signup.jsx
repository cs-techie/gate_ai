import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const IconUser = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const IconEyeOpen = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const IconEyeOff = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const inp = {
  width: '100%', boxSizing: 'border-box',
  padding: '12px 14px 12px 44px',
  borderRadius: '12px', border: '1.8px solid #E5E7EB',
  background: '#F9FAFB', fontSize: '14px', color: '#111827',
  outline: 'none', transition: 'border-color .18s, box-shadow .18s',
  fontFamily: "'Poppins', sans-serif",
};

export default function Signup() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { signup } = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg,#f0fdf8 0%,#fafffe 50%,#f0f4ff 100%)' }}>

      {/* Minimal Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(229,231,235,0.6)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/images/logo.png" alt="GATEXpress AI Logo" style={{ height: '40px', width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/login" style={{ padding: '7px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, color: '#22C58B', border: '1.8px solid #22C58B', textDecoration: 'none', background: 'transparent', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#22C58B'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#22C58B'; }}>
            Login
          </Link>
          <Link to="/signup" style={{ padding: '7px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg,#22C58B,#4FD1A5)', boxShadow: '0 3px 12px rgba(34,197,139,0.3)', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,197,139,0.45)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 3px 12px rgba(34,197,139,0.3)'}>
            Register
          </Link>
        </div>
      </nav>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, paddingTop: '72px', minHeight: '100vh' }}>

        {/* LEFT 40% */}
        <div style={{ width: '40%', minHeight: 'calc(100vh - 72px)', display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#22C58B 0%,#4FD1A5 100%)' }} className="auth-left">
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', top: '36px', left: '36px', opacity: 0.2, display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '9px' }}>
            {Array.from({ length: 36 }).map((_, i) => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }} />)}
          </div>
          <div style={{ position: 'absolute', bottom: '36px', right: '36px', opacity: 0.2, display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '9px' }}>
            {Array.from({ length: 36 }).map((_, i) => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }} />)}
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '220px', height: '240px', borderRadius: '28px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(14px)', border: '1.5px solid rgba(255,255,255,0.35)', boxShadow: '0 24px 64px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', marginBottom: '28px' }}>
              <img src="/images/a2.png" alt="AI Robot" style={{ height: '260px', objectFit: 'contain', marginBottom: '-4px' }} />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.2, marginBottom: '10px', letterSpacing: '-0.4px' }}>Join GATExpress AI</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.82)', textAlign: 'center', maxWidth: '240px', lineHeight: 1.7, marginBottom: '28px' }}>
              Start your AI-powered GATE preparation journey today
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '260px', marginBottom: '24px' }}>
              {['Unlimited mock tests & PYQs','AI-powered study planner','Weak topic analysis','Expert instructor support'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.18)', borderRadius: '12px', padding: '9px 14px', backdropFilter: 'blur(8px)' }}>
                  <span style={{ color: '#fff', fontSize: '18px', lineHeight: 1 }}>&#10003;</span>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {['AI Doubt Solver','Smart Analytics','10K+ Questions'].map(p => (
                <span key={p} style={{ padding: '5px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 60% */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: '440px', background: '#fff', borderRadius: '22px', boxShadow: '0 10px 50px rgba(0,0,0,0.09),0 2px 6px rgba(0,0,0,0.04)', padding: '40px 40px 36px', border: '1px solid rgba(229,231,235,0.5)' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <img src="/images/logo.png" alt="GATEXpress AI Logo" style={{ height: '42px', width: 'auto' }} />
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginBottom: '4px', letterSpacing: '-0.4px' }}>Create Account</h1>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '22px' }}>
              {'Already have an account? '}
              <Link to="/login" style={{ color: '#22C58B', fontWeight: 600, textDecoration: 'none' }}>Sign in here &rarr;</Link>
            </p>

            {error && (
              <div style={{ marginBottom: '16px', padding: '11px 14px', borderRadius: '11px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', display: 'flex', pointerEvents: 'none' }}><IconUser /></span>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required style={inp}
                    onFocus={e => { e.target.style.borderColor = '#22C58B'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,139,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', display: 'flex', pointerEvents: 'none' }}><IconMail /></span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inp}
                    onFocus={e => { e.target.style.borderColor = '#22C58B'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,139,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', display: 'flex', pointerEvents: 'none' }}><IconLock /></span>
                  <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required style={{ ...inp, paddingRight: '44px' }}
                    onFocus={e => { e.target.style.borderColor = '#22C58B'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,139,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', padding: 0 }}>
                    {showPwd ? <IconEyeOff /> : <IconEyeOpen />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <input type="checkbox" id="terms" required style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: '#22C58B', flexShrink: 0, cursor: 'pointer' }} />
                <label htmlFor="terms" style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5, cursor: 'pointer' }}>
                  {'I agree to the '}
                  <a href="#" style={{ color: '#22C58B', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a>
                  {' and '}
                  <a href="#" style={{ color: '#22C58B', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{ marginTop: '4px', width: '100%', padding: '13px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '14px', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#22C58B 0%,#4FD1A5 100%)', boxShadow: loading ? 'none' : '0 6px 18px rgba(34,197,139,0.35)', transition: 'all .22s', fontFamily: "'Poppins',sans-serif" }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(34,197,139,0.42)'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 6px 18px rgba(34,197,139,0.35)'; }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg style={{ width: '16px', height: '16px', animation: 'authSpin .8s linear infinite' }} fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create Account \u2192'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '18px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500, whiteSpace: 'nowrap' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[{ label: 'Google', Icon: GoogleIcon }, { label: 'GitHub', Icon: GitHubIcon }].map(({ label, Icon }) => (
                <button key={label}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', padding: '10px', borderRadius: '11px', border: '1.8px solid #E5E7EB', background: '#F9FAFB', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer', transition: 'all .18s', fontFamily: "'Poppins',sans-serif" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#22C58B'; e.currentTarget.style.background = '#f0fdf8'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#F9FAFB'; }}>
                  <Icon />{label}
                </button>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#9CA3AF', marginTop: '16px', lineHeight: 1.6 }}>
              {'By creating an account you agree to our '}
              <a href="#" style={{ color: '#22C58B', textDecoration: 'none', fontWeight: 600 }}>Terms</a>
              {' & '}
              <a href="#" style={{ color: '#22C58B', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .auth-left { display: flex !important; } }
        @keyframes authSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

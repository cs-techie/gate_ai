import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);

  const S = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      backgroundColor: 'rgba(255,255,255,0.97)',
      boxShadow: isScrolled ? '0 2px 16px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
      padding: isScrolled ? '10px 0' : '14px 0',
    },
    container: {
      maxWidth: 1280, margin: '0 auto', padding: '0 24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    navLink: {
      fontSize: 15, fontWeight: 500, color: '#1a1a2e', textDecoration: 'none',
      cursor: 'pointer', background: 'none', border: 'none', padding: 0,
      display: 'flex', alignItems: 'center', gap: 4,
    },
    dropdownMenu: {
      position: 'absolute', top: 'calc(100% + 8px)', left: 0, minWidth: 200,
      backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      padding: '8px 0', zIndex: 1001,
    },
    dropdownItem: {
      display: 'block', padding: '9px 18px', fontSize: 14, color: '#1a1a2e', textDecoration: 'none',
    },
    loginBtn: { fontSize: 15, fontWeight: 500, color: '#1a1a2e', textDecoration: 'none' },
    trialBtn: {
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'linear-gradient(135deg,#2ecc71,#27ae60)', color: '#fff',
      padding: '10px 24px', borderRadius: 50, fontSize: 14, fontWeight: 600,
      textDecoration: 'none', boxShadow: '0 4px 14px rgba(46,204,113,0.3)',
    },
    mobileSectionLinks: {
      marginLeft: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8,
    },
    mobileSectionLink: { fontSize: 13, color: '#555', textDecoration: 'none', padding: '2px 0' },
  };

  const chevron = (open) => (
    <svg style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
  const arrowRight = (
    <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  const MENUS = {
    preparation: [
      { href: '#subjects', label: 'Subjects' }, { href: '#mock-tests', label: 'Mock Tests' },
      { href: '#pyqs', label: 'PYQs' }, { href: '#topic-tests', label: 'Topic Tests' },
      { href: '#daily-quiz', label: 'Daily Quiz' }, { href: '#notes', label: 'Notes' },
    ],
    aitools: [
      { href: '#ai-planner', label: 'AI Planner' }, { href: '#ai-timetable', label: 'AI Timetable' },
      { href: '#ai-analysis', label: 'AI Analysis' }, { href: '#weak-topics', label: 'Weak Topics' },
    ],
    dashboard: [
      { href: '/dashboard', label: 'Student Dashboard' }, { href: '/admin', label: 'Admin Dashboard' },
      { href: '#profile', label: 'Profile' }, { href: '#results', label: 'Results' },
    ],
  };

  const DesktopDropdown = ({ id, label }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div style={{ position: 'relative' }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <button style={S.navLink}>{label} {chevron(hovered)}</button>
        {hovered && (
          <div style={S.dropdownMenu}>
            {MENUS[id].map(item => (
              <Link key={item.href} to={item.href} style={{...S.dropdownItem, textDecoration: 'none'}}
                onMouseEnter={e => e.target.style.backgroundColor = '#f0faf5'}
                onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav style={S.nav}>
      <div style={S.container}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/images/logo.png" alt="GATEXpress AI" style={{ height: 40, width: 'auto' }} />
        </Link>

        {/* Desktop Navigation */}
        {isDesktop && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#" style={S.navLink}>Home</a>
            <DesktopDropdown id="preparation" label="Preparation" />
            <DesktopDropdown id="aitools" label="AI Tools" />
            <DesktopDropdown id="dashboard" label="Dashboard" />
            <a href="#about" style={S.navLink}>About</a>
          </div>
        )}

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {isDesktop && (
            <>
              <Link to="/login" style={S.loginBtn}>Login</Link>
              <Link to="/signup" style={S.trialBtn}>
                Free Trial {arrowRight}
              </Link>
            </>
          )}
          {!isDesktop && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                width: 40, height: 40, backgroundColor: '#1a1a2e', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: 'none', color: '#fff',
              }}
              aria-label="Toggle menu"
            >
              <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!isDesktop && isMobileMenuOpen && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ borderTop: '1px solid #eee', marginTop: 12, paddingTop: 16, paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="#" style={S.navLink}>Home</a>

            {['preparation', 'aitools', 'dashboard'].map((id) => (
              <div key={id}>
                <button style={S.navLink} onClick={() => toggleDropdown(id)}>
                  {id === 'preparation' ? 'Preparation' : id === 'aitools' ? 'AI Tools' : 'Dashboard'}
                  {chevron(openDropdown === id)}
                </button>
                {openDropdown === id && (
                  <div style={{ marginLeft: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {MENUS[id].map(item => (
                      <a key={item.href} href={item.href} style={{ fontSize: 13, color: '#555', textDecoration: 'none', padding: '2px 0' }}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <a href="#about" style={S.navLink}>About</a>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 12, borderTop: '1px solid #eee' }}>
              <Link to="/login" style={S.loginBtn}>Login</Link>
              <Link to="/signup" style={{ ...S.trialBtn, justifyContent: 'center' }}>
                Free Trial {arrowRight}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

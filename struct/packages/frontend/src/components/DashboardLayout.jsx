import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function DashboardLayout({ children, title, subtitle }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F7FAF9' }}>
      <Sidebar />
      <TopNavbar title={title} subtitle={subtitle} />
      <main className="dash-main">
        <div className="dash-content">
          {children}
        </div>
      </main>
    </div>
  );
}

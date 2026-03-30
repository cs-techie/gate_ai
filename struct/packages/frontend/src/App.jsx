import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tests from './pages/Tests';
import TakeTest from './pages/TakeTest';
import Results from './pages/Results';
import Materials from './pages/Materials';
import AdminDashboard from './pages/AdminDashboard';
import CreateTest from './pages/CreateTest';
import AddQuestions from './pages/AddQuestions';
import UploadMaterial from './pages/UploadMaterial';

// Study Planner Pages
import StudyPlans from './pages/StudyPlans';
import CreateStudyPlan from './pages/CreateStudyPlan';
import StudyPlanDashboard from './pages/StudyPlanDashboard';
import TaskDetail from './pages/TaskDetail';

// AI Pages
import AIPlanner from './pages/AIPlanner';
import AIDoubt from './pages/AIDoubt';
import AIRoadmap from './pages/AIRoadmap';
import AIAnalysis from './pages/AIAnalysis';
import AIStudyPlanner from './pages/AIStudyPlanner';

// Layout
import Navbar from './components/Navbar';

function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;
  
  return children;
}

function AppRoutes() {
  const { user, isAdmin } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to={isAdmin ? "/admin" : "/dashboard"} /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={isAdmin ? "/admin" : "/dashboard"} /> : <Signup />} />
      
      {/* Student Routes */}
      <Route path="/dashboard" element={
        <PrivateRoute><Dashboard /></PrivateRoute>
      } />
      <Route path="/tests" element={
        <PrivateRoute><Tests /></PrivateRoute>
      } />
      <Route path="/test/:id" element={
        <PrivateRoute><TakeTest /></PrivateRoute>
      } />
      <Route path="/results" element={
        <PrivateRoute><Results /></PrivateRoute>
      } />
      <Route path="/materials" element={
        <PrivateRoute><Materials /></PrivateRoute>
      } />

      {/* AI Routes */}
      <Route path="/ai/planner" element={
        <PrivateRoute><AIPlanner /></PrivateRoute>
      } />
      <Route path="/ai/study-planner" element={
        <PrivateRoute><AIStudyPlanner /></PrivateRoute>
      } />
      <Route path="/ai/doubt" element={
        <PrivateRoute><AIDoubt /></PrivateRoute>
      } />
      <Route path="/ai/roadmap" element={
        <PrivateRoute><AIRoadmap /></PrivateRoute>
      } />
      <Route path="/ai/analysis" element={
        <PrivateRoute><AIAnalysis /></PrivateRoute>
      } />

      {/* Study Planner Routes */}
      <Route path="/student/planner" element={
        <PrivateRoute><StudyPlans /></PrivateRoute>
      } />
      <Route path="/student/planner/create" element={
        <PrivateRoute><CreateStudyPlan /></PrivateRoute>
      } />
      <Route path="/student/planner/:planId" element={
        <PrivateRoute><StudyPlanDashboard /></PrivateRoute>
      } />
      <Route path="/student/planner/:planId/task/:taskId" element={
        <PrivateRoute><TaskDetail /></PrivateRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>
      } />
      <Route path="/admin/create-test" element={
        <PrivateRoute adminOnly><CreateTest /></PrivateRoute>
      } />
      <Route path="/admin/add-questions/:testId" element={
        <PrivateRoute adminOnly><AddQuestions /></PrivateRoute>
      } />
      <Route path="/admin/upload-material" element={
        <PrivateRoute adminOnly><UploadMaterial /></PrivateRoute>
      } />
    </Routes>
  );
}

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  return (
    <>
      {/* Show Navbar on landing page always, and on other pages only when not logged in */}
      {(!user || isLandingPage) && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

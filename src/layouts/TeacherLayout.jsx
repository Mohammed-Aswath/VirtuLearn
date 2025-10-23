import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
  LayoutDashboard,
  FlaskConical,
  FileText,
  ClipboardList,
  ScrollText,
  MessageSquare
} from 'lucide-react';

const TeacherLayout = () => {
  const { role } = useAuth();

  if (!role || role !== 'teacher') {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { to: '/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/teacher/assign-experiment', icon: FlaskConical, label: 'Assign Experiment' },
    { to: '/teacher/create-quiz', icon: FileText, label: 'Create Quiz' },
    { to: '/teacher/quizzes', icon: ClipboardList, label: 'Manage Quizzes' },
    { to: '/teacher/quiz-analysis', icon: ClipboardList, label: 'Quiz Analysis' },
    { to: '/teacher/experiment-logs', icon: ScrollText, label: 'Experiment Logs' },
    { to: '/teacher/community', icon: MessageSquare, label: 'Community' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;

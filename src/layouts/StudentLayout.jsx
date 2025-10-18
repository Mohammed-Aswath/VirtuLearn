import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
  LayoutDashboard,
  FlaskConical,
  FileText,
  MessageSquare,
  Bot
} from 'lucide-react';

const StudentLayout = () => {
  const { role } = useAuth();

  if (!role || role !== 'student') {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/experiments', icon: FlaskConical, label: 'Experiments' },
    { to: '/student/quizzes', icon: FileText, label: 'Quizzes' },
    { to: '/student/community', icon: MessageSquare, label: 'Community' },
    { to: '/student/chatbot', icon: Bot, label: 'AI Assistant' }
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

export default StudentLayout;

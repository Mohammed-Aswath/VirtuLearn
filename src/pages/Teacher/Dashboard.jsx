import { Users, FlaskConical, FileText, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Assign Experiment',
      description: 'Create new experiment assignments for students',
      icon: FlaskConical,
      path: '/teacher/assign-experiment',
      color: 'bg-primary'
    },
    {
      title: 'Create Quiz',
      description: 'Design quizzes manually or generate with AI',
      icon: FileText,
      path: '/teacher/create-quiz',
      color: 'bg-secondary'
    },
    {
      title: 'View Logs',
      description: 'Review student experiment submissions',
      icon: Users,
      path: '/teacher/experiment-logs',
      color: 'bg-accent'
    },
    {
      title: 'Community Posts',
      description: 'Share resources and announcements',
      icon: MessageSquare,
      path: '/teacher/community',
      color: 'bg-info'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Manage your classes and student progress
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={user?.studentsCount || 145}
          icon={Users}
          description="Across all classes"
        />
        <StatCard
          title="Active Experiments"
          value="12"
          icon={FlaskConical}
          description="Currently assigned"
        />
        <StatCard
          title="Quizzes Created"
          value="24"
          icon={FileText}
          description="This semester"
        />
        <StatCard
          title="Community Posts"
          value="8"
          icon={MessageSquare}
          description="This month"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="p-6 cursor-pointer transition-all duration-300 hover:shadow-xl group"
              onClick={() => navigate(action.path)}
            >
              <div className="space-y-4">
                <div className={`h-12 w-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Go to {action.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

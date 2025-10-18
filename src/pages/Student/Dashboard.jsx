import { Award, BookOpen, FlaskConical, MessageSquare } from 'lucide-react';
import StatCard from '../../components/StatCard';
import QuizCard from '../../components/QuizCard';
import { mockQuizzes } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const pendingQuizzes = mockQuizzes.filter(q => q.status === 'pending');
  const recentQuizzes = mockQuizzes.filter(q => q.status === 'attended').slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here is your learning overview for today
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Score"
          value={user?.totalScore || 485}
          icon={Award}
          description="Across all quizzes"
          trend={12}
        />
        <StatCard
          title="Class Rank"
          value={`#${user?.rank || 12}`}
          icon={BookOpen}
          description="Out of 45 students"
        />
        <StatCard
          title="Experiments"
          value="8"
          icon={FlaskConical}
          description="Completed this month"
        />
        <StatCard
          title="Active Discussions"
          value="3"
          icon={MessageSquare}
          description="Community threads"
        />
      </div>

      {pendingQuizzes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Pending Quiz</h2>
            <span className="text-sm text-destructive font-medium">Action Required</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Recent Quiz Scores</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

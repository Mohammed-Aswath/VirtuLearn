import { Award, BookOpen, FlaskConical, MessageSquare } from 'lucide-react';
import StatCard from '../../components/StatCard';
import QuizCard from '../../components/QuizCard';
import { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [pendingQuizzes, setPendingQuizzes] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const qs = await getQuizzes();
        if (!mounted) return;
        setPendingQuizzes((qs || []).filter((q) => q.status === 'pending'));
        setRecentQuizzes((qs || []).filter((q) => q.status === 'attended').slice(0, 3));
      } catch (e) {
        setError(e.message || 'Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading dashboard...</div>;
  }
  if (error) {
    return <div className="text-center text-destructive">{error}</div>;
  }

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

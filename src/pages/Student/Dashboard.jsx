import { Award, BookOpen, FlaskConical, MessageSquare, Inbox } from 'lucide-react';
import StatCard from '../../components/StatCard';
import QuizCard from '../../components/QuizCard';
import { PageLoader } from '../../components/PageLoader';
import { EmptyState } from '../../components/EmptyState';
import { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pendingQuizzes, setPendingQuizzes] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const qs = await getQuizzes();
        if (!mounted) return;
        setPendingQuizzes((qs || []).filter((q) => q.status === 'pending'));
        setRecentQuizzes((qs || []).filter((q) => q.status === 'attended').slice(0, 3));
      } catch (e) {
        toast({
          title: 'Error loading dashboard',
          description: e.message || 'Failed to load quizzes',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [toast]);

  if (loading) {
    return <PageLoader text="Loading your dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          Here's your learning overview for today
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Score"
          value={user?.totalScore || 485}
          icon={Award}
          description="Across all quizzes"
          trend={12}
          index={0}
        />
        <StatCard
          title="Class Rank"
          value={`#${user?.rank || 12}`}
          icon={BookOpen}
          description="Out of 45 students"
          index={1}
        />
        <StatCard
          title="Experiments"
          value="8"
          icon={FlaskConical}
          description="Completed this month"
          index={2}
        />
        <StatCard
          title="Active Discussions"
          value="3"
          icon={MessageSquare}
          description="Community threads"
          index={3}
        />
      </div>

      {pendingQuizzes.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Pending Quizzes</h2>
            <span className="text-sm text-destructive font-medium flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              Action Required
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingQuizzes.map((quiz, idx) => (
              <QuizCard key={quiz.id} quiz={quiz} index={idx} />
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-foreground">Recent Quiz Scores</h2>
        {recentQuizzes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentQuizzes.map((quiz, idx) => (
              <QuizCard key={quiz.id} quiz={quiz} index={idx} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Inbox}
            title="No completed quizzes yet"
            description="Start attempting quizzes to see your scores here"
          />
        )}
      </motion.div>
    </div>
  );
};

export default StudentDashboard;

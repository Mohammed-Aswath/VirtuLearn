/*
 * UPDATED BY CURSOR — PURPOSE: Enhanced quiz card with improved hierarchy,
 * subtle hover lift, and right-aligned primary action.
 * Backend contract unchanged. Consumes `quiz` object with fields used below.
 */
import { Calendar, Clock, Award, AlertCircle, Layers, ListChecks } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuizCard = ({ quiz, index = 0 }) => {
  const navigate = useNavigate();

  const statusConfig = {
    pending: {
      color: 'bg-warning text-warning-foreground',
      icon: AlertCircle,
      action: 'Start Quiz'
    },
    attended: {
      color: 'bg-success text-success-foreground',
      icon: Award,
      action: 'View Analysis'
    },
    missed: {
      color: 'bg-destructive text-destructive-foreground',
      icon: AlertCircle,
      action: 'Unavailable'
    }
  };

  const config = statusConfig[quiz.status];
  const StatusIcon = config.icon;

  const handleAction = () => {
    if (quiz.status === 'attended') {
      navigate(`/student/quiz-analysis/${quiz.id}`);
    } else if (quiz.status === 'pending') {
      navigate(`/student/quizzes/${quiz.id}/attempt`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <Card className="p-5 transition-all duration-300 hover:shadow-lg/60 border-border/60 h-full">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1 pr-3">
              <h3 className="font-semibold text-lg text-foreground tracking-tight">{quiz.title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{quiz.subject}</Badge>
                {quiz.difficulty && (
                  <Badge variant="secondary" className="text-[10px]">{quiz.difficulty}</Badge>
                )}
              </div>
            </div>
            <Badge className={`${config.color} capitalize`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {quiz.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {quiz.status === 'pending' ? `Due: ${quiz.dueDate}` : `Completed: ${quiz.completedDate}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{quiz.duration} mins</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ListChecks className="h-4 w-4" />
              <span>{quiz.totalQuestions} questions</span>
            </div>
            {quiz.topic && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers className="h-4 w-4" />
                <span>{quiz.topic}</span>
              </div>
            )}
          </div>

          {quiz.status === 'attended' && (
            <motion.div
              className="flex items-center justify-between p-3 rounded-lg bg-muted"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium">Score</span>
              <span className="text-lg font-bold text-primary">
                {quiz.marksObtained}/{quiz.totalMarks}
              </span>
            </motion.div>
          )}

          <div className="flex items-center justify-end pt-1">
            <Button
              className="group min-w-[9rem]"
              onClick={handleAction}
              disabled={quiz.status === 'missed'}
              variant={quiz.status === 'attended' ? 'outline' : 'default'}
            >
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                {config.action}
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuizCard;

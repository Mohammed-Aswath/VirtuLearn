import { Calendar, Clock, Award, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quiz }) => {
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
      // TODO: Navigate to quiz taking page
      console.log('Start quiz:', quiz.id);
    }
  };

  return (
    <Card className="p-5 transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg text-foreground">{quiz.title}</h3>
            <Badge variant="outline" className="text-xs">{quiz.subject}</Badge>
          </div>
          <Badge className={config.color}>
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
        </div>

        {quiz.status === 'attended' && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Score</span>
            <span className="text-lg font-bold text-primary">
              {quiz.marksObtained}/{quiz.totalMarks}
            </span>
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleAction}
          disabled={quiz.status === 'missed'}
          variant={quiz.status === 'attended' ? 'outline' : 'default'}
        >
          {config.action}
        </Button>
      </div>
    </Card>
  );
};

export default QuizCard;

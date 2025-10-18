import { Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ExperimentCard = ({ experiment, onOpen }) => {
  const difficultyColors = {
    Easy: 'bg-success text-success-foreground',
    Medium: 'bg-warning text-warning-foreground',
    Hard: 'bg-destructive text-destructive-foreground'
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in group">
      <div className="relative h-48 overflow-hidden bg-gradient-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </div>
        <Badge className={`absolute top-3 right-3 ${difficultyColors[experiment.difficulty]}`}>
          {experiment.difficulty}
        </Badge>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
            {experiment.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {experiment.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{experiment.duration}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {experiment.subject}
          </Badge>
        </div>

        <Button 
          className="w-full gap-2 group-hover:bg-primary-hover transition-colors"
          onClick={() => onOpen(experiment)}
        >
          Open in 3D Lab
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ExperimentCard;

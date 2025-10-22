import { Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

const ExperimentCard = ({ experiment, onOpen, index = 0 }) => {
  const difficultyColors = {
    Easy: 'bg-success text-success-foreground',
    Medium: 'bg-warning text-warning-foreground',
    Hard: 'bg-destructive text-destructive-foreground'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group h-full">
        <div className="relative h-48 overflow-hidden bg-gradient-secondary">
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </motion.div>
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
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">
              Open in 3D Lab
            </span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ExperimentCard;

import { useEffect, useState } from 'react';
import { subjects } from '../../data/mockData';
import { getExperiments } from '../../services/api';
import ExperimentCard from '../../components/ExperimentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { FlaskConical } from 'lucide-react';

const Experiments = () => {
  const [selectedSubject, setSelectedSubject] = useState('Physics');

  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    getExperiments({ subject: selectedSubject }).then(setExperiments);
  }, [selectedSubject]);

  const handleOpenLab = (experiment) => {
    // In production, this would open the Arcware URL
    window.open(experiment.arcwareUrl, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
          <FlaskConical className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">3D Experiments</h1>
          <p className="text-muted-foreground">
            Interactive virtual laboratory experiments
          </p>
        </div>
      </div>

      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          {subjects.map(subject => (
            <TabsTrigger key={subject} value={subject}>
              {subject}
            </TabsTrigger>
          ))}
        </TabsList>

        {subjects.map(subject => (
          <TabsContent key={subject} value={subject} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {subject} Experiments
              </h2>
              <span className="text-sm text-muted-foreground">
                {experiments.length} available
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experiments.map(experiment => (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  onOpen={handleOpenLab}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Experiments;

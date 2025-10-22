/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student quizzes list with subject filter
 * BACKEND CONTRACT: GET /api/quizzes?subject=... -> [quizzes]
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import QuizCard from '../../components/QuizCard';
import { PageLoader } from '../../components/PageLoader';
import { EmptyState } from '../../components/EmptyState';
import { getQuizzes } from '../../services/api';
import { subjects } from '../../data/mockData';
import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Quizzes = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    getQuizzes({ subject: selectedSubject })
      .then((data) => setQuizzes(data))
      .catch((e) => {
        toast({
          title: 'Error loading quizzes',
          description: e.message || 'Failed to load quizzes',
          variant: 'destructive',
        });
      })
      .finally(() => setLoading(false));
  }, [selectedSubject, toast]);

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quizzes</h1>
          <p className="text-muted-foreground">Practice and test your knowledge</p>
        </div>
        <Badge variant="secondary" aria-label={`Subject: ${selectedSubject}`} className="text-sm">
          {selectedSubject}
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            {subjects.map((s) => (
              <TabsTrigger key={s} value={s}>
                {s}
              </TabsTrigger>
            ))}
          </TabsList>
          {subjects.map((s) => (
            <TabsContent key={s} value={s} className="space-y-6 mt-6">
              {loading ? (
                <PageLoader text="Loading quizzes..." />
              ) : quizzes.length === 0 ? (
                <EmptyState
                  icon={Inbox}
                  title="No quizzes available"
                  description={`There are no quizzes available for ${s} at the moment.`}
                />
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {quizzes.map((q, idx) => (
                    <QuizCard key={q.id || q._id} quiz={q} index={idx} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Quizzes;



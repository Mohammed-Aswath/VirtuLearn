/*
 * UPDATED BY CURSOR — PURPOSE: Visually elevated Student Quizzes page with pill tabs,
 * responsive card grid, and friendly empty states.
 * BACKEND CONTRACT (README): GET `/api/quizzes?subject=<Physics|Chemistry|Biology>`
 * should return an array of quiz objects: { id, title, subject, status,
 * duration, totalQuestions, dueDate?, completedDate?, marksObtained?, totalMarks }.
 * TODO: API -> /api/quizzes (replace mock/service call in `src/services/api.js`).
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
        <Badge
          variant="secondary"
          aria-label={`Subject: ${selectedSubject}`}
          className="text-sm"
        >
          {selectedSubject}
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
          <TabsList
            className="relative w-full max-w-xl overflow-hidden rounded-full bg-muted/50 border border-border/40 p-1"
          >
            {/* Sliding pill indicator */}
            <motion.div
              className="absolute top-1 bottom-1 left-1 w-[33.333%] rounded-full bg-background shadow-sm"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              animate={{ x: `${subjects.indexOf(selectedSubject) * 100}%` }}
            />
            {subjects.map((s) => (
              <TabsTrigger
                key={s}
                value={s}
                className="relative z-10 flex-1 rounded-full text-sm font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {s}
              </TabsTrigger>
            ))}
          </TabsList>
          {subjects.map((s) => (
            <TabsContent key={s} value={s} className="mt-6">
              {loading ? (
                <PageLoader text="Loading quizzes..." />
              ) : quizzes.length === 0 ? (
                <EmptyState
                  icon={Inbox}
                  title="No quizzes available"
                  description={`There are no quizzes available for ${s} right now — check back soon!`}
                  action={{
                    label: 'Notify me',
                    onClick: () =>
                      toast({
                        title: 'We\'ll keep you posted',
                        description: `You\'ll be notified when new ${s} quizzes arrive.`,
                      }),
                  }}
                />
              ) : (
                <motion.div
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {quizzes.map((q, idx) => (
                    <QuizCard key={q.id || q._id} quiz={q} index={idx} />
                  ))}
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Quizzes;



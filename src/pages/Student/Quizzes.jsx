/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student quizzes list with subject filter
 * BACKEND CONTRACT: GET /api/quizzes?subject=... -> [quizzes]
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import QuizCard from '../../components/QuizCard';
import { getQuizzes } from '../../services/api';
import { subjects } from '../../data/mockData';

const Quizzes = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getQuizzes({ subject: selectedSubject })
      .then((data) => setQuizzes(data))
      .catch((e) => setError(e.message || 'Failed to load quizzes'))
      .finally(() => setLoading(false));
  }, [selectedSubject]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quizzes</h1>
          <p className="text-muted-foreground">Practice and test your knowledge</p>
        </div>
        <Badge variant="outline" aria-label={`Subject: ${selectedSubject}`}>
          {selectedSubject}
        </Badge>
      </div>

      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          {subjects.map((s) => (
            <TabsTrigger key={s} value={s}>
              {s}
            </TabsTrigger>
          ))}
        </TabsList>
        {subjects.map((s) => (
          <TabsContent key={s} value={s} className="space-y-6">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading quizzes...</div>
            ) : error ? (
              <div className="text-center text-destructive">{error}</div>
            ) : quizzes.length === 0 ? (
              <div className="text-center text-muted-foreground">No quizzes available</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {quizzes.map((q) => (
                  <QuizCard key={q.id || q._id} quiz={q} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Quizzes;



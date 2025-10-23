/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student Quiz History page listing past attempts with simple trend
 * BACKEND CONTRACT (README): GET `/api/quizzes/:quizId/my-attempts` used per quiz; page aggregates selected quiz
 * TODO: API -> wire selection to a chosen quiz; for MVP, show last selected from student Quizzes.
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getQuizzes, getMyQuizAttempts } from '../../services/api';

const QuizHistory = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState('');
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    getQuizzes().then((qs) => {
      setQuizzes(qs);
      if (qs?.length) setQuizId(qs[0].id || qs[0]._id);
    });
  }, []);

  useEffect(() => {
    if (!quizId) return;
    getMyQuizAttempts(quizId).then((a) => setAttempts(a || []));
  }, [quizId]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Quiz History</h1>
        <div className="w-64">
          <Select value={quizId} onValueChange={setQuizId}>
            <SelectTrigger>
              <SelectValue placeholder="Select quiz" />
            </SelectTrigger>
            <SelectContent>
              {quizzes.map((q) => (
                <SelectItem key={q.id || q._id} value={q.id || q._id}>{q.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-3 text-sm font-semibold border-b pb-2">
          <div>Date</div>
          <div className="text-center">Score</div>
          <div className="text-right">Status</div>
        </div>
        <div className="divide-y">
          {(attempts || []).map((a) => (
            <div key={a._id} className="grid grid-cols-3 py-2 text-sm">
              <div>{new Date(a.attemptDate).toLocaleString()}</div>
              <div className="text-center">{a.score}</div>
              <div className="text-right capitalize">{a.status}</div>
            </div>
          ))}
          {!attempts?.length && (
            <div className="py-10 text-center text-muted-foreground">No attempts yet.</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizHistory;



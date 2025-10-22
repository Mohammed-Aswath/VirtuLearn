/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher quiz analysis dashboard with Recharts
 * BACKEND CONTRACT: GET /api/quizzes?subject=..., GET /api/quizzes/:quizId/attempts -> [attempts]
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getQuizzes, getQuizAttempts } from '../../services/api';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const TeacherQuizAnalysis = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState('');
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    getQuizzes().then((qs) => {
      setQuizzes(qs);
      if (qs.length) setQuizId(qs[0].id);
    });
  }, []);

  useEffect(() => {
    if (!quizId) return;
    getQuizAttempts(quizId).then(setAttempts);
  }, [quizId]);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground">Quiz Analysis</h1>
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Quiz</label>
          <Select value={quizId} onValueChange={setQuizId}>
            <SelectTrigger>
              <SelectValue placeholder="Select quiz" />
            </SelectTrigger>
            <SelectContent>
              {quizzes.map((q) => (
                <SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attempts.map((a) => ({ name: a.studentId, score: a.score }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default TeacherQuizAnalysis;



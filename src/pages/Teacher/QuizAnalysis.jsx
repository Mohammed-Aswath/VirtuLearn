/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher quiz analysis dashboard with Recharts
 * BACKEND CONTRACT: GET /api/quizzes?subject=..., GET /api/quizzes/:quizId/attempts -> [attempts]
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getQuizzes, getQuizAnalytics, downloadQuizReport } from '../../services/api';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const TeacherQuizAnalysis = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState('');
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getQuizzes().then((qs) => {
      setQuizzes(qs);
      if (qs.length) setQuizId(qs[0].id);
    });
  }, []);

  useEffect(() => {
    if (!quizId) return;
    getQuizAnalytics(quizId).then(setAnalytics);
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

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {analytics ? (
              <span>
                Attempts: <span className="text-foreground font-medium">{analytics.summary.attempts}</span> • Avg Score: <span className="text-foreground font-medium">{analytics.summary.averageScore}</span>
              </span>
            ) : 'Loading analytics...'}
          </div>
          <button
            className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
            onClick={async () => {
              const blob = await downloadQuizReport(quizId);
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `quiz-report-${quizId}.pdf`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download PDF Report
          </button>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={(analytics?.attempts || []).map((a) => ({ name: a.studentId, score: a.score }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {analytics && (
          <div className="space-y-2">
            <div className="font-semibold">Question Accuracy</div>
            <div className="grid gap-2 md:grid-cols-2">
              {analytics.questionAccuracy.map((q) => (
                <div key={q.questionId} className="flex items-center justify-between rounded-md border p-3">
                  <div className="text-sm truncate pr-3">{q.prompt}</div>
                  <div className="text-sm font-medium">{q.accuracyPercent}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TeacherQuizAnalysis;



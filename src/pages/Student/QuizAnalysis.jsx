/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student quiz analysis page with AI insights and chart
 * BACKEND CONTRACT: GET /api/quizzes/:quizId/analysis -> { aiAnalyses }
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { getQuizAnalysis } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const QuizAnalysis = () => {
  const { quizId } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;
    getQuizAnalysis(quizId).then(({ aiAnalyses }) => setData(aiAnalyses)).catch(() => setData(null));
  }, [quizId, user]);

  if (!user) return <div className="text-center text-muted-foreground">Please login to view analysis.</div>;
  if (!data) return <div className="text-center text-muted-foreground">Loading analysis...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Quiz Analysis</h1>
        <Badge>AI Assisted</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-5 space-y-3">
          <h3 className="font-semibold">Strengths</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {data.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-5 space-y-3">
          <h3 className="font-semibold">Weaknesses</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {data.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-5 space-y-3">
          <h3 className="font-semibold">Recommendations</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {data.suggestions.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold mb-4">Topic-wise Performance</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topicWiseScore}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default QuizAnalysis;



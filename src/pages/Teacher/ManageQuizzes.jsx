/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher Manage Quizzes list with filters, edit/delete actions
 * BACKEND CONTRACT (README):
 *   - GET `/api/quizzes?subject=&difficulty=&mine=true` -> array of quizzes
 *   - DELETE `/api/quizzes/:quizId` -> { success }
 *   - PUT `/api/quizzes/:quizId` -> { quiz }
 * TODO: API -> replace with real calls via `src/services/api.js` when backend connected
 */

import { useEffect, useMemo, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getQuizzes, deleteQuiz } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { subjects } from '../../data/mockData';

const ManageQuizzes = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const params = { mine: true };
      if (subject !== 'All') params.subject = subject;
      if (difficulty !== 'All') params.difficulty = difficulty;
      const data = await getQuizzes(params);
      setItems(Array.isArray(data) ? data : data?.quizzes || []);
    } catch (e) {
      toast({ title: 'Failed to load', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [subject, difficulty]);

  const filtered = useMemo(() => {
    const list = items || [];
    if (!q) return list;
    const s = q.toLowerCase();
    return list.filter((x) => x.title?.toLowerCase().includes(s) || x.topic?.toLowerCase().includes(s));
  }, [items, q]);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this quiz? This cannot be undone.')) return;
    try {
      await deleteQuiz(id);
      toast({ title: 'Quiz deleted' });
      setItems((prev) => prev.filter((x) => String(x.id || x._id) !== String(id)));
    } catch (e) {
      toast({ title: 'Delete failed', description: e.message, variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Manage Quizzes</h1>
        <Button onClick={() => navigate('/teacher/create-quiz')}>New Quiz</Button>
      </div>

      <Card className="p-4 grid gap-3 md:grid-cols-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Subject</label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {['All', ...subjects].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Difficulty</label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {['All','Easy','Medium','Hard'].map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium">Search</label>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title or topic..." />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(loading ? Array.from({ length: 6 }) : filtered).map((qz, idx) => (
          <Card key={qz?._id || idx} className="p-4 space-y-2 border-border/60">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="font-semibold">{qz?.title || 'Loading...'}</div>
                <div className="text-xs text-muted-foreground">{qz?.subject} • {qz?.difficulty} • {qz?.totalQuestions} Qs</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate(`/teacher/quizzes/${qz.id || qz._id}/edit`)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(qz.id || qz._id)}>Delete</Button>
              </div>
            </div>
            {qz?.topic && <div className="text-sm">Topic: <span className="text-muted-foreground">{qz.topic}</span></div>}
            {qz?.tags?.length ? (
              <div className="flex flex-wrap gap-1 pt-1">
                {qz.tags.map((t, i) => (
                  <span key={i} className="rounded-full border px-2 py-0.5 text-xs">{t}</span>
                ))}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageQuizzes;



/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher edit quiz page with minimal fields
 * BACKEND CONTRACT (README):
 *   - GET `/api/quizzes/:quizId` -> { quiz }
 *   - PUT `/api/quizzes/:quizId` -> { quiz }
 * TODO: API -> swap mock calls with real backend via `src/services/api.js`.
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getQuizById, updateQuiz } from '../../services/api';
import { useToast } from '@/hooks/use-toast';
import { subjects } from '../../data/mockData';

const EditQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ title: '', subject: subjects[0], difficulty: 'Medium', topic: '', description: '', duration: 30, tags: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getQuizById(quizId).then(({ quiz }) => {
      setForm({
        title: quiz.title || '',
        subject: quiz.subject || subjects[0],
        difficulty: quiz.difficulty || 'Medium',
        topic: quiz.topic || '',
        description: quiz.description || '',
        duration: quiz.duration || 30,
        tags: quiz.tags || [],
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [quizId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { quiz } = await updateQuiz(quizId, form);
      toast({ title: 'Quiz updated' });
      navigate('/teacher/quizzes');
    } catch (e) {
      toast({ title: 'Update failed', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground">Edit Quiz</h1>
      <Card className="p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={form.subject} onValueChange={(v) => setForm((f) => ({ ...f, subject: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={form.difficulty} onValueChange={(v) => setForm((f) => ({ ...f, difficulty: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {['Easy','Medium','Hard'].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (mins)</Label>
              <Input id="duration" type="number" min={1} max={240} value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="desc">Description</Label>
              <Input id="desc" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => navigate('/teacher/quizzes')}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditQuiz;



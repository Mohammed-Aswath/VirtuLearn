/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher quiz builder with multiple-choice questions
 * BACKEND CONTRACT: POST /api/quizzes -> { success, quiz }
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { subjects } from '../../data/mockData';
import { createQuiz } from '../../services/api';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjects[0]);
  const [questions, setQuestions] = useState([
    { id: 'Q1', prompt: '', choices: ['', '', '', ''], correctIndex: 0 },
  ]);
  const [saving, setSaving] = useState(false);
  const [resultId, setResultId] = useState('');

  const addQuestion = () => {
    setQuestions((prev) => ([...prev, { id: `Q${prev.length + 1}`, prompt: '', choices: ['', '', '', ''], correctIndex: 0 }]));
  };

  const updateQuestion = (idx, key, value) => {
    setQuestions((prev) => prev.map((q, i) => i === idx ? { ...q, [key]: value } : q));
  };

  const updateChoice = (qIdx, cIdx, value) => {
    setQuestions((prev) => prev.map((q, i) => i === qIdx ? { ...q, choices: q.choices.map((c, j) => j === cIdx ? value : c) } : q));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { quiz } = await createQuiz({ title, subject, questions });
    setResultId(quiz.id);
    setSaving(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground">Create Quiz</h1>
      <Card className="p-6 space-y-4">
        <form onSubmit={onSubmit} className="space-y-4" aria-label="Create quiz form">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter quiz title" required />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIdx) => (
              <Card key={q.id} className="p-4 space-y-3">
                <div className="space-y-2">
                  <Label>Question {qIdx + 1}</Label>
                  <Input value={q.prompt} onChange={(e) => updateQuestion(qIdx, 'prompt', e.target.value)} placeholder="Enter question" required />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  {q.choices.map((c, cIdx) => (
                    <Input key={cIdx} value={c} onChange={(e) => updateChoice(qIdx, cIdx, e.target.value)} placeholder={`Choice ${cIdx + 1}`} required />
                  ))}
                </div>
                <div className="space-y-2">
                  <Label>Correct Answer Index (0-3)</Label>
                  <Input type="number" min={0} max={3} value={q.correctIndex} onChange={(e) => updateQuestion(qIdx, 'correctIndex', Number(e.target.value))} required />
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={addQuestion}>Add Question</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Quiz'}</Button>
          </div>
        </form>
      </Card>
      {resultId && (
        <Card className="p-4 text-sm text-muted-foreground">Quiz created with id <span className="text-foreground font-medium">{resultId}</span></Card>
      )}
    </div>
  );
};

export default CreateQuiz;



/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher form to assign experiments to a class
 * BACKEND CONTRACT: GET /api/experiments, GET /api/classes, POST /api/experiments/assign -> { success, assignedExperiment }
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getExperiments, getClasses, postAssignExperiment } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AssignExperiment = () => {
  const [experiments, setExperiments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [experimentId, setExperimentId] = useState('');
  const [classId, setClassId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const { role } = useAuth();
  useEffect(() => {
    if (role !== 'teacher') return;
    getExperiments().then(setExperiments).catch(() => setExperiments([]));
    getClasses().then(setClasses).catch(() => setClasses([]));
  }, [role]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!experimentId || !classId || !dueDate) return;
    setSubmitting(true);
    const { assignedExperiment } = await postAssignExperiment({ experimentId, classId, dueDate, instructions });
    setResult(assignedExperiment);
    setSubmitting(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground">Assign Experiment</h1>
      {role !== 'teacher' && (
        <Card className="p-4 text-sm text-muted-foreground">Please login as a teacher to assign experiments.</Card>
      )}
      <Card className="p-6 space-y-4">
        <form onSubmit={onSubmit} className="space-y-4" aria-label="Assign experiment form">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Experiment</Label>
              <Select value={experimentId} onValueChange={setExperimentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experiment" />
                </SelectTrigger>
                <SelectContent>
                  {experiments.map((e) => (
                    <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={classId} onValueChange={setClassId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Input id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Optional instructions" />
            </div>
          </div>
          <Button type="submit" disabled={submitting} className="w-full md:w-auto">{submitting ? 'Assigning...' : 'Assign Experiment'}</Button>
        </form>
      </Card>
      {result && (
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">Assigned successfully with id <span className="font-medium text-foreground">{result._id}</span></div>
        </Card>
      )}
    </div>
  );
};

export default AssignExperiment;



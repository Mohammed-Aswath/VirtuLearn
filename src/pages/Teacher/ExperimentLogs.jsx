/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher page to list experiment logs
 * BACKEND CONTRACT: GET /api/experiments/logs?classId=... -> [logs]
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { getExperimentLogs } from '../../services/api';

const ExperimentLogs = () => {
  const [classId, setClassId] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = () => {
    setLoading(true);
    getExperimentLogs({ classId }).then(setLogs).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground">Experiment Logs</h1>
      <Card className="p-5 space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Class Id (optional)</label>
            <Input value={classId} onChange={(e) => setClassId(e.target.value)} placeholder="e.g., C001" />
          </div>
          <div className="flex items-end">
            <button onClick={fetchLogs} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">Filter</button>
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="text-center text-muted-foreground">Loading logs...</div>
      ) : logs.length === 0 ? (
        <div className="text-center text-muted-foreground">No logs</div>
      ) : (
        <div className="grid gap-4">
          {logs.map((log) => (
            <Card key={log.id} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{log.experimentId} • {log.studentName}</div>
                <div className="text-xs text-muted-foreground">{log.completedDate}</div>
              </div>
              <div className="text-sm text-muted-foreground">{log.setup}</div>
              <div className="text-sm">Score: <span className="font-medium">{log.score}</span></div>
              <div className="text-xs text-muted-foreground">{log.feedback}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperimentLogs;



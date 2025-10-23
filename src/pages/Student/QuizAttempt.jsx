/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student quiz attempt page to answer MCQs and submit
 * BACKEND CONTRACT: GET /api/quizzes/:quizId, POST /api/quizzes/:quizId/attempt -> {attemptId, score}
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { getQuizById, submitQuiz } from '../../services/api';
import { useToast } from '@/hooks/use-toast';

const QuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [remaining, setRemaining] = useState(0); // seconds
  const { toast } = useToast ? useToast() : { toast: () => {} };
  const saveTimerRef = useRef(null);

  useEffect(() => {
    getQuizById(quizId).then(({ quiz }) => {
      setQuiz(quiz);
      // restore saved progress
      try {
        const raw = localStorage.getItem(`virtulearn_quiz_${quizId}`);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved && saved.answers) setAnswers(saved.answers);
          if (typeof saved?.remaining === 'number' && saved.remaining > 0) {
            setRemaining(saved.remaining);
          } else {
            setRemaining((quiz.duration || 30) * 60);
          }
        } else {
          setRemaining((quiz.duration || 30) * 60);
        }
      } catch (_) {
        setRemaining((quiz.duration || 30) * 60);
      }
    });
  }, [quizId]);

  const handleSelect = (questionId, idx) => {
    setAnswers((prev) => ({ ...prev, [questionId]: idx }));
  };

  const allAnswered = quiz?.questions?.every((q) => typeof answers[q._id] === 'number' && answers[q._id] >= 0);

  const handleSubmit = async () => {
    if (!quiz) return;
    setSubmitting(true);
    try {
      const payload = {
        answers: quiz.questions.map((q) => ({ questionId: q._id, chosenIndex: answers[q._id] ?? -1 })),
      };
      const { attemptId, score } = await submitQuiz(quizId, payload.answers);
      toast && toast({ title: 'Quiz submitted', description: `Score: ${score}` });
      // clear saved progress on successful submit
      try { localStorage.removeItem(`virtulearn_quiz_${quizId}`); } catch (_) {}
      navigate(`/student/quiz-analysis/${quizId}`);
    } catch (err) {
      toast && toast({ title: 'Submit failed', description: err.message || 'Validation failed', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  // countdown timer
  useEffect(() => {
    if (!remaining || remaining <= 0 || submitting) return;
    const id = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : r));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining, submitting]);

  // auto-submit if time is up
  useEffect(() => {
    if (remaining === 0 && quiz && !submitting) {
      handleSubmit();
    }
  }, [remaining]);

  // auto-save progress (debounced)
  useEffect(() => {
    if (!quiz) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(`virtulearn_quiz_${quizId}`, JSON.stringify({ answers, remaining }));
      } catch (_) {}
    }, 400);
    return () => saveTimerRef.current && clearTimeout(saveTimerRef.current);
  }, [answers, remaining, quizId, quiz]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  if (!quiz) {
    return <div className="text-center text-muted-foreground">Loading quiz...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
        <p className="text-muted-foreground">{quiz.subject} • {quiz.duration} mins</p>
        <div aria-live="polite" className="mt-2 inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm">
          <span className="font-medium">Time Left:</span>
          <span className="tabular-nums" aria-label="time remaining">{mm}:{ss}</span>
        </div>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((q, idx) => (
          <Card key={q._id} className="p-5 space-y-3">
            <div className="font-medium">Q{idx + 1}. {q.prompt}</div>
            <div className="grid gap-2">
              {q.choices.map((c, cIdx) => (
                <label key={cIdx} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${answers[q._id] === cIdx ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}>
                  <input
                    type="radio"
                    name={q._id}
                    aria-label={`Choice ${cIdx + 1}`}
                    checked={answers[q._id] === cIdx}
                    onChange={() => handleSelect(q._id, cIdx)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={submitting || !allAnswered} className="w-full md:w-auto">
        {submitting ? 'Submitting...' : 'Submit Quiz'}
      </Button>
    </div>
  );
};

export default QuizAttempt;



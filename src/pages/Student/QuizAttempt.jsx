/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student quiz attempt page to answer MCQs and submit
 * BACKEND CONTRACT: GET /api/quizzes/:quizId, POST /api/quizzes/:quizId/attempt -> {attemptId, score}
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { getQuizById, submitQuiz } from '../../services/api';

const QuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getQuizById(quizId).then(({ quiz }) => setQuiz(quiz));
  }, [quizId]);

  const handleSelect = (questionId, idx) => {
    setAnswers((prev) => ({ ...prev, [questionId]: idx }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setSubmitting(true);
    const payload = {
      answers: quiz.questions.map((q) => ({ questionId: q.id, chosenIndex: answers[q.id] ?? -1 })),
    };
    const { attemptId, score } = await submitQuiz(quiz.id, payload.answers);
    // eslint-disable-next-line no-console
    console.log('Attempt saved', attemptId, score);
    navigate(`/student/quiz-analysis/${quiz.id}`);
  };

  if (!quiz) {
    return <div className="text-center text-muted-foreground">Loading quiz...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
        <p className="text-muted-foreground">{quiz.subject} • {quiz.duration} mins</p>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((q, idx) => (
          <Card key={q.id} className="p-5 space-y-3">
            <div className="font-medium">Q{idx + 1}. {q.prompt}</div>
            <div className="grid gap-2">
              {q.choices.map((c, cIdx) => (
                <label key={cIdx} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${answers[q.id] === cIdx ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}>
                  <input
                    type="radio"
                    name={q.id}
                    aria-label={`Choice ${cIdx + 1}`}
                    checked={answers[q.id] === cIdx}
                    onChange={() => handleSelect(q.id, cIdx)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={submitting} className="w-full md:w-auto">
        {submitting ? 'Submitting...' : 'Submit Quiz'}
      </Button>
    </div>
  );
};

export default QuizAttempt;



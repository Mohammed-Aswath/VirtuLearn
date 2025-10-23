import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppConfigProvider } from "./context/AppConfig";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentDashboard from "./pages/Student/Dashboard";
import Experiments from "./pages/Student/Experiments";
import Quizzes from "./pages/Student/Quizzes";
import QuizAttempt from "./pages/Student/QuizAttempt";
import StudentQuizAnalysis from "./pages/Student/QuizAnalysis";
import StudentCommunity from "./pages/Student/Community";
import AiAssistant from "./pages/Student/AiAssistant";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import AssignExperiment from "./pages/Teacher/AssignExperiment";
import CreateQuiz from "./pages/Teacher/CreateQuiz";
import TeacherQuizAnalysis from "./pages/Teacher/QuizAnalysis";
import ManageQuizzes from "./pages/Teacher/ManageQuizzes";
import EditQuiz from "./pages/Teacher/EditQuiz";
import QuizHistory from "./pages/Student/QuizHistory";
import ExperimentLogs from "./pages/Teacher/ExperimentLogs";
import TeacherCommunity from "./pages/Teacher/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AppConfigProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              
              <Route path="/student" element={<StudentLayout />}> 
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="experiments" element={<Experiments />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="quizzes/:quizId/attempt" element={<QuizAttempt />} />
                <Route path="quiz-analysis/:quizId" element={<StudentQuizAnalysis />} />
                <Route path="quiz-history" element={<QuizHistory />} />
                <Route path="community" element={<StudentCommunity />} />
                <Route path="chatbot" element={<AiAssistant />} />
              </Route>

              <Route path="/teacher" element={<TeacherLayout />}>
                <Route index element={<Navigate to="/teacher/dashboard" replace />} />
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="assign-experiment" element={<AssignExperiment />} />
                <Route path="create-quiz" element={<CreateQuiz />} />
                <Route path="quizzes" element={<ManageQuizzes />} />
                <Route path="quizzes/:quizId/edit" element={<EditQuiz />} />
                <Route path="quiz-analysis" element={<TeacherQuizAnalysis />} />
                <Route path="experiment-logs" element={<ExperimentLogs />} />
                <Route path="community" element={<TeacherCommunity />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
      </AppConfigProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

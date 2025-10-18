import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentDashboard from "./pages/Student/Dashboard";
import Experiments from "./pages/Student/Experiments";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
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
                <Route path="quizzes" element={<div className="text-center text-muted-foreground">Quizzes page coming soon...</div>} />
                <Route path="community" element={<div className="text-center text-muted-foreground">Community page coming soon...</div>} />
                <Route path="chatbot" element={<div className="text-center text-muted-foreground">AI Assistant coming soon...</div>} />
              </Route>

              <Route path="/teacher" element={<TeacherLayout />}>
                <Route index element={<Navigate to="/teacher/dashboard" replace />} />
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="assign-experiment" element={<div className="text-center text-muted-foreground">Assign Experiment page coming soon...</div>} />
                <Route path="create-quiz" element={<div className="text-center text-muted-foreground">Create Quiz page coming soon...</div>} />
                <Route path="quiz-analysis" element={<div className="text-center text-muted-foreground">Quiz Analysis page coming soon...</div>} />
                <Route path="experiment-logs" element={<div className="text-center text-muted-foreground">Experiment Logs page coming soon...</div>} />
                <Route path="community" element={<div className="text-center text-muted-foreground">Community page coming soon...</div>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student AI chat assistant
 * BACKEND CONTRACT: POST /api/ai/chat -> { messages:[...], suggestion:string }
 */

import { useEffect, useRef, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from './ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { sendChatbotPrompt } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Bot, User as UserIcon, Send, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

const AiAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    
    const optimistic = { id: `U_${Date.now()}`, role: 'user', message: text };
    setMessages((prev) => [...prev, optimistic]);
    setInput('');
    setLoading(true);

    try {
      const { messages: serverMsgs, suggestion: newSuggestion } = await sendChatbotPrompt(text, messages);
      
      const assistantFromServer = (serverMsgs || []).filter(Boolean).reverse().find((m) => m.role === 'assistant');
      
      if (assistantFromServer) {
        const assistant = { 
          id: assistantFromServer.id || `A_${Date.now()}`, 
          role: 'assistant', 
          message: assistantFromServer.message || assistantFromServer.text 
        };
        setMessages((prev) => [...prev, assistant]);
        setSuggestion(newSuggestion || '');
      } else {
        // Fallback handling with better messaging
        toast({
          title: 'Limited Response',
          description: 'The AI service is currently using fallback mode. Responses may be generic.',
          variant: 'default',
        });
        const fallbackAssistant = { 
          id: `A_${Date.now()}`, 
          role: 'assistant', 
          message: 'Thanks for your message. How can I help you with your studies today?' 
        };
        setMessages((prev) => [...prev, fallbackAssistant]);
      }
    } catch (err) {
      toast({
        title: 'Failed to send message',
        description: err.message || 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please login to use the AI Assistant.</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
            <p className="text-muted-foreground">Ask questions and get instant guidance</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5 space-y-4">
          <div className="h-[500px] overflow-y-auto rounded-lg border p-4 bg-muted/30" role="log" aria-live="polite">
            {messages.length === 0 ? (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-center space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Start a Conversation</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Ask me anything about your coursework, experiments, or get study tips!
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((m, idx) => (
                    <motion.div
                      key={m.id || `${m.role}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-start gap-3 ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                    >
                      {m.role === 'assistant' && (
                        <div className="shrink-0 mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === 'assistant' 
                          ? 'bg-card border shadow-sm' 
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        {m.message || m.text}
                      </div>
                      {m.role === 'user' && (
                        <div className="shrink-0 mt-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-3 justify-start"
                  >
                    <div className="shrink-0 mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="max-w-[75%] rounded-2xl px-4 py-3 text-sm bg-card border">
                      <LoadingSpinner size="sm" />
                    </div>
                  </motion.div>
                )}
                <div ref={endRef} />
              </div>
            )}
          </div>

          {suggestion && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20"
            >
              <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <span className="font-medium">Suggestion:</span> {suggestion}
              </p>
            </motion.div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
            <Input
              aria-label="Message"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !input.trim()} className="gap-2 group">
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  Send
                </>
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AiAssistant;



/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student AI chat assistant powered by mock endpoint
 * BACKEND CONTRACT: POST /api/ai/chat -> { messages:[...], suggestion:string }
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useRef, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { sendChatbotPrompt } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Bot, User as UserIcon, Send } from 'lucide-react';

const AiAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setError('');
    // Optimistically add user message
    const optimistic = { id: `U_${Date.now()}`, role: 'user', message: text };
    setMessages((prev) => [...prev, optimistic]);
    setInput('');
    setLoading(true);

    try {
      // Pass conversation context to backend (optional for mock)
      const { messages: serverMsgs, suggestion } = await sendChatbotPrompt(text, messages);
      // Prefer the last assistant message from server, or build a fallback
      const assistantFromServer = (serverMsgs || []).filter(Boolean).reverse().find((m) => m.role === 'assistant');
      const assistant = assistantFromServer || { id: `A_${Date.now()}`, role: 'assistant', message: 'Thanks for your message. How can I help further?' };
      setMessages((prev) => [...prev, { id: assistant.id || `A_${Date.now()}`, role: 'assistant', message: assistant.message || assistant.text }]);
      setSuggestion(suggestion || '');
    } catch (err) {
      setError(err.message || 'Failed to send');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="space-y-6 animate-fade-in text-center text-muted-foreground">
        Please login to use the AI Assistant.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
        <p className="text-muted-foreground">Ask questions and get instant guidance</p>
      </div>

      <Card className="p-5 space-y-4">
        <div className="h-96 overflow-y-auto rounded-lg border p-4 bg-muted/50" role="log" aria-live="polite">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-20">Start the conversation by asking a question.</div>
          ) : (
            <ul className="space-y-4">
              {messages.map((m) => (
                <li key={m.id || `${m.role}-${Math.random()}`} className={`flex items-start gap-2 ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  {m.role === 'assistant' && (
                    <div className="shrink-0 mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.role === 'assistant' ? 'bg-card border' : 'bg-primary text-primary-foreground'}`}>
                    {m.message || m.text}
                  </div>
                  {m.role === 'user' && (
                    <div className="shrink-0 mt-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </li>
              ))}
              {loading && (
                <li className="flex items-start gap-2 justify-start">
                  <div className="shrink-0 mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl px-3 py-2 text-sm bg-card border">
                    <span className="inline-block animate-pulse">Thinking…</span>
                  </div>
                </li>
              )}
              <div ref={endRef} />
            </ul>
          )}
        </div>

        {suggestion && (
          <div className="text-sm text-muted-foreground">Suggestion: {suggestion}</div>
        )}
        {error && (
          <div className="text-sm text-destructive">{error}</div>
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
          />
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? 'Sending…' : <><Send className="h-4 w-4" /> Send</>}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AiAssistant;



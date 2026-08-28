'use client';

import React, { useState } from 'react';
import { Bot, Send, Sparkles, Volume2, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  english?: string;
  grammarCorrection?: string;
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'नमस्ते! मैं आपका हिंदी AI भाषा गुरु हूँ। मुझसे किसी भी विषय पर हिंदी में बात करें या व्याकरण पूछें।',
      english: 'Hello! I am your Hindi AI Language Master. Speak with me on any topic or ask grammar questions.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();

      if (data.success) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.botHindiResponse,
          english: data.englishExplanation,
          grammarCorrection: data.grammarCorrection,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Bot className="w-8 h-8 text-hindi-saffron" /> AI Hindi Learning Chatbot
          </h1>
          <p className="text-xs text-slate-400">Practice Hindi conversation, role-play, and receive instant grammar feedback.</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
          AI Model: Active
        </span>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-card p-4 sm:p-6 rounded-3xl border border-slate-800 h-[480px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-hindi-saffron text-slate-950'
                    : 'bg-slate-800 text-hindi-saffron border border-slate-700'
                }`}
              >
                {m.sender === 'user' ? 'You' : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[80%] p-4 rounded-2xl space-y-1 text-sm ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-hindi-saffron to-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-900 border border-slate-800 text-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-bold">{m.text}</p>
                  {m.sender === 'bot' && (
                    <button
                      onClick={() => speak(m.text)}
                      className="p-1 text-hindi-saffron hover:text-white rounded"
                      title="Read aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {m.english && <p className="text-xs text-slate-300 italic">{m.english}</p>}
                {m.grammarCorrection && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> {m.grammarCorrection}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-hindi-saffron font-bold animate-pulse">
              AI Tutor is analyzing grammar and typing...
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type in Hindi or English (e.g. मुझे बाजार जाना है / Hello)..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-hindi-saffron"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-hindi-saffron hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center gap-1.5 shrink-0 transition"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}

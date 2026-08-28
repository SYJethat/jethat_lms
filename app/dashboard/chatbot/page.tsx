'use client';

import React, { useState } from 'react';
import { Bot, Send, User as UserIcon, Sparkles, RefreshCw, Volume2 } from 'lucide-react';

export default function DashboardChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'नमस्ते! मैं आपका हिंदी AI शिक्षक हूँ। आज आप क्या सीखना चाहते हैं? (Hello! I am your AI Hindi Tutor. What would you like to learn today?)' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, conversationHistory: [] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'बहुत बढ़िया प्रयास! चलिए एक नया वाक्य सीखते हैं।' }]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
            AI Language Tutor
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">AI Hindi Chatbot (शिक्षक)</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time Devanagari conversational practice with instant grammar corrections.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'ai' && (
                <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div
                className={`max-w-lg p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none font-semibold'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                }`}
              >
                <p>{m.text}</p>
                {m.sender === 'ai' && (
                  <button
                    onClick={() => speakText(m.text)}
                    className="mt-2 text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen Audio (ध्वनि)
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-slate-400 font-bold animate-pulse">AI is typing in Hindi...</div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message in Hindi or English (e.g. नमस्ते, आप कैसे हैं?)..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

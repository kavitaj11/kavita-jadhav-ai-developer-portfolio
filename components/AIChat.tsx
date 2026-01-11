import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAIResponse } from '../services/geminiService';

const INITIAL_MESSAGE: ChatMessage = { 
  role: 'assistant', 
  content: "Welcome! I'm Kavita's digital twin. I can discuss her approach to Full Stack architecture, her work as an AI Developer building systems like WeOptimize.ai, or her mission-critical engineering experience at Verizon and VMware. What's on your mind today?" 
};

const THINKING_STATUSES = [
  "Accessing neural archives...",
  "Synthesizing architecture...",
  "Analyzing engineering context...",
  "Aligning neural pathways...",
  "Generating technical insight..."
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: number;
    if (isTyping) {
      interval = window.setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % THINKING_STATUSES.length);
      }, 2000);
    } else {
      setStatusIndex(0);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await getAIResponse(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowConfirm(false);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass rounded-3xl overflow-hidden flex flex-col h-[500px] border border-gray-200 dark:border-blue-500/20 shadow-2xl relative">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-gray-800/50 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-blue-500/20">KJ</div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Kavita's Digital Twin</h4>
            <span className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Neural Processing Active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowConfirm(true)}
              className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
              title="Reset Conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
            </button>
        </div>
      </div>

      {showConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-white/10 max-w-xs w-full text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <h5 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Clear History?</h5>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Resetting the neural context for a fresh inquiry.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={resetChat}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50 dark:bg-transparent">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-left-2 duration-300">
            <div className="bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none px-5 py-3 text-sm flex flex-col gap-2 shadow-sm">
              <div className="flex items-center gap-2 h-4">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i} 
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-wave shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></div>
                ))}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 opacity-90 animate-in fade-in duration-500 min-w-[140px]" key={statusIndex}>
                {THINKING_STATUSES[statusIndex]}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Discuss AI, Full Stack, or Engineering..."
            disabled={isTyping}
            className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/10 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
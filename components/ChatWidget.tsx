"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Trash2, HelpCircle, Sparkles, Terminal } from "lucide-react";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatWidget = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your SE Toolkit Assistant. 🚀\n\nI can help you understand UML diagrams, write user stories, evaluate acceptance criteria, or explain lab steps. What are we studying today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<{ message: string; isConfigError?: boolean } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages or typing indicators append
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  // Prevent showing the floating widget on the full screen chat page itself
  if (pathname === "/chat") return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");
    setApiError(null);

    const updatedMessages = [...messages, { role: "user", content: userText } as Message];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.error || "Failed to contact chat server.",
          isConfigError: data.isConfigError || false,
        };
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setApiError({
        message: err.message || "An unexpected network error occurred.",
        isConfigError: err.isConfigError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. Ask me anything about UML modeling, requirements engineering, or lab questions!",
      },
    ]);
    setApiError(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[340px] sm:w-[380px] h-[500px] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col mb-4 origin-bottom-right"
          >
            {/* Header Block */}
            <div className="bg-navy-950 p-4 text-white flex items-center justify-between relative border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-accent-sky">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider">SE AI Helper</h3>
                  <span className="text-[9px] font-mono text-slate-400">READY // ONLINE</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Conversation Log area */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 scrollbar-thin"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Icon Avatar */}
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 shadow-sm ${
                      msg.role === "user"
                        ? "bg-accent-blue text-white"
                        : "bg-navy-900 text-white"
                    }`}
                  >
                    {msg.role === "user" ? "👨‍🎓" : "🚀"}
                  </div>
                  
                  {/* Bubble content */}
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-navy-900 text-white rounded-tr-none"
                        : "bg-white border border-slate-200 text-navy-900 rounded-tl-none shadow-premium"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Pulsing loading state */}
              {isLoading && (
                <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-xl bg-navy-900 text-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                    🚀
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-premium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* API Configuration & Connection Errors */}
              {apiError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-150 text-red-800 space-y-2">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1">
                    <Terminal size={12} /> Error Encountered
                  </h4>
                  <p className="text-2xs leading-relaxed font-semibold whitespace-pre-line">
                    {apiError.message}
                  </p>
                  
                  {apiError.isConfigError && (
                    <div className="bg-white/80 p-2.5 rounded-xl border border-red-200 mt-2">
                      <p className="text-[10px] font-black tracking-widest text-slate-450 uppercase mb-1">Developer Quickfix:</p>
                      <ol className="list-decimal pl-4 text-3xs font-mono space-y-1 text-slate-650">
                        <li>Create a <code className="bg-slate-100 px-1 py-0.5 rounded">.env.local</code> in project root</li>
                        <li>Add <code className="bg-slate-100 px-1 py-0.5 rounded">AQ.Ab8RN6I3N569NtNp3GF_trMQIxfkEdBXklMPe-1M0ku7-yoT-g</code></li>
                        <li>Restart your dev server terminal</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSend}
              className="p-3 border-t border-slate-200 bg-white flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about user stories, UML..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-navy-900 focus:outline-none focus:border-slate-350 focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer ${
                  !inputValue.trim() || isLoading
                    ? "bg-slate-200 text-slate-450 cursor-not-allowed"
                    : "bg-navy-900 hover:bg-accent-blue shadow-md"
                }`}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-2xl bg-navy-950 hover:bg-accent-blue text-white flex items-center justify-center shadow-2xl cursor-pointer transition-colors group relative overflow-hidden"
        title="Toggle AI Chat Helper"
      >
        {/* Animated glowing border ring */}
        <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:scale-105 transition-transform" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} />
              {/* Pulsing online status indicator */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-navy-950 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
};

export default ChatWidget;

"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Trash2, HelpCircle, Sparkles, BookOpen, MessageSquare, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Footer from "@/components/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  { text: "What is Requirements Engineering?", tag: "Overview" },
  { text: "How do I write good Acceptance Criteria?", tag: "Writing AC" },
  { text: "What is the difference between a Tutor, Expert, and Peer mentor?", tag: "AI Personas" },
  { text: "Explain UML use cases and actor boundaries.", tag: "UML Design" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to the SE Toolkit AI Classroom Workspace! 🚀\n\nAsk me any questions about Software Engineering concepts, requirements modeling, lab modules, or UML diagram constraints. Select one of the quick suggestions on the side or type your query below.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<{ message: string; isConfigError?: boolean } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend.trim();
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  const handleSuggestionClick = (text: string) => {
    if (isLoading) return;
    handleSend(text);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat log has been reset. Ask me anything about UML modeling, requirements engineering, or general computer science concepts!",
      },
    ]);
    setApiError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Hero Header */}
      <section className="bg-navy-950 pt-32 pb-20 px-6 text-center flex flex-col items-center relative border-b border-white/5">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl relative z-10 flex flex-col items-center"
        >
          <span className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full bg-navy-800 border border-white/10 text-accent-sky text-2xs font-extrabold mb-5 tracking-wider uppercase">
            AI Assistant Desk
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 text-white tracking-tighter">
            SE Study Classroom
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Discuss code guidelines, diagram specifications, or lab questions in real-time with your AI assistant.
          </p>
        </motion.div>
      </section>

      {/* Main Workspace Console */}
      <main className="container mx-auto py-16 px-4 max-w-6xl flex-1 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Study Suggestions & reset controls */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-premium flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-navy-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <BookOpen size={16} className="text-accent-blue" />
                <span>Quick Study Topics</span>
              </h3>

              <div className="space-y-3">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug.text)}
                    disabled={isLoading}
                    className="w-full text-left p-4 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 text-xs sm:text-sm font-bold text-navy-900 hover:border-slate-300 transition-all duration-300 cursor-pointer flex flex-col gap-1 items-start group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-accent-blue transition-colors uppercase tracking-widest">{sug.tag}</span>
                    <span className="leading-snug">{sug.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-150">
              <button
                onClick={clearChat}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider hover:bg-red-50 hover:text-red-650 hover:border-red-150 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Reset Chat History</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Scrollable Chat Box Console */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-premium flex flex-col h-[550px] overflow-hidden justify-between">
            
            {/* Box Header */}
            <div className="p-4 border-b border-slate-150 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-navy-900 flex items-center justify-center text-accent-sky">
                  <Sparkles size={16} />
                </div>
                <h4 className="text-xs font-black text-navy-900 uppercase tracking-widest">Workspace Assistant</h4>
              </div>
              <span className="text-3xs font-bold tracking-widest text-slate-400 uppercase">Interactive Session</span>
            </div>

            {/* Conversation Area */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 bg-white scrollbar-thin"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 shadow-sm ${
                      msg.role === "user"
                        ? "bg-accent-blue text-white"
                        : "bg-navy-900 text-white"
                    }`}
                  >
                    {msg.role === "user" ? "👨‍🎓" : "🚀"}
                  </div>
                  
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-navy-900 text-white rounded-tr-none"
                        : "bg-slate-50 border border-slate-150 text-navy-900 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex items-start gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                    🚀
                  </div>
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Error messages */}
              {apiError && (
                <div className="p-5 rounded-2xl bg-red-50 border border-red-150 text-red-800 space-y-3">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal size={14} /> System Configuration Required
                  </h4>
                  <p className="text-xs leading-relaxed font-semibold whitespace-pre-line">
                    {apiError.message}
                  </p>
                  
                  {apiError.isConfigError && (
                    <div className="bg-white/80 p-4 rounded-xl border border-red-200 mt-2">
                      <p className="text-2xs font-black tracking-widest text-slate-450 uppercase mb-2">Instructions for configuration:</p>
                      <ol className="list-decimal pl-5 text-2xs font-mono space-y-1 text-slate-650">
                        <li>Create a file named <code className="bg-slate-100 px-1 py-0.5 rounded">.env.local</code> in the root directory.</li>
                        <li>Add your API key: <code className="bg-slate-100 px-1.5 py-0.5 rounded">GEMINI_API_KEY=AIzaSy...</code></li>
                        <li>Restart your Next.js development server process.</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={handleFormSubmit}
              className="p-4 border-t border-slate-150 bg-slate-50/50 flex gap-3 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your Software Engineering question here..."
                className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold text-navy-900 focus:outline-none focus:border-slate-350 focus:ring-2 focus:ring-accent-blue/10 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all cursor-pointer ${
                  !inputValue.trim() || isLoading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-navy-900 hover:bg-accent-blue shadow-lg"
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

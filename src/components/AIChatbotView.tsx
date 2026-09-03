import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  RefreshCw,
  Compass,
  MapPin,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { Destination } from "../types";
import { sendAIChat } from "../services/api";

interface AIChatbotViewProps {
  destinations: Destination[];
  activeDestination?: Destination;
  onSelectDestination: (dest: Destination) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const AIChatbotView: React.FC<AIChatbotViewProps> = ({
  destinations,
  activeDestination,
  onSelectDestination,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(
    activeDestination?.id || destinations[0]?.id || ""
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentDestination =
    destinations.find((d) => d.id === selectedDestId) || destinations[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: `Welcome! I am your AI Travel Concierge. I am currently tuned to **${
        activeDestination?.name || "Maldives"
      }**.\n\nAsk me about daily pacing, packing essentials, secret viewpoints, or dining etiquette. You can also pick any world destination from the context selector or click a suggested question below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDestination?.id && activeDestination.id !== selectedDestId) {
      setSelectedDestId(activeDestination.id);
    }
  }, [activeDestination?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const reply = await sendAIChat(text, currentDestination, history);

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "I encountered an issue processing your query. Please verify your connection or Gemini API key settings.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    `What are the best white sand beaches in ${currentDestination?.name || "the world"}?`,
    `What should I pack for a 5-day trip to ${currentDestination?.name || "Kyoto"}?`,
    `What is the local tipping and etiquette culture in ${currentDestination?.country || "Japan"}?`,
    `Recommend 3 hidden architectural gems off the tourist track in ${currentDestination?.name || "Paris"}.`,
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-800 pb-6 mb-8 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Gemini Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            Intelligent Travel Advisor
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Live interactive guidance on destinations, seasonal weather, packing essentials, and
            local culinary rituals.
          </p>
        </div>

        {/* Destination Context Picker */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-stone-400">Context:</span>
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Destination Context Banner */}
      {currentDestination && (
        <div className="mb-6 p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-800">
              <img
                src={currentDestination.heroImage}
                alt={currentDestination.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-base font-bold text-stone-100">
                  {currentDestination.name}, {currentDestination.country}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-[10px] font-mono border border-amber-400/20">
                  {currentDestination.region}
                </span>
              </div>
              <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                {currentDestination.tagline} • Best: {currentDestination.bestTimeToVisit}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
            <span className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800">
              Currency: <strong className="text-stone-200">{currentDestination.currency}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800">
              Language: <strong className="text-stone-200">{currentDestination.language}</strong>
            </span>
            <button
              onClick={() => onSelectDestination(currentDestination)}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors"
            >
              Explore Destination →
            </button>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden flex flex-col h-[650px] shadow-2xl">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-amber-400 text-stone-950 font-bold"
                    : "bg-stone-800 text-amber-400 border border-stone-700"
                }`}
              >
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-400 text-stone-950 font-medium"
                    : "bg-stone-950/80 border border-stone-800 text-stone-200"
                }`}
              >
                <div className="whitespace-pre-line prose prose-invert prose-xs max-w-none">
                  {msg.content}
                </div>
                <span
                  className={`text-[10px] mt-2 block font-mono ${
                    msg.role === "user" ? "text-stone-800/80 text-right" : "text-stone-500"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3 text-stone-400 text-xs py-2">
              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-amber-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <span>Gemini is curating recommendations...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-stone-950/60 border-t border-stone-800/80 overflow-x-auto no-scrollbar flex items-center space-x-2">
          <span className="text-[10px] text-stone-500 uppercase tracking-wider shrink-0 pl-1">
            Suggested:
          </span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[11px] text-stone-300 hover:text-white whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask Gemini about ${currentDestination?.name || "travel advice, weather, landmarks"}...`}
              className="flex-1 bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-semibold text-sm transition-all flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

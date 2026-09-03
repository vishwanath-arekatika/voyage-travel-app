import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Compass,
  ArrowRight,
  Loader2,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessage, Destination } from "../types";
import { sendChatMessage } from "../services/api";
import { DESTINATIONS } from "../data/destinations";

interface ChatConciergeProps {
  selectedDestination?: Destination | null;
}

export const ChatConcierge: React.FC<ChatConciergeProps> = ({
  selectedDestination,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Welcome to the **Voyage Travel Concierge**, powered by Google Gemini.

I can assist you with:
- **Optimal Travel Seasons** & meteorological insights
- **Curated Neighborhoods** & iconic architectural landmarks
- **Hidden Gems** & insider photography spots
- **Pacing & Duration** recommendations for any global destination

Select a destination or ask any travel question to begin!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeDest, setActiveDest] = useState<Destination | null>(
    selectedDestination || DESTINATIONS[0]
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    `What is the best 4-day itinerary for ${activeDest?.name || "Kyoto"}?`,
    `When is the golden season to visit ${activeDest?.name || "Santorini"}?`,
    `Top 3 hidden architectural gems in ${activeDest?.name || "Paris"}?`,
    `What local etiquette should travelers observe in ${activeDest?.country || "Japan"}?`,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const reply = await sendChatMessage(messageText, activeDest, history);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content: "I'm having a brief issue connecting with the intelligence server. Please ask again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: `Conversation refreshed. What destination would you like to explore next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div id="concierge-view" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Gemini Travel Intelligence</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-100">
            Travel Concierge & Advisory
          </h1>
        </div>

        {/* Destination Context Dropdown */}
        <div className="flex items-center space-x-2">
          <select
            value={activeDest?.id || ""}
            onChange={(e) => {
              const d = DESTINATIONS.find((item) => item.id === e.target.value);
              if (d) setActiveDest(d);
            }}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.id}>
                Context: {dest.name}, {dest.country}
              </option>
            ))}
          </select>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-stone-500 font-medium whitespace-nowrap flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" /> Ideas:
        </span>
        {samplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="px-3 py-1 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 hover:text-amber-300 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Window */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 sm:p-6 min-h-[460px] max-h-[560px] overflow-y-auto flex flex-col space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  isUser
                    ? "bg-amber-400 text-stone-950 font-bold"
                    : "bg-stone-800 text-amber-400 border border-stone-700"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                  isUser
                    ? "bg-amber-400/15 border border-amber-400/30 text-stone-100"
                    : "bg-stone-950/80 border border-stone-850 text-stone-200"
                }`}
              >
                <div className="prose prose-invert prose-stone max-w-none text-xs sm:text-sm leading-relaxed">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <span className="block text-[10px] text-stone-500 mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-stone-800 text-amber-400 border border-stone-700">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 flex items-center space-x-2 text-xs text-stone-400">
              <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Gemini is curating insights for {activeDest?.name}...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(inputMessage);
            }
          }}
          placeholder={`Ask anything about ${activeDest?.name || "global destinations"}, flights, hotels, or packing...`}
          className="w-full pl-4 pr-14 py-3.5 bg-stone-900 border border-stone-800 rounded-2xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
        />
        <button
          onClick={() => handleSend(inputMessage)}
          disabled={!inputMessage.trim() || loading}
          className="absolute right-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-stone-950 font-semibold transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

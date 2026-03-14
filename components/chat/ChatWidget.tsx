"use client";

import { useState } from "react";
import { Bot, SendHorizonal } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatWidgetProps = {
  eventId?: string;
  title?: string;
  subtitle?: string;
};

export function ChatWidget({
  eventId,
  title = "Culture Assistant",
  subtitle = "Ask about events, etiquette, accessibility, or first-timer tips.",
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help you explore cultural events, explain etiquette, and recommend beginner-friendly options.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          eventId,
        }),
      });

      const data = await res.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.answer ??
            data.error ??
            "Sorry, something went wrong.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card rounded-2xl border border-white/10 p-4 shadow-lg">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-xl bg-cyan-400/15 p-2 text-cyan-200">
          <Bot className="size-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
        </div>
      </div>

      <div className="mb-4 max-h-96 space-y-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-2xl p-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-8 bg-cyan-500/20 text-cyan-50"
                : "mr-8 bg-white/5 text-slate-200"
            }`}
          >
            {message.content}
          </div>
        ))}

        {loading && (
          <div className="mr-8 rounded-2xl bg-white/5 p-3 text-sm text-slate-300">
            Thinking...
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void sendMessage();
            }
          }}
          placeholder="Ask about events, etiquette, or recommendations..."
          className="flex-1 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400"
        />
        <button
          onClick={() => void sendMessage()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SendHorizonal className="size-4" />
          Send
        </button>
      </div>
    </div>
  );
}
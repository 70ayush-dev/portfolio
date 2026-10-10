import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, RefreshCw, MessageSquare, Bot, User, ArrowUpRight } from "lucide-react";
import { MascotMood } from "./animated-mascot";
import { identity, projects, faqs } from "../data/portfolio";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface MascotChatProps {
  isOpen: boolean;
  onClose: () => void;
  onMoodChange: (mood: MascotMood) => void;
}

const SUGGESTIONS = [
  "What is Ayush's main tech stack?",
  "Tell me about Der Autoputzer project",
  "How was the Bonafinca AI assistant built?",
  "How can I contact Ayush?",
];

import chatbotKnowledge from "../data/chatbot-knowledge.json";

interface RagChunk {
  id: string;
  title: string;
  url: string;
  content: string;
  keywords: string[];
}

// In-browser grounded RAG retrieval engine
function generateLocalAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Fast direct matches for common questions
  if (
    q.includes("domain email") ||
    q.includes("email routing") ||
    q.includes("email guide") ||
    q.includes("cloudflare email") ||
    q.includes("custom email")
  ) {
    return `Ayush published a complete fieldguide on **[How to Get Free Custom Domain Email with Cloudflare & Gmail](/lab/custom-domain-email/)**.
It covers setting up incoming routing, free two-way sending via Gmail SMTP with Google App Passwords, and hardening SPF/DMARC for 10/10 inbox deliverability with zero monthly fees!`;
  }

  if (
    q.includes("mascot ai") ||
    q.includes("cloudflare ai") ||
    q.includes("free ai") ||
    q.includes("llama")
  ) {
    return `You can connect an animated SVG mascot to Cloudflare Workers AI for free streaming intelligence using \`@cf/meta/llama-3.1-8b-instruct\`.
Check out the full instructions in the **[Animated Mascot Lab Guide](/lab/mascot/)**!`;
  }

  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("touch") ||
    q.includes("email ayush") ||
    (q.includes("email") && !q.includes("guide") && !q.includes("setup"))
  ) {
    return `You can reach Ayush directly via email at **[${identity.email}](mailto:${identity.email})** or connect on **[LinkedIn](${identity.linkedin})**. He is based in ${identity.location} and available for web platform engineering and technical consultations.`;
  }

  if (q.includes("who are you") || q.includes("who is ayush") || q.includes("about")) {
    return `I'm **Strobi**, the interactive companion for **Ayush Singh**.
Ayush is a **Web Platform Engineer** based in Gujarat, India, focused on bridging complex CMS architectures (like TYPO3) with modern frontend frameworks (Nuxt, Vue, Next.js) and search/AI visibility.
Ask me about his projects, skills, or how to get in touch!`;
  }

  const tokens = q.split(/\W+/).filter((t) => t.length > 2);
  let bestChunk: RagChunk | null = null;
  let highestScore = 0;

  for (const chunk of chatbotKnowledge as RagChunk[]) {
    let score = 0;
    for (const kw of chunk.keywords) {
      if (q.includes(kw.toLowerCase())) score += 4;
    }
    const titleLower = chunk.title.toLowerCase();
    for (const token of tokens) {
      if (titleLower.includes(token)) score += 5;
      if (chunk.content.toLowerCase().includes(token)) score += 1;
    }

    if (score > highestScore) {
      highestScore = score;
      bestChunk = chunk;
    }
  }

  if (bestChunk && highestScore >= 3) {
    return `**${bestChunk.title}**\n\n${bestChunk.content}\n\n[View Details & Case Study](${bestChunk.url})`;
  }

  return `I only have information about Ayush Singh's web platform projects, technical skills (TYPO3, Nuxt, Vue, SEO/AI), and case studies.
Would you like to know about his **projects**, **tech stack**, or **how to contact him** at [${identity.email}](mailto:${identity.email})?`;
}

export default function MascotChat({ isOpen, onClose, onMoodChange }: MascotChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm **Strobi**, Ayush's interactive site companion. Ask me anything about Ayush's engineering projects, tech stack, or background!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSendTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    // Cooldown check: prevent double-clicks & rapid firing (1.5s gap)
    const now = Date.now();
    if (now - lastSendTimeRef.current < 1500) return;
    lastSendTimeRef.current = now;

    // Client-side spam detection: max 12 messages per 2 minutes in sessionStorage
    const isSpamming = () => {
      try {
        const raw = sessionStorage.getItem("strobi_rate_limit");
        const history: number[] = raw ? JSON.parse(raw) : [];
        const recent = history.filter((t) => now - t < 120000);
        recent.push(now);
        sessionStorage.setItem("strobi_rate_limit", JSON.stringify(recent));
        return recent.length > 12;
      } catch {
        return false;
      }
    };

    if (isSpamming()) {
      onMoodChange("drowsy");
      setMessages((prev) => [
        ...prev,
        {
          id: (now + 1).toString(),
          role: "assistant",
          content:
            "Whoa, slow down a bit! ⏳ Strobi needs a short breather. Please wait a minute before asking another question, or reach out to Ayush directly at [hello@ayush404.in](mailto:hello@ayush404.in).",
        },
      ]);
      return;
    }

    setInput("");
    const userMsgId = Date.now().toString();
    const assistantMsgId = (Date.now() + 1).toString();

    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: "user", content: userText },
    ];

    setMessages(newMessages);
    setIsLoading(true);
    onMoodChange("thinking");

    // Prepare API messages history
    const apiMessages = newMessages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    let streamedContent = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (response.status === 429) {
        onMoodChange("drowsy");
        setMessages((prev) => [
          ...prev,
          {
            id: assistantMsgId,
            role: "assistant",
            content:
              "Whoa, slow down! ⏳ Server rate limit reached. Strobi is taking a quick 60-second break. In the meantime, you can reach Ayush directly at [hello@ayush404.in](mailto:hello@ayush404.in)!",
          },
        ]);
        setIsLoading(false);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error(`Worker status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      // Add empty assistant bubble for streaming
      setMessages((prev) => [
        ...prev,
        { id: assistantMsgId, role: "assistant", content: "" },
      ]);
      onMoodChange("excited");

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // Cloudflare Workers AI SSE parsing
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.slice(6).trim();
              if (dataStr === "[DONE]") {
                done = true;
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.response) {
                  streamedContent += parsed.response;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId
                        ? { ...msg, content: streamedContent }
                        : msg
                    )
                  );
                }
              } catch {
                // If raw string chunk
                if (dataStr && dataStr !== "[DONE]") {
                  streamedContent += dataStr;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId
                        ? { ...msg, content: streamedContent }
                        : msg
                    )
                  );
                }
              }
            } else if (line.trim().length > 0 && !line.startsWith(":")) {
              // Plain text response fallback
              try {
                const parsed = JSON.parse(line);
                if (parsed.response) {
                  streamedContent += parsed.response;
                }
              } catch {
                streamedContent += line;
              }
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: streamedContent }
                    : msg
                )
              );
            }
          }
        }
      }

      if (!streamedContent) {
        throw new Error("Empty AI response");
      }
      onMoodChange("happy");
    } catch {
      // Local Grounded Knowledge Fallback Engine
      const localAnswer = generateLocalAnswer(userText);
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== assistantMsgId);
        return [
          ...filtered,
          {
            id: assistantMsgId,
            role: "assistant",
            content: localAnswer,
          },
        ];
      });
      onMoodChange(
        userText.toLowerCase().includes("celebrate") || userText.toLowerCase().includes("win")
          ? "celebrate"
          : "happy"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm **Strobi**, Ayush's interactive site companion. Ask me anything about Ayush's engineering projects, tech stack, or background!",
      },
    ]);
    onMoodChange("happy");
  };

  return (
    <div className="mascot-chat-window" role="dialog" aria-label="Chat with Strobi">
      {/* Header */}
      <div className="mascot-chat-header">
        <div className="mascot-chat-title">
          <div className="mascot-chat-dot" />
          <div>
            <strong>Strobi AI</strong>
            <span className="mascot-chat-badge">Grounded Companion</span>
          </div>
        </div>
        <div className="mascot-chat-header-actions">
          <button
            type="button"
            className="mascot-chat-btn"
            onClick={resetChat}
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RefreshCw size={13} />
          </button>
          <button
            type="button"
            className="mascot-chat-btn"
            onClick={onClose}
            title="Close chat"
            aria-label="Close chat"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="mascot-chat-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mascot-chat-bubble-row ${m.role === "user" ? "user-row" : "bot-row"}`}
          >
            {m.role === "assistant" && (
              <div className="mascot-chat-avatar">
                <Bot size={14} />
              </div>
            )}
            <div className={`mascot-chat-msg ${m.role === "user" ? "user-msg" : "bot-msg"}`}>
              <div
                className="mascot-msg-content"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(m.content),
                }}
              />
            </div>
            {m.role === "user" && (
              <div className="mascot-chat-avatar user-avatar">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="mascot-chat-bubble-row bot-row">
            <div className="mascot-chat-avatar">
              <Bot size={14} />
            </div>
            <div className="mascot-chat-msg bot-msg typing-msg">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestions */}
      {messages.length <= 2 && !isLoading && (
        <div className="mascot-chat-chips">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="mascot-chat-chip"
              onClick={() => sendMessage(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="mascot-chat-input-row">
        <input
          ref={inputRef}
          type="text"
          className="mascot-chat-input"
          placeholder="Ask Strobi about Ayush's work..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="Message Strobi"
        />
        <button
          type="button"
          className="mascot-chat-send"
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

// Lightweight Markdown & Autolink Formatter
function formatMarkdown(text: string): string {
  if (!text) return "";

  // 1. Sanitize HTML entities
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // 3. Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="chat-code">$1</code>');

  const links: string[] = [];

  // 4. Markdown links [label](url)
  html = html.replace(/\[(.*?)\]\(((?:https?:\/\/|\/|mailto:)[^\s)]+)\)/g, (_, label, url) => {
    const idx = links.length;
    const isInternal = url.startsWith("/");
    const target = isInternal ? "" : ' target="_blank" rel="noopener noreferrer"';
    links.push(`<a href="${url}"${target} class="chat-link">${label}</a>`);
    return `___LINK_TOKEN_${idx}___`;
  });

  // 5. Bare URLs (https://, http://, or www.)
  html = html.replace(/\b((?:https?:\/\/|www\.)[^\s<)]+)/gi, (match) => {
    const cleanUrl = match.replace(/[.,;!?)>]+$/, "");
    const trailing = match.slice(cleanUrl.length);
    const href = cleanUrl.startsWith("www.") ? `https://${cleanUrl}` : cleanUrl;
    const idx = links.length;
    links.push(
      `<a href="${href}" target="_blank" rel="noopener noreferrer" class="chat-link">${cleanUrl}</a>`
    );
    return `___LINK_TOKEN_${idx}___${trailing}`;
  });

  // 6. Email addresses
  html = html.replace(/\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/gi, (email) => {
    const cleanEmail = email.replace(/[.,;!?)>]+$/, "");
    const trailing = email.slice(cleanEmail.length);
    const idx = links.length;
    links.push(
      `<a href="mailto:${cleanEmail}" class="chat-link">${cleanEmail}</a>`
    );
    return `___LINK_TOKEN_${idx}___${trailing}`;
  });

  // 7. Restore links safely
  for (let i = 0; i < links.length; i++) {
    html = html.split(`___LINK_TOKEN_${i}___`).join(links[i]);
  }

  // 8. Bullet points (* or - or • at start of line)
  html = html.replace(/^\s*[\*\-\•]\s+(.*$)/gm, '<span class="chat-bullet">•</span> $1');

  // 9. Newlines to <br />
  html = html.replace(/\n/g, "<br />");

  return html;
}

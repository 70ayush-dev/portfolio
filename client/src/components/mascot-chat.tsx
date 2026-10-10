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

// In-browser grounded knowledge fallback engine
function generateLocalAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("touch")) {
    return `You can reach Ayush directly via email at **[${identity.email}](mailto:${identity.email})** or connect on **[LinkedIn](${identity.linkedin})**. He is based in ${identity.location} and available for web platform engineering and technical consultations.`;
  }

  if (q.includes("stack") || q.includes("skill") || q.includes("technology") || q.includes("technologies") || q.includes("tools")) {
    return `Ayush specializes in **Web Platform Engineering** across:
• **Backend & CMS**: TYPO3 (v11–v14), PHP 8.x, Python, Node.js, Firebase
• **Frontend Architecture**: Vue, Nuxt, React, Next.js, TypeScript, Tailwind CSS
• **Visibility & Automation**: Technical SEO, AEO (Answer Engine Optimization), GEO, Schema.org/JSON-LD, AI workflows and ETL data pipelines.`;
  }

  if (q.includes("autoputzer") || q.includes("der autoputzer")) {
    const p = projects.find((x) => x.slug === "der-autoputzer");
    return `**Der Autoputzer** is a large-scale modern platform rebuild combining **TYPO3** content architecture with a modern **Nuxt/Tailwind** frontend.
• **Architecture**: Reusable TYPO3 Content Blocks mapped to reactive Nuxt components.
• **Features**: Seminar booking, customer reviews, pricing grids, and search-optimized page architecture.
• [View Case Study](/work/der-autoputzer/)`;
  }

  if (q.includes("bonafinca") || q.includes("real estate") || q.includes("property")) {
    return `**Bonafinca Real Estate AI Email Assistant**:
• Built an intelligent automated customer inquiry assistant that cut manual email handling by **60%**.
• Uses automated contextual parsing of property inquiries to deliver accurate, immediate responses.
• Combines AI automation with robust backend validation.`;
  }

  if (q.includes("nishika") || q.includes("fit with nishika") || q.includes("health")) {
    const p = projects.find((x) => x.slug === "fit-with-nishika");
    return `**Fit with Nishika** is a health and fitness platform:
• Built with **Next.js**, **React**, **TypeScript**, and **Firebase Firestore / Auth**.
• Features an interactive **Body Pattern Check** guide with direct PDF generation and Brevo email automation workflows.
• [View Case Study](/work/fit-with-nishika/)`;
  }

  if (q.includes("mascot") || q.includes("strobi") || q.includes("character") || q.includes("animation")) {
    return `That's me! I'm **Strobi**, Ayush's interactive procedural mascot!
• Built with **100% vector SVG** and CSS keyframes — **zero external animation libraries** (< 4KB payload).
• Features 23 moods, procedural blinking, sleeping states, and full accessibility with \`prefers-reduced-motion\`.
• [Explore the Mascot Lab Guide](/lab/mascot/)`;
  }

  if (q.includes("typo3") || q.includes("cms") || q.includes("upgrade")) {
    return `Ayush has 3+ years of deep **TYPO3** expertise (versions 11 through 14):
• Large enterprise content modeling using Content Blocks and fluid extensions.
• Handled migrations of **300k+ records** with clean data transformation pipelines.
• Headless integrations connecting TYPO3 backends to modern Nuxt & Vue client frontends.`;
  }

  if (q.includes("seo") || q.includes("aeo") || q.includes("geo") || q.includes("search")) {
    return `Ayush engineers search and AI discovery directly into platform architecture:
• **Technical SEO**: Validated semantic HTML, fast Core Web Vitals, canonical routing.
• **AEO & GEO**: Schema.org JSON-LD graphs (Person, TechArticle, HowTo, CreativeWork) and curated \`llms.txt\` so AI engines (Perplexity, ChatGPT, Claude) accurately cite platform content.`;
  }

  if (q.includes("who are you") || q.includes("who is ayush") || q.includes("about")) {
    return `I'm **Strobi**, the interactive companion for **Ayush Singh**.
Ayush is a **Web Platform Engineer** based in Gujarat, India, focused on bridging complex CMS architectures (like TYPO3) with modern frontend frameworks (Nuxt, Vue, Next.js) and search/AI visibility.
Ask me about his projects, skills, or how to get in touch!`;
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

// Lightweight Markdown Formatter for links, bold, lists, and line breaks
function formatMarkdown(text: string): string {
  if (!text) return "";
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Links [text](url)
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>'
  );

  // Bullet points
  html = html.replace(/^• (.*$)/gm, '<span class="chat-bullet">•</span> $1');

  // Line breaks
  html = html.replace(/\n/g, "<br />");

  return html;
}

interface Env {
  AI: any;
}

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-isolate sliding window rate limiter
const ipRateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune expired IPs when map grows large
  if (ipRateLimits.size > 500) {
    for (const [key, val] of ipRateLimits.entries()) {
      if (val.resetAt < now) ipRateLimits.delete(key);
    }
  }

  const record = ipRateLimits.get(ip);
  if (!record || record.resetAt < now) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  // 1. Check client IP rate limit
  const clientIp =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (clientIp !== "unknown" && isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded. Strobi needs a breather. Please wait 60 seconds.",
        retryAfter: 60,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  if (!env.AI) {
    return new Response(
      JSON.stringify({ error: "Workers AI binding 'AI' not found" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  try {
    const body = (await request.json()) as {
      messages?: { role: string; content: string }[];
    };

    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages array" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Input sanitization: limit max character length per message
    const lastUserMessage = messages[messages.length - 1];
    if (
      typeof lastUserMessage?.content !== "string" ||
      lastUserMessage.content.trim().length === 0
    ) {
      return new Response(JSON.stringify({ error: "Message content cannot be empty" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (lastUserMessage.content.length > 500) {
      return new Response(
        JSON.stringify({ error: "Message too long (max 500 characters)" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const systemPrompt = `You are Strobi, the friendly and knowledgeable AI companion for Ayush Singh (ayush404.in).
Ayush is a Web Platform Engineer based in Gujarat, India, specializing in TYPO3 (v11–v14), PHP 8.x, Vue/Nuxt, React, Technical SEO, AEO, GEO, and AI integrations.

STRICT GROUNDING RULES:
1. ONLY answer questions using Ayush Singh's portfolio knowledge, engineering background, case studies, and lab experiments.
2. If asked anything completely unrelated, politely reply:
   "I only have information about Ayush Singh's web engineering projects, skills, and background. Feel free to ask about his work or contact him directly!"
3. ALWAYS format URLs as direct, clickable Markdown links:
   - Der Autoputzer: [View Der Autoputzer Case Study](/work/der-autoputzer/)
   - TYPO3 AI Chatbot: [View TYPO3 Case Study](/work/typo3-ai-chatbot/)
   - Migration Assistant: [View Migration Case Study](/work/migration-assistant/)
   - Content Block System: [View Content Blocks Case Study](/work/content-block-system/)
   - Fit With Nishika: [View Case Study](/work/fit-with-nishika/)
   - CRM System: [View Case Study](/work/crm-system/)
   - Animated Mascot Lab: [Open Mascot Lab](/lab/mascot/)
   - Free Custom Domain Email Guide: [Open Free Domain Email Guide](/lab/custom-domain-email/)
   - Engineering Stack: [View Engineering Capabilities](/#engineering)
   - Search & SEO: [View Search Architecture](/#search)
4. Contact details:
   - Email: hello@ayush404.in
   - GitHub: https://github.com/70ayush-dev
   - LinkedIn: https://www.linkedin.com/in/ayush-singh-dev`;

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-6).map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content.slice(0, 500),
      })),
    ];

    const stream = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: formattedMessages,
      stream: true,
      max_tokens: 512,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "AI Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

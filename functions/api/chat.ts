interface Env {
  AI: any;
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

  if (!env.AI) {
    return new Response(
      JSON.stringify({ error: "Workers AI binding 'AI' not found" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { messages } = (await request.json()) as {
      messages: { role: string; content: string }[];
    };

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
      ...(messages || []).slice(-6),
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
      headers: { "Content-Type": "application/json" },
    });
  }
};

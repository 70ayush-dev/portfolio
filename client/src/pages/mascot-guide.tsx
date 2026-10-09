import { useState } from "react";
import {
  Navigation,
  Footer,
  Arrow,
  SectionHeading,
  Tags,
} from "../components/platform-layout";
import { BitsText, BitsControl } from "../components/reactbits/experience";
import AnimatedMascot, { MascotMood } from "../components/animated-mascot";
import {
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Code2,
  Terminal,
  Zap,
  Info,
  Layers,
  Smile,
} from "lucide-react";

const PROMPTS = {
  template: `You are a character designer. Help me design a simple mascot that I will build in Bible Strong Avatar Lab (avatars.bible-strong.app).

About me:
- My brand or page: [your brand or website name]
- What I do: [e.g. Web Platform Engineer / modern web applications]
- My audience: [clients, engineers, recruiters]
- Brand colours: [#2349c6, #000000, #f7f5ef, or "suggest some"]
- Vibe in 3 words: [friendly, focused, playful]

How the Studio works (only use these options):
- Bodies are simple 3D-looking shapes. Starters I can copy: Strobi (round ball), Freddy (block with ears), Citrus (drop), Nova (bean), Grok bot (black ball), Sunee (sun with dots), Kirby (puffy), Cloudee (cloud), Cubee (soft cube), Onee (soft blob).
- I can change size, roundness, rotation, body colour, eye colour, and each eye's width, height, position, spacing and tilt. I can add extra simple shapes, like ears.
- Faces have eyes only, no mouth. Personality comes from shape, colour and eyes.
- Ready animations: sleeping, waking, idle, listening, thinking, searching, working, excited, bored, suspicious, angry, drowsy, happy, curious, confused, surprised, proud, shy, sad, laughing, scared, playful, celebrate.

Give me a MASCOT CARD with:
1. A name that is easy to say, and a one-line personality
2. Which starter to copy, and why
3. Body: shape changes, body colour (hex), eye colour (hex)
4. Eyes in plain words (size, spacing, tilt)
5. 5 animations from the list, and the moment each one plays on my website or in my videos
6. 3 places to use the mascot
7. A checklist for the Studio tabs: Pose, Expressions, Animations, Export

Keep it short and simple.`,

  reactSetup: `Add my animated mascot to this website.

- My mascot file: avatar.avatar.json, which I put in src/
- Package: @bible-strong/avatar-react (on npm). Docs: github.com/smontlouis/bible-strong-avatar-lab
- Use createAvatar(definition) and import '@bible-strong/avatar-react/styles.css' once.

What I want:
1. Show the mascot in the bottom-right corner of every page, 120px wide.
2. Start with the animation "idle". Read my JSON first and list the animation names it has.
3. If this is a Next.js or React site, put the mascot in a client component.
4. If the visitor prefers reduced motion, show a still expression instead.
5. On phones, it must not cover any button.

Then tell me the command to run the site and what I should see.`,

  reactions: `Make my mascot react to visitors. It already shows on my site with @bible-strong/avatar-react (or avatar-web).

Use its controller: play(animation), pause(), stop(), setExpression(expression), getState(), and the onAnimationEnd callback. Only use animation names that exist in my .avatar.json.

Reactions:
- Page opens: play "waking", then switch to "idle" when it ends (or after 2 seconds if it loops)
- Hover on [my main button]: "excited"
- [My contact form] sent: "celebrate"
- Form error: "confused"
- No mouse, scroll or typing for 30 seconds: "drowsy", then "sleeping". Any movement wakes it up.
- Click on the mascot: "laughing"

Rules: no layout jumps, use tap instead of hover on phones, and turn reactions off if the visitor prefers reduced motion. Show me the code and a short list of what triggers what.`,

  localStudio: `git clone https://github.com/smontlouis/bible-strong-avatar-lab.git
cd bible-strong-avatar-lab
npm install -g pnpm
pnpm install
pnpm dev`,
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className="mascot-copy-btn"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy prompt"}
    >
      {copied ? (
        <>
          <Check size={14} /> Copied
        </>
      ) : (
        <>
          <Copy size={14} /> Copy prompt
        </>
      )}
    </button>
  );
}

export default function MascotGuide() {
  const [activeMood, setActiveMood] = useState<MascotMood>("idle");

  const moodsList: { mood: MascotMood; label: string }[] = [
    { mood: "idle", label: "Idle" },
    { mood: "waking", label: "Waking" },
    { mood: "excited", label: "Excited" },
    { mood: "happy", label: "Happy" },
    { mood: "curious", label: "Curious" },
    { mood: "thinking", label: "Thinking" },
    { mood: "celebrate", label: "Celebrate" },
    { mood: "drowsy", label: "Drowsy" },
    { mood: "sleeping", label: "Sleeping" },
  ];

  return (
    <>
      <Navigation />
      <main id="main" className="guide-page">
        {/* Guide Header */}
        <header className="guide-hero">
          <div className="guide-hero-badge">
            <span>LAB EXPERIMENT &amp; GUIDE</span>
            <span>20 MIN BUILD</span>
          </div>
          <BitsText as="h1" className="guide-title">
            Make your own animated mascot <em>free, in about 20 minutes.</em>
          </BitsText>
          <p className="guide-lead">
            Design a character in your browser, give it 23 ready moods, and bring it
            live onto your website with procedural SVG animations. No drawing, no
            login, and zero blurry pixels.
          </p>
          <div className="guide-meta-strip">
            <span>Engineered by Stéphane Montlouis-Calixte (@_smontlouis)</span>
            <span>·</span>
            <span>Editorial fieldguide by Ayush Singh</span>
            <span>·</span>
            <span>Theme-Matched: AMOLED &amp; Warm Paper</span>
          </div>
        </header>

        {/* Interactive Mood Sandbox */}
        <section className="section guide-sandbox-section">
          <SectionHeading
            title="Interactive Character Preview"
            text="Test the live procedural SVG mascot below. Switch between ready moods to inspect the eye physics, breathing rhythm, and reaction dynamics."
          />
          <div className="sandbox-card">
            <div className="sandbox-stage">
              <AnimatedMascot
                interactive={false}
                defaultMood={activeMood}
                size={140}
                showGuideBubble={false}
              />
              <div className="sandbox-status">
                Current mood: <strong>{activeMood}</strong>
              </div>
            </div>
            <div className="sandbox-controls">
              <p className="sandbox-ctrl-label">Switch mood state:</p>
              <div className="sandbox-pills">
                {moodsList.map((m) => (
                  <button
                    key={m.mood}
                    type="button"
                    className={`sandbox-pill ${activeMood === m.mood ? "active" : ""}`}
                    onClick={() => setActiveMood(m.mood)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 01: What you'll make */}
        <section className="section guide-section">
          <div className="guide-step-tag">01 / WHAT YOU’LL MAKE</div>
          <BitsText as="h2">A little character that lives on your website.</BitsText>
          <p className="guide-body">
            Bible Strong Avatar Lab is a free studio that runs in your browser. You pick
            a body shape, configure the eyes, and choose colors. The studio does the
            procedural animation: natural blinking, breathing, and 23 moods ranging from
            sleeping to celebratory dancing. Then you export it as clean SVG code or a
            compact JSON bundle.
          </p>

          <div className="guide-paths-grid">
            <article className="guide-path-card">
              <span className="guide-path-badge">PATH A · 10 MIN</span>
              <BitsText as="h3">Just a picture</BitsText>
              <p>
                PNG or SVG for your profile picture, blog articles, stickers or
                thumbnails. Needs only your browser.
              </p>
            </article>

            <article className="guide-path-card featured">
              <span className="guide-path-badge">PATH B · 20 MIN</span>
              <BitsText as="h3">Live on your website</BitsText>
              <p>
                Moves, blinks, breathes, and reacts to user interactions, scrolls, and
                form events with React or vanilla JavaScript.
              </p>
            </article>

            <article className="guide-path-card">
              <span className="guide-path-badge">PATH C · OPTIONAL</span>
              <BitsText as="h3">Your own Studio</BitsText>
              <p>
                Run the Avatar Lab Studio locally on your machine, tweak procedural
                geometry, and work completely offline.
              </p>
            </article>
          </div>
        </section>

        {/* 02: Mascot Template Prompt */}
        <section className="section guide-section">
          <div className="guide-step-tag">02 / THE MASCOT TEMPLATE</div>
          <BitsText as="h2">Plan it first. Two minutes.</BitsText>
          <p className="guide-body">
            Opening the editor without a plan leads to dragging random sliders. Run this
            prompt through ChatGPT or Claude first to get an exact design card specifying
            starter shape, colors, and key animation triggers.
          </p>

          <div className="code-block-card">
            <div className="code-block-header">
              <span>PROMPT 1 · MASCOT TEMPLATE (CHATGPT OR CLAUDE)</span>
              <CopyButton text={PROMPTS.template} />
            </div>
            <pre className="code-block-content">
              <code>{PROMPTS.template}</code>
            </pre>
          </div>
        </section>

        {/* 03: Build it in the Studio */}
        <section className="section guide-section">
          <div className="guide-step-tag">03 / BUILD IT IN THE STUDIO</div>
          <BitsText as="h2">Build it in Avatar Lab.</BitsText>
          <p className="guide-body">
            Open{" "}
            <a
              href="https://avatars.bible-strong.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              avatars.bible-strong.app <ExternalLink size={14} />
            </a>{" "}
            in your browser. No account required; progress saves automatically in local
            storage.
          </p>

          <div className="guide-steps-list">
            <div className="guide-step-item">
              <span className="step-num">1</span>
              <div>
                <BitsText as="h3">Pick your starter</BitsText>
                <p>
                  Choose Strobi (friendly ball), Freddy (block with ears), Citrus (drop),
                  Nova (bean), or Grok bot (black ball). Double-click to begin editing.
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">2</span>
              <div>
                <BitsText as="h3">Shape &amp; color</BitsText>
                <p>
                  Set your body color (e.g., cobalt #2349c6 or AMOLED dark #96adff),
                  adjust roundness, and rotate or position on the canvas.
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">3</span>
              <div>
                <BitsText as="h3">Eyes do most of the acting</BitsText>
                <p>
                  Set width, height, spacing, and tilt. Closer eyes look cute and
                  playful; slightly tilted eyes look cheeky and focused.
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">4</span>
              <div>
                <BitsText as="h3">Expressions &amp; animations</BitsText>
                <p>
                  Choose from 23 ready animations: idle, waking, excited, listening,
                  thinking, celebrate, and sleep. Blinking is handled procedurally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 04: Put it on your website */}
        <section className="section guide-section">
          <div className="guide-step-tag">04 / CODE INTEGRATION</div>
          <BitsText as="h2">Put it on your website.</BitsText>
          <p className="guide-body">
            Download your character's <code className="inline-code">.avatar.json</code>{" "}
            or use the procedural React SVG component directly. Use this prompt with
            Cursor, Claude Code, or Antigravity to wire it up:
          </p>

          <div className="code-block-card">
            <div className="code-block-header">
              <span>PROMPT 3 · REACT OR NEXT.JS INTEGRATION</span>
              <CopyButton text={PROMPTS.reactSetup} />
            </div>
            <pre className="code-block-content">
              <code>{PROMPTS.reactSetup}</code>
            </pre>
          </div>
        </section>

        {/* 05: Make it react to visitors */}
        <section className="section guide-section">
          <div className="guide-step-tag">05 / INTERACTIVE REACTIONS</div>
          <BitsText as="h2">Make it react to visitors.</BitsText>
          <p className="guide-body">
            A static looped mascot is just a sticker. A character that responds to
            clicks, scrolls, and form actions feels alive and delightful.
          </p>

          <div className="reactions-table-wrap">
            <table className="reactions-table" aria-label="Mascot reaction triggers">
              <thead>
                <tr>
                  <th scope="col">User Event / Action</th>
                  <th scope="col">Mascot Reaction</th>
                  <th scope="col">Purpose &amp; UX Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Page load / Mount</td>
                  <td>
                    <code>waking → idle</code>
                  </td>
                  <td>Welcoming entrance without layout shifts</td>
                </tr>
                <tr>
                  <td>Hover on primary button</td>
                  <td>
                    <code>excited</code>
                  </td>
                  <td>Micro-encouragement toward CTA conversion</td>
                </tr>
                <tr>
                  <td>Form submission / success</td>
                  <td>
                    <code>celebrate</code>
                  </td>
                  <td>Joyful milestone confirmation</td>
                </tr>
                <tr>
                  <td>Form validation error</td>
                  <td>
                    <code>confused</code>
                  </td>
                  <td>Empathetic error feedback</td>
                </tr>
                <tr>
                  <td>30 seconds of inactivity</td>
                  <td>
                    <code>drowsy → sleeping</code>
                  </td>
                  <td>Playful background ambient behavior</td>
                </tr>
                <tr>
                  <td>Direct click on character</td>
                  <td>
                    <code>happy / laughing</code>
                  </td>
                  <td>Easter egg micro-interaction</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="code-block-card">
            <div className="code-block-header">
              <span>PROMPT 5 · MAKE IT REACT PROMPT</span>
              <CopyButton text={PROMPTS.reactions} />
            </div>
            <pre className="code-block-content">
              <code>{PROMPTS.reactions}</code>
            </pre>
          </div>
        </section>

        {/* 06: Good to know & Credits */}
        <section className="section guide-section">
          <div className="guide-step-tag">06 / SPECIFICATIONS &amp; CREDITS</div>
          <BitsText as="h2">Engineering details.</BitsText>

          <div className="specs-grid">
            <div className="spec-item">
              <BitsText as="h3">Vector resolution independence</BitsText>
              <p>
                Mascots are rendered procedurally with pure SVG paths rather than bitmap
                sprites, guaranteeing razor-sharp clarity on standard and Retina
                screens alike.
              </p>
            </div>
            <div className="spec-item">
              <BitsText as="h3">Accessibility &amp; reduced motion</BitsText>
              <p>
                When visitors enable system reduced motion (
                <code>prefers-reduced-motion: reduce</code>), animations settle into a
                calm still expression.
              </p>
            </div>
            <div className="spec-item">
              <BitsText as="h3">Open source foundation</BitsText>
              <p>
                Created by Stéphane Montlouis-Calixte (
                <a
                  href="https://github.com/smontlouis/bible-strong-avatar-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  @_smontlouis on GitHub <ExternalLink size={14} />
                </a>
                ), licensed under AGPL-3.0.
              </p>
            </div>
          </div>

          <div className="guide-cta-box">
            <BitsText as="h3">Experience it right on this site</BitsText>
            <p>
              Notice the floating mascot in the corner of your screen? It uses these
              exact reaction rules, adapts between Warm Paper and pure AMOLED Black, and
              accompanies your visit!
            </p>
            <div className="guide-cta-actions">
              <BitsControl as="a" className="button primary" href="/">
                Return to portfolio <Arrow />
              </BitsControl>
              <BitsControl as="a" className="text-link" href="/#contact">
                Discuss custom engineering <Arrow />
              </BitsControl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

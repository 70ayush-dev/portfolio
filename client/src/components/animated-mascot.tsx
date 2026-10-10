import { useState, useEffect, useRef } from "react";
import { X, Sparkles, Volume2, VolumeX, MessageSquare } from "lucide-react";

export type MascotMood =
  | "idle"
  | "waking"
  | "excited"
  | "happy"
  | "curious"
  | "thinking"
  | "celebrate"
  | "drowsy"
  | "sleeping";

interface MascotTip {
  section: string;
  text: string;
}

const SECTION_TIPS: MascotTip[] = [
  { section: "hero", text: "Hi there! I'm Strobi, Ayush's interactive site companion." },
  { section: "build", text: "Systems, not just websites: backend CMS to modern Nuxt & Vue." },
  { section: "work", text: "Check out real case studies like Fit with Nishika and Der Autoputzer!" },
  { section: "experience", text: "3+ years of enterprise scale, 300k+ records ETL & AI automation." },
  { section: "engineering", text: "Deep TYPO3 v11–v14, PHP, Python, Node, Vue, and Next.js." },
  { section: "search", text: "Search & AI Visibility: SEO, AEO, and GEO engineered right in." },
  { section: "lab", text: "Practical AI experiments and this very mascot guide!" },
  { section: "about", text: "Comfortable turning complex legacy systems into clean software." },
  { section: "contact", text: "Have a project or problem? Say hi to Ayush directly!" },
];

export interface AnimatedMascotProps {
  interactive?: boolean;
  defaultMood?: MascotMood;
  mood?: MascotMood;
  onMoodChange?: (mood: MascotMood) => void;
  size?: number;
  showGuideBubble?: boolean;
}

export default function AnimatedMascot({
  interactive = true,
  defaultMood = "idle",
  mood: controlledMood,
  onMoodChange,
  size = 100,
  showGuideBubble = true,
}: AnimatedMascotProps) {
  const [internalMood, setInternalMood] = useState<MascotMood>(controlledMood ?? defaultMood);
  const mood = controlledMood !== undefined ? controlledMood : internalMood;
  const [bubbleText, setBubbleText] = useState<string>("Hi! I'm Strobi, Ayush's interactive companion.");
  const [bubbleOpen, setBubbleOpen] = useState(showGuideBubble);
  const [minimized, setMinimized] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const idleTimer = useRef<number | null>(null);

  // Sync internal mood when defaultMood changes if not controlled
  useEffect(() => {
    if (controlledMood === undefined && defaultMood) {
      setInternalMood(defaultMood);
    }
  }, [defaultMood, controlledMood]);

  // Waking sequence on mount (only for interactive companion mode without explicit mood)
  useEffect(() => {
    if (!interactive || controlledMood !== undefined) return;
    setInternalMood("waking");
    const wakeTimeout = window.setTimeout(() => {
      setInternalMood("idle");
    }, 1800);
    return () => clearTimeout(wakeTimeout);
  }, [interactive, controlledMood]);

  // Natural periodic blinking
  useEffect(() => {
    if (mood === "sleeping" || mood === "drowsy") return;
    const interval = window.setInterval(() => {
      setIsBlinking(true);
      window.setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(interval);
  }, [mood]);

  // Inactivity tracking (drowsy -> sleeping after 24 seconds of inactivity)
  useEffect(() => {
    if (!interactive || controlledMood !== undefined) return;

    const resetIdle = () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      if (mood === "sleeping" || mood === "drowsy") {
        setInternalMood("waking");
        window.setTimeout(() => setInternalMood("idle"), 1200);
      }
      idleTimer.current = window.setTimeout(() => {
        setInternalMood("drowsy");
        idleTimer.current = window.setTimeout(() => {
          setInternalMood("sleeping");
          setBubbleText("Zzz... Wake me anytime!");
        }, 8000);
      }, 24000);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));
    resetIdle();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdle));
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [interactive, controlledMood, mood]);

  // Scroll section tracking to update speech bubble
  useEffect(() => {
    if (!interactive || !showGuideBubble) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const tip of SECTION_TIPS) {
        const el = document.getElementById(tip.section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setBubbleText(tip.text);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [interactive, showGuideBubble]);

  // Button hover reaction listener
  useEffect(() => {
    if (!interactive || controlledMood !== undefined) return;

    const onButtonEnter = () => {
      if (mood !== "sleeping") setInternalMood("excited");
    };
    const onButtonLeave = () => {
      if (mood === "excited") setInternalMood("idle");
    };

    const buttons = document.querySelectorAll("a.button, button.nav-cta, a.text-link");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", onButtonEnter);
      btn.addEventListener("mouseleave", onButtonLeave);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", onButtonEnter);
        btn.removeEventListener("mouseleave", onButtonLeave);
      });
    };
  }, [interactive, controlledMood, mood]);

  // Interactive click cycle
  const handleMascotClick = () => {
    const cycle: MascotMood[] = ["happy", "excited", "celebrate", "curious", "idle"];
    const next = cycle[(cycle.indexOf(mood) + 1) % cycle.length] || "happy";
    if (onMoodChange) {
      onMoodChange(next);
    }
    setInternalMood(next);

    if (interactive) {
      setBubbleOpen(true);
      if (next === "happy") setBubbleText("Yay! Glad you're here exploring.");
      if (next === "excited") setBubbleText("Building platforms is what we love!");
      if (next === "celebrate") setBubbleText("23 moods, 100% SVG, and live code!");
      if (next === "curious") setBubbleText("Have you visited the case studies yet?");
      if (next === "idle") setBubbleText("I'm hanging around if you need tips!");
    }
  };

  return (
    <aside
      className={`mascot-companion ${minimized ? "mascot-minimized" : ""} mascot-mood-${mood}`}
      aria-label="Interactive Mascot Companion"
    >
      {/* Speech bubble */}
      {bubbleOpen && !minimized && (
        <div className="mascot-bubble" role="status">
          <p>{bubbleText}</p>
          <button
            type="button"
            className="mascot-bubble-close"
            onClick={() => setBubbleOpen(false)}
            aria-label="Close speech bubble"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Mascot character container */}
      <div className="mascot-stage">
        <button
          type="button"
          className="mascot-character"
          onClick={handleMascotClick}
          aria-label={`Mascot companion (mood: ${mood}). Click to interact.`}
          title="Click to interact with Strobi!"
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 140 140"
            className="mascot-svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="mascot-grad-top" />
                <stop offset="100%" className="mascot-grad-bottom" />
              </linearGradient>
              <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="currentColor" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Mascot shadow */}
            <ellipse
              cx="70"
              cy="126"
              rx="42"
              ry="8"
              className="mascot-shadow"
            />

            {/* Main organic body */}
            <g className="mascot-body-group">
              <path
                d="M 70 18 
                   C 108 18, 126 44, 126 78 
                   C 126 112, 106 122, 70 122 
                   C 34 122, 14 112, 14 78 
                   C 14 44, 32 18, 70 18 Z"
                className="mascot-body"
                fill="url(#mascotGradient)"
                filter="url(#mascotGlow)"
              />

              {/* Cheeks blush (happy/excited/celebrate) */}
              {(mood === "happy" || mood === "excited" || mood === "celebrate") && (
                <>
                  <ellipse cx="38" cy="84" rx="8" ry="4" className="mascot-blush" />
                  <ellipse cx="102" cy="84" rx="8" ry="4" className="mascot-blush" />
                </>
              )}

              {/* Sleeping "Zzz" indicator */}
              {mood === "sleeping" && (
                <g className="mascot-zzz">
                  <text x="100" y="42" className="mascot-zzz-char">z</text>
                  <text x="110" y="30" className="mascot-zzz-char small">z</text>
                </g>
              )}

              {/* Eyes */}
              <g className={`mascot-eyes ${isBlinking ? "is-blinking" : ""}`}>
                {/* Left Eye */}
                {mood === "sleeping" || mood === "drowsy" ? (
                  <path
                    d="M 44 74 Q 52 80 60 74"
                    className="mascot-eye-closed"
                    fill="none"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                ) : mood === "happy" || mood === "celebrate" ? (
                  <path
                    d="M 44 75 Q 52 66 60 75"
                    className="mascot-eye-happy"
                    fill="none"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                ) : mood === "thinking" ? (
                  <g className="mascot-eye-open left">
                    <ellipse
                      cx="52"
                      cy="71"
                      rx="5.5"
                      ry={isBlinking ? 1 : 7.5}
                      className="mascot-eye"
                    />
                    <circle cx="55" cy="68" r="2.2" className="mascot-pupil-highlight" />
                  </g>
                ) : mood === "waking" ? (
                  <g className="mascot-eye-open left">
                    <ellipse
                      cx="52"
                      cy="74"
                      rx="5.5"
                      ry={isBlinking ? 1 : 4.5}
                      className="mascot-eye"
                    />
                    <circle cx="51" cy="73" r="1.8" className="mascot-pupil-highlight" />
                  </g>
                ) : (
                  <g className="mascot-eye-open left">
                    <ellipse
                      cx="52"
                      cy="72"
                      rx={mood === "excited" ? 6.5 : 5.5}
                      ry={mood === "curious" ? 8.5 : isBlinking ? 1 : 8}
                      className="mascot-eye"
                    />
                    <circle cx="50" cy="69" r="2.2" className="mascot-pupil-highlight" />
                  </g>
                )}

                {/* Right Eye */}
                {mood === "sleeping" || mood === "drowsy" ? (
                  <path
                    d="M 80 74 Q 88 80 96 74"
                    className="mascot-eye-closed"
                    fill="none"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                ) : mood === "happy" || mood === "celebrate" ? (
                  <path
                    d="M 80 75 Q 88 66 96 75"
                    className="mascot-eye-happy"
                    fill="none"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                ) : mood === "thinking" ? (
                  <g className="mascot-eye-open right">
                    <ellipse
                      cx="88"
                      cy="71"
                      rx="5.5"
                      ry={isBlinking ? 1 : 7.5}
                      className="mascot-eye"
                    />
                    <circle cx="91" cy="68" r="2.2" className="mascot-pupil-highlight" />
                  </g>
                ) : mood === "waking" ? (
                  <g className="mascot-eye-open right">
                    <ellipse
                      cx="88"
                      cy="74"
                      rx="5.5"
                      ry={isBlinking ? 1 : 4.5}
                      className="mascot-eye"
                    />
                    <circle cx="87" cy="73" r="1.8" className="mascot-pupil-highlight" />
                  </g>
                ) : (
                  <g className="mascot-eye-open right">
                    <ellipse
                      cx="88"
                      cy="72"
                      rx={mood === "excited" ? 6.5 : 5.5}
                      ry={mood === "curious" ? 7 : isBlinking ? 1 : 8}
                      className="mascot-eye"
                    />
                    <circle cx="86" cy="69" r="2.2" className="mascot-pupil-highlight" />
                  </g>
                )}
              </g>

              {/* Celebrate sparkles */}
              {mood === "celebrate" && (
                <g className="mascot-sparkles">
                  <circle cx="30" cy="30" r="3" className="sparkle-dot" />
                  <circle cx="110" cy="26" r="2.5" className="sparkle-dot" />
                  <circle cx="120" cy="60" r="2" className="sparkle-dot" />
                </g>
              )}
            </g>
          </svg>
        </button>

        {/* Companion controls */}
        {interactive && (
          <div className="mascot-controls" aria-label="Mascot options">
            <button
              type="button"
              className="mascot-ctrl-btn"
              onClick={() => setBubbleOpen(!bubbleOpen)}
              title={bubbleOpen ? "Mute tips" : "Show tips"}
              aria-label={bubbleOpen ? "Mute speech bubble" : "Show speech bubble"}
            >
              <MessageSquare size={13} />
            </button>
            <a
              href="/lab/mascot/"
              className="mascot-ctrl-btn guide-link"
              title="Read Mascot Guide"
              aria-label="Make your own mascot guide"
            >
              <Sparkles size={13} />
            </a>
            <button
              type="button"
              className="mascot-ctrl-btn"
              onClick={() => setMinimized(!minimized)}
              title="Minimize mascot"
              aria-label="Minimize mascot"
            >
              <X size={13} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

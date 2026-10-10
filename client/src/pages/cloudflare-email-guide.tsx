import { useState } from "react";
import {
  Navigation,
  Footer,
  Arrow,
  SectionHeading,
} from "../components/platform-layout";
import { BitsText, BitsControl } from "../components/reactbits/experience";
import {
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Mail,
  Server,
  Zap,
  Lock,
  Send,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react";

const PROMPTS = {
  dnsSetup: `I am setting up free custom domain email routing on Cloudflare for my domain [yourdomain.com] to forward to my Gmail [yourname@gmail.com].

Please give me:
1. The exact DNS records (MX, TXT SPF, TXT DMARC) I need to add to Cloudflare.
2. The SPF record that allows BOTH Cloudflare Email Routing (for receiving) AND Gmail SMTP / Resend (for sending).
3. A strict DMARC record to protect my domain from email spoofing.
4. Step-by-step instructions to configure Gmail "Send mail as" using a Google App Password so my outgoing emails show "From: hello@yourdomain.com" with zero monthly cost.`,

  gmailConfig: `Help me configure Gmail "Send mail as" with a Google App Password:
- My personal Gmail: [yourname@gmail.com]
- My custom domain email: [hello@yourdomain.com]
- SMTP Host: smtp.gmail.com
- Port: 587 (TLS)

Provide a quick 5-step checklist to generate the 16-character Google App Password and complete the Gmail account settings dialog.`,
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
      aria-label={copied ? "Copied to clipboard" : "Copy configuration"}
    >
      {copied ? (
        <>
          <Check size={14} /> Copied
        </>
      ) : (
        <>
          <Copy size={14} /> Copy snippet
        </>
      )}
    </button>
  );
}

export default function CloudflareEmailGuide() {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (step: number) => {
    setCheckedSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const steps = [
    { id: 1, label: "Enable Cloudflare Email Routing & auto-apply MX records" },
    { id: 2, label: "Create custom alias (hello@yourdomain.com) & verify Gmail destination" },
    { id: 3, label: "Enable Google 2-Step Verification & create 16-char App Password" },
    { id: 4, label: "Add 'Send mail as' in Gmail Settings (smtp.gmail.com : 587)" },
    { id: 5, label: "Publish combined SPF & DMARC DNS records for 10/10 deliverability" },
  ];

  return (
    <>
      <Navigation />
      <main id="main" className="guide-page">
        {/* Hero Header */}
        <header className="guide-hero">
          <div className="guide-hero-badge">
            <span>LAB FIELDGUIDE · 10 MIN CONFIGURATION</span>
            <span>$0/MO FOREVER</span>
          </div>
          <BitsText as="h1" className="guide-title">
            Get a free custom domain email <em>forever with Cloudflare &amp; Gmail.</em>
          </BitsText>
          <p className="guide-lead">
            Stop paying $6–$10/month for Google Workspace or Microsoft 365 just for a professional address.
            Receive incoming emails at <code>hello@yourdomain.com</code> in your personal Gmail and send two-way replies with 100% deliverability for $0/year.
          </p>
          <div className="guide-meta-strip">
            <span>Engineering fieldguide by Ayush Singh</span>
            <span>·</span>
            <span>Cloudflare Edge DNS &amp; Google SMTP</span>
            <span>·</span>
            <span>Theme-Matched: AMOLED &amp; Warm Paper</span>
          </div>
        </header>

        {/* Value & Architecture Comparison */}
        <section className="section guide-section">
          <div className="guide-step-tag">01 / ARCHITECTURE &amp; COST BENEFIT</div>
          <BitsText as="h2">Why pay $72/year per mailbox?</BitsText>
          <p className="guide-body">
            Paid email suites charge per user per month. Cloudflare provides enterprise edge mail routing for free, handling spam filtering and TLS termination before forwarding to your trusted Gmail account.
          </p>

          <div className="guide-paths-grid">
            <article className="guide-path-card">
              <span className="guide-path-badge">PAID WORKSPACE ($72–$144/YR)</span>
              <BitsText as="h3">Google Workspace</BitsText>
              <p>
                Charges $6–$12/month per seat. Managing multiple aliases or staging mailboxes scales costs quickly for solo engineers and small teams.
              </p>
            </article>

            <article className="guide-path-card featured">
              <span className="guide-path-badge">OUR ARCHITECTURE · $0/YR</span>
              <BitsText as="h3">Cloudflare + Gmail</BitsText>
              <p>
                Receive on unlimited domain aliases (<code>hello@</code>, <code>jobs@</code>, <code>billing@</code>) routed straight to your existing Gmail. Reply directly with custom domain headers.
              </p>
            </article>

            <article className="guide-path-card">
              <span className="guide-path-badge">DELIVERABILITY</span>
              <BitsText as="h3">Anti-Spam &amp; DMARC</BitsText>
              <p>
                Uses Google’s high-reputation outbound IP pools coupled with Cloudflare DNS-enforced SPF and DMARC alignments for pristine inboxing.
              </p>
            </article>
          </div>
        </section>

        {/* Interactive Progress Checklist */}
        <section className="section guide-section">
          <div className="guide-step-tag">02 / INTERACTIVE SETUP TRACKER</div>
          <BitsText as="h2">Step-by-step checklist.</BitsText>
          <p className="guide-body">
            Follow along in your Cloudflare and Google account settings. Check off each step as you complete it:
          </p>

          <div className="sandbox-card" style={{ gridTemplateColumns: "1fr" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {steps.map((s) => (
                <label
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    cursor: "pointer",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: checkedSteps[s.id]
                      ? "var(--color-accent-soft)"
                      : "var(--color-surface-soft)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedSteps[s.id]}
                    onChange={() => toggleStep(s.id)}
                    style={{
                      width: "18px",
                      height: "18px",
                      accentColor: "var(--color-accent)",
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      textDecoration: checkedSteps[s.id] ? "line-through" : "none",
                      opacity: checkedSteps[s.id] ? 0.7 : 1,
                    }}
                  >
                    Step {s.id}: {s.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Step 1: Cloudflare Email Routing Activation */}
        <section className="section guide-section">
          <div className="guide-step-tag">03 / INCOMING ROUTING CONFIGURATION</div>
          <BitsText as="h2">1. Enable Cloudflare Email Routing.</BitsText>
          <p className="guide-body">
            Log in to the{" "}
            <a
              href="https://dash.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Cloudflare Dashboard <ExternalLink size={14} />
            </a>
            , select your domain, and click <strong>Email</strong> → <strong>Email Routing</strong>.
          </p>

          <div className="guide-steps-list">
            <div className="guide-step-item">
              <span className="step-num">1</span>
              <div>
                <BitsText as="h3">Add Destination Address</BitsText>
                <p>
                  Under <em>Destination addresses</em>, add your personal Gmail address (e.g. <code>yourname@gmail.com</code>). Cloudflare will send a verification link to that inbox. Click the link to verify.
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">2</span>
              <div>
                <BitsText as="h3">Create Custom Address</BitsText>
                <p>
                  Under <em>Custom addresses</em>, click <strong>Create address</strong>. Enter <code>hello</code> (or <code>contact</code>) and set the action to <em>Send to yourname@gmail.com</em>.
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">3</span>
              <div>
                <BitsText as="h3">Auto-Apply DNS Records</BitsText>
                <p>
                  Cloudflare will prompt to automatically insert 3 MX records and 1 SPF TXT record into your DNS table with a single click.
                </p>
              </div>
            </div>
          </div>

          <div className="reactions-table-wrap" style={{ marginTop: "32px" }}>
            <table className="reactions-table" aria-label="Required DNS MX Records">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Name</th>
                  <th scope="col">Value / Target</th>
                  <th scope="col">Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>MX</code></td>
                  <td><code>@</code></td>
                  <td><code>route1.mx.cloudflare.net</code></td>
                  <td>48</td>
                </tr>
                <tr>
                  <td><code>MX</code></td>
                  <td><code>@</code></td>
                  <td><code>route2.mx.cloudflare.net</code></td>
                  <td>55</td>
                </tr>
                <tr>
                  <td><code>MX</code></td>
                  <td><code>@</code></td>
                  <td><code>route3.mx.cloudflare.net</code></td>
                  <td>78</td>
                </tr>
                <tr>
                  <td><code>TXT</code></td>
                  <td><code>@</code></td>
                  <td><code>v=spf1 include:_spf.mx.cloudflare.net ~all</code></td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 2: Send Mail As Configuration */}
        <section className="section guide-section">
          <div className="guide-step-tag">04 / OUTGOING TWO-WAY SENDING</div>
          <BitsText as="h2">2. Send from hello@yourdomain.com inside Gmail.</BitsText>
          <p className="guide-body">
            Now you can receive emails. But when you reply, you want your reply to say{" "}
            <strong>From: hello@yourdomain.com</strong> instead of your personal Gmail. Here is how to configure free outgoing SMTP in 3 minutes:
          </p>

          <div className="guide-steps-list">
            <div className="guide-step-item">
              <span className="step-num">A</span>
              <div>
                <BitsText as="h3">Generate a Google App Password</BitsText>
                <p>
                  1. Visit <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-link">Google Account Security <ExternalLink size={14} /></a> and ensure <strong>2-Step Verification</strong> is ON.<br />
                  2. Search for <strong>App passwords</strong> (or visit <code>myaccount.google.com/apppasswords</code>).<br />
                  3. Create a new App Password named <em>"Cloudflare Custom Email"</em>.<br />
                  4. Copy the generated 16-character code (e.g. <code>abcd efgh ijkl mnop</code>).
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">B</span>
              <div>
                <BitsText as="h3">Add 'Send mail as' in Gmail</BitsText>
                <p>
                  1. Open Gmail → <strong>Settings (Gear icon)</strong> → <strong>See all settings</strong> → <strong>Accounts and Import</strong>.<br />
                  2. In the <em>"Send mail as:"</em> section, click <strong>Add another email address</strong>.<br />
                  3. Enter your Name and your custom email (e.g. <code>hello@yourdomain.com</code>). <strong>Uncheck</strong> <em>"Treat as an alias"</em>.<br />
                  4. Click <strong>Next Step</strong>.
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">C</span>
              <div>
                <BitsText as="h3">Fill in SMTP Server Credentials</BitsText>
                <p>
                  - <strong>SMTP Server:</strong> <code>smtp.gmail.com</code><br />
                  - <strong>Port:</strong> <code>587</code><br />
                  - <strong>Username:</strong> Your personal Gmail address (e.g. <code>yourname@gmail.com</code>)<br />
                  - <strong>Password:</strong> The 16-character Google App Password created in step A.<br />
                  - <strong>Secured connection:</strong> TLS (recommended).
                </p>
              </div>
            </div>

            <div className="guide-step-item">
              <span className="step-num">D</span>
              <div>
                <BitsText as="h3">Verify Confirmation Code</BitsText>
                <p>
                  Google will send a confirmation code to <code>hello@yourdomain.com</code>. Because Cloudflare is already forwarding to your Gmail, the code will land in your inbox within seconds! Enter the code to confirm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Anti-Spam, SPF, DKIM, & DMARC */}
        <section className="section guide-section">
          <div className="guide-step-tag">05 / DELIVERABILITY &amp; SECURITY</div>
          <BitsText as="h2">3. Hardening SPF &amp; DMARC for 10/10 Inboxing.</BitsText>
          <p className="guide-body">
            Major mail providers (Google, Yahoo, Apple Mail) enforce strict authentication. Because you are receiving via Cloudflare and sending via Google SMTP, combine both in your SPF record so neither flags your emails as spoofed:
          </p>

          <div className="reactions-table-wrap">
            <table className="reactions-table" aria-label="Security DNS Records">
              <thead>
                <tr>
                  <th scope="col">Record</th>
                  <th scope="col">Name</th>
                  <th scope="col">Value</th>
                  <th scope="col">Why it's essential</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>TXT</code></td>
                  <td><code>@</code></td>
                  <td><code>v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all</code></td>
                  <td>Authorizes both Cloudflare routing and Google's outbound SMTP servers.</td>
                </tr>
                <tr>
                  <td><code>TXT</code></td>
                  <td><code>_dmarc</code></td>
                  <td><code>v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com</code></td>
                  <td>Protects your brand domain from phishing and impersonation attacks.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="code-block-card" style={{ marginTop: "32px" }}>
            <div className="code-block-header">
              <span>PROMPT · CLOUDFLARE DNS &amp; DMARC GENERATOR PROMPT</span>
              <CopyButton text={PROMPTS.dnsSetup} />
            </div>
            <pre className="code-block-content">
              <code>{PROMPTS.dnsSetup}</code>
            </pre>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="section guide-section">
          <div className="guide-step-tag">06 / TROUBLESHOOTING &amp; FAQS</div>
          <BitsText as="h2">Common questions.</BitsText>

          <div className="specs-grid">
            <div className="spec-item">
              <BitsText as="h3">Will my personal Gmail leak?</BitsText>
              <p>
                When sending via Google SMTP with App Passwords, the <code>From:</code> header displays your custom domain (e.g. <code>hello@yourdomain.com</code>). Most recipients only see your professional domain address.
              </p>
            </div>

            <div className="spec-item">
              <BitsText as="h3">Can I have multiple aliases?</BitsText>
              <p>
                Yes! You can configure unlimited aliases in Cloudflare (<code>contact@</code>, <code>press@</code>, <code>billing@</code>, <code>jobs@</code>) or enable a Catch-all rule to route all incoming mail to the same Gmail.
              </p>
            </div>

            <div className="spec-item">
              <BitsText as="h3">What is the daily sending limit?</BitsText>
              <p>
                Standard free Google accounts allow up to 500 sent emails per day, which is more than enough for portfolios, consultants, and developers.
              </p>
            </div>

            <div className="spec-item">
              <BitsText as="h3">How do I test my deliverability?</BitsText>
              <p>
                Send a test email from your Gmail (selecting your custom domain address) to <a href="https://www.mail-tester.com" target="_blank" rel="noopener noreferrer" className="text-link">mail-tester.com <ExternalLink size={14} /></a>. With the combined SPF and DMARC records above, you will score a perfect 10/10.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="guide-cta-box" style={{ marginTop: "64px" }}>
            <BitsText as="h3">Explore more platform engineering guides</BitsText>
            <p>
              Check out our procedural SVG Mascot Lab with 23 animated moods, or explore production web platform case studies built with TYPO3, PHP, Vue, and Cloudflare.
            </p>
            <div className="guide-cta-actions">
              <BitsControl as="a" className="button primary" href="/lab/mascot/">
                Open Animated Mascot Lab <Arrow />
              </BitsControl>
              <BitsControl as="a" className="text-link" href="/">
                Return to Portfolio <Arrow />
              </BitsControl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

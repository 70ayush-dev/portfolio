import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  console.log("Starting asset generation with Playwright...");
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox"],
  });

  const spaceGroteskPath = path.resolve("node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2");
  const spaceGrotesk700Path = path.resolve("node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2");
  const sourceSansPath = path.resolve("node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2");
  const sourceSans600Path = path.resolve("node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff2");

  const fontSpace600Base64 = (await readFile(spaceGroteskPath)).toString("base64");
  const fontSpace700Base64 = (await readFile(spaceGrotesk700Path)).toString("base64");
  const fontSource400Base64 = (await readFile(sourceSansPath)).toString("base64");
  const fontSource600Base64 = (await readFile(sourceSans600Path)).toString("base64");

  const fontFaces = `
    @font-face {
      font-family: 'Space Grotesk';
      font-weight: 600;
      src: url('data:font/woff2;base64,${fontSpace600Base64}') format('woff2');
    }
    @font-face {
      font-family: 'Space Grotesk';
      font-weight: 700;
      src: url('data:font/woff2;base64,${fontSpace700Base64}') format('woff2');
    }
    @font-face {
      font-family: 'Source Sans 3';
      font-weight: 400;
      src: url('data:font/woff2;base64,${fontSource400Base64}') format('woff2');
    }
    @font-face {
      font-family: 'Source Sans 3';
      font-weight: 600;
      src: url('data:font/woff2;base64,${fontSource600Base64}') format('woff2');
    }
  `;

  // 1. Generate OG Image (1200 x 630)
  const ogHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${fontFaces}
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background-color: #030608;
      color: #f7f5ef;
      font-family: 'Source Sans 3', sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 72px;
    }
    /* Technical Blueprint Grid */
    .bg-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(150, 173, 255, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(150, 173, 255, 0.045) 1px, transparent 1px);
      background-size: 44px 44px;
      pointer-events: none;
    }
    /* Ambient Glows */
    .glow-top {
      position: absolute;
      top: -120px;
      right: 100px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(35, 73, 198, 0.28) 0%, rgba(35, 73, 198, 0.05) 50%, transparent 70%);
      pointer-events: none;
      filter: blur(40px);
    }
    .glow-bottom {
      position: absolute;
      bottom: -150px;
      left: 150px;
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, rgba(150, 173, 255, 0.16) 0%, transparent 65%);
      pointer-events: none;
      filter: blur(50px);
    }
    /* Header Row */
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 2;
    }
    .brand {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #f7f5ef;
    }
    .brand-dot {
      color: #96adff;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 18px;
      background: rgba(24, 33, 38, 0.7);
      border: 1px solid #39464d;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #96adff;
      backdrop-filter: blur(8px);
    }
    .status-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #8ed7ac;
      box-shadow: 0 0 10px #8ed7ac;
    }
    /* Main Content */
    .main-content {
      position: relative;
      z-index: 2;
      margin-top: 10px;
    }
    .role-tag {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #96adff;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .role-tag::before {
      content: "";
      width: 24px;
      height: 2px;
      background: #96adff;
    }
    .headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 56px;
      font-weight: 700;
      line-height: 1.12;
      letter-spacing: -0.035em;
      color: #f7f5ef;
      max-width: 980px;
      margin-bottom: 20px;
    }
    .headline span {
      background: linear-gradient(135deg, #96adff 0%, #ffffff 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subhead {
      font-size: 23px;
      color: #c0cdd2;
      line-height: 1.45;
      max-width: 880px;
      font-weight: 400;
    }

    /* Architecture Flow Strip */
    .arch-flow {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 24px;
    }
    .arch-node {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(16, 22, 25, 0.85);
      border: 1px solid #39464d;
      border-radius: 6px;
      font-size: 14px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      color: #f7f5ef;
    }
    .arch-node-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #96adff;
    }
    .arch-arrow {
      color: #819398;
      font-size: 14px;
    }

    /* Bottom Row */
    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
      z-index: 2;
      padding-top: 24px;
      border-top: 1px solid rgba(57, 70, 77, 0.7);
    }
    .tech-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      max-width: 820px;
    }
    .tech-pill {
      font-size: 13.5px;
      font-weight: 600;
      padding: 4px 12px;
      background: rgba(24, 33, 38, 0.6);
      border: 1px solid rgba(81, 147, 152, 0.35);
      border-radius: 4px;
      color: #c0cdd2;
    }
    .tech-pill.highlight {
      background: rgba(41, 57, 80, 0.6);
      border-color: rgba(150, 173, 255, 0.5);
      color: #96adff;
    }
    .domain-block {
      text-align: right;
    }
    .domain-url {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #f7f5ef;
      letter-spacing: -0.02em;
    }
    .domain-sub {
      font-size: 13px;
      color: #819398;
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="glow-top"></div>
  <div class="glow-bottom"></div>

  <div class="header-row">
    <div class="brand">Ayush Singh<span class="brand-dot">.</span></div>
    <div class="badge">
      <span class="status-pulse"></span>
      Web Platform Engineer
    </div>
  </div>

  <div class="main-content">
    <div class="role-tag">Engineering Fieldnotes · Enterprise CMS & Platforms</div>
    <h1 class="headline">Building the systems behind <span>modern web</span> experiences.</h1>
    <p class="subhead">CMS architecture, headless integrations, and search-ready engineering designed for performance and scale.</p>

    <div class="arch-flow">
      <div class="arch-node"><span class="arch-node-dot"></span>TYPO3 CMS</div>
      <span class="arch-arrow">→</span>
      <div class="arch-node"><span class="arch-node-dot"></span>PHP / REST APIs</div>
      <span class="arch-arrow">→</span>
      <div class="arch-node"><span class="arch-node-dot"></span>Nuxt / Vue</div>
      <span class="arch-arrow">→</span>
      <div class="arch-node"><span class="arch-node-dot"></span>AI & Search (AEO/GEO)</div>
    </div>
  </div>

  <div class="bottom-row">
    <div class="tech-strip">
      <span class="tech-pill highlight">TYPO3</span>
      <span class="tech-pill highlight">PHP</span>
      <span class="tech-pill">Python</span>
      <span class="tech-pill">Node.js</span>
      <span class="tech-pill">Vue / Nuxt</span>
      <span class="tech-pill highlight">Technical SEO</span>
      <span class="tech-pill highlight">AEO & GEO</span>
      <span class="tech-pill">AI Automations</span>
      <span class="tech-pill">REST APIs</span>
    </div>
    <div class="domain-block">
      <div class="domain-url">ayush404.in</div>
      <div class="domain-sub">Bhavnagar, India · Global Teams</div>
    </div>
  </div>
</body>
</html>`;

  // Render OG Image
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2, // 2x high DPI rendering
  });
  await page.setContent(ogHtml, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const ogBuffer = await page.screenshot({ type: "png" });
  await writeFile("client/public/og-image.png", ogBuffer);
  console.log("✓ Saved client/public/og-image.png (1200x630 @ 2x)");
  await page.close();

  // 2. Generate Apple Touch Icon (180x180) & Favicon (512x512)
  const iconHtml = (size) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${fontFaces}
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${size}px;
      height: ${size}px;
      background: #020507;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .squircle {
      width: ${Math.round(size * 0.94)}px;
      height: ${Math.round(size * 0.94)}px;
      background: linear-gradient(145deg, #10161a 0%, #030608 100%);
      border: ${Math.max(1.5, Math.round(size * 0.025))}px solid rgba(150, 173, 255, 0.35);
      border-radius: ${Math.round(size * 0.22)}px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 ${Math.round(size * 0.04)}px ${Math.round(size * 0.08)}px rgba(0, 0, 0, 0.5);
    }
    .monogram {
      font-family: 'Space Grotesk', sans-serif;
      font-size: ${Math.round(size * 0.44)}px;
      font-weight: 700;
      letter-spacing: -0.06em;
      color: #f7f5ef;
      display: flex;
      align-items: baseline;
      transform: translateX(-${Math.round(size * 0.015)}px);
    }
    .dot {
      color: #96adff;
      font-size: ${Math.round(size * 0.48)}px;
      margin-left: ${Math.round(size * 0.01)}px;
    }
  </style>
</head>
<body>
  <div class="squircle">
    <div class="monogram">AS<span class="dot">.</span></div>
  </div>
</body>
</html>`;

  // Render Apple Touch Icon (180x180)
  const iconPage = await browser.newPage({
    viewport: { width: 180, height: 180 },
    deviceScaleFactor: 2,
  });
  await iconPage.setContent(iconHtml(180), { waitUntil: "networkidle" });
  await iconPage.evaluate(() => document.fonts.ready);
  const appleBuffer = await iconPage.screenshot({ type: "png" });
  await writeFile("client/public/apple-touch-icon.png", appleBuffer);
  console.log("✓ Saved client/public/apple-touch-icon.png (180x180)");

  // Render favicon.png (48x48 downscaled)
  await iconPage.setViewportSize({ width: 48, height: 48 });
  await iconPage.setContent(iconHtml(48), { waitUntil: "networkidle" });
  await iconPage.evaluate(() => document.fonts.ready);
  const favBuffer = await iconPage.screenshot({ type: "png" });
  await writeFile("client/public/favicon.png", favBuffer);
  console.log("✓ Saved client/public/favicon.png (48x48)");
  await iconPage.close();

  await browser.close();
  console.log("Asset generation complete!");
}

main().catch((err) => {
  console.error("Error generating assets:", err);
  process.exit(1);
});

import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { readFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const errors = [];
const base = process.env.PORTFOLIO_TEST_URL || "http://localhost:5173";
try {
  await mkdir(".impeccable/review", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "light",
  });
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.abort(),
  );
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: ".impeccable/review/desktop.png" });
  await page.screenshot({
    path: ".impeccable/review/desktop-full.png",
    fullPage: true,
  });
  await page.screenshot({ path: "/tmp/ayush-desktop.png", fullPage: true });
  await page
    .locator("#search")
    .screenshot({ path: "/tmp/ayush-search-section.png" });
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await page.waitForFunction(
    () =>
      document.documentElement.dataset.theme === "dark" &&
      !document.querySelector(".theme-toggle").disabled,
  );
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.body).backgroundColor),
    "rgb(0, 0, 0)",
  );
  assert.equal(
    await page.evaluate(() => localStorage.getItem("ayush404-theme")),
    "dark",
  );
  assert.equal(
    await page
      .getByRole("button", { name: "Toggle color theme" })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({ path: ".impeccable/review/desktop-dark.png" });
  await page.screenshot({
    path: ".impeccable/review/desktop-dark-full.png",
    fullPage: true,
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(
    await page.evaluate(() => document.documentElement.dataset.theme),
    "dark",
  );
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await page.waitForFunction(
    () => document.documentElement.dataset.theme === "light",
  );
  await page.getByRole("button", { name: /NUXT/ }).focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await page
      .getByRole("button", { name: /AI Practical/ })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.getByRole("button", { name: /NUXT/ }).click();
  assert.match(
    await page.locator(".map-description").innerText(),
    /Vue components/,
  );
  await page
    .getByRole("link", { name: "Explore case study" })
    .first()
    .click({ noWaitAfter: true });
  await page
    .getByRole("heading", { level: 1, name: /Der Autoputzer/ })
    .waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: ".impeccable/review/case-study.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: ".impeccable/review/mobile-hero.png" });
  await page.screenshot({
    path: ".impeccable/review/mobile.png",
    fullPage: true,
  });

  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await page.waitForFunction(
    () => document.documentElement.dataset.theme === "dark",
  );
  await page.screenshot({ path: ".impeccable/review/mobile-dark-hero.png" });
  await page.screenshot({
    path: ".impeccable/review/mobile-dark.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await page.waitForFunction(
    () => document.documentElement.dataset.theme === "light",
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Engineering", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.screenshot({ path: "/tmp/ayush-mobile.png", fullPage: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  assert.equal(await page.locator("canvas").count(), 0);
  await page
    .locator("summary")
    .filter({ hasText: "Who is Ayush Singh?" })
    .click();
  assert.equal(
    await page
      .locator("details")
      .filter({ hasText: "Who is Ayush Singh?" })
      .getAttribute("open"),
    "",
  );
  for (const width of [320, 720, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `overflow at ${width}px`,
    );
  }
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await noJs.newPage();
  await staticPage.route("https://www.googletagmanager.com/**", (route) =>
    route.abort(),
  );
  await staticPage.goto(base + "/", { waitUntil: "domcontentloaded" });
  assert.ok(await staticPage.getByRole("heading", { level: 1 }).isVisible());
  assert.ok(await staticPage.locator("#search").isVisible());
  await noJs.close();
  await page.goto(base + "/not-a-page", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "Back to overview" }).waitFor();
  await page.screenshot({ path: ".impeccable/review/404.png" });
  assert.deepEqual(errors, []);
  const home = await readFile("dist/index.html", "utf8");
  const llms = await readFile("dist/llms.txt", "utf8");
  assert.match(llms, /^# .+/m);
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  const robots = await readFile("dist/robots.txt", "utf8");
  assert.match(robots, /Sitemap: https:\/\/ayush404\.in\/sitemap\.xml/);
  const pageLinks = [...llms.matchAll(/\]\((https:\/\/ayush404\.in\/[^)]*)\)/g)]
    .map((match) => match[1]);
  assert.ok(pageLinks.length >= 6);
  for (const url of pageLinks) {
    const path = new URL(url).pathname;
    const output = path === "/" ? "dist/index.html"
      : path.endsWith("/") ? `dist${path}index.html` : `dist${path}`;
    await readFile(output);
    if (path.endsWith("/")) assert.ok(sitemap.includes(url.split("#")[0]));
  }
  assert.match(home, /Systems, not just websites/);
  assert.match(home, /application\/ld\+json/);
  assert.match(home, /Web Platform Engineer/);
  assert.doesNotMatch(home, /Senior PHP/);
  assert.match(home, /Search-ready web platforms/);
  assert.match(home, /Search &amp; AI Visibility Engineering/);
  assert.match(home, /Answer Engine Optimization/);
  assert.match(home, /Generative Engine Optimization/);
  const schema = JSON.parse(
    home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  const person = schema["@graph"].find((item) => item["@type"] === "Person");
  assert.equal(person.jobTitle, "Web Platform Engineer");
  for (const skill of ["Technical SEO", "AEO", "GEO"])
    assert.ok(person.knowsAbout.includes(skill));
  assert.ok(schema["@graph"].some((item) => item["@type"] === "WebPage"));
  assert.ok(home.indexOf('id="engineering"') < home.indexOf('id="search"'));
  assert.ok(home.indexOf('id="search"') < home.indexOf('id="lab"'));
  for (const slug of [
    "der-autoputzer",
    "typo3-ai-chatbot",
    "migration-assistant",
    "crm-system",
    "content-block-system",
  ]) {
    const html = await readFile(`dist/work/${slug}/index.html`, "utf8");
    assert.match(html, new RegExp(`https://ayush404.in/work/${slug}/`));
    assert.match(html, /CreativeWork/);
    assert.match(html, /BreadcrumbList/);
    assert.match(html, /Implementation &amp; engineering decisions/);
  }
  console.log(
    "Passed: desktop/mobile overflow, menu, system map, case-study navigation, FAQ, reduced motion, 404, theme switching/persistence, keyboard diagram navigation, narrow-screen reflow, JavaScript-disabled content, browser errors and static SEO pages.",
  );
} finally {
  await browser.close();
}

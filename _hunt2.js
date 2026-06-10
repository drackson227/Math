const { chromium } = require("C:/Users/ryant/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright");
const { pathToFileURL } = require("url");
const path = require("path");

(async () => {
  const errors = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push("PAGEERR: " + e.message));
  const url = pathToFileURL(path.resolve("index.html")).href;
  await page.goto(url);
  await page.waitForTimeout(1300);
  await page.evaluate(() => { const o = document.getElementById("welcome-overlay"); if (o) o.remove(); });

  // dup-ID check after switching through every subject
  const subjects = ["maths", "francais", "anglais", "neerlandais", "histoire", "geo", "chimie", "bio", "eco"];
  const dupReport = {};
  for (const s of subjects) {
    await page.evaluate(k => setSubject(k), s);
    await page.waitForTimeout(200);
    const dups = await page.evaluate(() => {
      const ids = {}; document.querySelectorAll("[id]").forEach(e => { ids[e.id] = (ids[e.id] || 0) + 1; });
      return Object.entries(ids).filter(([k, v]) => v > 1).map(([k, v]) => k + "(" + v + ")");
    });
    if (dups.length) dupReport[s] = dups;
  }

  // quiz result screen actually renders?
  await page.evaluate(() => setSubject("maths"));
  await page.waitForTimeout(200);
  await page.evaluate(() => { showSection("quiz"); filterQuiz(); startQuiz(); });
  await page.waitForTimeout(300);
  // answer all questions by clicking option then next, until summary
  let guard = 0;
  while (guard++ < 30) {
    const done = await page.evaluate(() => {
      const active = document.getElementById("quiz-active-screen");
      if (!active || active.style.display === "none") return "noactive";
      const hasSummary = !!document.querySelector("#quiz-container .formula-box, #quiz-container .quiz-summary, #quiz-result");
      if (hasSummary) return "summary";
      const opts = document.querySelectorAll("#quiz-container .opt");
      if (opts[0] && !opts[0].classList.contains("answered") && !document.querySelector("#quiz-container .opt.correct,#quiz-container .opt.wrong")) { opts[0].click(); return "answered"; }
      const next = [...document.querySelectorAll("#quiz-container button, #quiz-active-screen button")].find(b => /suivant|continuer|question/i.test(b.textContent));
      if (next) { next.click(); return "next"; }
      return "stuck";
    });
    await page.waitForTimeout(120);
    if (done === "summary" || done === "noactive" || done === "stuck") { console.log("quiz loop ended:", done, "after", guard); break; }
  }
  const quizEnd = await page.evaluate(() => {
    const c = document.getElementById("quiz-container");
    return { html: c ? c.innerHTML.slice(0, 60) : null, hasResult: !!document.querySelector("#quiz-container .formula-box, #quiz-result, .quiz-summary") };
  });

  console.log("DUP IDs per subject:", JSON.stringify(dupReport));
  console.log("QUIZ end state:", JSON.stringify(quizEnd));
  console.log("ERRORS:", errors.length, JSON.stringify([...new Set(errors)].slice(0, 8)));
  await browser.close();
})();

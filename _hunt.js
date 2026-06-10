const { chromium } = require("C:/Users/ryant/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright");
const { pathToFileURL } = require("url");
const path = require("path");

(async () => {
  const errors = [];
  const log = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push("PAGEERR: " + e.message));
  const url = pathToFileURL(path.resolve("index.html")).href;
  await page.goto(url);
  await page.waitForTimeout(1300);
  await page.evaluate(() => { const o = document.getElementById("welcome-overlay"); if (o) o.remove(); });

  async function step(name, fn) {
    const before = errors.length;
    try { await fn(); } catch (e) { errors.push("STEP[" + name + "] threw: " + e.message); }
    await page.waitForTimeout(120);
    log.push(name + (errors.length > before ? "  <-- ERROR" : "  ok"));
  }

  // ===== QUIZ: full run =====
  await step("quiz: open", () => page.evaluate(() => showSection("quiz")));
  await step("quiz: filter all", () => page.evaluate(() => { if (typeof filterQuiz === "function") filterQuiz(); }));
  await step("quiz: start", () => page.evaluate(() => { if (typeof startQuiz === "function") startQuiz(); }));
  // answer 8 questions by clicking first option each time
  for (let i = 0; i < 10; i++) {
    await step("quiz: answer " + i, async () => {
      await page.evaluate(() => {
        const opts = document.querySelectorAll("#quiz-container .opt, #quiz-active-screen .opt");
        if (opts[0]) opts[0].click();
        const next = [...document.querySelectorAll("button")].find(b => /suivant|valider|continuer/i.test(b.textContent));
        if (next) next.click();
      });
    });
  }

  // ===== FLASHCARDS =====
  await step("flashcards: open", () => page.evaluate(() => showSection("flashcards")));
  await step("flashcards: init", () => page.evaluate(() => { if (typeof initFlashcards === "function") initFlashcards(); }));
  await step("flashcards: flip", () => page.evaluate(() => { if (typeof flipFlashcard === "function") flipFlashcard(); const w = document.querySelector(".flashcard-wrapper, .flashcard"); if (w) w.click(); }));
  await step("flashcards: rate good", () => page.evaluate(() => { if (typeof rateCard === "function") rateCard(3); }));
  await step("flashcards: rate again", () => page.evaluate(() => { if (typeof rateCard === "function") rateCard(1); }));

  // ===== GENERATOR =====
  await step("generator: open exercices", () => page.evaluate(() => showSection("exercices")));
  await step("generator: genInit", () => page.evaluate(() => { if (typeof genInit === "function") genInit(); }));
  await step("generator: new exo", () => page.evaluate(() => { if (typeof genNewExercise === "function") genNewExercise(); else if (typeof generateExercise === "function") generateExercise(); }));

  // ===== SEARCH =====
  await step("search: open", () => page.evaluate(() => { if (typeof openSearch === "function") openSearch(); }));
  await step("search: type", async () => { await page.evaluate(() => { const i = document.querySelector("#search-input, #global-search-input, input[placeholder*=echerch]"); if (i) { i.value = "vecteur"; i.dispatchEvent(new Event("input", { bubbles: true })); } }); });
  await step("search: close", () => page.evaluate(() => { if (typeof closeSearch === "function") closeSearch(); const o = document.querySelector(".search-overlay, #search-overlay"); if (o) o.remove(); }));

  // ===== SUBJECT SWITCH MID-QUIZ (classic bug source) =====
  await step("switch: start quiz maths", () => page.evaluate(() => { showSection("quiz"); if (typeof filterQuiz === "function") filterQuiz(); if (typeof startQuiz === "function") startQuiz(); }));
  await step("switch: to chimie mid-quiz", () => page.evaluate(() => setSubject("chimie")));
  await step("switch: chimie quiz", () => page.evaluate(() => { showSection("quiz"); if (typeof filterQuiz === "function") filterQuiz(); if (typeof startQuiz === "function") startQuiz(); }));
  await step("switch: to neerlandais", () => page.evaluate(() => setSubject("neerlandais")));
  await step("switch: NL quiz", () => page.evaluate(() => { showSection("quiz"); if (typeof filterQuiz === "function") filterQuiz(); if (typeof startQuiz === "function") startQuiz(); }));

  // ===== EXAM MODE =====
  await step("exam: back to maths", () => page.evaluate(() => setSubject("maths")));
  await step("exam: toggle exam", () => page.evaluate(() => { showSection("quiz"); if (typeof startExam === "function") startExam(); else if (typeof toggleExam === "function") toggleExam(); }));

  // ===== NEW FEATURES =====
  await step("examTimer: open+start", () => page.evaluate(() => { if (typeof openExamTimer === "function") openExamTimer(); if (typeof startExamTimer === "function") startExamTimer(1); }));
  await step("gap: NL fill", () => page.evaluate(() => { setSubject("neerlandais"); showSection("extra1"); if (typeof nlGapGen === "function") nlGapGen(); if (typeof nlGapCheck === "function") nlGapCheck(); if (typeof nlGapReveal === "function") nlGapReveal(); }));
  await step("nlText: save", () => page.evaluate(() => { const ta = document.getElementById("nl-my-text"); if (ta) { ta.value = "test"; } if (typeof nlTextSave === "function") nlTextSave(); }));

  // ===== THEMES / SETTINGS =====
  await step("theme: forest", () => page.evaluate(() => { if (typeof setTheme === "function") setTheme("forest"); }));
  await step("theme: ocean", () => page.evaluate(() => { if (typeof setTheme === "function") setTheme("ocean"); }));
  await step("anim: low", () => page.evaluate(() => { if (typeof setAnimLevel === "function") setAnimLevel("low"); }));
  await step("textsize: large", () => page.evaluate(() => { if (typeof setTextSize === "function") setTextSize("large"); }));
  await step("bg: none", () => page.evaluate(() => { if (typeof setBgEffect === "function") setBgEffect("none"); }));

  console.log("=== STEP LOG ===");
  console.log(log.join("\n"));
  console.log("\n=== ERRORS (" + errors.length + ") ===");
  console.log([...new Set(errors)].join("\n"));
  await browser.close();
})();

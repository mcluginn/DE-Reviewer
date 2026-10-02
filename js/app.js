/**
 * Differential Equations for Engineers - Main Application Controller
 * Handles routing, topic browsing, algorithmic practice generator, formula sheet, and interactive simulations.
 */

import { TOPICS } from "./data/topics.js";
import { PRACTICE_QUESTIONS } from "./data/practiceQuestions.js";
import { SIMULATIONS } from "./components/simulations.js";
import { CALCULATORS } from "./components/calculators.js";
import { QUIZ } from "./components/quiz.js";
import { DASHBOARD } from "./components/dashboard.js";
import { generateProblem } from "./engine/problemGenerator.js";
import { DE_MATH } from "./engine/deMath.js";

class App {
  constructor() {
    this.currentTab = "home";
    this.activeTopicId = TOPICS[0].id;
    this.currentPracticeProblem = null;
    this.practiceRevealed = { hint: false, step: false, solution: false, answer: false };
    window.renderMath = (el) => this.renderMath(el);
    
    this.init();
  }

  init() {
    this.wireNavigation();
    this.wireSearch();
    this.wireTheme();
    this.renderHomeMastery();
    this.renderFormulaSheet();
    this.renderPracticeMe();
    
    // Default route
    this.switchTab("home");
  }

  wireNavigation() {
    document.querySelectorAll(".nav-link, .hero-btn").forEach(el => {
      el.addEventListener("click", (e) => {
        const tab = el.dataset.tab;
        if (tab) {
          e.preventDefault();
          this.switchTab(tab);
        }
      });
    });

    // Mobile nav toggle
    const toggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("main-nav-menu");
    if (toggle && navMenu) {
      toggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }
  }

  wireTheme() {
    const themeBtn = document.getElementById("btn-theme-toggle");
    if (!themeBtn) return;
    
    const savedTheme = localStorage.getItem("de_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeBtn.textContent = savedTheme === "dark" ? "☀️ Light" : "🌙 Dark";

    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("de_theme", next);
      themeBtn.textContent = next === "dark" ? "☀️ Light" : "🌙 Dark";
    });
  }

  wireSearch() {
    const searchInput = document.getElementById("global-search-input");
    const resultsContainer = document.getElementById("search-results-overlay");
    if (!searchInput || !resultsContainer) return;

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        resultsContainer.style.display = "none";
        resultsContainer.innerHTML = "";
        return;
      }

      // Search topics, formulas, concepts
      const matches = [];
      TOPICS.forEach(t => {
        if (
          t.title.toLowerCase().includes(query) ||
          t.concept.toLowerCase().includes(query) ||
          t.formulaLatex.toLowerCase().includes(query) ||
          t.engineeringContext.toLowerCase().includes(query)
        ) {
          matches.push({ type: "Topic", title: `Topic ${t.number}: ${t.title}`, topicId: t.id });
        }
      });

      PRACTICE_QUESTIONS.forEach(q => {
        if (q.question.toLowerCase().includes(query)) {
          matches.push({ type: "Exam Question", title: `Q${q.number}: ${q.question.substring(0, 75)}...`, qId: q.id });
        }
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div class="search-item text-muted">No matching topics or exam questions found.</div>`;
      } else {
        resultsContainer.innerHTML = matches.slice(0, 8).map(m => `
          <div class="search-item" data-type="${m.type}" data-id="${m.topicId || m.qId}">
            <span class="badge badge-sm badge-accent">${m.type}</span>
            <span class="search-title">${m.title}</span>
          </div>
        `).join("");

        resultsContainer.querySelectorAll(".search-item").forEach(item => {
          item.addEventListener("click", () => {
            const type = item.dataset.type;
            const id = item.dataset.id;
            resultsContainer.style.display = "none";
            searchInput.value = "";

            if (type === "Topic") {
              this.activeTopicId = id;
              this.switchTab("topics");
            } else {
              this.switchTab("quiz");
            }
          });
        });
      }

      resultsContainer.style.display = "block";
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.style.display = "none";
      }
    });
  }

  switchTab(tabId) {
    SIMULATIONS.cleanup();
    this.currentTab = tabId;

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach(l => {
      l.classList.toggle("active", l.dataset.tab === tabId);
    });

    // Hide all sections
    document.querySelectorAll(".view-section").forEach(s => {
      s.style.display = "none";
    });

    // Show active section
    const target = document.getElementById(`view-${tabId}`);
    if (target) {
      target.style.display = "block";
      window.scrollTo(0, 0);
    }

    // Trigger tab-specific initialization
    if (tabId === "home") {
      this.renderHomeMastery();
    } else if (tabId === "topics") {
      this.renderTopicsModule();
    } else if (tabId === "calculators") {
      CALCULATORS.render(document.getElementById("calculators-mount"));
    } else if (tabId === "quiz") {
      QUIZ.init(document.getElementById("quiz-mount"));
    } else if (tabId === "practice") {
      this.renderPracticeMe();
    } else if (tabId === "progress") {
      DASHBOARD.init(document.getElementById("progress-mount"));
    }

    this.renderMath();
  }

  renderHomeMastery() {
    DASHBOARD.load();
    const data = DASHBOARD.data;
    const total = data.totalAttempted;
    const correct = data.totalCorrect;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    const topicsMastered = Object.values(data.topics || {}).filter(t => t.correct > 0).length;
    const streakDays = Math.max(1, Math.min(30, 3 + Math.floor(total / 3)));

    const streakEl = document.getElementById("metric-streak-val");
    if (streakEl) streakEl.textContent = streakDays;

    const masteryEl = document.getElementById("metric-mastery-val");
    if (masteryEl) masteryEl.textContent = `${pct}%`;

    const barEl = document.getElementById("metric-mastery-bar");
    if (barEl) {
      barEl.style.width = `${pct}%`;
      barEl.style.backgroundColor = pct >= 75 ? "var(--emerald-500)" : pct >= 45 ? "var(--amber-500)" : "var(--brass-500)";
    }

    const badgeEl = document.getElementById("metric-mastery-badge");
    if (badgeEl) {
      if (pct >= 85) {
        badgeEl.textContent = "Master";
        badgeEl.className = "badge eng-badge-emerald";
      } else if (pct >= 60) {
        badgeEl.textContent = "Proficient";
        badgeEl.className = "badge eng-badge-amber";
      } else {
        badgeEl.textContent = "Novice";
        badgeEl.className = "badge eng-badge-steel";
      }
    }

    const subEl = document.getElementById("metric-mastery-sub");
    if (subEl) subEl.textContent = `${correct} of ${total} problems mastered`;

    const topEl = document.getElementById("metric-topics-val");
    if (topEl) topEl.textContent = topicsMastered;

    const attEl = document.getElementById("metric-attempts-val");
    if (attEl) attEl.textContent = total;
  }

  renderTopicsModule() {
    const sidebar = document.getElementById("topics-sidebar");
    const content = document.getElementById("topics-content");
    if (!sidebar || !content) return;

    // Render sidebar
    sidebar.innerHTML = `
      <div class="topics-nav-list">
        ${TOPICS.map(t => `
          <button class="topic-nav-btn ${t.id === this.activeTopicId ? 'active' : ''}" data-id="${t.id}">
            <span class="topic-num">${t.number}</span>
            <div class="topic-meta">
              <span class="topic-name">${t.title}</span>
              <span class="topic-cat">${t.category}</span>
            </div>
          </button>
        `).join("")}
      </div>
    `;

    sidebar.querySelectorAll(".topic-nav-btn").forEach(btn => {
      btn.onclick = () => {
        this.activeTopicId = btn.dataset.id;
        this.renderTopicsModule();
      };
    });

    // Render selected topic detail
    const t = TOPICS.find(item => item.id === this.activeTopicId) || TOPICS[0];
    const ex = t.workedExample;

    content.innerHTML = `
      <div class="topic-detail card">
        <div class="topic-detail-header">
          <span class="badge badge-accent">${t.category}</span>
          <span class="topic-number-tag">Topic ${t.number}</span>
          <h2>${t.title}</h2>
          <p class="text-lead">${t.shortDesc}</p>
        </div>

        <!-- Concept -->
        <div class="section-block">
          <h3 class="section-title">💡 Mathematical Concept</h3>
          <div class="concept-body">
            <p>${t.concept.replace(/\n\n/g, "</p><p>")}</p>
          </div>
        </div>

        <!-- Formula Card -->
        <div class="section-block formula-hero-card">
          <h3 class="section-title">📐 Governing Differential Equation</h3>
          <div class="math-hero">$$${t.formulaLatex}$$</div>
          <div class="vars-table-wrapper">
            <table class="vars-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Variable / Function</th>
                  <th>Role / Units</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                ${t.variables.map(v => `
                  <tr>
                    <td><code>${v.symbol}</code></td>
                    <td><strong>${v.name}</strong></td>
                    <td><em>${v.unit}</em></td>
                    <td>${v.description || v.desc}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="usage-note">
            <strong>Condition / When to Use:</strong>
            <p>${t.whenToUse}</p>
          </div>
        </div>

        <!-- Engineering Context -->
        <div class="section-block engineering-card">
          <h3 class="section-title">🛠️ Engineering Application</h3>
          <div>${t.engineeringContext}</div>
        </div>

        <!-- Interactive Diagram / Visual Simulation if available -->
        <div class="section-block sim-block" id="topic-sim-wrapper">
          <h3 class="section-title">🔬 Interactive Direction Field & Trajectory Visualizer</h3>
          <div class="sim-container">
            <canvas id="topic-sim-canvas" width="680" height="280"></canvas>
            <div id="topic-sim-controls" class="sim-controls-panel"></div>
          </div>
        </div>

        <!-- Step-by-Step Worked Example -->
        <div class="section-block worked-example-card">
          <h3 class="section-title">📝 Step-by-Step Worked Example</h3>
          <div class="example-header">
            <h4>${ex.title}</h4>
            <p class="text-muted">${ex.scenario}</p>
          </div>
          <div class="solution-grid">
            <div class="sol-step">
              <span class="sol-tag">1. GIVEN</span>
              <ul>${ex.given.map(g => `<li>$$${g}$$</li>`).join("")}</ul>
            </div>
            <div class="sol-step">
              <span class="sol-tag">2. REQUIRED</span>
              <p>${this.formatMathInline(ex.required)}</p>
            </div>
            <div class="sol-step">
              <span class="sol-tag">3. FORMULA</span>
              <div class="step-math-content">${this.formatMathBlock(ex.formula)}</div>
            </div>
            <div class="sol-step">
              <span class="sol-tag">4. SUBSTITUTION</span>
              <div class="step-math-content">${this.formatMathBlock(ex.substitution)}</div>
            </div>
            <div class="sol-step">
              <span class="sol-tag">5. COMPUTATION</span>
              <div class="step-math-content">${this.formatMathBlock(ex.computation)}</div>
            </div>
            <div class="sol-step highlight-answer">
              <span class="sol-tag">6. FINAL ANSWER</span>
              <div class="step-math-content answer-math">${this.formatMathBlock(ex.answer)}</div>
              <p class="text-sm"><em>${ex.interpretation}</em></p>
            </div>
          </div>
        </div>

        <!-- Common Mistakes -->
        <div class="section-block common-mistakes-card">
          <h3 class="section-title">⚠️ Common Student Exam Traps</h3>
          <ul class="mistakes-list">
            ${t.commonMistakes.map(m => `<li>${m}</li>`).join("")}
          </ul>
        </div>

        <!-- Quick Conceptual Check -->
        <div class="section-block quick-check-card" id="quick-check-container">
          <h3 class="section-title">⚡ Quick Concept Check</h3>
          <p class="qc-question">${t.quickCheck.question}</p>
          <div class="qc-options">
            ${t.quickCheck.options.map((opt, i) => `
              <button class="qc-opt-btn" data-index="${i}">
                <span class="qc-letter">${String.fromCharCode(65 + i)}</span>
                <span>${opt}</span>
              </button>
            `).join("")}
          </div>
          <div id="qc-feedback" class="qc-feedback-box" style="display:none;"></div>
        </div>

        <!-- Graded Practice Problems -->
        <div class="section-block practice-list-card">
          <h3 class="section-title">🎯 Graded Practice Competencies</h3>
          <div class="practice-accordion">
            ${t.practiceProblems.map((prob, pIdx) => `
              <div class="practice-item card" id="practice-card-${prob.id}">
                <div class="practice-item-header">
                  <span class="badge badge-accent">${prob.level}</span>
                  <p class="prob-prompt">${prob.prompt}</p>
                </div>
                <div class="progressive-reveal-bar">
                  <button class="btn btn-sm btn-ghost btn-prob-hint" data-id="${prob.id}">💡 Hint</button>
                  <button class="btn btn-sm btn-ghost btn-prob-step" data-id="${prob.id}">🐾 First Step</button>
                  <button class="btn btn-sm btn-ghost btn-prob-sol" data-id="${prob.id}">📖 Full Solution</button>
                  <button class="btn btn-sm btn-outline btn-prob-ans" data-id="${prob.id}">✓ Final Answer</button>
                </div>
                <div class="prob-reveal-box" id="reveal-hint-${prob.id}" style="display:none;">
                  <strong>Hint:</strong> ${prob.hint}
                </div>
                <div class="prob-reveal-box" id="reveal-step-${prob.id}" style="display:none;">
                  <strong>First Step:</strong> ${prob.firstStep}
                </div>
                <div class="prob-reveal-box" id="reveal-sol-${prob.id}" style="display:none;">
                  <div class="solution-markdown">${this.formatSolutionMarkdown(prob.fullSolution)}</div>
                </div>
                <div class="prob-reveal-box highlight-box" id="reveal-ans-${prob.id}" style="display:none;">
                  <strong>Final Answer:</strong> ${this.formatMathInline(prob.finalAnswer)}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    // Mount simulation if matching topic
    this.mountTopicSimulation(t.id);

    // Wire Quick Check
    const qcBox = content.querySelector("#quick-check-container");
    if (qcBox) {
      qcBox.querySelectorAll(".qc-opt-btn").forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.index);
          const isCorrect = idx === t.quickCheck.correctIndex;
          const fb = qcBox.querySelector("#qc-feedback");
          fb.style.display = "block";
          fb.className = `qc-feedback-box ${isCorrect ? 'fb-success' : 'fb-error'}`;
          fb.innerHTML = `
            <strong>${isCorrect ? "✓ Correct!" : "✗ Incorrect."}</strong>
            <p>${t.quickCheck.explanation}</p>
          `;
          qcBox.querySelectorAll(".qc-opt-btn").forEach((b, bi) => {
            b.disabled = true;
            if (bi === t.quickCheck.correctIndex) b.classList.add("correct");
            else if (bi === idx) b.classList.add("wrong");
          });
        };
      });
    }

    // Wire progressive reveals
    t.practiceProblems.forEach(prob => {
      const card = content.querySelector(`#practice-card-${prob.id}`);
      if (!card) return;
      card.querySelector(`.btn-prob-hint`).onclick = () => {
        const box = card.querySelector(`#reveal-hint-${prob.id}`);
        const isHidden = box.style.display === "none";
        box.style.display = isHidden ? "block" : "none";
        if (isHidden) this.renderMath(box);
      };
      card.querySelector(`.btn-prob-step`).onclick = () => {
        const box = card.querySelector(`#reveal-step-${prob.id}`);
        const isHidden = box.style.display === "none";
        box.style.display = isHidden ? "block" : "none";
        if (isHidden) this.renderMath(box);
      };
      card.querySelector(`.btn-prob-sol`).onclick = () => {
        const box = card.querySelector(`#reveal-sol-${prob.id}`);
        const isHidden = box.style.display === "none";
        box.style.display = isHidden ? "block" : "none";
        if (isHidden) this.renderMath(box);
      };
      card.querySelector(`.btn-prob-ans`).onclick = () => {
        const box = card.querySelector(`#reveal-ans-${prob.id}`);
        const isHidden = box.style.display === "none";
        box.style.display = isHidden ? "block" : "none";
        if (isHidden) this.renderMath(box);
      };
    });

    this.renderMath();
  }

  mountTopicSimulation(topicId) {
    const canvas = document.getElementById("topic-sim-canvas");
    const controls = "topic-sim-controls";
    const wrapper = document.getElementById("topic-sim-wrapper");
    if (!canvas || !wrapper) return;

    if (topicId === "exactness-test" || topicId === "solving-exact-des" || topicId === "exact-trig-des") {
      wrapper.style.display = "block";
      SIMULATIONS.initExactPotentialSim("topic-sim-canvas", controls);
    } else if (topicId === "orthogonal-trajectories") {
      wrapper.style.display = "block";
      SIMULATIONS.initOrthogonalSim("topic-sim-canvas", controls);
    } else if (
      topicId === "core-notation-first-order" ||
      topicId === "linear-first-order-des" ||
      topicId === "separable-des" ||
      topicId === "homogeneous-first-order-des" ||
      topicId === "initial-value-problems" ||
      topicId === "integrating-factors-non-exact"
    ) {
      wrapper.style.display = "block";
      SIMULATIONS.initDirectionFieldSim("topic-sim-canvas", controls);
    } else {
      wrapper.style.display = "none";
    }
  }

  renderPracticeMe() {
    const mount = document.getElementById("practice-mount");
    if (!mount) return;

    if (!this.currentPracticeProblem) {
      this.currentPracticeProblem = generateProblem("all");
    }

    const prob = this.currentPracticeProblem;

    mount.innerHTML = `
      <div class="practice-me-container card">
        <div class="practice-me-header">
          <div>
            <span class="badge badge-accent">${prob.topicTitle}</span>
            <span class="badge badge-outline">Algorithmic Problem Generator</span>
            <h2>Fresh Practice Problem</h2>
          </div>
          <button class="btn btn-primary" id="btn-gen-fresh">⚡ Generate New Problem</button>
        </div>

        <div class="practice-me-body">
          <p class="prob-prompt text-lead">${prob.prompt}</p>

          <div class="practice-choices-grid">
            ${prob.options.map((opt, idx) => `
              <button class="practice-opt-btn" data-idx="${idx}">
                <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join("")}
          </div>

          <div id="practice-result-box" class="practice-eval-box" style="display:none;"></div>

          <!-- Progressive Reveal Controls -->
          <div class="practice-progressive-controls">
            <button class="btn btn-outline btn-sm" id="btn-pme-hint">1. Hint</button>
            <button class="btn btn-outline btn-sm" id="btn-pme-step">2. First Step</button>
            <button class="btn btn-outline btn-sm" id="btn-pme-sol">3. Full Solution</button>
            <button class="btn btn-outline btn-sm" id="btn-pme-ans">4. Final Answer</button>
          </div>

          <div class="reveal-panels-list">
            <div id="pme-box-hint" class="reveal-panel" style="display:none;">
              <strong>💡 Hint:</strong> ${prob.hint}
            </div>
            <div id="pme-box-step" class="reveal-panel" style="display:none;">
              <strong>🐾 First Step:</strong> ${prob.firstStep}
            </div>
            <div id="pme-box-sol" class="reveal-panel" style="display:none;">
              <div class="solution-markdown">${this.formatSolutionMarkdown(prob.fullSolution)}</div>
            </div>
            <div id="pme-box-ans" class="reveal-panel highlight-box" style="display:none;">
              <strong>✓ Final Answer:</strong> ${this.formatMathInline(prob.finalAnswer)}
            </div>
          </div>
        </div>
      </div>
    `;

    // Wire buttons
    mount.querySelector("#btn-gen-fresh").onclick = () => {
      this.currentPracticeProblem = generateProblem("all");
      this.renderPracticeMe();
    };

    mount.querySelectorAll(".practice-opt-btn").forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        const isCorrect = (idx === prob.correctIndex);
        const resBox = mount.querySelector("#practice-result-box");
        resBox.style.display = "block";
        resBox.className = `practice-eval-box ${isCorrect ? 'eval-success' : 'eval-error'}`;
        resBox.innerHTML = `
          <h4>${isCorrect ? "✓ Correct Answer!" : "✗ Incorrect."}</h4>
          <p>${isCorrect ? "Superb work. Click '3. Full Solution' below to review the engineering derivation or generate a new problem." : "Review the 4 progressive reveal steps below to see where the discrepancy occurred."}</p>
        `;

        mount.querySelectorAll(".practice-opt-btn").forEach((b, bi) => {
          b.disabled = true;
          if (bi === prob.correctIndex) b.classList.add("correct");
          else if (bi === idx) b.classList.add("wrong");
        });

        // Record in dashboard
        DASHBOARD.recordAttempt(prob.topicId, isCorrect, "Practice Me");
      };
    });

    // Reveal buttons
    const wireReveal = (btnId, boxId) => {
      const b = mount.querySelector(btnId);
      const bx = mount.querySelector(boxId);
      if (b && bx) {
        b.onclick = () => {
          const isHidden = bx.style.display === "none";
          bx.style.display = isHidden ? "block" : "none";
          if (isHidden) this.renderMath(bx);
        };
      }
    };

    wireReveal("#btn-pme-hint", "#pme-box-hint");
    wireReveal("#btn-pme-step", "#pme-box-step");
    wireReveal("#btn-pme-sol", "#pme-box-sol");
    wireReveal("#btn-pme-ans", "#pme-box-ans");

    this.renderMath();
  }

  renderFormulaSheet() {
    const mount = document.getElementById("formulas-mount");
    if (!mount) return;

    mount.innerHTML = `
      <div class="formula-sheet-container">
        <div class="formula-sheet-header card">
          <h2>📐 Differential Equations for Engineers — Authoritative Midterm Formula Sheet</h2>
          <p class="text-muted">Direct formula references, integration rules, and applicability conditions from the Examination Reviewer.</p>
        </div>

        <div class="formula-sheet-grid">
          ${TOPICS.map(t => `
            <div class="formula-card card">
              <div class="formula-card-header">
                <span class="badge badge-accent">${t.category}</span>
                <h4>${t.title}</h4>
              </div>
              <div class="formula-math-display">$$${t.formulaLatex}$$</div>
              <div class="formula-vars">
                <ul>
                  ${t.variables.map(v => `<li><code>${v.symbol}</code> → ${v.name} (<em>${v.unit}</em>)</li>`).join("")}
                </ul>
              </div>
              <div class="formula-notes">
                <strong>When to Use:</strong>
                <p class="text-sm">${t.whenToUse}</p>
              </div>
              <button class="btn btn-outline btn-sm btn-open-calc" data-calc="calc-${t.id}">Open Calculator ⚡</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    mount.querySelectorAll(".btn-open-calc").forEach(btn => {
      btn.onclick = () => {
        this.switchTab("calculators");
      };
    });

    this.renderMath();
  }

  formatMathBlock(raw) {
    if (!raw) return "";
    const lines = String(raw).split(/\r?\n|\\n/).map(l => l.trim()).filter(l => l.length > 0);
    return lines.map(line => {
      let content = line;
      if (content.startsWith("$$") && content.endsWith("$$") && content.length >= 4) {
        content = content.slice(2, -2).trim();
      } else if (content.startsWith("$") && content.endsWith("$") && content.length >= 2) {
        content = content.slice(1, -1).trim();
      }
      return `<div class="math-display-line">$$${content}$$</div>`;
    }).join("");
  }

  formatMathInline(raw) {
    if (!raw) return "";
    return String(raw).replace(/\\n/g, "<br>");
  }

  formatSolutionMarkdown(raw) {
    if (!raw) return "";
    const text = String(raw).replace(/\\n/g, "\n");
    const lines = text.split("\n");
    let html = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) {
        if (inList) { html.push("</ul>"); inList = false; }
        continue;
      }

      if (line.startsWith("* ")) {
        if (!inList) { html.push("<ul class='sol-bullet-list'>"); inList = true; }
        html.push(`<li>${line.slice(2)}</li>`);
        continue;
      } else if (inList) {
        html.push("</ul>");
        inList = false;
      }

      if (/^\*\*(.*?)\*\*$/.test(line)) {
        const heading = line.replace(/^\*\*(.*?)\*\*$/, "$1");
        html.push(`<h5 class="sol-heading">${heading}</h5>`);
        continue;
      }

      if (line.startsWith("$$") && line.endsWith("$$")) {
        html.push(`<div class="sol-math-block">${line}</div>`);
        continue;
      }

      if (line.includes("\\frac") || line.includes("\\int") || line.includes("\\partial") || line.includes("\\Psi") || line.includes("\\mu") || line.includes("\\implies") || line.includes("\\approx")) {
        let content = line;
        if (content.startsWith("$$") && content.endsWith("$$")) {
          content = content.slice(2, -2).trim();
        } else if (content.startsWith("$") && content.endsWith("$")) {
          content = content.slice(1, -1).trim();
        }
        html.push(`<div class="sol-math-block">$$${content}$$</div>`);
        continue;
      }

      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      html.push(`<p>${line}</p>`);
    }

    if (inList) html.push("</ul>");
    return html.join("");
  }

  renderMath(container = document.body) {
    if (!container) return;
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false,
          errorColor: "#f7b943"
        });
        return;
      } catch (e) {
        console.warn("KaTeX render error:", e);
      }
    }

    // High-fidelity fallback renderer for offline/local viewing
    this.fallbackMathRender(container);
  }

  fallbackMathRender(container = document.body) {
    if (!container) return;
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        if (text && (text.includes("$$") || text.includes("$") || text.includes("\\(") || text.includes("\\["))) {
          const parent = node.parentNode;
          if (parent && !["SCRIPT", "STYLE", "CODE", "PRE"].includes(parent.nodeName)) {
            const span = document.createElement("span");
            let html = text
              .replace(/\$\$(.*?)\$\$/g, (m, math) => `<span class="fallback-math display-math">${this.formatLatexFallback(math)}</span>`)
              .replace(/\\\[(.*?)\\\]/g, (m, math) => `<span class="fallback-math display-math">${this.formatLatexFallback(math)}</span>`)
              .replace(/\$(.*?)\$/g, (m, math) => `<span class="fallback-math inline-math">${this.formatLatexFallback(math)}</span>`)
              .replace(/\\\((.*?)\\\)/g, (m, math) => `<span class="fallback-math inline-math">${this.formatLatexFallback(math)}</span>`);
            span.innerHTML = html;
            parent.replaceChild(span, node);
          }
        }
      } else {
        node.childNodes.forEach(child => walk(child));
      }
    };
    walk(container);
  }

  formatLatexFallback(latex) {
    return latex
      .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '<span class="math-frac"><span class="math-num">$1</span><span class="math-den">$2</span></span>')
      .replace(/\\partial/g, '∂')
      .replace(/\\int/g, '∫')
      .replace(/\\Psi/g, 'Ψ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\perp/g, '⊥')
      .replace(/\\iff/g, '⟺')
      .replace(/\\implies/g, '⟹')
      .replace(/\\cdot/g, '·')
      .replace(/\\times/g, '×')
      .replace(/\\approx/g, '≈')
      .replace(/\\pm/g, '±')
      .replace(/\\mp/g, '∓')
      .replace(/\\sqrt\{(.*?)\}/g, '√($1)')
      .replace(/\\text\{(.*?)\}/g, '$1')
      .replace(/\^2/g, '²')
      .replace(/\^3/g, '³')
      .replace(/\^4/g, '⁴')
      .replace(/\^5/g, '⁵')
      .replace(/\^([0-9]+)/g, '<sup>$1</sup>')
      .replace(/_([0-9a-zA-Z]+)/g, '<sub>$1</sub>');
  }
}

// Global bootstrap
window.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});

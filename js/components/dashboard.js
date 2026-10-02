/**
 * Differential Equations for Engineers - Student Progress & Mastery Tracker
 * LocalStorage persistence, mastery percentages by topic, and weak-area identification.
 */

import { TOPICS } from "../data/topics.js";

const STORAGE_KEY = "de_student_progress";

export const DASHBOARD = {
  data: null,

  init(container) {
    this.container = container;
    this.load();
    this.render();
  },

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    }

    if (!this.data) {
      this.data = {
        totalAttempted: 0,
        totalCorrect: 0,
        topics: {},
        history: []
      };
      TOPICS.forEach(t => {
        this.data.topics[t.id] = { attempted: 0, correct: 0 };
      });
    }

    // Ensure all current topics exist in map
    TOPICS.forEach(t => {
      if (!this.data.topics[t.id]) {
        this.data.topics[t.id] = { attempted: 0, correct: 0 };
      }
    });
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Could not write to localStorage", e);
    }
  },

  recordAttempt(topicId, isCorrect, difficulty = "Standard") {
    if (!this.data) this.load();
    this.data.totalAttempted++;
    if (isCorrect) this.data.totalCorrect++;

    if (!this.data.topics[topicId]) {
      this.data.topics[topicId] = { attempted: 0, correct: 0 };
    }
    this.data.topics[topicId].attempted++;
    if (isCorrect) {
      this.data.topics[topicId].correct++;
    }

    this.data.history.unshift({
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      topicId,
      isCorrect,
      difficulty
    });

    if (this.data.history.length > 25) {
      this.data.history.pop();
    }

    this.save();
  },

  reset() {
    this.data = {
      totalAttempted: 0,
      totalCorrect: 0,
      topics: {},
      history: []
    };
    TOPICS.forEach(t => {
      this.data.topics[t.id] = { attempted: 0, correct: 0 };
    });
    this.save();
    if (this.container) this.render();
  },

  render() {
    if (!this.container) return;
    this.load();

    const overallPct = this.data.totalAttempted > 0 
      ? Math.round((this.data.totalCorrect / this.data.totalAttempted) * 100)
      : 0;

    // Detect weak topics: attempted > 0 and pct < 70%, or attempted == 0
    const weakTopics = TOPICS.filter(t => {
      const stat = this.data.topics[t.id];
      if (!stat || stat.attempted === 0) return true;
      return (stat.correct / stat.attempted) < 0.70;
    });

    this.container.innerHTML = `
      <div class="dashboard-grid">
        <!-- High-level stats banner -->
        <div class="dash-overview-card card">
          <div class="dash-stat">
            <span class="stat-label">Overall Mastery</span>
            <span class="stat-value text-accent">${overallPct}%</span>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${overallPct}%"></div>
            </div>
          </div>
          <div class="dash-stat">
            <span class="stat-label">Total Questions Solved</span>
            <span class="stat-value">${this.data.totalAttempted}</span>
          </div>
          <div class="dash-stat">
            <span class="stat-label">Correct Solutions</span>
            <span class="stat-value text-success">${this.data.totalCorrect}</span>
          </div>
          <div class="dash-stat">
            <span class="stat-label">Identified Weak Areas</span>
            <span class="stat-value text-warning">${weakTopics.length}</span>
          </div>
        </div>

        <!-- Topic Mastery Grid -->
        <div class="dash-topics-card card">
          <div class="card-header-row">
            <h3>📊 Competency Mastery Breakdown</h3>
            <button class="btn btn-outline btn-sm" id="btn-reset-stats">Reset Analytics</button>
          </div>
          <div class="topic-mastery-list">
            ${TOPICS.map(t => {
              const stat = this.data.topics[t.id] || { attempted: 0, correct: 0 };
              const pct = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
              let statusBadge = `<span class="badge badge-outline">Unattempted</span>`;
              if (stat.attempted > 0) {
                if (pct >= 80) statusBadge = `<span class="badge badge-success">Mastered (${pct}%)</span>`;
                else if (pct >= 50) statusBadge = `<span class="badge badge-accent">Developing (${pct}%)</span>`;
                else statusBadge = `<span class="badge badge-danger">Needs Practice (${pct}%)</span>`;
              }
              return `
                <div class="topic-stat-row">
                  <div class="topic-stat-info">
                    <strong>${t.number}. ${t.title}</strong>
                    <span class="text-sm text-muted">${stat.correct} / ${stat.attempted} answered correctly</span>
                  </div>
                  <div class="topic-stat-meta">
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${pct}%;"></div>
                    </div>
                    ${statusBadge}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Compact Decision Guide (Docx Section 14) -->
        <div class="dash-guide-card card">
          <div class="guide-header">
            <h3>🧭 Compact Decision Guide — First-Order Strategy</h3>
            <span class="badge badge-accent">Exam Protocol</span>
          </div>
          <p class="text-muted">Follow this priority decision checklist to classify and solve any exam problem:</p>
          <ol class="decision-list">
            <li>
              <strong>1. Is it written as $M(x,y)\\,dx + N(x,y)\\,dy = 0$?</strong>
              <p>Check exactness immediately: compare $M_y = \\frac{\\partial M}{\\partial y}$ with $N_x = \\frac{\\partial N}{\\partial x}$. If equal, integrate for $\\Psi(x,y) = C$.</p>
            </li>
            <li>
              <strong>2. Is it already linear in $y$?</strong>
              <p>Put into canonical standard form $y' + P(x)y = Q(x)$ and apply integrating factor $\\mu(x) = e^{\\int P(x)\\,dx}$.</p>
            </li>
            <li>
              <strong>3. Can the variables be separated?</strong>
              <p>Collect all $y$-terms with $dy$ on the left and all $x$-terms with $dx$ on the right: $\\frac{1}{h(y)}\\,dy = g(x)\\,dx$.</p>
            </li>
            <li>
              <strong>4. Does the right side depend solely on the ratio $y/x$?</strong>
              <p>Use the homogeneous substitution $y = vx$, which yields $y' = v + x v'$.</p>
            </li>
            <li>
              <strong>5. Is the problem an orthogonal-trajectory question?</strong>
              <p>Find the original family slope $m = F(x,y)$ (eliminating $c$), set $m_\\perp = -1/m$, and integrate the resulting separable DE.</p>
            </li>
            <li>
              <strong>6. Is the equation non-exact with an integrating factor requested?</strong>
              <p>Test $\\frac{M_y - N_x}{N}$ for $x$-only dependence, or $\\frac{N_x - M_y}{M}$ for $y$-only dependence.</p>
            </li>
          </ol>
        </div>

        <!-- Recent Solved Problems Log -->
        <div class="dash-history-card card">
          <h3>🕒 Recent Problem Practice Log</h3>
          ${this.data.history.length === 0 ? `
            <p class="text-muted">No problems attempted yet in this session. Jump into <strong>Practice Me</strong> or take the <strong>Quiz</strong>!</p>
          ` : `
            <div class="history-list">
              ${this.data.history.map(h => {
                const top = TOPICS.find(t => t.id === h.topicId);
                const title = top ? top.title : h.topicId;
                return `
                  <div class="history-row ${h.isCorrect ? 'hist-correct' : 'hist-wrong'}">
                    <span class="hist-icon">${h.isCorrect ? '✓' : '✗'}</span>
                    <span class="hist-title">${title}</span>
                    <span class="hist-diff badge badge-sm badge-outline">${h.difficulty}</span>
                    <span class="hist-time">${h.timestamp}</span>
                  </div>
                `;
              }).join("")}
            </div>
          `}
        </div>
      </div>
    `;

    const resetBtn = this.container.querySelector("#btn-reset-stats");
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm("Are you sure you want to reset your performance analytics?")) {
          this.reset();
        }
      };
    }

    if (window.app && window.app.renderMath) {
      window.app.renderMath(this.container);
    }
  }
};

/**
 * Differential Equations for Engineers - Interactive Quiz & Exam Simulation System
 * Multiple-choice with randomized options, instant feedback, 6-step engineering solutions,
 * instructor mini-quiz drill, and performance tracking by topic and difficulty.
 */

import { PRACTICE_QUESTIONS, MINI_QUIZ } from "../data/practiceQuestions.js";
import { TOPICS } from "../data/topics.js";
import { DASHBOARD } from "./dashboard.js";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QUIZ = {
  questions: [],
  currentIndex: 0,
  score: 0,
  filterTopic: "all",
  filterDifficulty: "all",
  userAnswers: {},

  init(container) {
    this.container = container;
    this.render();
  },

  setFilter(topic, difficulty) {
    this.filterTopic = topic || "all";
    this.filterDifficulty = difficulty || "all";
    this.startQuiz();
  },

  startQuiz() {
    let filtered = [...PRACTICE_QUESTIONS];
    if (this.filterTopic !== "all") {
      filtered = filtered.filter(q => q.topicId === this.filterTopic);
    }
    if (this.filterDifficulty !== "all") {
      filtered = filtered.filter(q => q.difficulty.toLowerCase() === this.filterDifficulty.toLowerCase());
    }

    // Prepare questions with shuffled options
    this.questions = filtered.map(q => {
      const correctText = q.options[q.correctIndex];
      const shuffledOptions = shuffle(q.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctText);
      return {
        ...q,
        shuffledOptions,
        newCorrectIndex
      };
    });

    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = {};
    this.renderQuestionView();
  },

  render() {
    const topicsList = [
      { id: "all", title: "All Exam Topics (Full Practice Set 1 - 20)" },
      ...TOPICS.map(t => ({ id: t.id, title: `Topic ${t.number}: ${t.title}` }))
    ];

    this.container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-controls card">
          <div class="quiz-filters">
            <div class="filter-group">
              <label>Topic Selection:</label>
              <select id="quiz-filter-topic" class="form-select">
                ${topicsList.map(t => `<option value="${t.id}">${t.title}</option>`).join("")}
              </select>
            </div>
            <div class="filter-group">
              <label>Difficulty Level:</label>
              <select id="quiz-filter-diff" class="form-select">
                <option value="all">All Difficulties</option>
                <option value="foundation">Foundation (Q1 - Q5)</option>
                <option value="application">Application (Q6 - Q14)</option>
                <option value="challenge">Challenge (Q15 - Q20)</option>
              </select>
            </div>
            <button class="btn btn-primary" id="btn-start-quiz">Start / Reset Quiz</button>
            <button class="btn btn-outline" id="btn-toggle-mini-quiz">🎓 Instructor Mini-Quiz Drill</button>
          </div>
        </div>

        <div id="quiz-active-area"></div>
      </div>
    `;

    document.getElementById("btn-start-quiz").onclick = () => {
      const top = document.getElementById("quiz-filter-topic").value;
      const diff = document.getElementById("quiz-filter-diff").value;
      this.setFilter(top, diff);
    };

    document.getElementById("btn-toggle-mini-quiz").onclick = () => {
      this.renderMiniQuizView();
    };

    this.startQuiz();
  },

  renderMiniQuizView() {
    const area = document.getElementById("quiz-active-area");
    if (!area) return;

    area.innerHTML = `
      <div class="card mini-quiz-card">
        <div class="mini-quiz-header">
          <span class="badge badge-accent">Oral Tutoring Drill</span>
          <h2>🎓 Instructor Mini-Quiz Oral Drill</h2>
          <p class="text-muted">Direct conceptual oral check questions from Section 17 of the authoritative review guide.</p>
        </div>

        <div class="mini-quiz-grid">
          ${MINI_QUIZ.map((mq, idx) => `
            <div class="mini-quiz-item card" id="mq-card-${idx}">
              <div class="mq-item-header">
                <span class="badge badge-outline">Q${mq.number}</span>
                <h4>${mq.question}</h4>
              </div>
              <button class="btn btn-sm btn-outline btn-mq-reveal" data-idx="${idx}">Reveal Instructor Key 👁️</button>
              <div class="mq-reveal-box" id="mq-box-${idx}" style="display:none; margin-top:0.8rem; padding:0.8rem; background:rgba(15,23,42,0.6); border-radius:6px;">
                <p><strong>Standard Answer:</strong> <span class="text-accent font-bold">${mq.answer}</span></p>
                <p class="text-sm text-muted"><strong>Rationale:</strong> ${mq.explanation}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    area.querySelectorAll(".btn-mq-reveal").forEach(btn => {
      btn.onclick = () => {
        const idx = btn.dataset.idx;
        const box = area.querySelector(`#mq-box-${idx}`);
        const isHidden = box.style.display === "none";
        box.style.display = isHidden ? "block" : "none";
        btn.textContent = isHidden ? "Hide Key" : "Reveal Instructor Key 👁️";
        if (isHidden && window.app && window.app.renderMath) {
          window.app.renderMath(box);
        }
      };
    });

    if (window.app && window.app.renderMath) {
      window.app.renderMath(area);
    }
  },

  renderQuestionView() {
    const area = document.getElementById("quiz-active-area");
    if (!area) return;

    if (this.questions.length === 0) {
      area.innerHTML = `
        <div class="card empty-state">
          <h3>No questions match the selected filter.</h3>
          <p>Please select a different topic or difficulty level.</p>
        </div>
      `;
      return;
    }

    if (this.currentIndex >= this.questions.length) {
      this.renderSummaryView(area);
      return;
    }

    const q = this.questions[this.currentIndex];
    const totalQ = this.questions.length;
    const answered = this.userAnswers[this.currentIndex] !== undefined;
    const selectedChoice = this.userAnswers[this.currentIndex];

    area.innerHTML = `
      <div class="quiz-card card">
        <div class="quiz-header-bar">
          <div class="quiz-progress-info">
            <span class="badge badge-accent">Question ${this.currentIndex + 1} of ${totalQ}</span>
            <span class="badge badge-outline">${q.difficulty}</span>
            <span class="badge badge-outline">${q.section}</span>
          </div>
          <div class="quiz-score-badge">Score: <strong>${this.score}</strong> / ${this.currentIndex + (answered ? 1 : 0)}</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${((this.currentIndex) / totalQ) * 100}%"></div>
        </div>

        <div class="quiz-question-body">
          <h3 class="question-text">${q.question}</h3>
          
          <div class="quiz-options-list">
            ${q.shuffledOptions.map((opt, idx) => {
              let btnClass = "option-btn";
              if (answered) {
                if (idx === q.newCorrectIndex) btnClass += " option-correct";
                else if (idx === selectedChoice) btnClass += " option-wrong";
                else btnClass += " option-disabled";
              }
              return `
                <button class="${btnClass}" data-idx="${idx}" ${answered ? "disabled" : ""}>
                  <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                  <span class="opt-text">${opt}</span>
                </button>
              `;
            }).join("")}
          </div>

          <!-- Progressive Reveal Assistance (Before Submitting) -->
          ${!answered ? `
            <div class="progressive-assistance">
              <button class="btn btn-ghost btn-sm" id="btn-quiz-hint">💡 Show Hint</button>
              <button class="btn btn-ghost btn-sm" id="btn-quiz-step">🐾 First Step</button>
              <div id="quiz-hint-box" class="hint-callout" style="display:none;">${q.hint}</div>
              <div id="quiz-step-box" class="hint-callout" style="display:none;">${q.firstStep}</div>
            </div>
          ` : ""}

          <!-- Post-Answer Detailed Explanation -->
          ${answered ? `
            <div class="solution-explanation-panel ${selectedChoice === q.newCorrectIndex ? 'success-border' : 'error-border'}">
              <div class="result-status">
                ${selectedChoice === q.newCorrectIndex ? 
                  '<span class="text-success font-bold">✓ CORRECT! Excellent engineering problem-solving.</span>' : 
                  '<span class="text-danger font-bold">✗ INCORRECT. Review the verified mathematical derivation below.</span>'
                }
              </div>
              <div class="solution-markdown">
                ${this.formatSolution(q.fullSolution)}
              </div>
              <div class="quiz-nav-row">
                <button class="btn btn-primary" id="btn-next-question">
                  ${this.currentIndex + 1 < totalQ ? "Next Question →" : "View Final Results 🏆"}
                </button>
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;

    // Wire Option buttons
    if (!answered) {
      area.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx);
          this.submitAnswer(idx);
        };
      });

      const hintBtn = area.querySelector("#btn-quiz-hint");
      if (hintBtn) {
        hintBtn.onclick = () => {
          const hb = area.querySelector("#quiz-hint-box");
          hb.style.display = "block";
          if (window.app && window.app.renderMath) window.app.renderMath(hb);
        };
      }
      const stepBtn = area.querySelector("#btn-quiz-step");
      if (stepBtn) {
        stepBtn.onclick = () => {
          const sb = area.querySelector("#quiz-step-box");
          sb.style.display = "block";
          if (window.app && window.app.renderMath) window.app.renderMath(sb);
        };
      }
    } else {
      const nextBtn = area.querySelector("#btn-next-question");
      if (nextBtn) {
        nextBtn.onclick = () => {
          this.currentIndex++;
          this.renderQuestionView();
        };
      }
    }

    if (window.app && window.app.renderMath) {
      window.app.renderMath(area);
    } else if (window.renderMathInElement) {
      window.renderMathInElement(area, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  },

  submitAnswer(choiceIndex) {
    const q = this.questions[this.currentIndex];
    this.userAnswers[this.currentIndex] = choiceIndex;
    const isCorrect = (choiceIndex === q.newCorrectIndex);
    if (isCorrect) {
      this.score++;
    }

    // Record into Progress Dashboard
    DASHBOARD.recordAttempt(q.topicId, isCorrect, q.difficulty);

    this.renderQuestionView();
  },

  renderSummaryView(area) {
    const total = this.questions.length;
    const pct = Math.round((this.score / total) * 100);

    area.innerHTML = `
      <div class="card summary-card text-center">
        <h2>🎉 Quiz Completed!</h2>
        <div class="score-circle">
          <span class="score-num">${this.score} / ${total}</span>
          <span class="score-pct">${pct}% Accuracy</span>
        </div>
        <p class="summary-eval">
          ${pct >= 85 ? "🌟 Outstanding! You have mastered the Differential Equations Midterm competencies." :
            pct >= 70 ? "👍 Good job! Review the questions you missed before taking the exam." :
            "⚠️ Needs Review. We recommend studying the topic modules and using the step-by-step calculators."}
        </p>
        <div class="summary-actions">
          <button class="btn btn-primary" id="btn-retake">Retake Quiz</button>
          <button class="btn btn-outline" id="btn-view-dashboard">View Progress Dashboard</button>
        </div>
      </div>
    `;

    area.querySelector("#btn-retake").onclick = () => {
      this.startQuiz();
    };
    area.querySelector("#btn-view-dashboard").onclick = () => {
      document.querySelector('[data-tab="progress"]').click();
    };
  },

  formatSolution(raw) {
    if (window.app && window.app.formatSolutionMarkdown) {
      return window.app.formatSolutionMarkdown(raw);
    }
    return raw
      .replace(/\\n/g, "\n")
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  }
};

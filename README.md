# Differential Equations for Engineers — Midterm Review Platform

[![Mechanical Engineering Society](https://img.shields.io/badge/Mechanical_Engineering_Society-GEN_0110_/_MATH-f7b943.svg)](https://github.com/mcluginn/DE-Reviewer)
[![Authoritative Scope](https://img.shields.io/badge/Syllabus-Midterm_Examination-0a2344.svg)](index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An interactive, modern educational review, practice, and tutoring web application tailored for **GEN 0110 / MATH Differential Equations for Engineers** preparing for the **Midterm Examination**.

Designed using the **Mechanical Engineering Society** design system (Deep Navy, Steel Blue, and Brass Gold palette with mechanical gear kinematics).

---

## 🚀 Live Demo & Deployment

This application is built as a zero-dependency static web application, perfectly suited for deployment on **GitHub Pages**:

* **Repository**: [https://github.com/mcluginn/DE-Reviewer](https://github.com/mcluginn/DE-Reviewer)
* **Live Web App**: [https://mcluginn.github.io/DE-Reviewer/](https://mcluginn.github.io/DE-Reviewer/)

Loads completely in all modern web browsers with full client-side KaTeX typesetting, interactive HTML5 Canvas simulations, and procedural practice generators.

---

## 📚 Examination Scope (11 Core Competencies)

Covering exclusively the authorized Midterm Examination syllabus:

1. **Core Notation & Differential Form** — First-order forms $M(x,y)\\,dx + N(x,y)\\,dy = 0$, explicit forms $\frac{dy}{dx} = F(x,y)$, and level curve solutions $\Psi(x,y) = C$.
2. **Exactness Test & Partial Derivatives** — Testing mixed partial derivatives $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$, comparing components, and avoiding student traps.
3. **Solving Exact Differential Equations** — Integrating $\Psi = \int M\\,dx + g(y) = C$, differentiating with respect to $y$, and matching $N(x,y)$ to determine $g(y)$.
4. **Degree of Homogeneous Functions** — Evaluating total term degree $a + b$ in $x^a y^b$ and verifying the scaling condition $f(tx, ty) = t^n f(x,y)$.
5. **Linear First-Order Differential Equations** — Canonical standard form $y' + P(x)y = Q(x)$, integrating factor $\mu(x) = e^{\int P(x)\\,dx}$, and product rule integration.
6. **Separable Differential Equations** — Isolating differentials $\frac{1}{h(y)}\\,dy = g(x)\\,dx$, antiderivative integration, and solving explicitly for $y(x)$.
7. **Homogeneous First-Order DEs** — Ratio substitution $y = vx$, product rule derivative $y' = v + x v'$, and separating variables in $v$ and $x$.
8. **Initial-Value Problems (IVPs)** — Finding general solution family first, then substituting $(x_0, y_0)$ to determine integration constant $C$.
9. **Orthogonal Trajectories** — Eliminating family parameter $c$, applying negative reciprocal slope $m_\perp = -1/m$, and integrating orthogonal curves.
10. **Exact Equations with Trigonometric Terms** — Multi-variable products $y\cos(xy)$, chain rule differentiation, and $\tan y$ potential components.
11. **Integrating Factors for Non-Exact DEs** — Testing single-variable conditions $\frac{M_y - N_x}{N} = f(x)$ and $\frac{N_x - M_y}{M} = g(y)$ to convert to exact forms.

---

## 🛠️ Features

* **Algorithmic Practice Generator**: Synthesizes fresh problem variations with realistic parameters and 4-step progressive reveals (Hint $\to$ First Step $\to$ Full Solution $\to$ Final Answer).
* **20-Question Verified Practice Bank**: Foundation (Q1–Q5), Application (Q6–Q14), and Challenge (Q15–Q20) questions from the examination syllabus with instant explanations and score tracking.
* **Instructor Mini-Quiz Oral Drill**: 8 rapid-fire conceptual questions for oral tutoring check-ins.
* **7 Interactive DE Calculators**:
  1. Exactness Tester ($M_y$ vs $N_x$)
  2. Linear DE Integrating Factor Solver ($\mu(x)$ and IVP evaluator)
  3. Homogeneous Function Degree Checker
  4. Non-Exact Integrating Factor Condition Tester ($\mu(x)$ vs $\mu(y)$)
  5. Orthogonal Trajectory Slope Resolver ($m \to -1/m$)
  6. Initial-Value Problem Constant Resolver
  7. Separable DE Step Integrator
* **3 Visual Simulations**:
  - Interactive Direction Field / Slope Field Simulator with real-time Runge-Kutta 4th Order curve tracing
  - Orthogonal Trajectories Family Visualizer with perpendicular intersection inspection
  - Exact Potential Surface Contour Map ($\Psi(x,y) = C$)
* **Compact Decision Guide**: 6-step priority classification workflow for midterms.
* **One-Page Formula Sheet**: Quick reference for exactness, integrating factors, substitutions, and orthogonal rules.

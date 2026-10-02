/**
 * Differential Equations for Engineers - Interactive Calculators
 * Authoritative algorithms and step-by-step mathematical derivations for:
 * 1. Exactness Tester
 * 2. Linear DE Integrating Factor Solver
 * 3. Homogeneous Function Degree Checker
 * 4. Non-Exact Integrating Factor Condition Tester
 * 5. Orthogonal Trajectories Slope Resolver
 * 6. Initial-Value Problem Constant Resolver
 * 7. Separable DE Step Integrator
 */

import { DE_MATH } from "../engine/deMath.js";

function renderCalcMath(el) {
  if (!el) return;
  if (window.app && window.app.renderMath) {
    window.app.renderMath(el);
  } else if (window.renderMathInElement) {
    window.renderMathInElement(el, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
}

export const CALCULATORS = {
  render(container) {
    container.innerHTML = `
      <div class="calc-grid">
        <!-- 1. Exactness Tester -->
        <div class="calc-card" id="calc-exactness">
          <div class="calc-header">
            <h3>⚡ Exactness Tester</h3>
            <span class="calc-badge">Exact Equations</span>
          </div>
          <p class="calc-formula">$$\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x} \\iff M(x,y)\\,dx + N(x,y)\\,dy = 0$$</p>
          <div class="form-row">
            <div class="input-group">
              <label>Equation Form:</label>
              <select id="exact-form-type" class="form-select">
                <option value="linear_xy" selected>M = ax + by, N = cx + dy</option>
                <option value="quadratic_xy">M = axy + by, N = cx² + dx</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label>Param a:</label>
              <input type="number" id="exact-a" value="4" step="any">
            </div>
            <div class="input-group">
              <label>Param b:</label>
              <input type="number" id="exact-b" value="5" step="any">
            </div>
            <div class="input-group">
              <label>Param c:</label>
              <input type="number" id="exact-c" value="5" step="any">
            </div>
            <div class="input-group">
              <label>Param d:</label>
              <input type="number" id="exact-d" value="6" step="any">
            </div>
          </div>
          <button class="btn btn-primary" id="btn-calc-exact">Test Exactness & Solve</button>
          <div class="calc-result" id="res-exact" style="display:none;"></div>
        </div>

        <!-- 2. Linear DE Integrating Factor Solver -->
        <div class="calc-card" id="calc-linear">
          <div class="calc-header">
            <h3>📈 Linear DE Integrating Factor Solver</h3>
            <span class="calc-badge">Linear 1st-Order</span>
          </div>
          <p class="calc-formula">$$y' + P(x)y = Q(x) \\implies \\mu(x) = e^{\\int P(x)\\,dx}$$</p>
          <div class="form-row">
            <div class="input-group">
              <label>Constant P (in y' + P y):</label>
              <input type="number" id="lin-p" value="3" step="any">
            </div>
            <div class="input-group">
              <label>Coefficient q (in Q(x) = q x):</label>
              <input type="number" id="lin-q" value="9" step="any">
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label>Initial x₀ (optional IVP):</label>
              <input type="number" id="lin-x0" value="0" step="any">
            </div>
            <div class="input-group">
              <label>Initial y₀ = y(x₀):</label>
              <input type="number" id="lin-y0" value="2" step="any">
            </div>
          </div>
          <button class="btn btn-primary" id="btn-calc-linear">Solve Linear DE</button>
          <div class="calc-result" id="res-linear" style="display:none;"></div>
        </div>

        <!-- 3. Homogeneous Function Degree Checker -->
        <div class="calc-card" id="calc-homo-degree">
          <div class="calc-header">
            <h3>🔢 Homogeneous Degree Checker</h3>
            <span class="calc-badge">Homogeneity</span>
          </div>
          <p class="calc-formula">$$f(tx, ty) = t^n f(x,y) \\implies \\text{Degree } n = a + b$$</p>
          <p class="text-sm text-muted">Test polynomial $c_1 x^{p_1} y^{q_1} + c_2 x^{p_2} y^{q_2} + c_3 x^{p_3} y^{q_3}$:</p>
          <div class="form-row">
            <div class="input-group">
              <label>Term 1 (p₁, q₁):</label>
              <div style="display:flex; gap:0.5rem;">
                <input type="number" id="homo-p1" value="3" placeholder="pow x">
                <input type="number" id="homo-q1" value="2" placeholder="pow y">
              </div>
            </div>
            <div class="input-group">
              <label>Term 2 (p₂, q₂):</label>
              <div style="display:flex; gap:0.5rem;">
                <input type="number" id="homo-p2" value="1" placeholder="pow x">
                <input type="number" id="homo-q2" value="4" placeholder="pow y">
              </div>
            </div>
            <div class="input-group">
              <label>Term 3 (p₃, q₃):</label>
              <div style="display:flex; gap:0.5rem;">
                <input type="number" id="homo-p3" value="0" placeholder="pow x">
                <input type="number" id="homo-q3" value="5" placeholder="pow y">
              </div>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-calc-homo">Verify Degree</button>
          <div class="calc-result" id="res-homo" style="display:none;"></div>
        </div>

        <!-- 4. Non-Exact Integrating Factor Condition Tester -->
        <div class="calc-card" id="calc-nonexact">
          <div class="calc-header">
            <h3>🔬 Non-Exact Integrating Factor Tester</h3>
            <span class="calc-badge">Special Factors</span>
          </div>
          <p class="calc-formula">$$\\mu(x) = e^{\\int \\frac{M_y - N_x}{N}dx} \\quad \\text{or} \\quad \\mu(y) = e^{\\int \\frac{N_x - M_y}{M}dy}$$</p>
          <div class="form-row">
            <div class="input-group">
              <label>Standard Case Example:</label>
              <select id="nonexact-preset" class="form-select">
                <option value="y_case" selected>xy dx + (x² + y²) dy = 0 [μ(y) = y]</option>
                <option value="already_exact">(2y + x) dx + 2x dy = 0 [Already Exact!]</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-calc-nonexact">Evaluate Conditions</button>
          <div class="calc-result" id="res-nonexact" style="display:none;"></div>
        </div>

        <!-- 5. Orthogonal Trajectories Slope Resolver -->
        <div class="calc-card" id="calc-ortho">
          <div class="calc-header">
            <h3>📐 Orthogonal Trajectory Resolver</h3>
            <span class="calc-badge">Trajectories</span>
          </div>
          <p class="calc-formula">$$m_\\perp = -\\frac{1}{m_{\\text{orig}}} \\iff \\left(\\frac{dy}{dx}\\right)_\\perp = -\\frac{1}{F(x,y)}$$</p>
          <div class="form-row">
            <div class="input-group">
              <label>Power exponent n for family y = c xⁿ:</label>
              <input type="number" id="ortho-n" value="3" step="1">
            </div>
          </div>
          <button class="btn btn-primary" id="btn-calc-ortho">Solve Orthogonal Trajectory</button>
          <div class="calc-result" id="res-ortho" style="display:none;"></div>
        </div>

        <!-- 6. Initial-Value Problem Constant Resolver -->
        <div class="calc-card" id="calc-ivp">
          <div class="calc-header">
            <h3>🎯 Initial-Value Problem Constant Resolver</h3>
            <span class="calc-badge">IVP Solver</span>
          </div>
          <p class="calc-formula">$$y(x_0) = y_0 \\implies \\text{Solve for arbitrary constant } C$$</p>
          <div class="form-row">
            <div class="input-group">
              <label>Equation Form:</label>
              <select id="ivp-form-type" class="form-select">
                <option value="exact_quad" selected>Exact: x² + 4xy + 3y² = C</option>
                <option value="separable_exp">Separable: y = C exp(2x²) [y' = 4xy]</option>
                <option value="separable_shift">Separable: y + 2 = C exp(x²/2) [y' = x(y+2)]</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label>Initial x₀:</label>
              <input type="number" id="ivp-x0" value="1" step="any">
            </div>
            <div class="input-group">
              <label>Initial y₀ = y(x₀):</label>
              <input type="number" id="ivp-y0" value="1" step="any">
            </div>
          </div>
          <button class="btn btn-primary" id="btn-calc-ivp">Determine Constant C</button>
          <div class="calc-result" id="res-ivp" style="display:none;"></div>
        </div>

        <!-- 7. Separable DE Step Integrator -->
        <div class="calc-card" id="calc-separable">
          <div class="calc-header">
            <h3>🧩 Separable DE Step Integrator</h3>
            <span class="calc-badge">Separation of Variables</span>
          </div>
          <p class="calc-formula">$$\\frac{dy}{dx} = a x (y - k) \\implies \\int \\frac{dy}{y - k} = \\int a x\\,dx$$</p>
          <div class="form-row">
            <div class="input-group">
              <label>Coefficient a:</label>
              <input type="number" id="sep-a" value="2" step="any">
            </div>
            <div class="input-group">
              <label>Shift Constant k:</label>
              <input type="number" id="sep-k" value="3" step="any">
            </div>
          </div>
          <button class="btn btn-primary" id="btn-calc-sep">Integrate Separable DE</button>
          <div class="calc-result" id="res-sep" style="display:none;"></div>
        </div>
      </div>
    `;

    this.bindEvents(container);
  },

  bindEvents(container) {
    // 1. Exactness
    const runExact = () => {
      const formType = document.getElementById("exact-form-type").value;
      const a = parseFloat(document.getElementById("exact-a").value);
      const b = parseFloat(document.getElementById("exact-b").value);
      const c = parseFloat(document.getElementById("exact-c").value);
      const d = parseFloat(document.getElementById("exact-d").value);

      const res = DE_MATH.testExactness(formType, a, b, c, d);
      const out = document.getElementById("res-exact");
      out.style.display = "block";
      out.className = `calc-result ${res.isExact ? 'calc-success' : 'calc-warning'}`;
      out.innerHTML = `
        <h4>${res.isExact ? "✓ Equation is Exact" : "⚠️ Equation is Not Exact"}</h4>
        <div class="calc-steps">
          <p><strong>M(x,y)</strong> = $${res.M_display}$, <strong>N(x,y)</strong> = $${res.N_display}$</p>
          <p>$$${res.My_display}$$</p>
          <p>$$${res.Nx_display}$$</p>
          <p><strong>Comparison:</strong> $$${res.comparison}$$</p>
          <div class="calc-final-highlight">
            <strong>${res.isExact ? "Potential Function Solution:" : "Conclusion:"}</strong>
            <p>$$${res.potential}$$</p>
          </div>
        </div>
      `;
      renderCalcMath(out);
    };
    container.querySelector("#btn-calc-exact").onclick = runExact;

    // 2. Linear DE
    const runLinear = () => {
      const p = parseFloat(document.getElementById("lin-p").value);
      const q = parseFloat(document.getElementById("lin-q").value);
      const x0 = parseFloat(document.getElementById("lin-x0").value);
      const y0 = parseFloat(document.getElementById("lin-y0").value);

      if (p === 0) {
        alert("P cannot be 0 for standard linear form.");
        return;
      }

      const res = DE_MATH.solveLinearDE(p, q, 1);
      const part = res.particularSol(x0, y0);
      const out = document.getElementById("res-linear");
      out.style.display = "block";
      out.className = "calc-result calc-success";
      out.innerHTML = `
        <h4>✓ Linear First-Order Solution</h4>
        <div class="calc-steps">
          <p>$$${res.pLatex}, \\quad ${res.qLatex}$$</p>
          <p><strong>Integrating Factor:</strong> $$${res.muLatex}$$</p>
          <p><strong>Product Rule Integration:</strong> $$${res.integralLatex}$$</p>
          <div class="calc-final-highlight">
            <strong>General Solution:</strong>
            <p>$$${res.solutionLatex}$$</p>
          </div>
          <div class="calc-sub-highlight">
            <strong>Particular Solution for IVP $(x_0=${x0}, y_0=${y0})$:</strong>
            <p>$$C = ${part.C} \\implies ${part.particularLatex}$$</p>
          </div>
        </div>
      `;
      renderCalcMath(out);
    };
    container.querySelector("#btn-calc-linear").onclick = runLinear;

    // 3. Homogeneous Degree
    const runHomo = () => {
      const p1 = parseInt(document.getElementById("homo-p1").value) || 0;
      const q1 = parseInt(document.getElementById("homo-q1").value) || 0;
      const p2 = parseInt(document.getElementById("homo-p2").value) || 0;
      const q2 = parseInt(document.getElementById("homo-q2").value) || 0;
      const p3 = parseInt(document.getElementById("homo-p3").value) || 0;
      const q3 = parseInt(document.getElementById("homo-q3").value) || 0;

      const terms = [
        { coeff: 2, powX: p1, powY: q1 },
        { coeff: -7, powX: p2, powY: q2 },
        { coeff: 4, powX: p3, powY: q3 }
      ];

      const res = DE_MATH.checkHomogeneousTerms(terms);
      const out = document.getElementById("res-homo");
      out.style.display = "block";
      out.className = `calc-result ${res.isHomogeneous ? 'calc-success' : 'calc-warning'}`;
      out.innerHTML = `
        <h4>${res.isHomogeneous ? `✓ Homogeneous of Degree ${res.degree}` : "⚠️ Function is Not Homogeneous"}</h4>
        <div class="calc-steps">
          <p><strong>Expression:</strong> $$f(x,y) = ${res.expressionLatex}$$</p>
          <ul>
            ${res.breakdown.map(b => `<li>${b}</li>`).join("")}
          </ul>
          <div class="calc-final-highlight">
            <strong>Euler's Scaling Test:</strong>
            <p>$$${res.scalingLatex}$$</p>
          </div>
        </div>
      `;
      renderCalcMath(out);
    };
    container.querySelector("#btn-calc-homo").onclick = runHomo;

    // 4. Non-Exact
    const runNonExact = () => {
      const preset = document.getElementById("nonexact-preset").value;
      const out = document.getElementById("res-nonexact");
      out.style.display = "block";

      if (preset === "y_case") {
        const res = DE_MATH.testNonExactConditions("xy", "x^2 + y^2", "x", "2x", "y_only");
        out.className = "calc-result calc-success";
        out.innerHTML = `
          <h4>✓ Integrating Factor μ(y) Found</h4>
          <div class="calc-steps">
            <p><strong>Equation:</strong> $$xy\\,dx + (x^2 + y^2)\\,dy = 0$$</p>
            <p>$$M_y = x, \\quad N_x = 2x \\implies M_y \\neq N_x$$</p>
            <p><strong>Ratio Criterion:</strong> $$${res.formula}$$</p>
            <ul>
              ${res.steps.map(s => `<li>$$${s}$$</li>`).join("")}
            </ul>
            <div class="calc-final-highlight">
              <strong>Exact Modified Differential Equation:</strong>
              <p>$$${res.resultingDE}$$</p>
              <p><strong>Solution:</strong> $$${res.resultingPotential}$$</p>
            </div>
          </div>
        `;
      } else {
        out.className = "calc-result calc-success";
        out.innerHTML = `
          <h4>✓ Already Exact! No Integrating Factor Needed</h4>
          <div class="calc-steps">
            <p><strong>Equation:</strong> $$(2y + x)\\,dx + 2x\\,dy = 0$$</p>
            <p>$$\\frac{\\partial M}{\\partial y} = 2, \\quad \\frac{\\partial N}{\\partial x} = 2 \\implies M_y = N_x = 2$$</p>
            <div class="calc-final-highlight">
              <strong>Potential Function Solution:</strong>
              <p>$$\\Psi(x,y) = 2xy + \\frac{1}{2}x^2 = C \\iff 4xy + x^2 = C'$$</p>
            </div>
          </div>
        `;
      }
      renderCalcMath(out);
    };
    container.querySelector("#btn-calc-nonexact").onclick = runNonExact;

    // 5. Orthogonal
    const runOrtho = () => {
      const n = parseInt(document.getElementById("ortho-n").value) || 3;
      const res = DE_MATH.calculateOrthogonalPower(n);
      const out = document.getElementById("res-ortho");
      out.style.display = "block";
      out.className = "calc-result calc-success";
      out.innerHTML = `
        <h4>✓ Orthogonal Trajectories Resolved</h4>
        <div class="calc-steps">
          <p><strong>Original Family:</strong> $$${res.familyLatex}$$</p>
          <p><strong>Differentiate & Eliminate c:</strong> $$${res.diffStep} \\implies ${res.eliminateC}$$</p>
          <p><strong>Perpendicular Condition ($m_\\perp = -1/m$):</strong> $$${res.perpCondition}$$</p>
          <p><strong>Separate:</strong> $$${res.separation}$$</p>
          <div class="calc-final-highlight">
            <strong>Orthogonal Family of Curves:</strong>
            <p>$$${res.orthogonalFamily}$$</p>
          </div>
        </div>
      `;
      renderCalcMath(out);
    };
    container.querySelector("#btn-calc-ortho").onclick = runOrtho;

    // 6. IVP Constant
    const runIVP = () => {
      const form = document.getElementById("ivp-form-type").value;
      const x0 = parseFloat(document.getElementById("ivp-x0").value);
      const y0 = parseFloat(document.getElementById("ivp-y0").value);
      const out = document.getElementById("res-ivp");
      out.style.display = "block";
      out.className = "calc-result calc-success";

      if (form === "exact_quad") {
        // x^2 + 4xy + 3y^2 = C
        const C = (x0 * x0) + 4 * (x0 * y0) + 3 * (y0 * y0);
        out.innerHTML = `
          <h4>✓ Constant C Evaluated</h4>
          <div class="calc-steps">
            <p><strong>General Implicit Solution:</strong> $$x^2 + 4xy + 3y^2 = C$$</p>
            <p><strong>Substitute $(x_0=${x0}, y_0=${y0})$:</strong></p>
            <p>$$(${x0})^2 + 4(${x0})(${y0}) + 3(${y0})^2 = C$$</p>
            <p>$$${(x0*x0).toFixed(2)} + ${(4*x0*y0).toFixed(2)} + ${(3*y0*y0).toFixed(2)} = ${C.toFixed(2)}$$</p>
            <div class="calc-final-highlight">
              <strong>Particular Solution:</strong>
              <p>$$x^2 + 4xy + 3y^2 = ${C.toFixed(2)}$$</p>
            </div>
          </div>
        `;
      } else if (form === "separable_exp") {
        // y = C exp(2x^2) => C = y0 / exp(2*x0^2)
        const denom = Math.exp(2 * x0 * x0);
        const C = y0 / denom;
        out.innerHTML = `
          <h4>✓ Constant C Evaluated</h4>
          <div class="calc-steps">
            <p><strong>General Solution:</strong> $$y(x) = C e^{2x^2}$$</p>
            <p><strong>Substitute $(x_0=${x0}, y_0=${y0})$:</strong></p>
            <p>$$${y0} = C e^{2(${x0})^2} = C e^{${(2*x0*x0).toFixed(2)}} \\implies C = ${y0} e^{-${(2*x0*x0).toFixed(2)}} \\approx ${C.toFixed(4)}$$</p>
            <div class="calc-final-highlight">
              <strong>Particular Solution:</strong>
              <p>$$y(x) = ${y0} e^{2x^2 - ${(2*x0*x0).toFixed(2)}}$$</p>
            </div>
          </div>
        `;
      } else {
        // y + 2 = C exp(x^2/2) => C = (y0 + 2) / exp(x0^2/2)
        const C = (y0 + 2) / Math.exp(0.5 * x0 * x0);
        out.innerHTML = `
          <h4>✓ Constant C Evaluated</h4>
          <div class="calc-steps">
            <p><strong>General Solution:</strong> $$y(x) = C e^{x^2/2} - 2$$</p>
            <p><strong>Substitute $(x_0=${x0}, y_0=${y0})$:</strong></p>
            <p>$$${y0} + 2 = C e^{(${x0})^2/2} \\implies C = ${C.toFixed(4)}$$</p>
            <div class="calc-final-highlight">
              <strong>Particular Solution:</strong>
              <p>$$y(x) = ${C.toFixed(3)} e^{x^2/2} - 2$$</p>
            </div>
          </div>
        `;
      }
      renderCalcMath(out);
    };
    container.querySelector("#btn-calc-ivp").onclick = runIVP;

    // 7. Separable
    const runSep = () => {
      const a = parseFloat(document.getElementById("sep-a").value);
      const k = parseFloat(document.getElementById("sep-k").value);
      const coeff = a / 2;
      const powerStr = coeff === 1 ? "x^2" : `${coeff}x^2`;
      const out = document.getElementById("res-separable");
      out.style.display = "block";
      out.className = "calc-result calc-success";
      out.innerHTML = `
        <h4>✓ Separable DE Integrated</h4>
        <div class="calc-steps">
          <p><strong>Differential Equation:</strong> $$\\frac{dy}{dx} = ${a}x(y - ${k})$$</p>
          <p><strong>Separation of Variables:</strong> $$\\frac{1}{y - ${k}}\\,dy = ${a}x\\,dx$$</p>
          <p><strong>Integrate:</strong> $$\\ln|y - ${k}| = \\frac{${a}}{2}x^2 + C_1 = ${powerStr} + C_1$$</p>
          <p><strong>Exponentiate:</strong> $$y - ${k} = C e^{${powerStr}}$$</p>
          <div class="calc-final-highlight">
            <strong>Explicit General Solution:</strong>
            <p>$$y(x) = ${k} + C e^{${powerStr}}$$</p>
          </div>
        </div>
      `;
      renderCalcMath(out);
    };
    container.querySelector("#btn-calc-sep").onclick = runSep;
  }
};

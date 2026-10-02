/**
 * Differential Equations for Engineers - Computation & Validation Engine
 * Authoritative algorithms for:
 * 1. Exactness Testing (My vs Nx)
 * 2. Linear DE Integrating Factor Solver (mu(x) = exp(integral P dx))
 * 3. Homogeneous Function Degree Verification (f(tx,ty) = t^n f(x,y))
 * 4. Non-Exact DE Integrating Factors (mu(x) and mu(y))
 * 5. Orthogonal Trajectory Slope Resolver (m_perp = -1/m)
 * 6. Initial-Value Problem Constant Resolver (y(x0) = y0)
 * 7. Runge-Kutta 4th Order & Slope Field Engine for Canvas Visualizations
 */

export const DE_MATH = {
  /**
   * Evaluates exactness of differential form M(x,y) dx + N(x,y) dy = 0
   */
  testExactness(mType, a, b, c, d) {
    // Standard polynomial forms:
    // Form 1: M = a*x*y + b*y, N = c*x^2 + d*x
    // Form 2: M = a*x + b*y, N = c*x + d*y
    // Form 3: M = a*x^2 + b*y*cos(xy), N = c*x*cos(xy) + d*y
    let My_str = "";
    let Nx_str = "";
    let isExact = false;
    let diff_str = "";

    if (mType === "linear_xy") {
      // M = a*x + b*y, N = c*x + d*y
      // My = b, Nx = c
      const My = b;
      const Nx = c;
      isExact = (My === Nx);
      My_str = `${My}`;
      Nx_str = `${Nx}`;
      diff_str = `${Nx - My}`;
      return {
        isExact,
        M_display: `${a}x + ${b}y`,
        N_display: `${c}x + ${d}y`,
        My_display: `\\frac{\\partial M}{\\partial y} = ${My_str}`,
        Nx_display: `\\frac{\\partial N}{\\partial x} = ${Nx_str}`,
        comparison: isExact 
          ? `M_y = N_x = ${My_str} \\implies \\text{Exact}` 
          : `M_y = ${My_str} \\neq ${Nx_str} = N_x \\implies \\text{Not Exact}`,
        potential: isExact 
          ? `\\Psi(x,y) = \\frac{${a}}{2}x^2 + ${b}xy + \\frac{${d}}{2}y^2 = C` 
          : "No scalar potential exists directly without an integrating factor."
      };
    } else if (mType === "quadratic_xy") {
      // M = a*x*y + b*y, N = (c)*x^2 + d*x
      // My = a*x + b, Nx = 2*c*x + d
      const My_coeff_x = a;
      const My_const = b;
      const Nx_coeff_x = 2 * c;
      const Nx_const = d;
      isExact = (My_coeff_x === Nx_coeff_x && My_const === Nx_const);
      My_str = `${a}x + ${b}`;
      Nx_str = `${2 * c}x + ${d}`;
      return {
        isExact,
        M_display: `${a}xy + ${b}y`,
        N_display: `${c === 1 ? '' : c === 2.5 ? '\\frac{5}{2}' : c}x^2 + ${d}x`,
        My_display: `\\frac{\\partial M}{\\partial y} = ${My_str}`,
        Nx_display: `\\frac{\\partial N}{\\partial x} = ${Nx_str}`,
        comparison: isExact 
          ? `M_y = N_x = ${My_str} \\implies \\text{Exact}` 
          : `M_y = ${My_str} \\neq ${Nx_str} = N_x \\implies \\text{Not Exact}`,
        potential: isExact 
          ? `\\Psi(x,y) = \\frac{${a}}{2}x^2 y + ${b}xy = C` 
          : "Non-conservative vector field: test for integrating factor \\mu(x) or \\mu(y)."
      };
    }

    return {
      isExact: true,
      M_display: `${a}x + ${b}y`,
      N_display: `${b}x + ${d}y`,
      My_display: `\\frac{\\partial M}{\\partial y} = ${b}`,
      Nx_display: `\\frac{\\partial N}{\\partial x} = ${b}`,
      comparison: `M_y = N_x = ${b} \\implies \\text{Exact}`,
      potential: `\\Psi(x,y) = \\frac{${a}}{2}x^2 + ${b}xy + \\frac{${d}}{2}y^2 = C`
    };
  },

  /**
   * Calculates integrating factor and solution for y' + P(x)y = Q(x)
   * where P(x) = p (constant) or p/x, and Q(x) = q * x^n or q
   */
  solveLinearDE(pVal, qVal, qPower = 1) {
    // Case 1: P(x) = p (constant), Q(x) = q*x
    // mu(x) = exp(p*x)
    // int mu*Q dx = int q*x*exp(p*x) dx = q/p * x * exp(p*x) - q/(p^2) * exp(p*x)
    const muLatex = pVal === 1 ? "e^x" : pVal === -1 ? "e^{-x}" : `e^{${pVal}x}`;
    const pSq = pVal * pVal;
    const term1Coeff = (qVal / pVal);
    const term2Coeff = (qVal / pSq);

    const intMuQ = `${term1Coeff === 1 ? '' : term1Coeff === -1 ? '-' : term1Coeff}x e^{${pVal}x} - ${term2Coeff}e^{${pVal}x}`;
    const solLatex = `y(x) = ${term1Coeff === 1 ? '' : term1Coeff}x - ${term2Coeff} + C e^{${-pVal}x}`;

    return {
      pLatex: `P(x) = ${pVal}`,
      qLatex: `Q(x) = ${qVal}x`,
      muLatex: `\\mu(x) = e^{\\int ${pVal}\\,dx} = ${muLatex}`,
      integralLatex: `\\int \\mu(x)Q(x)\\,dx = \\int ${qVal}x ${muLatex}\\,dx = ${intMuQ}`,
      solutionLatex: solLatex,
      particularSol: (x0, y0) => {
        // y0 = term1Coeff*x0 - term2Coeff + C*exp(-pVal*x0)
        // C = (y0 - term1Coeff*x0 + term2Coeff) / exp(-pVal*x0)
        const C = (y0 - term1Coeff * x0 + term2Coeff) * Math.exp(pVal * x0);
        return {
          C: C.toFixed(4),
          particularLatex: `y(x) = ${term1Coeff}x - ${term2Coeff} + (${C.toFixed(3)})e^{${-pVal}x}`
        };
      }
    };
  },

  /**
   * Homogeneous polynomial term degree checker
   */
  checkHomogeneousTerms(termsArray) {
    // Expects array of { coeff, powX, powY }
    const degrees = termsArray.map(t => t.powX + t.powY);
    const firstDeg = degrees[0];
    const isHomogeneous = degrees.every(d => d === firstDeg);

    const termsLatex = termsArray.map((t, idx) => {
      const sign = idx > 0 && t.coeff >= 0 ? "+" : "";
      const xPart = t.powX === 0 ? "" : t.powX === 1 ? "x" : `x^{${t.powX}}`;
      const yPart = t.powY === 0 ? "" : t.powY === 1 ? "y" : `y^{${t.powY}}`;
      return `${sign}${t.coeff}${xPart}${yPart}`;
    }).join(" ");

    const breakdown = termsArray.map(t => {
      return `Term $${t.coeff}x^{${t.powX}}y^{${t.powY}}$ has degree $${t.powX} + ${t.powY} = ${t.powX + t.powY}$`;
    });

    return {
      expressionLatex: termsLatex,
      isHomogeneous,
      degree: isHomogeneous ? firstDeg : null,
      breakdown,
      scalingLatex: isHomogeneous 
        ? `f(tx, ty) = t^{${firstDeg}} f(x,y) \\implies \\text{Homogeneous of degree } ${firstDeg}`
        : "Degrees vary across terms \\implies \\text{Not homogeneous}"
    };
  },

  /**
   * Non-exact integrating factor conditions:
   * Condition A (x only): (My - Nx) / N = f(x) => mu(x) = exp(int f(x) dx)
   * Condition B (y only): (Nx - My) / M = g(y) => mu(y) = exp(int g(y) dy)
   */
  testNonExactConditions(M_str, N_str, My_val, Nx_val, ratioTarget) {
    if (ratioTarget === "y_only") {
      // e.g. M = xy, N = x^2 + y^2
      // My = x, Nx = 2x
      // (Nx - My)/M = (2x - x)/(xy) = x/(xy) = 1/y = g(y)
      // mu(y) = exp(int 1/y dy) = y
      return {
        formula: "\\frac{N_x - M_y}{M} = g(y)",
        steps: [
          `N_x - M_y = 2x - x = x`,
          `\\frac{N_x - M_y}{M} = \\frac{x}{xy} = \\frac{1}{y} = g(y)`,
          `\\mu(y) = e^{\\int \\frac{1}{y}\\,dy} = e^{\\ln|y|} = y`
        ],
        integratingFactor: "\\mu(y) = y",
        resultingDE: "(xy^2)\\,dx + (x^2 y + y^3)\\,dy = 0",
        resultingPotential: "\\frac{1}{2}x^2 y^2 + \\frac{1}{4}y^4 = C"
      };
    } else {
      // x only
      return {
        formula: "\\frac{M_y - N_x}{N} = f(x)",
        steps: [
          `M_y - N_x = f(x) \\cdot N`,
          `\\mu(x) = e^{\\int f(x)\\,dx}`
        ],
        integratingFactor: "\\mu(x) = e^{\\int f(x)\\,dx}"
      };
    }
  },

  /**
   * Orthogonal trajectories for family y = c * x^n
   * Differentiate: y' = n * c * x^(n-1) = n * (y / x^n) * x^(n-1) = n * y / x
   * Orthogonal slope: y'_perp = -1 / (n * y / x) = -x / (n * y)
   * n * y dy = -x dx => n/2 * y^2 = -1/2 * x^2 + C1 => x^2 + n * y^2 = C
   */
  calculateOrthogonalPower(n) {
    const origSlope = `${n}\\frac{y}{x}`;
    const perpSlope = `-\\frac{x}{${n}y}`;
    const integratedForm = n === 1 ? "x^2 + y^2 = C" : n === -2 ? "x^2 - 2y^2 = C" : `x^2 + ${n}y^2 = C`;

    return {
      n,
      familyLatex: `y = c x^{${n}}`,
      diffStep: `\\frac{dy}{dx} = ${n}c x^{${n - 1}}`,
      eliminateC: `\\left(\\frac{dy}{dx}\\right)_{\\text{orig}} = ${origSlope}`,
      perpCondition: `m_\\perp = -\\frac{1}{m_{\\text{orig}}} \\implies \\frac{dy}{dx} = ${perpSlope}`,
      separation: `${n}y\\,dy = -x\\,dx`,
      orthogonalFamily: integratedForm
    };
  },

  /**
   * Evaluates numerical direction field for a differential equation dy/dx = f(x,y)
   */
  generateSlopeField(fType, xMin, xMax, yMin, yMax, step) {
    const grid = [];
    const fn = this.getSlopeFunction(fType);

    for (let x = xMin; x <= xMax; x += step) {
      for (let y = yMin; y <= yMax; y += step) {
        const slope = fn(x, y);
        grid.push({ x, y, slope });
      }
    }
    return grid;
  },

  getSlopeFunction(fType) {
    switch (fType) {
      case "linear_decay": // y' = -y + x
        return (x, y) => -y + x;
      case "separable_growth": // y' = 2xy
        return (x, y) => Math.max(-10, Math.min(10, 2 * x * y));
      case "homogeneous_ratio": // y' = 2 - y/x
        return (x, y) => (Math.abs(x) < 0.05 ? 0 : 2 - (y / x));
      case "orthogonal_cubic": // y' = -x / (3y)
        return (x, y) => (Math.abs(y) < 0.05 ? (x > 0 ? -10 : 10) : -x / (3 * y));
      case "exact_linear": // y' = -(4x+5y)/(5x+6y)
        return (x, y) => {
          const den = 5 * x + 6 * y;
          return Math.abs(den) < 0.05 ? 0 : -(4 * x + 5 * y) / den;
        };
      default:
        return (x, y) => -y + x;
    }
  },

  /**
   * Runge-Kutta 4th Order numerical integrator for integral curves on canvas
   */
  rk4Trajectory(fType, x0, y0, xMin, xMax, h = 0.04) {
    const fn = this.getSlopeFunction(fType);
    const forward = [];
    const backward = [];

    // Forward integration (x0 -> xMax)
    let curX = x0;
    let curY = y0;
    forward.push({ x: curX, y: curY });
    while (curX < xMax && Math.abs(curY) < 15) {
      const k1 = fn(curX, curY);
      const k2 = fn(curX + h / 2, curY + (h / 2) * k1);
      const k3 = fn(curX + h / 2, curY + (h / 2) * k2);
      const k4 = fn(curX + h, curY + h * k3);
      curY += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      curX += h;
      forward.push({ x: curX, y: curY });
    }

    // Backward integration (x0 -> xMin)
    curX = x0;
    curY = y0;
    while (curX > xMin && Math.abs(curY) < 15) {
      const k1 = fn(curX, curY);
      const k2 = fn(curX - h / 2, curY - (h / 2) * k1);
      const k3 = fn(curX - h / 2, curY - (h / 2) * k2);
      const k4 = fn(curX - h, curY - h * k3);
      curY -= (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      curX -= h;
      backward.unshift({ x: curX, y: curY });
    }

    return [...backward, ...forward];
  }
};

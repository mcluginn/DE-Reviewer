/**
 * Differential Equations for Engineers - Complete Exam Practice Bank
 * Authoritative source: de_exam_topics_only.docx (Questions 1 - 20 & Instructor Mini-Quiz)
 * Levels: Foundation (1-5), Application (6-14), Challenge (15-20)
 * All math typeset with KaTeX / MathML syntax and progressive reveal steps.
 */

export const PRACTICE_QUESTIONS = [
  // FOUNDATION LEVEL (1 - 5)
  {
    id: "de-pq-1",
    section: "Part A - Foundation",
    number: 1,
    topicId: "exactness-test",
    topicTitle: "Exactness Test",
    difficulty: "Foundation",
    question: "Determine whether the differential equation $$(5xy + 2y)\\,dx + \\left(\\frac{5}{2}x^2 + 2x\\right)dy = 0$$ is exact.",
    options: [
      "Exact, because $M_y = N_x = 5x + 2$",
      "Not exact, because $M_x \\neq N_y$",
      "Exact, with integrating factor $\\mu(x) = x$",
      "Not exact, because $M_y = 5x$ while $N_x = 5x + 2$"
    ],
    correctIndex: 0,
    hint: "Identify $M(x,y)$ as the coefficient of $dx$ and $N(x,y)$ as the coefficient of $dy$, then compute partial derivatives $M_y$ and $N_x$.",
    firstStep: "Compute $M_y = \\frac{\\partial}{\\partial y}(5xy + 2y) = 5x + 2$.",
    fullSolution: `**1. IDENTIFY COEFFICIENTS:**
$$M(x,y) = 5xy + 2y, \\quad N(x,y) = \\frac{5}{2}x^2 + 2x$$

**2. DIFFERENTIATE PARTIALLY:**
* With respect to $y$ (treating $x$ as constant):
$$\\frac{\\partial M}{\\partial y} = \\frac{\\partial}{\\partial y}(5xy + 2y) = 5x + 2$$
* With respect to $x$ (treating $y$ as constant):
$$\\frac{\\partial N}{\\partial x} = \\frac{\\partial}{\\partial x}\\left(\\frac{5}{2}x^2 + 2x\\right) = \\frac{5}{2}(2x) + 2 = 5x + 2$$

**3. COMPARE RESULTS:**
$$\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x} = 5x + 2$$
Because the partial derivatives are identical for all $(x,y)$, the equation is exact.`,
    finalAnswer: "Exact, because $M_y = N_x = 5x + 2$"
  },
  {
    id: "de-pq-2",
    section: "Part A - Foundation",
    number: 2,
    topicId: "linear-first-order-des",
    topicTitle: "Linear First-Order Differential Equations",
    difficulty: "Foundation",
    question: "Find the integrating factor $\\mu(x)$ for the linear first-order differential equation $$\\frac{dy}{dx} + 5y = 10.$$",
    options: [
      "\\(\\mu(x) = e^{5x}\\)",
      "\\(\\mu(x) = 5e^x\\)",
      "\\(\\mu(x) = e^{-5x}\\)",
      "\\(\\mu(x) = \\ln(5x)\\)"
    ],
    correctIndex: 0,
    hint: "Match the equation with the standard canonical linear form $\\frac{dy}{dx} + P(x)y = Q(x)$ and use $\\mu(x) = e^{\\int P(x)\\,dx}$.",
    firstStep: "Identify the coefficient of $y$: here $P(x) = 5$.",
    fullSolution: `**1. STANDARD LINEAR FORM:**
$$\\frac{dy}{dx} + P(x)y = Q(x)$$
Comparing terms:
$$P(x) = 5, \\quad Q(x) = 10$$

**2. INTEGRATING FACTOR FORMULA:**
$$\\mu(x) = e^{\\int P(x)\\,dx} = e^{\\int 5\\,dx}$$

**3. EVALUATION:**
$$\\mu(x) = e^{5x}$$
*(We set the integration constant to zero because any nonzero constant cancels across the equation).*`,
    finalAnswer: "\\mu(x) = e^{5x}"
  },
  {
    id: "de-pq-3",
    section: "Part A - Foundation",
    number: 3,
    topicId: "homogeneous-functions-degree",
    topicTitle: "Homogeneous Functions & Degree Recognition",
    difficulty: "Foundation",
    question: "Determine the degree of homogeneity of the multivariable function $$f(x,y) = 2x^3 y^2 - 7xy^4 + 4y^5.$$",
    options: [
      "Degree 5",
      "Degree 3",
      "Degree 4",
      "Degree 9"
    ],
    correctIndex: 0,
    hint: "For each polynomial term $c x^a y^b$, the total degree is $a + b$. Check whether every term has the same sum.",
    firstStep: "Calculate the sum of powers for the first term $2x^3 y^2$: $3 + 2 = 5$.",
    fullSolution: `**1. EVALUATE EACH TERM'S TOTAL DEGREE:**
* Term 1: $2x^3 y^2 \\implies 3 + 2 = 5$
* Term 2: $-7x^1 y^4 \\implies 1 + 4 = 5$
* Term 3: $4y^5 \\implies 0 + 5 = 5$

**2. TEST USING SCALING DEFINITION:**
$$f(tx, ty) = 2(tx)^3(ty)^2 - 7(tx)(ty)^4 + 4(ty)^5$$
$$f(tx, ty) = 2t^5 x^3 y^2 - 7t^5 x y^4 + 4t^5 y^5 = t^5 f(x,y)$$

**3. CONCLUSION:**
Since $f(tx, ty) = t^5 f(x,y)$, the function is homogeneous of degree 5.`,
    finalAnswer: "Degree 5"
  },
  {
    id: "de-pq-4",
    section: "Part A - Foundation",
    number: 4,
    topicId: "separable-des",
    topicTitle: "Separable Differential Equations",
    difficulty: "Foundation",
    question: "Solve the separable differential equation $$\\frac{dy}{dx} = 2x(y - 3).$$",
    options: [
      "\\(y = 3 + C e^{x^2}\\)",
      "\\(y = C e^{2x} + 3\\)",
      "\\(y = 3 - C e^{-x^2}\\)",
      "\\(y = (x^2 + C)^2 + 3\\)"
    ],
    correctIndex: 0,
    hint: "Separate all $y$-terms with $dy$ on the left side and all $x$-terms with $dx$ on the right side.",
    firstStep: "Divide both sides by $(y - 3)$ and multiply by $dx$: $\\frac{dy}{y - 3} = 2x\\,dx$.",
    fullSolution: `**1. SEPARATE VARIABLES:**
$$\\frac{1}{y - 3}\\,dy = 2x\\,dx$$

**2. INTEGRATE BOTH SIDES:**
$$\\int \\frac{1}{y - 3}\\,dy = \\int 2x\\,dx$$
$$\\ln|y - 3| = x^2 + C_1$$

**3. EXPONENTIATE:**
$$|y - 3| = e^{x^2 + C_1} = e^{C_1} e^{x^2} = C e^{x^2}$$
$$y - 3 = C e^{x^2} \\implies y = 3 + C e^{x^2}$$`,
    finalAnswer: "y = 3 + C e^{x^2}"
  },
  {
    id: "de-pq-5",
    section: "Part A - Foundation",
    number: 5,
    topicId: "linear-first-order-des",
    topicTitle: "Linear First-Order Differential Equations",
    difficulty: "Foundation",
    question: "Solve the linear first-order differential equation $$\\frac{dy}{dx} + 3y = 9x.$$",
    options: [
      "\\(y = 3x - 1 + C e^{-3x}\\)",
      "\\(y = 3x + 1 + C e^{3x}\\)",
      "\\(y = 9x - 3 + C e^{-3x}\\)",
      "\\(y = \\frac{9}{2}x^2 + C e^{-3x}\\)"
    ],
    correctIndex: 0,
    hint: "Calculate the integrating factor $\\mu(x) = e^{\\int 3\\,dx} = e^{3x}$, multiply through, and integrate by parts.",
    firstStep: "Multiply the equation by $e^{3x}$: $e^{3x}\\frac{dy}{dx} + 3e^{3x}y = 9x e^{3x}$.",
    fullSolution: `**1. INTEGRATING FACTOR:**
$$P(x) = 3 \\implies \\mu(x) = e^{\\int 3\\,dx} = e^{3x}$$

**2. RECOGNIZE PRODUCT RULE DERIVATIVE:**
$$\\frac{d}{dx}\\left[e^{3x} y\\right] = 9x e^{3x}$$

**3. INTEGRATE BY PARTS:**
$$e^{3x} y = \\int 9x e^{3x}\\,dx + C$$
Let $u = 9x \\implies du = 9\\,dx$, and $dv = e^{3x}\\,dx \\implies v = \\frac{1}{3}e^{3x}$:
$$\\int 9x e^{3x}\\,dx = 3x e^{3x} - \\int 3e^{3x}\\,dx = 3x e^{3x} - e^{3x}$$

**4. ISOLATE y:**
$$e^{3x} y = 3x e^{3x} - e^{3x} + C$$
$$y = 3x - 1 + C e^{-3x}$$`,
    finalAnswer: "y = 3x - 1 + C e^{-3x}"
  },

  // APPLICATION LEVEL (6 - 14)
  {
    id: "de-pq-6",
    section: "Part B - Application",
    number: 6,
    topicId: "solving-exact-des",
    topicTitle: "Solving Exact Differential Equations",
    difficulty: "Application",
    question: "Solve the exact differential equation $$(4x + 5y)\\,dx + (5x + 6y)\\,dy = 0.$$",
    options: [
      "\\(2x^2 + 5xy + 3y^2 = C\\)",
      "\\(4x^2 + 5xy + 6y^2 = C\\)",
      "\\(2x^2 + 10xy + 3y^2 = C\\)",
      "\\(x^2 + 5xy + 2y^2 = C\\)"
    ],
    correctIndex: 0,
    hint: "Verify $M_y = N_x = 5$, integrate $M$ with respect to $x$ to find $\\Psi(x,y)$, then differentiate with respect to $y$ to determine $g(y)$.",
    firstStep: "Check exactness: $M_y = 5$ and $N_x = 5$ (exact). Integrate $M$: $\\Psi = \\int (4x + 5y)\\,dx = 2x^2 + 5xy + g(y)$.",
    fullSolution: `**1. EXACTNESS VERIFICATION:**
$$M(x,y) = 4x + 5y \\implies M_y = 5$$
$$N(x,y) = 5x + 6y \\implies N_x = 5$$
Since $M_y = N_x = 5$, the equation is exact.

**2. INTEGRATE M WITH RESPECT TO x:**
$$\\Psi(x,y) = \\int (4x + 5y)\\,dx + g(y) = 2x^2 + 5xy + g(y)$$

**3. DIFFERENTIATE WITH RESPECT TO y AND MATCH N:**
$$\\frac{\\partial \\Psi}{\\partial y} = 5x + g'(y)$$
Set equal to $N(x,y) = 5x + 6y$:
$$5x + g'(y) = 5x + 6y \\implies g'(y) = 6y$$
$$g(y) = \\int 6y\\,dy = 3y^2$$

**4. ASSEMBLE GENERAL SOLUTION:**
$$\\Psi(x,y) = 2x^2 + 5xy + 3y^2 = C$$`,
    finalAnswer: "2x^2 + 5xy + 3y^2 = C"
  },
  {
    id: "de-pq-7",
    section: "Part B - Application",
    number: 7,
    topicId: "exactness-test",
    topicTitle: "Exactness Test",
    difficulty: "Application",
    question: "Test the differential equation $$(3xy + x)\\,dx + \\left(\\frac{3}{2}x^2 + x + 4y\\right)dy = 0$$ for exactness.",
    options: [
      "Not exact, because $M_y = 3x$ while $N_x = 3x + 1$",
      "Exact, because $M_y = N_x = 3x$",
      "Exact, because $M_x = N_y = 3y + 1$",
      "Not exact, because $M_y = 3y$ and $N_x = 3x$"
    ],
    correctIndex: 0,
    hint: "Carefully differentiate $M = 3xy + x$ with respect to $y$, and differentiate $N = \\frac{3}{2}x^2 + x + 4y$ with respect to $x$.",
    firstStep: "Compute $M_y = \\frac{\\partial}{\\partial y}(3xy + x) = 3x$.",
    fullSolution: `**1. IDENTIFY COEFFICIENTS:**
$$M(x,y) = 3xy + x, \\quad N(x,y) = \\frac{3}{2}x^2 + x + 4y$$

**2. COMPUTE PARTIAL DERIVATIVES:**
* $\\frac{\\partial M}{\\partial y} = 3x + 0 = 3x$
* $\\frac{\\partial N}{\\partial x} = \\frac{3}{2}(2x) + 1 + 0 = 3x + 1$

**3. COMPARISON:**
$$M_y = 3x \\neq 3x + 1 = N_x$$
The discrepancy is $N_x - M_y = 1 \\neq 0$. Therefore, the differential equation is **not exact**.`,
    finalAnswer: "Not exact, because M_y = 3x while N_x = 3x + 1"
  },
  {
    id: "de-pq-8",
    section: "Part B - Application",
    number: 8,
    topicId: "homogeneous-first-order-des",
    topicTitle: "Homogeneous First-Order Differential Equations",
    difficulty: "Application",
    question: "Solve the homogeneous differential equation $$(y - 2x)\\,dx + x\\,dy = 0.$$",
    options: [
      "\\(y = x - \\frac{C}{x}\\)",
      "\\(y = 2x + C x^2\\)",
      "\\(y = x^2 - \\frac{C}{x}\\)",
      "\\(y = \\frac{x}{2} + C x\\)"
    ],
    correctIndex: 0,
    hint: "Express as $\\frac{dy}{dx} = 2 - \\frac{y}{x}$, substitute $y = vx$ and $\\frac{dy}{dx} = v + x\\frac{dv}{dx}$, then separate variables.",
    firstStep: "Rearrange to $\\frac{dy}{dx} = \\frac{2x - y}{x} = 2 - \\frac{y}{x}$. Let $y = vx$.",
    fullSolution: `**1. REWRITE IN RATIO FORM:**
$$x\\,dy = (2x - y)\\,dx \\implies \\frac{dy}{dx} = 2 - \\frac{y}{x}$$

**2. APPLY SUBSTITUTION $y = vx$:**
$$\\frac{dy}{dx} = v + x\\frac{dv}{dx}$$
$$v + x\\frac{dv}{dx} = 2 - v \\implies x\\frac{dv}{dx} = 2 - 2v = 2(1 - v)$$

**3. SEPARATE AND INTEGRATE:**
$$\\frac{1}{1 - v}\\,dv = \\frac{2}{x}\\,dx$$
$$-\\ln|1 - v| = 2\\ln|x| + C_1 = \\ln(x^2) + C_1$$
$$\\ln|1 - v| = -\\ln(x^2) - C_1 \\implies 1 - v = \\frac{C}{x^2}$$

**4. BACK-SUBSTITUTE $v = \\frac{y}{x}$:**
$$1 - \\frac{y}{x} = \\frac{C}{x^2} \\implies \\frac{y}{x} = 1 - \\frac{C}{x^2}$$
$$y = x - \\frac{C}{x}$$`,
    finalAnswer: "y = x - \\frac{C}{x}"
  },
  {
    id: "de-pq-9",
    section: "Part B - Application",
    number: 9,
    topicId: "initial-value-problems",
    topicTitle: "Initial-Value Problems (IVPs)",
    difficulty: "Application",
    question: "Solve the initial-value problem $$\\frac{dy}{dx} = 4xy, \\quad y(1) = 3.$$",
    options: [
      "\\(y = 3 e^{2x^2 - 2}\\)",
      "\\(y = 3 e^{4x^2 - 4}\\)",
      "\\(y = e^{2x^2} + 2\\)",
      "\\(y = 3 e^{2x^2}\\)"
    ],
    correctIndex: 0,
    hint: "Separate variables to find the general solution $y = C e^{2x^2}$, then apply the initial condition $y(1) = 3$ to solve for $C$.",
    firstStep: "Separate: $\\frac{1}{y}\\,dy = 4x\\,dx \\implies \\ln|y| = 2x^2 + C_1$.",
    fullSolution: `**1. SEPARATE AND INTEGRATE:**
$$\\int \\frac{1}{y}\\,dy = \\int 4x\\,dx$$
$$\\ln|y| = 2x^2 + C_1 \\implies y = C e^{2x^2}$$

**2. APPLY INITIAL CONDITION $y(1) = 3$:**
$$3 = C e^{2(1)^2} = C e^2$$
$$C = 3 e^{-2}$$

**3. PARTICULAR SOLUTION:**
$$y = (3 e^{-2}) e^{2x^2} = 3 e^{2x^2 - 2}$$`,
    finalAnswer: "y = 3 e^{2x^2 - 2}"
  },
  {
    id: "de-pq-10",
    section: "Part B - Application",
    number: 10,
    topicId: "orthogonal-trajectories",
    topicTitle: "Orthogonal Trajectories",
    difficulty: "Application",
    question: "Find the orthogonal trajectories of the family of cubic curves $$y = c x^3.$$",
    options: [
      "\\(x^2 + 3y^2 = C\\)",
      "\\(3x^2 + y^2 = C\\)",
      "\\(x^3 + 3y^3 = C\\)",
      "\\(x^2 - 3y^2 = C\\)"
    ],
    correctIndex: 0,
    hint: "Differentiate $y = cx^3$ with respect to $x$, eliminate the parameter $c$, set $m_\\perp = -1/m$, and integrate the resulting separable DE.",
    firstStep: "Differentiate: $\\frac{dy}{dx} = 3cx^2$. Since $c = y/x^3$, slope $m = 3(y/x^3)x^2 = \\frac{3y}{x}$.",
    fullSolution: `**1. FIND ORIGINAL FAMILY SLOPE:**
$$y = cx^3 \\implies \\frac{dy}{dx} = 3cx^2$$
Eliminate parameter $c = \\frac{y}{x^3}$:
$$\\left(\\frac{dy}{dx}\\right)_{\\text{orig}} = 3\\left(\\frac{y}{x^3}\\right)x^2 = \\frac{3y}{x}$$

**2. APPLY ORTHOGONAL SLOPE CONDITION:**
$$m_\\perp = -\\frac{1}{m_{\\text{orig}}} \\implies \\frac{dy}{dx} = -\\frac{x}{3y}$$

**3. SEPARATE AND INTEGRATE:**
$$3y\\,dy = -x\\,dx$$
$$\\int 3y\\,dy = -\\int x\\,dx$$
$$\\frac{3}{2}y^2 = -\\frac{1}{2}x^2 + C_1$$
Multiply through by 2:
$$x^2 + 3y^2 = C$$
*(This represents a family of concentric ellipses).*`,
    finalAnswer: "x^2 + 3y^2 = C"
  },
  {
    id: "de-pq-11",
    section: "Part B - Application",
    number: 11,
    topicId: "exact-trig-des",
    topicTitle: "Exact Equations with Trigonometric Terms",
    difficulty: "Application",
    question: "Solve the exact trigonometric differential equation $$(3x^2 + y\\cos(xy))\\,dx + (x\\cos(xy) + 2y)\\,dy = 0.$$",
    options: [
      "\\(x^3 + \\sin(xy) + y^2 = C\\)",
      "\\(3x^3 + \\cos(xy) + 2y^2 = C\\)",
      "\\(x^3 - \\sin(xy) + y^2 = C\\)",
      "\\(x^3 + xy\\cos(xy) + y^2 = C\\)"
    ],
    correctIndex: 0,
    hint: "Recall the chain rule: $\\frac{\\partial}{\\partial x}\\sin(xy) = y\\cos(xy)$ and $\\frac{\\partial}{\\partial y}\\sin(xy) = x\\cos(xy)$.",
    firstStep: "Integrate $M$ with respect to $x$: $\\Psi = \\int (3x^2 + y\\cos(xy))\\,dx = x^3 + \\sin(xy) + g(y)$.",
    fullSolution: `**1. CHECK EXACTNESS:**
$$M_y = \\frac{\\partial}{\\partial y}(3x^2 + y\\cos(xy)) = \\cos(xy) - xy\\sin(xy)$$
$$N_x = \\frac{\\partial}{\\partial x}(x\\cos(xy) + 2y) = \\cos(xy) - xy\\sin(xy)$$
Exactness holds: $M_y = N_x$.

**2. INTEGRATE M WITH RESPECT TO x:**
$$\\Psi(x,y) = \\int (3x^2 + y\\cos(xy))\\,dx = x^3 + \\sin(xy) + g(y)$$

**3. DIFFERENTIATE WITH RESPECT TO y AND MATCH N:**
$$\\frac{\\partial \\Psi}{\\partial y} = x\\cos(xy) + g'(y) = x\\cos(xy) + 2y$$
$$g'(y) = 2y \\implies g(y) = y^2$$

**4. GENERAL SOLUTION:**
$$x^3 + \\sin(xy) + y^2 = C$$`,
    finalAnswer: "x^3 + \\sin(xy) + y^2 = C"
  },
  {
    id: "de-pq-12",
    section: "Part B - Application",
    number: 12,
    topicId: "exact-trig-des",
    topicTitle: "Exact Equations with Trigonometric Terms",
    difficulty: "Application",
    question: "Solve the differential equation $$2xy\\,dx + (x^2 + \\sec^2 y)\\,dy = 0.$$",
    options: [
      "\\(x^2 y + \\tan y = C\\)",
      "\\(x^2 y - \\tan y = C\\)",
      "\\(2x^2 y + \\sec y = C\\)",
      "\\(x y^2 + \\tan y = C\\)"
    ],
    correctIndex: 0,
    hint: "Notice that $2xy\\,dx + x^2\\,dy = d(x^2 y)$ and $\\sec^2 y\\,dy = d(\\tan y)$.",
    firstStep: "Check exactness: $M_y = 2x$ and $N_x = 2x$. The equation is exact.",
    fullSolution: `**1. EXACTNESS CHECK:**
$$M = 2xy \\implies M_y = 2x$$
$$N = x^2 + \\sec^2 y \\implies N_x = 2x$$
Equation is exact!

**2. INTEGRATE M WITH RESPECT TO x:**
$$\\Psi(x,y) = \\int 2xy\\,dx = x^2 y + g(y)$$

**3. MATCH WITH N:**
$$\\frac{\\partial \\Psi}{\\partial y} = x^2 + g'(y) = x^2 + \\sec^2 y \\implies g'(y) = \\sec^2 y$$
$$g(y) = \\tan y$$

**4. FINAL IMPLICIT SOLUTION:**
$$x^2 y + \\tan y = C$$`,
    finalAnswer: "x^2 y + \\tan y = C"
  },
  {
    id: "de-pq-13",
    section: "Part B - Application",
    number: 13,
    topicId: "integrating-factors-non-exact",
    topicTitle: "Integrating Factors for Non-Exact Equations",
    difficulty: "Application",
    question: "For the differential equation $$xy\\,dx + (x^2 + y^2)\\,dy = 0,$$ determine an integrating factor $\\mu(y)$ depending only on $y$.",
    options: [
      "\\(\\mu(y) = y\\)",
      "\\(\\mu(y) = \\frac{1}{y}\\)",
      "\\(\\mu(y) = y^2\\)",
      "\\(\\mu(y) = e^y\\)"
    ],
    correctIndex: 0,
    hint: "Use the criterion: if $\\frac{N_x - M_y}{M} = g(y)$, then $\\mu(y) = e^{\\int g(y)\\,dy}$.",
    firstStep: "Compute $M_y = x$ and $N_x = 2x$. Evaluate $\\frac{N_x - M_y}{M} = \\frac{2x - x}{xy} = \\frac{1}{y}$.",
    fullSolution: `**1. TEST EXACTNESS:**
$$M = xy \\implies M_y = x$$
$$N = x^2 + y^2 \\implies N_x = 2x$$
$M_y \\neq N_x$, so the equation is not exact.

**2. CHECK y-ONLY INTEGRATING FACTOR CONDITION:**
$$\\frac{N_x - M_y}{M} = \\frac{2x - x}{xy} = \\frac{x}{xy} = \\frac{1}{y} = g(y)$$
This ratio depends exclusively on $y$.

**3. COMPUTE INTEGRATING FACTOR:**
$$\\mu(y) = e^{\\int g(y)\\,dy} = e^{\\int \\frac{1}{y}\\,dy} = e^{\\ln|y|} = y$$

*(Multiplying the original equation by $y$ produces $xy^2\\,dx + (x^2 y + y^3)\\,dy = 0$, which is exact with solution $\\frac{1}{2}x^2 y^2 + \\frac{1}{4}y^4 = C$).*`,
    finalAnswer: "\\mu(y) = y"
  },
  {
    id: "de-pq-14",
    section: "Part B - Application",
    number: 14,
    topicId: "initial-value-problems",
    topicTitle: "Initial-Value Problems (IVPs)",
    difficulty: "Application",
    question: "Solve the exact initial-value problem $$(2x + 4y)\\,dx + (4x + 6y)\\,dy = 0, \\quad y(1) = 1.$$",
    options: [
      "\\(x^2 + 4xy + 3y^2 = 8\\)",
      "\\(x^2 + 4xy + 3y^2 = 0\\)",
      "\\(2x^2 + 4xy + 6y^2 = 12\\)",
      "\\(x^2 + 2xy + 3y^2 = 6\\)"
    ],
    correctIndex: 0,
    hint: "Find the general solution potential $\\Psi(x,y) = C$, then substitute $x = 1, y = 1$ to calculate the specific numerical constant $C$.",
    firstStep: "Check exactness: $M_y = 4, N_x = 4$. Integrate: $\\Psi(x,y) = x^2 + 4xy + 3y^2 = C$.",
    fullSolution: `**1. EXACTNESS AND POTENTIAL INTEGRAL:**
$$M_y = 4, \\quad N_x = 4 \\implies \\text{Exact}$$
$$\\Psi(x,y) = \\int (2x + 4y)\\,dx = x^2 + 4xy + g(y)$$
$$\\frac{\\partial \\Psi}{\\partial y} = 4x + g'(y) = 4x + 6y \\implies g'(y) = 6y \\implies g(y) = 3y^2$$
$$\\Psi(x,y) = x^2 + 4xy + 3y^2 = C$$

**2. APPLY INITIAL VALUE (x = 1, y = 1):**
$$1^2 + 4(1)(1) + 3(1)^2 = C$$
$$1 + 4 + 3 = 8 \\implies C = 8$$

**3. PARTICULAR SOLUTION:**
$$x^2 + 4xy + 3y^2 = 8$$`,
    finalAnswer: "x^2 + 4xy + 3y^2 = 8"
  },

  // CHALLENGE LEVEL (15 - 20)
  {
    id: "de-pq-15",
    section: "Part C - Challenge",
    number: 15,
    topicId: "separable-des",
    topicTitle: "Separable Differential Equations",
    difficulty: "Challenge",
    question: "Solve the separable initial-value problem $$\\frac{dy}{dx} = x(y + 2), \\quad y(0) = 1.$$",
    options: [
      "\\(y = 3e^{x^2/2} - 2\\)",
      "\\(y = e^{x^2/2}\\)",
      "\\(y = 2e^{x^2/2} - 1\\)",
      "\\(y = 3e^{x^2} - 2\\)"
    ],
    correctIndex: 0,
    hint: "Separate $\\frac{dy}{y+2} = x\\,dx$, integrate to obtain $y + 2 = C e^{x^2/2}$, and apply $y(0) = 1$.",
    firstStep: "Separate: $\\frac{1}{y+2}\\,dy = x\\,dx$. Integrate: $\\ln|y+2| = \\frac{1}{2}x^2 + C_1$.",
    fullSolution: `**1. SEPARATE AND INTEGRATE:**
$$\\int \\frac{1}{y + 2}\\,dy = \\int x\\,dx$$
$$\\ln|y + 2| = \\frac{x^2}{2} + C_1$$
$$y + 2 = C e^{x^2/2}$$

**2. APPLY INITIAL CONDITION $y(0) = 1$:**
$$1 + 2 = C e^0 \\implies C = 3$$

**3. PARTICULAR EXPLICIT SOLUTION:**
$$y + 2 = 3e^{x^2/2} \\implies y = 3e^{x^2/2} - 2$$`,
    finalAnswer: "y = 3e^{x^2/2} - 2"
  },
  {
    id: "de-pq-16",
    section: "Part C - Challenge",
    number: 16,
    topicId: "linear-first-order-des",
    topicTitle: "Linear First-Order Differential Equations",
    difficulty: "Challenge",
    question: "Solve the linear initial-value problem $$\\frac{dy}{dx} + 4y = 8x, \\quad y(0) = 2.$$",
    options: [
      "\\(y = 2x - \\frac{1}{2} + \\frac{5}{2}e^{-4x}\\)",
      "\\(y = 2x + \\frac{1}{2} + \\frac{3}{2}e^{-4x}\\)",
      "\\(y = 4x - 1 + 3e^{-4x}\\)",
      "\\(y = 2x - \\frac{1}{2} + 2e^{-4x}\\)"
    ],
    correctIndex: 0,
    hint: "Find integrating factor $\\mu(x) = e^{4x}$, integrate $8x e^{4x}$ by parts to find the general solution, then substitute $x=0, y=2$.",
    firstStep: "$\\mu(x) = e^{\\int 4\\,dx} = e^{4x}$. Multiply through: $\\frac{d}{dx}[e^{4x} y] = 8x e^{4x}$.",
    fullSolution: `**1. INTEGRATING FACTOR & PRODUCT INTEGRATION:**
$$\\mu(x) = e^{4x}$$
$$e^{4x} y = \\int 8x e^{4x}\\,dx + C$$
Using integration by parts:
$$\\int 8x e^{4x}\\,dx = 8x\\left(\\frac{1}{4}e^{4x}\\right) - \\int 8\\left(\\frac{1}{4}e^{4x}\\right)dx = 2x e^{4x} - \\frac{1}{2}e^{4x}$$

**2. GENERAL SOLUTION:**
$$e^{4x} y = 2x e^{4x} - \\frac{1}{2}e^{4x} + C$$
$$y = 2x - \\frac{1}{2} + C e^{-4x}$$

**3. APPLY INITIAL CONDITION $y(0) = 2$:**
$$2 = 2(0) - \\frac{1}{2} + C e^0 = -\\frac{1}{2} + C$$
$$C = 2 + \\frac{1}{2} = \\frac{5}{2}$$

**4. PARTICULAR SOLUTION:**
$$y = 2x - \\frac{1}{2} + \\frac{5}{2}e^{-4x}$$`,
    finalAnswer: "y = 2x - \\frac{1}{2} + \\frac{5}{2}e^{-4x}"
  },
  {
    id: "de-pq-17",
    section: "Part C - Challenge",
    number: 17,
    topicId: "homogeneous-first-order-des",
    topicTitle: "Homogeneous First-Order Differential Equations",
    difficulty: "Challenge",
    question: "Solve the homogeneous differential equation $$(x + 2y)\\,dx - x\\,dy = 0.$$",
    options: [
      "\\(x + y = C x^2\\)",
      "\\(y - x = C x^2\\)",
      "\\(x^2 + 2xy = C\\)",
      "\\(y = C x^2 - 2x\\)"
    ],
    correctIndex: 0,
    hint: "Rewrite as $\\frac{dy}{dx} = 1 + 2\\frac{y}{x}$. Substitute $y = vx$ and separate variables.",
    firstStep: "$\\frac{dy}{dx} = \\frac{x + 2y}{x} = 1 + 2\\left(\\frac{y}{x}\\right)$. Let $y = vx$, so $v + x v' = 1 + 2v$.",
    fullSolution: `**1. HOMOGENEOUS FORM & SUBSTITUTION:**
$$\\frac{dy}{dx} = 1 + 2\\left(\\frac{y}{x}\\right)$$
Let $y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}$:
$$v + x\\frac{dv}{dx} = 1 + 2v$$
$$x\\frac{dv}{dx} = 1 + v$$

**2. SEPARATE AND INTEGRATE:**
$$\\frac{1}{1 + v}\\,dv = \\frac{1}{x}\\,dx$$
$$\\ln|1 + v| = \\ln|x| + \\ln|C| = \\ln|C x|$$
$$1 + v = C x$$

**3. BACK-SUBSTITUTE $v = \\frac{y}{x}$:**
$$1 + \\frac{y}{x} = C x$$
Multiply through by $x$:
$$x + y = C x^2$$`,
    finalAnswer: "x + y = C x^2"
  },
  {
    id: "de-pq-18",
    section: "Part C - Challenge",
    number: 18,
    topicId: "orthogonal-trajectories",
    topicTitle: "Orthogonal Trajectories",
    difficulty: "Challenge",
    question: "Find the orthogonal trajectories of the family of curves $$y = c x^{-2}.$$",
    options: [
      "\\(x^2 - 2y^2 = C\\)",
      "\\(x^2 + 2y^2 = C\\)",
      "\\(2x^2 - y^2 = C\\)",
      "\\(x^2 + y^2 = C\\)"
    ],
    correctIndex: 0,
    hint: "Differentiate $y = c x^{-2}$, eliminate $c = y x^2$, take negative reciprocal $m_\\perp = -1/m$, and integrate.",
    firstStep: "$\\frac{dy}{dx} = -2c x^{-3} = -2(y x^2) x^{-3} = -\\frac{2y}{x}$.",
    fullSolution: `**1. FIND ORIGINAL FAMILY SLOPE:**
$$y = c x^{-2} \\implies \\frac{dy}{dx} = -2c x^{-3}$$
Eliminate parameter $c = y x^2$:
$$m_{\\text{orig}} = -2(y x^2)x^{-3} = -\\frac{2y}{x}$$

**2. ORTHOGONAL SLOPE CONDITION:**
$$m_\\perp = -\\frac{1}{m_{\\text{orig}}} = -\\frac{1}{-2y/x} = \\frac{x}{2y}$$
$$\\frac{dy}{dx} = \\frac{x}{2y}$$

**3. SEPARATE AND INTEGRATE:**
$$2y\\,dy = x\\,dx$$
$$\\int 2y\\,dy = \\int x\\,dx$$
$$y^2 = \\frac{1}{2}x^2 + C_1$$
Multiply through by 2 and rearrange:
$$2y^2 - x^2 = C' \\iff x^2 - 2y^2 = C$$
*(This defines a family of orthogonal hyperbolas).*`,
    finalAnswer: "x^2 - 2y^2 = C"
  },
  {
    id: "de-pq-19",
    section: "Part C - Challenge",
    number: 19,
    topicId: "integrating-factors-non-exact",
    topicTitle: "Integrating Factors for Non-Exact Equations",
    difficulty: "Challenge",
    question: "For the differential equation $$(2y + x)\\,dx + 2x\\,dy = 0,$$ test exactness and identify the correct solution behavior.",
    options: [
      "Already exact ($M_y = N_x = 2$); no integrating factor needed; solution is $2xy + \\frac{1}{2}x^2 = C$",
      "Not exact ($M_y \\neq N_x$); integrating factor is $\\mu(x) = x^2$",
      "Not exact; integrating factor is $\\mu(y) = e^{2y}$",
      "Already exact; solution is $x^2 + y^2 = C$"
    ],
    correctIndex: 0,
    hint: "Always calculate $M_y$ and $N_x$ first before attempting an integrating factor formula!",
    firstStep: "Compute $M_y = \\frac{\\partial}{\\partial y}(2y + x) = 2$ and $N_x = \\frac{\\partial}{\\partial x}(2x) = 2$.",
    fullSolution: `**1. EXACTNESS TEST:**
$$M(x,y) = 2y + x \\implies \\frac{\\partial M}{\\partial y} = 2$$
$$N(x,y) = 2x \\implies \\frac{\\partial N}{\\partial x} = 2$$
$$M_y = N_x = 2$$
The equation is **already exact**! No integrating factor is required.

**2. INTEGRATE FOR POTENTIAL FUNCTION:**
$$\\Psi(x,y) = \\int (2y + x)\\,dx = 2xy + \\frac{1}{2}x^2 + g(y)$$
$$\\frac{\\partial \\Psi}{\\partial y} = 2x + g'(y) = 2x \\implies g'(y) = 0 \\implies g(y) = 0$$

**3. GENERAL SOLUTION:**
$$2xy + \\frac{1}{2}x^2 = C \\quad \\text{(or } 4xy + x^2 = C'\\text{)}$$`,
    finalAnswer: "Already exact (M_y = N_x = 2); no integrating factor needed; solution is 2xy + \\frac{1}{2}x^2 = C"
  },
  {
    id: "de-pq-20",
    section: "Part C - Challenge",
    number: 20,
    topicId: "homogeneous-first-order-des",
    topicTitle: "Homogeneous First-Order Differential Equations",
    difficulty: "Challenge",
    question: "Classify and solve the differential equation $$\\frac{dy}{dx} = \\frac{x + y}{x - y}.$$",
    options: [
      "Homogeneous DE; \\(\\arctan\\left(\\frac{y}{x}\\right) - \\frac{1}{2}\\ln\\left(1 + \\frac{y^2}{x^2}\\right) = \\ln|x| + C\\)",
      "Exact DE; \\(x^2 + xy - y^2 = C\\)",
      "Linear DE; \\(y = x \\tan(x) + C\\)",
      "Separable DE; \\(\\frac{y}{x} = \\ln(x^2 + y^2) + C\\)"
    ],
    correctIndex: 0,
    hint: "Divide numerator and denominator by $x$ to reveal $\\frac{dy}{dx} = \\frac{1 + y/x}{1 - y/x}$ (Homogeneous). Then use $y = vx$.",
    firstStep: "Classify: Homogeneous of degree 0 in $y/x$. Let $y = vx \\implies v + x v' = \\frac{1+v}{1-v}$.",
    fullSolution: `**1. CLASSIFICATION:**
$$\\frac{dy}{dx} = \\frac{x(1 + y/x)}{x(1 - y/x)} = \\frac{1 + y/x}{1 - y/x}$$
Since the right-hand side is a function of the single ratio $y/x$, the equation is **homogeneous**.

**2. SUBSTITUTION $y = vx$:**
$$v + x\\frac{dv}{dx} = \\frac{1 + v}{1 - v}$$
$$x\\frac{dv}{dx} = \\frac{1 + v}{1 - v} - v = \\frac{1 + v - v(1 - v)}{1 - v} = \\frac{1 + v^2}{1 - v}$$

**3. SEPARATE AND INTEGRATE:**
$$\\frac{1 - v}{1 + v^2}\\,dv = \\frac{1}{x}\\,dx$$
$$\\int \\frac{1}{1 + v^2}\\,dv - \\int \\frac{v}{1 + v^2}\\,dv = \\int \\frac{1}{x}\\,dx$$
$$\\arctan(v) - \\frac{1}{2}\\ln(1 + v^2) = \\ln|x| + C$$

**4. BACK-SUBSTITUTE $v = \\frac{y}{x}$:**
$$\\arctan\\left(\\frac{y}{x}\\right) - \\frac{1}{2}\\ln\\left(1 + \\frac{y^2}{x^2}\\right) = \\ln|x| + C$$
*(Equivalent simplified form: $\\arctan(y/x) = \\frac{1}{2}\\ln(x^2 + y^2) + C$).*`,
    finalAnswer: "Homogeneous DE; \\arctan\\left(\\frac{y}{x}\\right) - \\frac{1}{2}\\ln\\left(1 + \\frac{y^2}{x^2}\\right) = \\ln|x| + C"
  }
];

export const MINI_QUIZ = [
  {
    number: 1,
    question: "What equality determines whether $M(x,y)\\,dx + N(x,y)\\,dy = 0$ is exact?",
    answer: "$\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$",
    explanation: "Both mixed second-order partial derivatives of the potential function $\\Psi$ must be equal: $\\Psi_{xy} = \\Psi_{yx}$."
  },
  {
    number: 2,
    question: "What is the integrating factor for the standard linear DE $y' + P(x)y = Q(x)$?",
    answer: "$\\mu(x) = e^{\\int P(x)\\,dx}$",
    explanation: "Multiplying by $\\mu(x)$ collapses the left side into the product rule derivative $\\frac{d}{dx}[\\mu(x) y]$."
  },
  {
    number: 3,
    question: "What standard substitution is used to solve a homogeneous first-order DE $\\frac{dy}{dx} = F\\left(\\frac{y}{x}\\right)$?",
    answer: "$y = vx$ (or $v = \\frac{y}{x}$)",
    explanation: "This reduces the homogeneous equation to a separable equation in $v$ and $x$."
  },
  {
    number: 4,
    question: "Under the substitution $y = vx$, what does $\\frac{dy}{dx}$ become?",
    answer: "$\\frac{dy}{dx} = v + x\\frac{dv}{dx}$",
    explanation: "By the product rule: $\\frac{d}{dx}(v \\cdot x) = \\frac{dv}{dx}x + v\\frac{dx}{dx} = v + x\\frac{dv}{dx}$."
  },
  {
    number: 5,
    question: "What is the negative reciprocal rule used for in first-order calculus?",
    answer: "Orthogonal trajectories ($m_\\perp = -\\frac{1}{m}$)",
    explanation: "Two intersecting families of curves are orthogonal if and only if their tangent slopes multiply to $-1$."
  },
  {
    number: 6,
    question: "What must be done with an initial condition such as $y(x_0) = y_0$?",
    answer: "Obtain the general solution with parameter $C$ first, then substitute $(x_0, y_0)$ to solve for $C$.",
    explanation: "Never substitute initial conditions into derivatives or unintegrated differential expressions."
  },
  {
    number: 7,
    question: "What is the structural difference between an exact equation and a linear equation?",
    answer: "Exactness tests $M_y = N_x$ for a potential $\\Psi=C$; linear has $y' + P(x)y = Q(x)$ solved via $\\mu(x) = e^{\\int Pdx}$.",
    explanation: "Exact DEs are conservative vector differentials; linear DEs are degree-1 in $y$ and $y'$."
  },
  {
    number: 8,
    question: "When may a special integrating factor $\\mu(y)$ depending only on $y$ be used for non-exact equations?",
    answer: "When $\\frac{N_x - M_y}{M}$ simplifies to a function of $y$ only ($g(y)$).",
    explanation: "Then $\\mu(y) = e^{\\int g(y)\\,dy}$ makes the modified equation exact."
  }
];

/**
 * Differential Equations for Engineers (GEN / MATH) - Midterm Review Syllabus Data
 * Authoritative source: de_exam_topics_only.docx
 * Covers: Exact DEs, Integrating Factors, Homogeneous Functions, Linear DEs,
 * Separable Equations, Homogeneous DEs, IVPs, Orthogonal Trajectories, and Compact Decision Rules.
 */

export const TOPICS = [
  {
    id: "core-notation-first-order",
    number: "01",
    title: "Core Notation & First-Order Differential Equations",
    category: "Notation & Setup",
    shortDesc: "Differential form M dx + N dy = 0, explicit derivative form dy/dx = F(x,y), and potential functions.",
    concept: "A first-order differential equation represents a relationship between independent variable $x$, dependent variable $y$, and the first derivative $y' = \\frac{dy}{dx}$. It frequently appears in two equivalent mathematical forms: the explicit derivative form $\\frac{dy}{dx} = F(x,y)$ and the symmetric differential form $M(x,y)\\,dx + N(x,y)\\,dy = 0$. In engineering applications such as fluid dynamics and electrostatics, if a scalar potential function $\\Psi(x,y)$ exists such that its total differential is $d\\Psi = \\Psi_x\\,dx + \\Psi_y\\,dy = 0$, then the level curves $\\Psi(x,y) = C$ define the family of solution trajectories.",
    formulaLatex: "M(x,y)\\,dx + N(x,y)\\,dy = 0 \\iff \\frac{dy}{dx} = -\\frac{M(x,y)}{N(x,y)}, \\quad d\\Psi = 0 \\implies \\Psi(x,y) = C",
    variables: [
      { symbol: "M(x,y)", name: "Differential Coefficient of dx", unit: "Dimensionless / Engineering Units", description: "Function coupled with differential dx" },
      { symbol: "N(x,y)", name: "Differential Coefficient of dy", unit: "Dimensionless / Engineering Units", description: "Function coupled with differential dy" },
      { symbol: "\\Psi(x,y)", name: "Potential / Stream Function", unit: "Potential Units", description: "Scalar function whose total differential satisfies dPsi = 0" },
      { symbol: "C", name: "Arbitrary Constant of Integration", unit: "Consistent with Psi", description: "Parameter defining the family of integral curves" }
    ],
    whenToUse: "Use to classify first-order differential equations and switch between explicit derivative format dy/dx = F(x,y) and differential format M dx + N dy = 0 before testing for exactness, separability, or linearity.",
    engineeringContext: "In thermodynamics and fluid mechanics, path-independent state functions (internal energy, enthalpy, velocity potential) are governed by exact differential forms where dPsi = 0 represents streamline contours.",
    workedExample: {
      title: "Converting Explicit Derivative Form to Symmetric Differential Form",
      scenario: "An engineering rate equation for transient liquid level draining is given by dy/dx = (3x^2 - 2y)/(2x + 5y^4). Express the equation in standard differential form M dx + N dy = 0 and identify M and N.",
      given: [
        "\\frac{dy}{dx} = \\frac{3x^2 - 2y}{2x + 5y^4}"
      ],
      required: "Standard differential form $M(x,y)\\,dx + N(x,y)\\,dy = 0$ with explicit identification of $M$ and $N$",
      formula: "\\frac{dy}{dx} = -\\frac{M}{N} \\implies M\\,dx + N\\,dy = 0",
      substitution: "(2x + 5y^4)\\,dy = (3x^2 - 2y)\\,dx \\implies -(3x^2 - 2y)\\,dx + (2x + 5y^4)\\,dy = 0",
      computation: "(2y - 3x^2)\\,dx + (2x + 5y^4)\\,dy = 0",
      answer: "M(x,y) = 2y - 3x^2, \\quad N(x,y) = 2x + 5y^4",
      interpretation: "The equation is now in canonical differential form ready for partial differentiation testing."
    },
    commonMistakes: [
      "Mixing up signs when clearing fractions: remember dy/dx = F(x,y) becomes F(x,y)dx - dy = 0, so M = F(x,y) and N = -1.",
      "Assuming M is always the term written first without checking whether it multiplies dx or dy.",
      "Dropping the differential dx or dy when moving terms across the equals sign."
    ],
    quickCheck: {
      question: "If a differential equation is written as dy/dx = 4x/y, what are standard differential coefficients M and N in M dx + N dy = 0?",
      options: [
        "M = 4x, N = -y",
        "M = y, N = 4x",
        "M = -4x, N = y",
        "M = 4x, N = y"
      ],
      correctIndex: 0,
      explanation: "Cross multiplying gives y dy = 4x dx, which rearranges to 4x dx - y dy = 0. Therefore, M = 4x and N = -y."
    },
    practiceProblems: [
      {
        id: "p1-1",
        level: "Level 1 — Foundation",
        prompt: "Express the differential equation dy/dx = (x - 3y)/(2x + y) in the standard differential form M dx + N dy = 0 with M starting with a positive coefficient for 3y.",
        hint: "Cross-multiply the denominators and gather all terms onto one side multiplying dx and dy.",
        firstStep: "(2x + y) dy = (x - 3y) dx",
        fullSolution: "**GIVEN:**\n* $\\frac{dy}{dx} = \\frac{x - 3y}{2x + y}$\n\n**REQUIRED:**\n* Standard form $M\\,dx + N\\,dy = 0$\n\n**FORMULA:**\n$$\\frac{dy}{dx} = -\\frac{M}{N} \\iff M\\,dx + N\\,dy = 0$$\n\n**SUBSTITUTION:**\n$$-(x - 3y)\\,dx + (2x + y)\\,dy = 0$$\n\n**COMPUTATION:**\n$$(3y - x)\\,dx + (2x + y)\\,dy = 0$$\n\n**ANSWER:**\n$$M = 3y - x, \\quad N = 2x + y$$",
        finalAnswer: "(3y - x) dx + (2x + y) dy = 0"
      },
      {
        id: "p1-2",
        level: "Level 2 — Application",
        prompt: "Given a potential function Psi(x,y) = x^3 y^2 + 5x - 4y = C, determine the corresponding first-order differential equation in differential form M dx + N dy = 0.",
        hint: "Compute the total differential dPsi = (dPsi/dx) dx + (dPsi/dy) dy = 0.",
        firstStep: "M = dPsi/dx and N = dPsi/dy.",
        fullSolution: "**GIVEN:**\n* $\\Psi(x,y) = x^3 y^2 + 5x - 4y = C$\n\n**REQUIRED:**\n* $M(x,y)\\,dx + N(x,y)\\,dy = 0$\n\n**FORMULA:**\n$$d\\Psi = \\frac{\\partial\\Psi}{\\partial x}\\,dx + \\frac{\\partial\\Psi}{\\partial y}\\,dy = 0$$\n\n**SUBSTITUTION:**\n$$M = \\frac{\\partial}{\\partial x}(x^3 y^2 + 5x - 4y) = 3x^2 y^2 + 5$$\n$$N = \\frac{\\partial}{\\partial y}(x^3 y^2 + 5x - 4y) = 2x^3 y - 4$$\n\n**COMPUTATION:**\n$$(3x^2 y^2 + 5)\\,dx + (2x^3 y - 4)\\,dy = 0$$\n\n**ANSWER:**\n$$(3x^2 y^2 + 5)\\,dx + (2x^3 y - 4)\\,dy = 0$$",
        finalAnswer: "(3x^2 y^2 + 5) dx + (2x^3 y - 4) dy = 0"
      },
      {
        id: "p1-3",
        level: "Level 3 — Engineering Problem",
        prompt: "A control valve discharge model yields dy/dx = - (2xy + e^x) / (x^2 + 3y^2). Determine the total differential equation and verify whether Psi_x = M and Psi_y = N match.",
        hint: "Cross-multiply and set the expression to zero.",
        firstStep: "Rewrite as (2xy + e^x) dx + (x^2 + 3y^2) dy = 0.",
        fullSolution: "**GIVEN:**\n* $\\frac{dy}{dx} = -\\frac{2xy + e^x}{x^2 + 3y^2}$\n\n**REQUIRED:**\n* Differential form and components $M, N$\n\n**FORMULA:**\n$$\\frac{dy}{dx} = -\\frac{M}{N} \\implies M\\,dx + N\\,dy = 0$$\n\n**COMPUTATION:**\n$$(2xy + e^x)\\,dx + (x^2 + 3y^2)\\,dy = 0$$\n$$M(x,y) = 2xy + e^x, \\quad N(x,y) = x^2 + 3y^2$$\n\n**ANSWER:**\n$$(2xy + e^x)\\,dx + (x^2 + 3y^2)\\,dy = 0$$",
        finalAnswer: "(2xy + e^x) dx + (x^2 + 3y^2) dy = 0"
      },
      {
        id: "p1-4",
        level: "Level 4 — Challenge",
        prompt: "If a system trajectory satisfies dPsi = 0 with Psi(x,y) = ln(x^2 + y^2) + 2 arctan(y/x) = C, write the governing differential equation in M dx + N dy = 0 simplified form.",
        hint: "Take partial derivatives with respect to x and y, and find a common denominator x^2 + y^2.",
        firstStep: "dPsi/dx = 2x/(x^2+y^2) - 2y/(x^2+y^2) = (2x - 2y)/(x^2+y^2).",
        fullSolution: "**GIVEN:**\n* $\\Psi(x,y) = \\ln(x^2 + y^2) + 2\\arctan(y/x) = C$\n\n**REQUIRED:**\n* Simplified differential equation $M\\,dx + N\\,dy = 0$\n\n**FORMULA:**\n$$M = \\frac{\\partial\\Psi}{\\partial x}, \\quad N = \\frac{\\partial\\Psi}{\\partial y}$$\n\n**SUBSTITUTION:**\n$$\\frac{\\partial}{\\partial x}\\ln(x^2+y^2) = \\frac{2x}{x^2+y^2}, \\quad \\frac{\\partial}{\\partial x}\\left[2\\arctan\\left(\\frac{y}{x}\\right)\\right] = 2\\cdot\\frac{-y/x^2}{1+(y/x)^2} = \\frac{-2y}{x^2+y^2}$$\n$$\\frac{\\partial}{\\partial y}\\ln(x^2+y^2) = \\frac{2y}{x^2+y^2}, \\quad \\frac{\\partial}{\\partial y}\\left[2\\arctan\\left(\\frac{y}{x}\\right)\\right] = 2\\cdot\\frac{1/x}{1+(y/x)^2} = \\frac{2x}{x^2+y^2}$$\n\n**COMPUTATION:**\n$$M = \\frac{2x - 2y}{x^2+y^2}, \\quad N = \\frac{2x + 2y}{x^2+y^2}$$\n$$\\text{Clearing common denominator: } (x - y)\\,dx + (x + y)\\,dy = 0$$\n\n**ANSWER:**\n$$(x - y)\\,dx + (x + y)\\,dy = 0$$",
        finalAnswer: "(x - y) dx + (x + y) dy = 0"
      }
    ]
  },
  {
    id: "exactness-test",
    number: "02",
    title: "Exactness Test for First-Order DEs",
    category: "Exact Equations",
    shortDesc: "The fundamental condition dM/dy = dN/dx and partial derivative comparison.",
    concept: "A differential equation $M(x,y)\\,dx + N(x,y)\\,dy = 0$ is classified as exact if and only if there exists a twice continuously differentiable potential function $\\Psi(x,y)$ such that $\\frac{\\partial\\Psi}{\\partial x} = M$ and $\\frac{\\partial\\Psi}{\\partial y} = N$. By Clairaut's theorem on the equality of mixed partial derivatives (Schwarz's theorem), $\\frac{\\partial^2\\Psi}{\\partial y \\partial x} = \\frac{\\partial M}{\\partial y}$ and $\\frac{\\partial^2\\Psi}{\\partial x \\partial y} = \\frac{\\partial N}{\\partial x}$. Therefore, the necessary and sufficient condition for exactness in a simply connected domain is $\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$, or compactly $M_y = N_x$.",
    formulaLatex: "\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x} \\iff M_y = N_x \\implies \\text{Exact}",
    variables: [
      { symbol: "M_y = \\frac{\\partial M}{\\partial y}", name: "Partial Derivative of M with respect to y", unit: "1/y Units", description: "Differentiate M holding x strictly constant" },
      { symbol: "N_x = \\frac{\\partial N}{\\partial x}", name: "Partial Derivative of N with respect to x", unit: "1/x Units", description: "Differentiate N holding y strictly constant" }
    ],
    whenToUse: "Apply immediately whenever a differential equation is presented in differential form M dx + N dy = 0 to verify whether a potential function Psi exists before integrating.",
    engineeringContext: "Exactness test represents conservative force fields (curl F = 0) and state function properties in engineering thermodynamics where cyclical integrals vanish.",
    workedExample: {
      title: "Testing a Multi-Term Differential Form for Exactness",
      scenario: "In an automated guidance path problem, test the differential equation (4xy + 3y^2) dx + (2x^2 + 6xy + 1) dy = 0 for exactness.",
      given: [
        "M(x,y) = 4xy + 3y^2",
        "N(x,y) = 2x^2 + 6xy + 1"
      ],
      required: "Determine whether the equation is exact by evaluating M_y and N_x",
      formula: "M_y = \\frac{\\partial M}{\\partial y}, \\quad N_x = \\frac{\\partial N}{\\partial x}, \\quad M_y = N_x \\implies \\text{Exact}",
      substitution: "M_y = \\frac{\\partial}{\\partial y}(4xy + 3y^2), \\quad N_x = \\frac{\\partial}{\\partial x}(2x^2 + 6xy + 1)",
      computation: "M_y = 4x + 6y\\nN_x = 4x + 6y\\nM_y - N_x = 0",
      answer: "M_y = N_x = 4x + 6y \\implies \\text{The equation is EXACT.}",
      interpretation: "Because the mixed partial derivatives are identical throughout the entire xy-plane, the differential form is exact."
    },
    commonMistakes: [
      "CRITICAL EXAM TRAP: Comparing M_x with N_y instead of M_y with N_x! M is differentiated with respect to the OTHER variable y, and N with respect to x.",
      "Failing to treat x as a constant when computing partial derivative with respect to y.",
      "Discarding constants or terms that depend only on the non-differentiated variable."
    ],
    quickCheck: {
      question: "Which comparison must be evaluated to determine if M(x,y)dx + N(x,y)dy = 0 is exact?",
      options: [
        "M_y = N_x (dM/dy compared to dN/dx)",
        "M_x = N_y (dM/dx compared to dN/dy)",
        "M_x = N_x (dM/dx compared to dN/dx)",
        "M_y = -N_x (dM/dy compared to -dN/dx)"
      ],
      correctIndex: 0,
      explanation: "By Clairaut's theorem, exactness requires M_y = N_x (dM/dy = dN/dx). Comparing M_x with N_y is the most common student error."
    },
    practiceProblems: [
      {
        id: "p2-1",
        level: "Level 1 — Foundation",
        prompt: "Determine whether (5xy + 2y) dx + (5/2 x^2 + 2x) dy = 0 is exact.",
        hint: "Compute M_y by taking d/dy of (5xy + 2y), and N_x by taking d/dx of (5/2 x^2 + 2x).",
        firstStep: "M_y = 5x + 2.",
        fullSolution: "**GIVEN:**\n* $M(x,y) = 5xy + 2y$\n* $N(x,y) = \\frac{5}{2}x^2 + 2x$\n\n**REQUIRED:**\n* Exactness determination via $M_y = N_x$\n\n**FORMULA:**\n$$M_y = \\frac{\\partial M}{\\partial y}, \\quad N_x = \\frac{\\partial N}{\\partial x}$$\n\n**SUBSTITUTION & COMPUTATION:**\n$$M_y = \\frac{\\partial}{\\partial y}(5xy + 2y) = 5x + 2$$\n$$N_x = \\frac{\\partial}{\\partial x}\\left(\\frac{5}{2}x^2 + 2x\\right) = 5x + 2$$\n$$M_y = N_x = 5x + 2$$\n\n**ANSWER:**\n$$\\text{The differential equation is EXACT.}$$",
        finalAnswer: "Exact (M_y = N_x = 5x + 2)"
      },
      {
        id: "p2-2",
        level: "Level 2 — Application",
        prompt: "Test (3xy + x) dx + (3/2 x^2 + x + 4y) dy = 0 for exactness.",
        hint: "Differentiate M with respect to y and N with respect to x. Check if they match identically.",
        firstStep: "M_y = 3x, while N_x = 3x + 1.",
        fullSolution: "**GIVEN:**\n* $M(x,y) = 3xy + x$\n* $N(x,y) = \\frac{3}{2}x^2 + x + 4y$\n\n**REQUIRED:**\n* Test for exactness\n\n**COMPUTATION:**\n$$M_y = \\frac{\\partial}{\\partial y}(3xy + x) = 3x$$\n$$N_x = \\frac{\\partial}{\\partial x}\\left(\\frac{3}{2}x^2 + x + 4y\\right) = 3x + 1$$\n$$M_y \\neq N_x \\quad (3x \\neq 3x + 1)$$\n\n**ANSWER:**\n$$\\text{NOT exact.}$$",
        finalAnswer: "Not exact (M_y = 3x != N_x = 3x + 1)"
      },
      {
        id: "p2-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Find the constant parameter k such that (6x y^2 + 2y e^{2x}) dx + (k x^2 y + e^{2x} + 3y^2) dy = 0 is exact.",
        hint: "Set M_y equal to N_x and equate corresponding algebraic coefficients.",
        firstStep: "M_y = 12xy + 2e^{2x}, and N_x = 2kxy + 2e^{2x}.",
        fullSolution: "**GIVEN:**\n* $M = 6xy^2 + 2y e^{2x}$\n* $N = kx^2 y + e^{2x} + 3y^2$\n\n**REQUIRED:**\n* Parameter $k$ ensuring $M_y = N_x$\n\n**FORMULA:**\n$$M_y = N_x$$\n\n**SUBSTITUTION:**\n$$M_y = \\frac{\\partial}{\\partial y}(6xy^2 + 2y e^{2x}) = 12xy + 2e^{2x}$$\n$$N_x = \\frac{\\partial}{\\partial x}(kx^2 y + e^{2x} + 3y^2) = 2kxy + 2e^{2x}$$\n\n**COMPUTATION:**\n$$12xy + 2e^{2x} = 2kxy + 2e^{2x}$$\n$$12 = 2k \\implies k = 6$$\n\n**ANSWER:**\n$$k = 6$$",
        finalAnswer: "k = 6"
      },
      {
        id: "p2-4",
        level: "Level 4 — Challenge",
        prompt: "Test whether (y/x + 6x) dx + (ln x - 2) dy = 0 is exact on the open domain x > 0.",
        hint: "Note that d/dy (y/x) = 1/x and d/dx (ln x - 2) = 1/x.",
        firstStep: "M_y = 1/x, N_x = 1/x.",
        fullSolution: "**GIVEN:**\n* $M = \\frac{y}{x} + 6x$\n* $N = \\ln x - 2$ for $x > 0$\n\n**COMPUTATION:**\n$$M_y = \\frac{\\partial}{\\partial y}\\left(\\frac{y}{x} + 6x\\right) = \\frac{1}{x}$$\n$$N_x = \\frac{\\partial}{\\partial x}(\\ln x - 2) = \\frac{1}{x}$$\n$$M_y = N_x = \\frac{1}{x}$$\n\n**ANSWER:**\n$$\\text{EXACT for all } x > 0.$$",
        finalAnswer: "Exact on x > 0 (M_y = N_x = 1/x)"
      }
    ]
  },
  {
    id: "solving-exact-des",
    number: "03",
    title: "Solving Exact Differential Equations",
    category: "Exact Equations",
    shortDesc: "Integration method for Psi(x,y) = C, partial integration of M and determining g(y).",
    concept: "Once an equation $M\\,dx + N\\,dy = 0$ is proven exact ($M_y = N_x$), the general solution is obtained by reconstructing the potential function $\\Psi(x,y) = C$. Integrating $M$ with respect to $x$ (holding $y$ constant) yields $\\Psi(x,y) = \\int M(x,y)\\,dx + g(y)$, where $g(y)$ is an unknown function of $y$ acting as the integration constant. Differentiating this expression with respect to $y$ and equating it to $N(x,y)$ isolates $g'(y) = N(x,y) - \\frac{\\partial}{\\partial y}\\int M\\,dx$. Integrating $g'(y)$ gives $g(y)$, completing the solution $\\Psi(x,y) = C$.",
    formulaLatex: "\\Psi(x,y) = \\int M(x,y)\\,dx + g(y), \\quad g'(y) = N(x,y) - \\frac{\\partial}{\\partial y}\\int M\\,dx, \\quad \\Psi(x,y) = C",
    variables: [
      { symbol: "\\Psi(x,y)", name: "Potential Function", unit: "Units of Psi", description: "Scalar function whose level set Psi(x,y) = C defines the implicit solution" },
      { symbol: "g(y)", name: "Unknown y-dependent function", unit: "Units of Psi", description: "Arises from partial integration with respect to x" },
      { symbol: "C", name: "Arbitrary Constant", unit: "Units of Psi", description: "Represents the one-parameter family of solutions" }
    ],
    whenToUse: "Use immediately after exactness (M_y = N_x) is established to find the general or particular solution.",
    engineeringContext: "Applied in mechanical potential energy landscapes, electrostatic potentials, and fluid streamfunctions where velocity components u = -dPsi/dy, v = dPsi/dx.",
    workedExample: {
      title: "Step-by-Step Solution of an Exact First-Order DE",
      scenario: "Solve the exact differential equation (2x + 3y) dx + (3x + 4y) dy = 0.",
      given: [
        "M(x,y) = 2x + 3y",
        "N(x,y) = 3x + 4y"
      ],
      required: "General solution in implicit form $\\Psi(x,y) = C$",
      formula: "\\Psi = \\int M\\,dx + g(y), \\quad \\frac{\\partial\\Psi}{\\partial y} = N, \\quad \\Psi(x,y) = C",
      substitution: "M_y = 3, \\quad N_x = 3 \\implies \\text{Exact}\\n\\Psi = \\int (2x + 3y)\\,dx + g(y) = x^2 + 3xy + g(y)",
      computation: "\\frac{\\partial\\Psi}{\\partial y} = 3x + g'(y) = 3x + 4y\\ng'(y) = 4y\\ng(y) = \\int 4y\\,dy = 2y^2",
      answer: "x^2 + 3xy + 2y^2 = C",
      interpretation: "The general solution represents a family of concentric ellipses in the xy-plane."
    },
    commonMistakes: [
      "Integrating M with respect to x and adding an ordinary scalar constant C instead of the arbitrary function g(y).",
      "Confusing which variable is integrated: M is integrated with respect to x; g'(y) is integrated with respect to y.",
      "Writing the final answer as Psi(x,y) without '= C'."
    ],
    quickCheck: {
      question: "After integrating M(x,y) with respect to x to get Psi = integral M dx + g(y), how is g(y) determined?",
      options: [
        "Differentiate Psi with respect to y and set it equal to N(x,y)",
        "Set Psi equal to zero and solve for y",
        "Differentiate Psi with respect to x and set it equal to M(x,y)",
        "Integrate N(x,y) with respect to x"
      ],
      correctIndex: 0,
      explanation: "Since N = dPsi/dy, differentiating the expression with respect to y and equating to N(x,y) isolates g'(y)."
    },
    practiceProblems: [
      {
        id: "p3-1",
        level: "Level 1 — Foundation",
        prompt: "Solve the exact differential equation (4x + 5y) dx + (5x + 6y) dy = 0.",
        hint: "Integrate (4x + 5y) with respect to x, differentiate with respect to y, match with N, and find g(y).",
        firstStep: "Psi = 2x^2 + 5xy + g(y).",
        fullSolution: "**GIVEN:**\n* $(4x + 5y)\\,dx + (5x + 6y)\\,dy = 0$\n\n**REQUIRED:**\n* General solution $\\Psi(x,y) = C$\n\n**STEP 1: Check Exactness**\n$$M_y = 5, \\quad N_x = 5 \\implies \\text{Exact}$$\n\n**STEP 2: Integrate M with respect to x**\n$$\\Psi = \\int (4x + 5y)\\,dx = 2x^2 + 5xy + g(y)$$\n\n**STEP 3: Differentiate with respect to y**\n$$\\Psi_y = 5x + g'(y) = 5x + 6y$$\n$$g'(y) = 6y \\implies g(y) = 3y^2$$\n\n**ANSWER:**\n$$2x^2 + 5xy + 3y^2 = C$$",
        finalAnswer: "2x^2 + 5xy + 3y^2 = C"
      },
      {
        id: "p3-2",
        level: "Level 2 — Application",
        prompt: "Solve the exact differential equation (2xy + 3) dx + (x^2 - 4y) dy = 0.",
        hint: "M_y = 2x, N_x = 2x. Integrate M with respect to x.",
        firstStep: "Psi = x^2 y + 3x + g(y).",
        fullSolution: "**GIVEN:**\n* $(2xy + 3)\\,dx + (x^2 - 4y)\\,dy = 0$\n\n**COMPUTATION:**\n$$M_y = 2x, \\quad N_x = 2x \\implies \\text{Exact}$$\n$$\\Psi = \\int (2xy + 3)\\,dx = x^2 y + 3x + g(y)$$\n$$\\Psi_y = x^2 + g'(y) = x^2 - 4y$$\n$$g'(y) = -4y \\implies g(y) = -2y^2$$\n\n**ANSWER:**\n$$x^2 y + 3x - 2y^2 = C$$",
        finalAnswer: "x^2 y + 3x - 2y^2 = C"
      },
      {
        id: "p3-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Solve the exact initial-value problem (2x + 4y) dx + (4x + 6y) dy = 0 subject to y(1) = 1.",
        hint: "Find general solution x^2 + 4xy + 3y^2 = C, then substitute x = 1, y = 1 to evaluate C.",
        firstStep: "Integrate 2x + 4y to find Psi = x^2 + 4xy + 3y^2 = C.",
        fullSolution: "**GIVEN:**\n* $(2x + 4y)\\,dx + (4x + 6y)\\,dy = 0, \\quad y(1) = 1$\n\n**COMPUTATION:**\n$$M_y = 4, \\quad N_x = 4 \\implies \\text{Exact}$$\n$$\\Psi = \\int (2x + 4y)\\,dx = x^2 + 4xy + g(y)$$\n$$\\Psi_y = 4x + g'(y) = 4x + 6y \\implies g'(y) = 6y \\implies g(y) = 3y^2$$\n$$\\Psi(x,y) = x^2 + 4xy + 3y^2 = C$$\n$$\\text{Substitute } x = 1, y = 1: (1)^2 + 4(1)(1) + 3(1)^2 = 1 + 4 + 3 = 8$$\n$$C = 8$$\n\n**ANSWER:**\n$$x^2 + 4xy + 3y^2 = 8$$",
        finalAnswer: "x^2 + 4xy + 3y^2 = 8"
      },
      {
        id: "p3-4",
        level: "Level 4 — Challenge",
        prompt: "Solve (e^y + 2xy) dx + (x e^y + x^2 + 1/y) dy = 0 for y > 0.",
        hint: "Verify exactness, integrate M with respect to x, and notice the integral of 1/y gives ln y.",
        firstStep: "M_y = e^y + 2x, N_x = e^y + 2x.",
        fullSolution: "**GIVEN:**\n* $(e^y + 2xy)\\,dx + (x e^y + x^2 + 1/y)\\,dy = 0$\n\n**COMPUTATION:**\n$$M_y = e^y + 2x, \\quad N_x = e^y + 2x \\implies \\text{Exact}$$\n$$\\Psi = \\int (e^y + 2xy)\\,dx = x e^y + x^2 y + g(y)$$\n$$\\Psi_y = x e^y + x^2 + g'(y) = x e^y + x^2 + \\frac{1}{y}$$\n$$g'(y) = \\frac{1}{y} \\implies g(y) = \\ln|y|$$\n\n**ANSWER:**\n$$x e^y + x^2 y + \\ln y = C$$",
        finalAnswer: "x e^y + x^2 y + ln(y) = C"
      }
    ]
  },
  {
    id: "homogeneous-functions-degree",
    number: "04",
    title: "Degree of Homogeneous Functions",
    category: "Homogeneous DEs",
    shortDesc: "Recognizing homogeneity: f(tx, ty) = t^n f(x,y) and total term degree a + b = n.",
    concept: "A multivariable function $f(x,y)$ is homogeneous of degree $n$ if scaling both coordinates by any non-zero real scalar $t$ scales the output by $t^n$: $f(tx, ty) = t^n f(x,y)$. For polynomials and algebraic expressions, every monomial term $x^a y^b$ has total degree $a + b$. A multivariable polynomial is homogeneous if and only if EVERY individual term has the exact same total degree $n$. If any term has a different sum of exponents, the function is NOT homogeneous.",
    formulaLatex: "f(tx, ty) = t^n f(x,y) \\iff \\text{Degree of } x^a y^b = a + b = n \\quad (\\forall \\text{ terms})",
    variables: [
      { symbol: "n", name: "Degree of Homogeneity", unit: "Dimensionless Integer / Rational", description: "Power of scaling factor t" },
      { symbol: "a", name: "Exponent of x", unit: "Integer / Real", description: "Power to which x is raised" },
      { symbol: "b", name: "Exponent of y", unit: "Integer / Real", description: "Power to which y is raised" }
    ],
    whenToUse: "Use to inspect differential coefficients M(x,y) and N(x,y). If both M and N are homogeneous functions of the SAME degree, the differential equation M dx + N dy = 0 is a homogeneous first-order DE solvable by y = vx.",
    engineeringContext: "Dimensional homogeneity is the foundation of the Buckingham Pi theorem in fluid mechanics, heat transfer, and scale modeling.",
    workedExample: {
      title: "Determining the Homogeneity Degree of a Multivariable Polynomial",
      scenario: "Determine whether f(x,y) = 3x^2 y^3 - 4xy^4 + 7y^5 is homogeneous, and if so, determine its degree.",
      given: [
        "f(x,y) = 3x^2 y^3 - 4xy^4 + 7y^5"
      ],
      required: "State whether f(x,y) is homogeneous and compute its degree $n$",
      formula: "\\text{Term } x^a y^b \\implies \\text{Degree } a + b",
      substitution: "\\text{Term 1: } 3x^2 y^3 \\implies 2 + 3 = 5\\n\\text{Term 2: } -4xy^4 \\implies 1 + 4 = 5\\n\\text{Term 3: } 7y^5 \\implies 0 + 5 = 5",
      computation: "f(tx, ty) = 3(tx)^2(ty)^3 - 4(tx)(ty)^4 + 7(ty)^5\\nf(tx, ty) = t^5(3x^2 y^3 - 4xy^4 + 7y^5) = t^5 f(x,y)",
      answer: "n = 5 \\implies \\text{Homogeneous of degree 5}",
      interpretation: "Because all three terms have total degree 5, the function is homogeneous of degree 5."
    },
    commonMistakes: [
      "Forgetting that terms with single variables like y^5 have degree 0 + 5 = 5.",
      "Confusing the degree with the highest individual power instead of the SUM of powers of x and y in each product.",
      "Declaring a function homogeneous when one term has a different degree (e.g. x^2 + y is not homogeneous because 2 != 1)."
    ],
    quickCheck: {
      question: "What is the degree of the homogeneous function f(x,y) = 2x^3 y^2 - 7xy^4 + 4y^5?",
      options: [
        "Degree 5",
        "Degree 4",
        "Degree 6",
        "Not homogeneous"
      ],
      correctIndex: 0,
      explanation: "Terms have degrees: 3+2=5, 1+4=5, and 0+5=5. Since all terms equal 5, the degree is 5."
    },
    practiceProblems: [
      {
        id: "p4-1",
        level: "Level 1 — Foundation",
        prompt: "Determine the degree of homogeneity of f(x,y) = x^4 + 2x^2 y^2 + y^4.",
        hint: "Sum the exponents of x and y in each term.",
        firstStep: "Check terms: 4, 2+2=4, 4.",
        fullSolution: "**GIVEN:**\n* $f(x,y) = x^4 + 2x^2 y^2 + y^4$\n\n**COMPUTATION:**\n* Term 1: $x^4 \\implies 4$\n* Term 2: $2x^2 y^2 \\implies 2 + 2 = 4$\n* Term 3: $y^4 \\implies 4$\n$$f(tx, ty) = (tx)^4 + 2(tx)^2(ty)^2 + (ty)^4 = t^4 f(x,y)$$\n\n**ANSWER:**\n$$\\text{Homogeneous of degree 4.}$$",
        finalAnswer: "Degree 4"
      },
      {
        id: "p4-2",
        level: "Level 2 — Application",
        prompt: "Is g(x,y) = x^3 + x^2 y - y^2 homogeneous? If so, what is its degree?",
        hint: "Examine the total degree of every term.",
        firstStep: "Term 1 has degree 3, Term 2 has degree 3, but Term 3 has degree 2.",
        fullSolution: "**GIVEN:**\n* $g(x,y) = x^3 + x^2 y - y^2$\n\n**COMPUTATION:**\n* Term 1: $x^3 \\implies 3$\n* Term 2: $x^2 y \\implies 2 + 1 = 3$\n* Term 3: $-y^2 \\implies 2$\n$$3 \\neq 2$$\n\n**ANSWER:**\n$$\\text{NOT homogeneous because term degrees differ (3 vs 2).}$$",
        finalAnswer: "Not homogeneous (degrees 3 and 2)"
      },
      {
        id: "p4-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Determine whether the differential equation (x^2 + y^2) dx - 2xy dy = 0 is a homogeneous differential equation by evaluating the degrees of M and N.",
        hint: "M and N must both be homogeneous functions of the SAME degree.",
        firstStep: "M = x^2 + y^2 has degree 2; N = -2xy has degree 1+1=2.",
        fullSolution: "**GIVEN:**\n* $M(x,y) = x^2 + y^2$\n* $N(x,y) = -2xy$\n\n**COMPUTATION:**\n* $M(tx, ty) = t^2(x^2 + y^2) \\implies \\text{degree 2}$\n* $N(tx, ty) = -2(tx)(ty) = t^2(-2xy) \\implies \\text{degree 2}$\n$$\\text{Both } M \\text{ and } N \\text{ are homogeneous of degree 2.}$$\n\n**ANSWER:**\n$$\\text{YES, it is a homogeneous differential equation of degree 2.}$$",
        finalAnswer: "Yes, homogeneous DE of degree 2"
      },
      {
        id: "p4-4",
        level: "Level 4 — Challenge",
        prompt: "Determine the degree of homogeneity of the rational expression f(x,y) = (x^3 + y^3) / (x - y).",
        hint: "Substitute x -> tx, y -> ty and simplify the power of t.",
        firstStep: "Numerator scales by t^3, denominator scales by t^1.",
        fullSolution: "**GIVEN:**\n* $f(x,y) = \\frac{x^3 + y^3}{x - y}$\n\n**COMPUTATION:**\n$$f(tx, ty) = \\frac{(tx)^3 + (ty)^3}{tx - ty} = \\frac{t^3(x^3 + y^3)}{t(x - y)} = t^{3-1}\\frac{x^3 + y^3}{x - y} = t^2 f(x,y)$$\n\n**ANSWER:**\n$$\\text{Homogeneous of degree } n = 2.$$",
        finalAnswer: "Degree 2"
      }
    ]
  },
  {
    id: "linear-first-order-des",
    number: "05",
    title: "Linear First-Order Differential Equations",
    category: "Linear Equations",
    shortDesc: "Standard form y' + P(x)y = Q(x), integrating factor mu(x) = e^{integral P(x)dx}, and product rule reduction.",
    concept: "A first-order equation is linear if the dependent variable $y$ and its derivative $y'$ appear only to the first power and are not multiplied together. The standard canonical form is $y' + P(x)y = Q(x)$. Multiplying by the integrating factor $\\mu(x) = e^{\\int P(x)\\,dx}$ collapses the left-hand side into the derivative of a single product: $\\frac{d}{dx}[\\mu(x)y] = \\mu(x)Q(x)$. Direct integration yields $\\mu(x)y = \\int \\mu(x)Q(x)\\,dx + C$, leading to the explicit solution $y(x) = \\frac{1}{\\mu(x)}\\left[\\int \\mu(x)Q(x)\\,dx + C\\right]$.",
    formulaLatex: "\\frac{dy}{dx} + P(x)y = Q(x), \\quad \\mu(x) = e^{\\int P(x)\\,dx}, \\quad \\frac{d}{dx}[\\mu(x)y] = \\mu(x)Q(x)",
    variables: [
      { symbol: "P(x)", name: "Coefficient Function of y", unit: "1/x Units", description: "Must be isolated with coefficient of y' equal to 1" },
      { symbol: "Q(x)", name: "Non-homogeneous Forcing Function", unit: "y/x Units", description: "Right-hand side source term depending solely on x" },
      { symbol: "\\mu(x)", name: "Integrating Factor", unit: "Dimensionless", description: "mu(x) = exp(integral P(x) dx)" }
    ],
    whenToUse: "Use whenever dy/dx and y appear linearly (first power, uncoupled). Must put into standard form with coefficient of dy/dx equal to 1 before reading P(x).",
    engineeringContext: "Directly models RC electrical circuits (V_C' + V_C/(RC) = V_in(t)/(RC)), RL circuits (I' + (R/L)I = V(t)/L), Newton's Law of Cooling, and radioactive decay.",
    workedExample: {
      title: "Solving a Linear First-Order DE with Integrating Factor",
      scenario: "In an RL inductive circuit model, the current satisfies dy/dx + 2y = 6x. Find the general solution y(x).",
      given: [
        "\\frac{dy}{dx} + 2y = 6x",
        "P(x) = 2, \\quad Q(x) = 6x"
      ],
      required: "General solution $y(x)$",
      formula: "\\mu(x) = e^{\\int P(x)\\,dx}, \\quad \\frac{d}{dx}[\\mu y] = \\mu Q",
      substitution: "\\mu(x) = e^{\\int 2\\,dx} = e^{2x}\\n\\frac{d}{dx}[e^{2x}y] = 6x e^{2x}",
      computation: "e^{2x}y = \\int 6x e^{2x}\\,dx + C\\n\\int 6x e^{2x}\\,dx = 3x e^{2x} - \\frac{3}{2}e^{2x}\\ne^{2x}y = 3x e^{2x} - \\frac{3}{2}e^{2x} + C\\ny = 3x - \\frac{3}{2} + C e^{-2x}",
      answer: "y = 3x - \\frac{3}{2} + C e^{-2x}",
      interpretation: "The steady-state response is 3x - 1.5 and the transient decay term is C e^{-2x}."
    },
    commonMistakes: [
      "Applying the integrating factor before putting the equation into standard form (e.g. failing to divide through by the coefficient of y').",
      "Forgetting to integrate by parts correctly when finding integral of mu(x) Q(x) dx.",
      "Forgetting to divide the arbitrary constant C by mu(x) at the final step."
    ],
    quickCheck: {
      question: "What is the integrating factor for the linear equation dy/dx + 5y = 10?",
      options: [
        "mu(x) = e^{5x}",
        "mu(x) = 5x",
        "mu(x) = e^{-5x}",
        "mu(x) = 10 e^{5x}"
      ],
      correctIndex: 0,
      explanation: "Here P(x) = 5. The integrating factor is mu(x) = exp(integral 5 dx) = e^{5x}."
    },
    practiceProblems: [
      {
        id: "p5-1",
        level: "Level 1 — Foundation",
        prompt: "Find the integrating factor and general solution for dy/dx + 3y = 9x.",
        hint: "P(x) = 3 so mu(x) = e^{3x}. Integrate 9x e^{3x} dx by parts.",
        firstStep: "mu(x) = e^{3x}, d/dx[e^{3x} y] = 9x e^{3x}.",
        fullSolution: "**GIVEN:**\n* $y' + 3y = 9x$\n\n**STEP 1: Integrating Factor**\n$$P(x) = 3 \\implies \\mu(x) = e^{\\int 3\\,dx} = e^{3x}$$\n\n**STEP 2: Multiply and Collapse**\n$$\\frac{d}{dx}[e^{3x}y] = 9x e^{3x}$$\n\n**STEP 3: Integrate by Parts**\n$$e^{3x}y = \\int 9x e^{3x}\\,dx + C = 3x e^{3x} - e^{3x} + C$$\n\n**STEP 4: Divide by mu**\n$$y = 3x - 1 + C e^{-3x}$$\n\n**ANSWER:**\n$$y = 3x - 1 + C e^{-3x}$$",
        finalAnswer: "y = 3x - 1 + C e^{-3x}"
      },
      {
        id: "p5-2",
        level: "Level 2 — Application",
        prompt: "Solve the linear differential equation dy/dx + 4y = 8.",
        hint: "mu(x) = e^{4x}. The integral of 8 e^{4x} dx is simply 2 e^{4x}.",
        firstStep: "mu(x) = e^{4x}, d/dx[e^{4x} y] = 8 e^{4x}.",
        fullSolution: "**GIVEN:**\n* $y' + 4y = 8$\n\n**COMPUTATION:**\n$$\\mu(x) = e^{\\int 4\\,dx} = e^{4x}$$\n$$\\frac{d}{dx}[e^{4x}y] = 8e^{4x}$$\n$$e^{4x}y = 2e^{4x} + C$$\n$$y = 2 + C e^{-4x}$$\n\n**ANSWER:**\n$$y = 2 + C e^{-4x}$$",
        finalAnswer: "y = 2 + C e^{-4x}"
      },
      {
        id: "p5-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Solve the initial-value problem dy/dx + 4y = 8x with y(0) = 2.",
        hint: "Find general solution y = 2x - 1/2 + C e^{-4x}, then apply y(0) = 2 to find C = 5/2.",
        firstStep: "Integrating factor is mu = e^{4x}.",
        fullSolution: "**GIVEN:**\n* $y' + 4y = 8x, \\quad y(0) = 2$\n\n**COMPUTATION:**\n$$\\mu = e^{4x}$$\n$$e^{4x}y = \\int 8x e^{4x}\\,dx = 2x e^{4x} - \\frac{1}{2}e^{4x} + C$$\n$$y = 2x - \\frac{1}{2} + C e^{-4x}$$\n$$\\text{Apply } y(0) = 2: 2 = 0 - \\frac{1}{2} + C \\implies C = \\frac{5}{2}$$\n$$y = 2x - \\frac{1}{2} + \\frac{5}{2}e^{-4x}$$\n\n**ANSWER:**\n$$y = 2x - \\frac{1}{2} + \\frac{5}{2}e^{-4x}$$",
        finalAnswer: "y = 2x - 1/2 + (5/2) e^{-4x}"
      },
      {
        id: "p5-4",
        level: "Level 4 — Challenge",
        prompt: "Solve x dy/dx + 2y = 4x^2 for x > 0.",
        hint: "Put into standard form by dividing by x first: y' + (2/x)y = 4x. Note that mu = e^{2 ln x} = x^2.",
        firstStep: "Standard form: dy/dx + (2/x)y = 4x.",
        fullSolution: "**GIVEN:**\n* $x y' + 2y = 4x^2$\n\n**STEP 1: Standard Form**\n$$y' + \\frac{2}{x}y = 4x$$\n\n**STEP 2: Integrating Factor**\n$$\\mu(x) = e^{\\int (2/x)\\,dx} = e^{2\\ln x} = e^{\\ln(x^2)} = x^2$$\n\n**STEP 3: Multiply & Integrate**\n$$\\frac{d}{dx}[x^2 y] = x^2(4x) = 4x^3$$\n$$x^2 y = \\int 4x^3\\,dx + C = x^4 + C$$\n$$y = x^2 + \\frac{C}{x^2}$$\n\n**ANSWER:**\n$$y = x^2 + \\frac{C}{x^2}$$",
        finalAnswer: "y = x^2 + C/x^2"
      }
    ]
  },
  {
    id: "separable-des",
    number: "06",
    title: "Separable Differential Equations",
    category: "Separable Equations",
    shortDesc: "Separation of variables: 1/h(y) dy = g(x) dx, integration, and absorbing constants.",
    concept: "A first-order equation is separable when the derivative $\\frac{dy}{dx}$ can be factored into a product of a function strictly of $x$ and a function strictly of $y$: $\\frac{dy}{dx} = g(x)h(y)$. Dividing by $h(y)$ (where $h(y) \\neq 0$) and multiplying by $dx$ separates the variables onto opposite sides: $\\frac{1}{h(y)}\\,dy = g(x)\\,dx$. Integrating both sides yields $\\int \\frac{1}{h(y)}\\,dy = \\int g(x)\\,dx + C$. Algebraic rearrangement or exponentiation then produces the explicit or implicit general solution, with the integration constant often absorbed into an arbitrary prefactor $C$.",
    formulaLatex: "\\frac{dy}{dx} = g(x)h(y) \\iff \\frac{1}{h(y)}\\,dy = g(x)\\,dx \\implies \\int \\frac{1}{h(y)}\\,dy = \\int g(x)\\,dx + C",
    variables: [
      { symbol: "g(x)", name: "Function of x alone", unit: "Dimensionless", description: "Independent variable component" },
      { symbol: "h(y)", name: "Function of y alone", unit: "Dimensionless", description: "Dependent variable component" },
      { symbol: "C", name: "Constant of Integration", unit: "Dimensionless", description: "Additive constant combined from both integrations" }
    ],
    whenToUse: "Use whenever dy/dx can be written as a product or quotient of x-alone and y-alone factors.",
    engineeringContext: "Models radioactive isotope half-life decay, population kinetics, chemical reaction rate laws, and Torricelli's tank emptying rate.",
    workedExample: {
      title: "Solving a Separable Equation with Constant Absorption",
      scenario: "Solve the growth model differential equation dy/dx = x(y + 1).",
      given: [
        "\\frac{dy}{dx} = x(y + 1)"
      ],
      required: "Explicit general solution $y(x)$",
      formula: "\\frac{1}{y+1}\\,dy = x\\,dx",
      substitution: "\\int \\frac{1}{y+1}\\,dy = \\int x\\,dx + C_1",
      computation: "\\ln|y + 1| = \\frac{x^2}{2} + C_1\\n|y + 1| = e^{C_1} e^{x^2/2}\\ny + 1 = C e^{x^2/2} \\quad (C = \\pm e^{C_1})\\ny = C e^{x^2/2} - 1",
      answer: "y = C e^{x^2/2} - 1",
      interpretation: "The constant of integration C absorbs the exponential sign, yielding the entire family of solutions."
    },
    commonMistakes: [
      "Mixing variables during separation (e.g. leaving an x-term with dy or a y-term with dx).",
      "Forgetting to exponentiate the constant: e^{x^2/2 + C} = e^C e^{x^2/2} = A e^{x^2/2}, NOT e^{x^2/2} + C.",
      "Omitting singular solutions corresponding to h(y) = 0."
    ],
    quickCheck: {
      question: "After separating variables for dy/dx = 2x(y - 3), what is the resulting integration?",
      options: [
        "integral 1/(y - 3) dy = integral 2x dx",
        "integral (y - 3) dy = integral 2x dx",
        "integral 1/(2x) dx = integral (y - 3) dy",
        "integral dy = integral 2x(y - 3) dx"
      ],
      correctIndex: 0,
      explanation: "Dividing by (y - 3) and multiplying by dx gives 1/(y - 3) dy = 2x dx."
    },
    practiceProblems: [
      {
        id: "p6-1",
        level: "Level 1 — Foundation",
        prompt: "Solve the separable differential equation dy/dx = 2x(y - 3).",
        hint: "Divide by (y - 3) and integrate: ln|y - 3| = x^2 + C.",
        firstStep: "1/(y - 3) dy = 2x dx.",
        fullSolution: "**GIVEN:**\n* $\\frac{dy}{dx} = 2x(y - 3)$\n\n**COMPUTATION:**\n$$\\frac{1}{y - 3}\\,dy = 2x\\,dx$$\n$$\\int \\frac{1}{y - 3}\\,dy = \\int 2x\\,dx$$\n$$\\ln|y - 3| = x^2 + C_1$$\n$$y - 3 = C e^{x^2}$$\n$$y = 3 + C e^{x^2}$$\n\n**ANSWER:**\n$$y = 3 + C e^{x^2}$$",
        finalAnswer: "y = 3 + C e^{x^2}"
      },
      {
        id: "p6-2",
        level: "Level 2 — Application",
        prompt: "Solve the separable initial-value problem dy/dx = x(y + 2) with y(0) = 1.",
        hint: "Separate to get ln|y + 2| = x^2/2 + C. Use y(0) = 1 to find C.",
        firstStep: "y + 2 = C e^{x^2/2}.",
        fullSolution: "**GIVEN:**\n* $\\frac{dy}{dx} = x(y + 2), \\quad y(0) = 1$\n\n**COMPUTATION:**\n$$\\frac{dy}{y + 2} = x\\,dx$$\n$$\\ln|y + 2| = \\frac{x^2}{2} + C_1$$\n$$y + 2 = C e^{x^2/2}$$\n$$\\text{Apply } y(0) = 1: 1 + 2 = C e^0 \\implies C = 3$$\n$$y = 3 e^{x^2/2} - 2$$\n\n**ANSWER:**\n$$y = 3 e^{x^2/2} - 2$$",
        finalAnswer: "y = 3 e^{x^2/2} - 2"
      },
      {
        id: "p6-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Solve dy/dx = 4xy subject to y(1) = 3.",
        hint: "Separate 1/y dy = 4x dx. Integrate to get y = C e^{2x^2}. At x = 1, y = 3 so C = 3e^{-2}.",
        firstStep: "1/y dy = 4x dx implies ln y = 2x^2 + C.",
        fullSolution: "**GIVEN:**\n* $\\frac{dy}{dx} = 4xy, \\quad y(1) = 3$\n\n**COMPUTATION:**\n$$\\frac{1}{y}\\,dy = 4x\\,dx$$\n$$\\ln|y| = 2x^2 + C_1 \\implies y = C e^{2x^2}$$\n$$\\text{At } x = 1, y = 3: 3 = C e^{2(1)^2} = C e^2 \\implies C = 3e^{-2}$$\n$$y = 3e^{-2} e^{2x^2} = 3 e^{2x^2 - 2}$$\n\n**ANSWER:**\n$$y = 3 e^{2x^2 - 2}$$",
        finalAnswer: "y = 3 e^{2x^2 - 2}"
      },
      {
        id: "p6-4",
        level: "Level 4 — Challenge",
        prompt: "Solve the non-linear separable equation dy/dx = y^2 (3x^2 + 1) with y(0) = 1.",
        hint: "Separate y^{-2} dy = (3x^2 + 1) dx. Integrate y^{-2} to -1/y.",
        firstStep: "-1/y = x^3 + x + C.",
        fullSolution: "**GIVEN:**\n* $y' = y^2(3x^2 + 1), \\quad y(0) = 1$\n\n**COMPUTATION:**\n$$y^{-2}\\,dy = (3x^2 + 1)\\,dx$$\n$$-\\frac{1}{y} = x^3 + x + C$$\n$$\\text{At } x = 0, y = 1: -\\frac{1}{1} = 0 + 0 + C \\implies C = -1$$\n$$-\\frac{1}{y} = x^3 + x - 1 \\implies y = \\frac{1}{1 - x - x^3}$$\n\n**ANSWER:**\n$$y = \\frac{1}{1 - x - x^3}$$",
        finalAnswer: "y = 1 / (1 - x - x^3)"
      }
    ]
  },
  {
    id: "homogeneous-first-order-des",
    number: "07",
    title: "Homogeneous First-Order Differential Equations",
    category: "Homogeneous DEs",
    shortDesc: "Substitution y = vx, product derivative dy/dx = v + x dv/dx, and reduction to separable form.",
    concept: "A first-order equation is homogeneous if it can be written in terms of the ratio alone: $\\frac{dy}{dx} = F\\left(\\frac{y}{x}\\right)$. The standard transformation is $y = vx$, which by the product rule implies $\\frac{dy}{dx} = v + x\\frac{dv}{dx}$. Substituting this into the differential equation transforms it into $v + x\\frac{dv}{dx} = F(v)$, which reduces immediately to a separable equation: $\\frac{dv}{F(v) - v} = \\frac{dx}{x}$. Integrating with respect to $v$ and $x$ and finally back-substituting $v = \\frac{y}{x}$ produces the solution.",
    formulaLatex: "\\frac{dy}{dx} = F\\left(\\frac{y}{x}\\right), \\quad y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}, \\quad \\frac{dv}{F(v) - v} = \\frac{dx}{x}",
    variables: [
      { symbol: "v", name: "Dimensionless Ratio Variable", unit: "Dimensionless", description: "v = y / x" },
      { symbol: "v + x \\frac{dv}{dx}", name: "Transformed Derivative", unit: "Dimensionless", description: "Result of applying the product rule to y = vx" }
    ],
    whenToUse: "Use when dy/dx depends exclusively on the ratio y/x, or when M and N in M dx + N dy = 0 are both homogeneous functions of the same degree.",
    engineeringContext: "Self-similar flow fields, conical nozzle expansions, and laminar boundary-layer velocity profiles where flow patterns scale geometrically.",
    workedExample: {
      title: "Solving a Homogeneous Equation via y = vx Substitution",
      scenario: "Solve the homogeneous differential equation (y - 2x) dx + x dy = 0.",
      given: [
        "(y - 2x)\\,dx + x\\,dy = 0"
      ],
      required: "General solution $y(x)$",
      formula: "\\frac{dy}{dx} = 2 - \\frac{y}{x}, \\quad y = vx, \\quad \\frac{dy}{dx} = v + x\\frac{dv}{dx}",
      substitution: "v + x\\frac{dv}{dx} = 2 - v",
      computation: "x\\frac{dv}{dx} = 2 - 2v = 2(1 - v)\\n\\frac{dv}{1 - v} = \\frac{2}{x}\\,dx\\n-\\ln|1 - v| = 2\\ln|x| + C_1 = \\ln(x^2) + C_1\\n1 - v = \\frac{C}{x^2}\\n1 - \\frac{y}{x} = \\frac{C}{x^2}\\ny = x - \\frac{C}{x}",
      answer: "y = x - \\frac{C}{x}",
      interpretation: "Back-substituting v = y/x yields the explicit hyperbolic-type general solution family."
    },
    commonMistakes: [
      "CRITICAL EXAM TRAP: Setting dy/dx = dv/dx instead of applying product rule: dy/dx = v + x dv/dx.",
      "Forgetting to back-substitute v = y/x into the final integrated solution.",
      "Dividing by x without verifying that the equation is indeed homogeneous in y/x."
    ],
    quickCheck: {
      question: "When substituting y = vx into a homogeneous first-order differential equation, what replaces dy/dx?",
      options: [
        "v + x(dv/dx)",
        "x(dv/dx)",
        "v(dv/dx)",
        "dv/dx"
      ],
      correctIndex: 0,
      explanation: "By the product rule, d/dx(vx) = v(dx/dx) + x(dv/dx) = v + x dv/dx."
    },
    practiceProblems: [
      {
        id: "p7-1",
        level: "Level 1 — Foundation",
        prompt: "Show that dy/dx = (x + y)/x is homogeneous and set up the resulting separable equation in v.",
        hint: "Divide numerator and denominator by x: dy/dx = 1 + y/x. Then substitute dy/dx = v + x dv/dx.",
        firstStep: "v + x dv/dx = 1 + v.",
        fullSolution: "**GIVEN:**\n* $\\frac{dy}{dx} = \\frac{x + y}{x} = 1 + \\frac{y}{x}$\n\n**STEP 1: Substitute y = vx**\n$$v + x\\frac{dv}{dx} = 1 + v$$\n\n**STEP 2: Simplify**\n$$x\\frac{dv}{dx} = 1 \\implies dv = \\frac{dx}{x}$$\n\n**STEP 3: Integrate**\n$$v = \\ln|x| + C$$\n\n**STEP 4: Back-Substitute**\n$$\\frac{y}{x} = \\ln|x| + C \\implies y = x(\\ln|x| + C)$$\n\n**ANSWER:**\n$$y = x(\\ln|x| + C)$$",
        finalAnswer: "y = x(ln|x| + C)"
      },
      {
        id: "p7-2",
        level: "Level 2 — Application",
        prompt: "Solve the homogeneous differential equation (x + 2y) dx - x dy = 0.",
        hint: "Rewrite as dy/dx = 1 + 2(y/x). Substitute y = vx.",
        firstStep: "v + x dv/dx = 1 + 2v implies x dv/dx = 1 + v.",
        fullSolution: "**GIVEN:**\n* $(x + 2y)\\,dx - x\\,dy = 0 \\implies \\frac{dy}{dx} = 1 + 2\\frac{y}{x}$\n\n**COMPUTATION:**\n$$v + x\\frac{dv}{dx} = 1 + 2v$$\n$$x\\frac{dv}{dx} = 1 + v$$\n$$\\frac{dv}{1 + v} = \\frac{dx}{x}$$\n$$\\ln|1 + v| = \\ln|x| + \\ln|C| = \\ln|Cx|$$\n$$1 + v = Cx$$\n$$1 + \\frac{y}{x} = Cx \\implies x + y = Cx^2$$\n\n**ANSWER:**\n$$x + y = Cx^2$$",
        finalAnswer: "x + y = Cx^2"
      },
      {
        id: "p7-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Solve (x^2 + y^2) dx - 2xy dy = 0.",
        hint: "Rewrite as dy/dx = (x^2 + y^2)/(2xy) = 1/(2(y/x)) + (1/2)(y/x).",
        firstStep: "Let y = vx, then v + x dv/dx = (1 + v^2)/(2v).",
        fullSolution: "**GIVEN:**\n* $(x^2 + y^2)\\,dx - 2xy\\,dy = 0 \\implies \\frac{dy}{dx} = \\frac{1 + (y/x)^2}{2(y/x)}$\n\n**COMPUTATION:**\n$$v + x\\frac{dv}{dx} = \\frac{1 + v^2}{2v}$$\n$$x\\frac{dv}{dx} = \\frac{1 + v^2 - 2v^2}{2v} = \\frac{1 - v^2}{2v}$$\n$$\\frac{2v}{1 - v^2}\\,dv = \\frac{dx}{x}$$\n$$-\\ln|1 - v^2| = \\ln|x| + C_1 \\implies 1 - v^2 = \\frac{C}{x}$$\n$$1 - \\frac{y^2}{x^2} = \\frac{C}{x} \\implies x^2 - y^2 = Cx$$\n\n**ANSWER:**\n$$x^2 - y^2 = Cx$$",
        finalAnswer: "x^2 - y^2 = Cx"
      },
      {
        id: "p7-4",
        level: "Level 4 — Challenge",
        prompt: "Classify and solve dy/dx = (x + y)/(x - y).",
        hint: "Divide numerator and denominator by x to show it is homogeneous in y/x. Use y = vx.",
        firstStep: "v + x dv/dx = (1 + v)/(1 - v).",
        fullSolution: "**GIVEN:**\n* $\\frac{dy}{dx} = \\frac{x + y}{x - y} = \\frac{1 + y/x}{1 - y/x}$ (Homogeneous)\n\n**COMPUTATION:**\n$$v + x\\frac{dv}{dx} = \\frac{1 + v}{1 - v}$$\n$$x\\frac{dv}{dx} = \\frac{1 + v - v(1 - v)}{1 - v} = \\frac{1 + v^2}{1 - v}$$\n$$\\frac{1 - v}{1 + v^2}\\,dv = \\frac{dx}{x}$$\n$$\\int \\frac{1}{1 + v^2}\\,dv - \\int \\frac{v}{1 + v^2}\\,dv = \\int \\frac{1}{x}\\,dx$$\n$$\\arctan(v) - \\frac{1}{2}\\ln(1 + v^2) = \\ln|x| + C$$\n$$\\text{Back-substitute } v = y/x:$$\n$$\\arctan\\left(\\frac{y}{x}\\right) - \\frac{1}{2}\\ln\\left(1 + \\frac{y^2}{x^2}\\right) = \\ln|x| + C$$\n$$\\arctan\\left(\\frac{y}{x}\\right) - \\ln\\sqrt{x^2 + y^2} = C$$\n\n**ANSWER:**\n$$\\arctan\\left(\\frac{y}{x}\\right) - \\frac{1}{2}\\ln(x^2 + y^2) = C$$",
        finalAnswer: "arctan(y/x) - (1/2)ln(x^2 + y^2) = C"
      }
    ]
  },
  {
    id: "initial-value-problems",
    number: "08",
    title: "Initial-Value Problems (IVPs)",
    category: "Initial-Value Problems",
    shortDesc: "Boundary conditions y(x0) = y0, evaluating the particular integration constant C.",
    concept: "The general solution of a first-order differential equation contains an arbitrary constant of integration $C$, representing an infinite family of curves. An Initial-Value Problem (IVP) pairs the differential equation with a boundary/initial condition $y(x_0) = y_0$. By substituting $x = x_0$ and $y = y_0$ into the general solution, the parameter $C$ is uniquely determined. This selects the singular particular solution curve that passes through the specified initial state.",
    formulaLatex: "y(x_0) = y_0 \\implies \\Psi(x_0, y_0) = C \\implies \\text{Particular Solution}",
    variables: [
      { symbol: "x_0", name: "Initial Independent Value", unit: "x Units", description: "Given starting coordinate" },
      { symbol: "y_0", name: "Initial State / Boundary Value", unit: "y Units", description: "Given dependent state at x = x0" }
    ],
    whenToUse: "Apply after obtaining the general solution whenever initial values or boundary measurements are given.",
    engineeringContext: "Physical conditions like initial capacitor charge q(0) = Q_0, starting tank temperature T(0) = T_init, or vehicle release velocity v(0) = v_0.",
    workedExample: {
      title: "Determining Particular Solution for an Exponential IVP",
      scenario: "In a thermal cooling process, dy/dx = 6xy with initial condition y(0) = 2. Find the particular solution.",
      given: [
        "\\frac{dy}{dx} = 6xy",
        "y(0) = 2"
      ],
      required: "Particular solution satisfying $y(0) = 2$",
      formula: "\\frac{1}{y}\\,dy = 6x\\,dx \\implies y = C e^{3x^2}",
      substitution: "x_0 = 0, \\quad y_0 = 2",
      computation: "2 = C e^{3(0)^2} = C e^0 = C(1)\\nC = 2",
      answer: "y = 2 e^{3x^2}",
      interpretation: "The particular solution curve passing through (0, 2) is y = 2 e^{3x^2}."
    },
    commonMistakes: [
      "Substituting the initial condition into the differential equation rather than into the general solution.",
      "Calculating C correctly but leaving the answer as 'C = 2' instead of writing the full particular equation.",
      "Plugging in y for x and x for y (e.g. confusing y(1) = 3 with x = 3, y = 1)."
    ],
    quickCheck: {
      question: "If the general solution is y = C e^{2x} and y(0) = 5, what is the particular solution?",
      options: [
        "y = 5 e^{2x}",
        "y = e^{2x} + 5",
        "y = 5 e^{-2x}",
        "y = 2 e^{5x}"
      ],
      correctIndex: 0,
      explanation: "Substituting x = 0 and y = 5 gives 5 = C e^0 = C, so y = 5 e^{2x}."
    },
    practiceProblems: [
      {
        id: "p8-1",
        level: "Level 1 — Foundation",
        prompt: "Find the particular solution for dy/dx = 2x with y(1) = 4.",
        hint: "Integrate to get y = x^2 + C, then substitute x = 1 and y = 4.",
        firstStep: "4 = (1)^2 + C.",
        fullSolution: "**GIVEN:**\n* $y' = 2x, \\quad y(1) = 4$\n\n**COMPUTATION:**\n$$y = x^2 + C$$\n$$4 = (1)^2 + C = 1 + C \\implies C = 3$$\n$$y = x^2 + 3$$\n\n**ANSWER:**\n$$y = x^2 + 3$$",
        finalAnswer: "y = x^2 + 3"
      },
      {
        id: "p8-2",
        level: "Level 2 — Application",
        prompt: "Solve the linear IVP dy/dx + 2y = 4 with y(0) = 5.",
        hint: "General solution is y = 2 + C e^{-2x}. Use y(0) = 5 to find C.",
        firstStep: "5 = 2 + C e^0.",
        fullSolution: "**GIVEN:**\n* $y' + 2y = 4, \\quad y(0) = 5$\n\n**COMPUTATION:**\n$$\\mu = e^{2x} \\implies \\frac{d}{dx}[e^{2x}y] = 4e^{2x} \\implies e^{2x}y = 2e^{2x} + C$$\n$$y = 2 + C e^{-2x}$$\n$$5 = 2 + C(1) \\implies C = 3$$\n$$y = 2 + 3e^{-2x}$$\n\n**ANSWER:**\n$$y = 2 + 3e^{-2x}$$",
        finalAnswer: "y = 2 + 3e^{-2x}"
      },
      {
        id: "p8-3",
        level: "Level 3 — Engineering Problem",
        prompt: "A tank sensor yields dy/dx = 4x/y with y(2) = 4. Find the particular solution.",
        hint: "Separate to get y dy = 4x dx -> y^2/2 = 2x^2 + C -> y^2 - 4x^2 = C.",
        firstStep: "y^2 - 4x^2 = C; substitute x = 2, y = 4.",
        fullSolution: "**GIVEN:**\n* $y' = 4x/y, \\quad y(2) = 4$\n\n**COMPUTATION:**\n$$y\\,dy = 4x\\,dx$$\n$$\\frac{1}{2}y^2 = 2x^2 + C_1 \\implies y^2 - 4x^2 = C$$\n$$\\text{At } x = 2, y = 4: (4)^2 - 4(2)^2 = 16 - 16 = 0 \\implies C = 0$$\n$$y^2 - 4x^2 = 0 \\implies y = 2x \\quad (\\text{for } x > 0, y > 0)$$\n\n**ANSWER:**\n$$y = 2x$$",
        finalAnswer: "y = 2x"
      },
      {
        id: "p8-4",
        level: "Level 4 — Challenge",
        prompt: "Solve the exact IVP (3x^2 + 2xy) dx + (x^2 + 2y) dy = 0 with y(1) = 2.",
        hint: "Potential function is x^3 + x^2 y + y^2 = C. Evaluate at (1, 2).",
        firstStep: "Psi(1, 2) = (1)^3 + (1)^2(2) + (2)^2 = 1 + 2 + 4 = 7.",
        fullSolution: "**GIVEN:**\n* $(3x^2 + 2xy)\\,dx + (x^2 + 2y)\\,dy = 0, \\quad y(1) = 2$\n\n**COMPUTATION:**\n$$M_y = 2x, \\quad N_x = 2x \\implies \\text{Exact}$$\n$$\\Psi = \\int (3x^2 + 2xy)\\,dx = x^3 + x^2 y + g(y)$$\n$$\\Psi_y = x^2 + g'(y) = x^2 + 2y \\implies g'(y) = 2y \\implies g(y) = y^2$$\n$$x^3 + x^2 y + y^2 = C$$\n$$\\text{At } x = 1, y = 2: 1 + 2 + 4 = 7 \\implies C = 7$$\n$$x^3 + x^2 y + y^2 = 7$$\n\n**ANSWER:**\n$$x^3 + x^2 y + y^2 = 7$$",
        finalAnswer: "x^3 + x^2 y + y^2 = 7"
      }
    ]
  },
  {
    id: "orthogonal-trajectories",
    number: "09",
    title: "Orthogonal Trajectories",
    category: "Geometric Applications",
    shortDesc: "Curves intersecting at right angles: negative reciprocal slope m_perp = -1/m and parameter elimination.",
    concept: "Two one-parameter families of curves are orthogonal trajectories of each other if every curve of one family intersects every curve of the other family at right angles. If the tangent slope of the original family at $(x,y)$ is $\\left(\\frac{dy}{dx}\\right)_{\\text{orig}} = F(x,y)$, then by the perpendicular line condition ($m_1 m_2 = -1$), the orthogonal family must have slope $\\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{1}{F(x,y)}$. The systematic four-step procedure is: (1) differentiate the given family, (2) eliminate the parameter $c$, (3) replace $\\frac{dy}{dx}$ with $-\\frac{1}{dy/dx}$, and (4) solve the resulting differential equation.",
    formulaLatex: "\\left(\\frac{dy}{dx}\\right)_{\\text{orig}} = F(x,y) \\implies \\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{1}{F(x,y)} \\quad (m_\\perp = -\\frac{1}{m})",
    variables: [
      { symbol: "m", name: "Slope of Original Family", unit: "Dimensionless", description: "dy/dx after eliminating the parameter c" },
      { symbol: "m_\\perp", name: "Slope of Orthogonal Family", unit: "Dimensionless", description: "Negative reciprocal: -1/m" }
    ],
    whenToUse: "Use when asked to determine the orthogonal trajectories of a given family of curves f(x, y, c) = 0.",
    engineeringContext: "Equipotential lines and electric field flux lines are mutually orthogonal; streamlines and velocity potential lines in potential flow are orthogonal.",
    workedExample: {
      title: "Finding the Orthogonal Trajectories of a Cubic Family",
      scenario: "Find the orthogonal trajectories of the family of cubic curves y = c x^3.",
      given: [
        "y = c x^3"
      ],
      required: "Equation of the orthogonal family of curves",
      formula: "\\frac{dy}{dx} = 3c x^2, \\quad c = \\frac{y}{x^3}, \\quad \\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{1}{dy/dx}",
      substitution: "\\left(\\frac{dy}{dx}\\right)_{\\text{orig}} = 3\\left(\\frac{y}{x^3}\\right)x^2 = \\frac{3y}{x}\\n\\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{x}{3y}",
      computation: "3y\\,dy = -x\\,dx\\n\\int 3y\\,dy = \\int -x\\,dx + C_1\\n\\frac{3}{2}y^2 = -\\frac{1}{2}x^2 + C_1\\nx^2 + 3y^2 = C",
      answer: "x^2 + 3y^2 = C",
      interpretation: "The orthogonal trajectories of the cubics y = cx^3 are a family of concentric ellipses x^2 + 3y^2 = C."
    },
    commonMistakes: [
      "CRITICAL EXAM TRAP: Using the reciprocal 1/m instead of the NEGATIVE reciprocal -1/m!",
      "Forgetting to eliminate the parameter c before inverting the derivative.",
      "Leaving the original parameter c in the differential equation for the orthogonal family."
    ],
    quickCheck: {
      question: "If the slope of the original family of curves is dy/dx = 2y/x, what is the differential equation for the orthogonal trajectories?",
      options: [
        "dy/dx = -x / (2y)",
        "dy/dx = x / (2y)",
        "dy/dx = -2y / x",
        "dy/dx = -2x / y"
      ],
      correctIndex: 0,
      explanation: "The orthogonal slope is the negative reciprocal: m_perp = -1 / (2y/x) = -x / (2y)."
    },
    practiceProblems: [
      {
        id: "p9-1",
        level: "Level 1 — Foundation",
        prompt: "Find the orthogonal trajectories of the family of parabolas y = c x^2.",
        hint: "Differentiate: y' = 2cx = 2(y/x^2)x = 2y/x. Orthogonal slope is -x/(2y).",
        firstStep: "y' = 2y/x implies orthogonal dy/dx = -x/(2y).",
        fullSolution: "**GIVEN:**\n* $y = c x^2$\n\n**STEP 1: Differentiate & Eliminate c**\n$$\\frac{dy}{dx} = 2cx = 2\\left(\\frac{y}{x^2}\\right)x = \\frac{2y}{x}$$\n\n**STEP 2: Negative Reciprocal**\n$$\\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{x}{2y}$$\n\n**STEP 3: Separate & Integrate**\n$$2y\\,dy = -x\\,dx$$\n$$y^2 = -\\frac{1}{2}x^2 + C_1 \\implies x^2 + 2y^2 = C$$\n\n**ANSWER:**\n$$x^2 + 2y^2 = C$$",
        finalAnswer: "x^2 + 2y^2 = C"
      },
      {
        id: "p9-2",
        level: "Level 2 — Application",
        prompt: "Find the orthogonal trajectories of the straight line family y = c x.",
        hint: "y' = c = y/x. The orthogonal slope is -x/y.",
        firstStep: "dy/dx = -x/y implies y dy = -x dx.",
        fullSolution: "**GIVEN:**\n* $y = cx$\n\n**COMPUTATION:**\n$$\\frac{dy}{dx} = c = \\frac{y}{x}$$\n$$\\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{x}{y}$$\n$$y\\,dy = -x\\,dx$$\n$$\\frac{y^2}{2} = -\\frac{x^2}{2} + C_1 \\implies x^2 + y^2 = C$$\n\n**ANSWER:**\n$$x^2 + y^2 = C \\quad (\\text{Concentric circles})$$",
        finalAnswer: "x^2 + y^2 = C"
      },
      {
        id: "p9-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Find the orthogonal trajectories of the hyperbola family x^2 - y^2 = c.",
        hint: "Differentiate implicitly: 2x - 2y y' = 0 -> y' = x/y. Orthogonal slope is -y/x.",
        firstStep: "Orthogonal slope is -y/x.",
        fullSolution: "**GIVEN:**\n* $x^2 - y^2 = c$\n\n**COMPUTATION:**\n$$2x - 2y\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = \\frac{x}{y}$$\n$$\\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{y}{x}$$\n$$\\frac{1}{y}\\,dy = -\\frac{1}{x}\\,dx$$\n$$\\ln|y| = -\\ln|x| + C_1 = \\ln|C/x|$$\n$$xy = C$$\n\n**ANSWER:**\n$$xy = C \\quad (\\text{Rectangular hyperbolas})$$",
        finalAnswer: "xy = C"
      },
      {
        id: "p9-4",
        level: "Level 4 — Challenge",
        prompt: "Find the orthogonal trajectories of the exponential curves y = c e^{-2x}.",
        hint: "Differentiate: y' = -2 c e^{-2x} = -2y. Orthogonal slope is 1/(2y).",
        firstStep: "y' = -2y implies orthogonal slope dy/dx = 1/(2y).",
        fullSolution: "**GIVEN:**\n* $y = c e^{-2x}$\n\n**COMPUTATION:**\n$$\\frac{dy}{dx} = -2 c e^{-2x} = -2y$$\n$$\\left(\\frac{dy}{dx}\\right)_{\\text{ortho}} = -\\frac{1}{-2y} = \\frac{1}{2y}$$\n$$2y\\,dy = dx$$\n$$y^2 = x + C$$\n\n**ANSWER:**\n$$y^2 = x + C$$",
        finalAnswer: "y^2 = x + C"
      }
    ]
  },
  {
    id: "exact-trig-des",
    number: "10",
    title: "Exact Equations with Trigonometric Terms",
    category: "Exact Equations",
    shortDesc: "Chain rule mixed partials involving sin(xy), cos(xy), sec^2(y), and potential pattern recognition.",
    concept: "Exact differential equations frequently involve transcendental and trigonometric terms such as $\\sin(xy)$, $\\cos(xy)$, and $\\sec^2 y$. By the multivariable chain rule, $\\frac{\\partial}{\\partial x}\\sin(xy) = y\\cos(xy)$ and $\\frac{\\partial}{\\partial y}\\sin(xy) = x\\cos(xy)$. Recognizing these coupled cross-terms allows rapid verification of exactness and immediate identification of potential functions such as $\\Psi(x,y) = x^2 y + \\tan y = C$.",
    formulaLatex: "\\frac{\\partial}{\\partial y}[y\\cos(xy)] = \\cos(xy) - xy\\sin(xy) = \\frac{\\partial}{\\partial x}[x\\cos(xy)]",
    variables: [
      { symbol: "xy", name: "Coupled Product Argument", unit: "Dimensionless", description: "Internal product argument requiring product rule differentiation" }
    ],
    whenToUse: "Use when M dx + N dy = 0 contains trigonometric functions of products such as sin(xy), cos(xy), or isolated trig functions like sec^2(y).",
    engineeringContext: "Models non-linear pendulums, alternating electromagnetic flux linkage, and rotational kinematics in robotics.",
    workedExample: {
      title: "Verifying and Solving a Trigonometric Exact Equation",
      scenario: "Solve the differential equation (3x^2 + y cos(xy)) dx + (x cos(xy) + 2y) dy = 0.",
      given: [
        "M = 3x^2 + y\\cos(xy)",
        "N = x\\cos(xy) + 2y"
      ],
      required: "Confirm exactness and find the general solution $\\Psi(x,y) = C$",
      formula: "M_y = \\frac{\\partial M}{\\partial y}, \\quad N_x = \\frac{\\partial N}{\\partial x}, \\quad \\Psi = \\int M\\,dx + g(y)",
      substitution: "M_y = \\cos(xy) - xy\\sin(xy)\\nN_x = \\cos(xy) - xy\\sin(xy)",
      computation: "M_y = N_x \\implies \\text{Exact}\\n\\Psi = \\int (3x^2 + y\\cos(xy))\\,dx = x^3 + \\sin(xy) + g(y)\\n\\Psi_y = x\\cos(xy) + g'(y) = x\\cos(xy) + 2y\\ng'(y) = 2y \\implies g(y) = y^2",
      answer: "x^3 + \\sin(xy) + y^2 = C",
      interpretation: "The mixed product argument xy integrates neatly into sin(xy)."
    },
    commonMistakes: [
      "Forgetting the product rule when differentiating y cos(xy) with respect to y: d/dy [y cos(xy)] = 1*cos(xy) + y*(-x sin(xy)).",
      "Confusing d/dy tan(y) = sec^2(y) with tan^2(y).",
      "Treating xy as a constant instead of applying chain rule with internal derivative."
    ],
    quickCheck: {
      question: "What is the potential function Psi(x,y) for 2xy dx + (x^2 + sec^2 y) dy = 0?",
      options: [
        "x^2 y + tan(y) = C",
        "2x^2 y + sec(y) = C",
        "x^2 y^2 + tan(y) = C",
        "x y^2 + cos(y) = C"
      ],
      correctIndex: 0,
      explanation: "d/dx(x^2 y + tan y) = 2xy and d/dy(x^2 y + tan y) = x^2 + sec^2 y. Therefore Psi = x^2 y + tan(y) = C."
    },
    practiceProblems: [
      {
        id: "p10-1",
        level: "Level 1 — Foundation",
        prompt: "Verify exactness and solve 2xy dx + (x^2 + sec^2 y) dy = 0.",
        hint: "M_y = 2x, N_x = 2x. Integrate 2xy with respect to x.",
        firstStep: "Psi = x^2 y + g(y).",
        fullSolution: "**GIVEN:**\n* $2xy\\,dx + (x^2 + \\sec^2 y)\\,dy = 0$\n\n**COMPUTATION:**\n$$M_y = 2x, \\quad N_x = 2x \\implies \\text{Exact}$$\n$$\\Psi = \\int 2xy\\,dx = x^2 y + g(y)$$\n$$\\Psi_y = x^2 + g'(y) = x^2 + \\sec^2 y$$\n$$g'(y) = \\sec^2 y \\implies g(y) = \\tan y$$\n\n**ANSWER:**\n$$x^2 y + \\tan y = C$$",
        finalAnswer: "x^2 y + tan(y) = C"
      },
      {
        id: "p10-2",
        level: "Level 2 — Application",
        prompt: "Solve (cos y + y cos x) dx + (sin x - x sin y) dy = 0.",
        hint: "Check M_y: -sin y + cos x. Check N_x: cos x - sin y. They match!",
        firstStep: "M_y = N_x = cos x - sin y.",
        fullSolution: "**GIVEN:**\n* $(\\cos y + y\\cos x)\\,dx + (\\sin x - x\\sin y)\\,dy = 0$\n\n**COMPUTATION:**\n$$M_y = -\\sin y + \\cos x$$\n$$N_x = \\cos x - \\sin y$$\n$$M_y = N_x \\implies \\text{Exact}$$\n$$\\Psi = \\int (\\cos y + y\\cos x)\\,dx = x\\cos y + y\\sin x + g(y)$$\n$$\\Psi_y = -x\\sin y + \\sin x + g'(y) = \\sin x - x\\sin y$$\n$$g'(y) = 0 \\implies g(y) = 0$$\n\n**ANSWER:**\n$$x\\cos y + y\\sin x = C$$",
        finalAnswer: "x cos(y) + y sin(x) = C"
      },
      {
        id: "p10-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Solve (y e^{xy} + 4x^3) dx + (x e^{xy} - 3y^2) dy = 0.",
        hint: "Notice d/dy (y e^{xy}) = e^{xy} + xy e^{xy}, which equals d/dx (x e^{xy}).",
        firstStep: "Integrate y e^{xy} + 4x^3 with respect to x.",
        fullSolution: "**GIVEN:**\n* $(y e^{xy} + 4x^3)\\,dx + (x e^{xy} - 3y^2)\\,dy = 0$\n\n**COMPUTATION:**\n$$M_y = e^{xy} + xy e^{xy}, \\quad N_x = e^{xy} + xy e^{xy} \\implies \\text{Exact}$$\n$$\\Psi = \\int (y e^{xy} + 4x^3)\\,dx = e^{xy} + x^4 + g(y)$$\n$$\\Psi_y = x e^{xy} + g'(y) = x e^{xy} - 3y^2$$\n$$g'(y) = -3y^2 \\implies g(y) = -y^3$$\n\n**ANSWER:**\n$$e^{xy} + x^4 - y^3 = C$$",
        finalAnswer: "e^{xy} + x^4 - y^3 = C"
      },
      {
        id: "p10-4",
        level: "Level 4 — Challenge",
        prompt: "Solve (2x\\sin y + y^3) dx + (x^2 \\cos y + 3x y^2) dy = 0.",
        hint: "Check exactness and integrate M with respect to x.",
        firstStep: "M_y = 2x cos y + 3y^2, N_x = 2x cos y + 3y^2.",
        fullSolution: "**GIVEN:**\n* $(2x\\sin y + y^3)\\,dx + (x^2 \\cos y + 3x y^2)\\,dy = 0$\n\n**COMPUTATION:**\n$$M_y = 2x\\cos y + 3y^2, \\quad N_x = 2x\\cos y + 3y^2 \\implies \\text{Exact}$$\n$$\\Psi = \\int (2x\\sin y + y^3)\\,dx = x^2\\sin y + x y^3 + g(y)$$\n$$\\Psi_y = x^2 \\cos y + 3x y^2 + g'(y) = x^2 \\cos y + 3x y^2$$\n$$g'(y) = 0 \\implies g(y) = 0$$\n\n**ANSWER:**\n$$x^2 \\sin y + x y^3 = C$$",
        finalAnswer: "x^2 sin(y) + x y^3 = C"
      }
    ]
  },
  {
    id: "integrating-factors-non-exact",
    number: "11",
    title: "Integrating Factors for Non-Exact DEs",
    category: "Integrating Factors",
    shortDesc: "Special integrating factors mu(x) = e^{integral (My - Nx)/N dx} and mu(y) = e^{integral (Nx - My)/M dy}.",
    concept: "When a differential equation $M(x,y)\\,dx + N(x,y)\\,dy = 0$ is NOT exact ($M_y \\neq N_x$), it may often be converted into an exact equation by multiplying throughout by an integrating factor $\\mu$. Two standard criteria exist: (1) If $\\frac{M_y - N_x}{N} = f(x)$ depends solely on $x$, then $\\mu(x) = e^{\\int f(x)\\,dx}$. (2) If $\\frac{N_x - M_y}{M} = g(y)$ depends solely on $y$, then $\\mu(y) = e^{\\int g(y)\\,dy}$. Once multiplied by $\\mu$, the modified equation $\\mu M\\,dx + \\mu N\\,dy = 0$ becomes exact and is solved by the standard potential function method.",
    formulaLatex: "\\frac{M_y - N_x}{N} = f(x) \\implies \\mu(x) = e^{\\int f(x)\\,dx}, \\quad \\frac{N_x - M_y}{M} = g(y) \\implies \\mu(y) = e^{\\int g(y)\\,dy}",
    variables: [
      { symbol: "\\frac{M_y - N_x}{N}", name: "x-Criterion Ratio", unit: "1/x Units", description: "Must be a function of x alone" },
      { symbol: "\\frac{N_x - M_y}{M}", name: "y-Criterion Ratio", unit: "1/y Units", description: "Must be a function of y alone" },
      { symbol: "\\mu(x) \\text{ or } \\mu(y)", name: "Integrating Factor", unit: "Dimensionless", description: "Multiplier that makes the differential equation exact" }
    ],
    whenToUse: "Use when M_y != N_x, but either (M_y - N_x)/N simplifies to a function of x alone, or (N_x - M_y)/M simplifies to a function of y alone.",
    engineeringContext: "Used in compressible gas dynamics and chemical thermodynamics to convert inexact heat differentials delta Q into exact entropy differentials dS = delta Q / T.",
    workedExample: {
      title: "Finding mu(y) and Solving a Non-Exact Differential Equation",
      scenario: "Consider the equation xy dx + (x^2 + y^2) dy = 0. Find an integrating factor and solve.",
      given: [
        "M = xy, \\quad N = x^2 + y^2"
      ],
      required: "Integrating factor and general solution",
      formula: "M_y = x, \\quad N_x = 2x \\implies M_y \\neq N_x, \\quad \\frac{N_x - M_y}{M} = g(y)",
      substitution: "\\frac{N_x - M_y}{M} = \\frac{2x - x}{xy} = \\frac{x}{xy} = \\frac{1}{y}",
      computation: "\\mu(y) = e^{\\int (1/y)\\,dy} = e^{\\ln y} = y\\n\\text{Multiply: } (xy^2)\\,dx + (x^2 y + y^3)\\,dy = 0\\n\\Psi = \\int xy^2\\,dx = \\frac{1}{2}x^2 y^2 + g(y)\\n\\Psi_y = x^2 y + g'(y) = x^2 y + y^3 \\implies g'(y) = y^3 \\implies g(y) = \\frac{1}{4}y^4",
      answer: "\\frac{1}{2}x^2 y^2 + \\frac{1}{4}y^4 = C \\iff 2x^2 y^2 + y^4 = C",
      interpretation: "Multiplying by y makes the equation exact, allowing direct potential integration."
    },
    commonMistakes: [
      "Mixing up the denominator: (M_y - N_x) is divided by N (for x); (N_x - M_y) is divided by M (for y).",
      "Failing to check that the resulting ratio depends ONLY on the claimed single variable.",
      "Forgetting to multiply BOTH M and N by mu before applying the exact solution method."
    ],
    quickCheck: {
      question: "If (N_x - M_y) / M = 1/y, what is the integrating factor?",
      options: [
        "mu(y) = y",
        "mu(x) = x",
        "mu(y) = 1/y",
        "mu(y) = e^y"
      ],
      correctIndex: 0,
      explanation: "mu(y) = exp(integral (1/y) dy) = exp(ln y) = y."
    },
    practiceProblems: [
      {
        id: "p11-1",
        level: "Level 1 — Foundation",
        prompt: "For xy dx + (x^2 + y^2) dy = 0, evaluate (N_x - M_y)/M and determine mu(y).",
        hint: "M_y = x, N_x = 2x. (N_x - M_y)/M = (2x - x)/(xy) = 1/y.",
        firstStep: "mu(y) = e^{integral (1/y) dy} = y.",
        fullSolution: "**GIVEN:**\n* $M = xy, \\quad N = x^2 + y^2$\n\n**COMPUTATION:**\n$$M_y = x, \\quad N_x = 2x$$\n$$\\frac{N_x - M_y}{M} = \\frac{2x - x}{xy} = \\frac{1}{y}$$\n$$\\mu(y) = e^{\\int (1/y)\\,dy} = y$$\n\n**ANSWER:**\n$$\\mu(y) = y$$",
        finalAnswer: "mu(y) = y"
      },
      {
        id: "p11-2",
        level: "Level 2 — Application",
        prompt: "Investigate whether an integrating factor mu(x) is available for (2y + x) dx + 2x dy = 0.",
        hint: "Check exactness first: M_y = 2, N_x = 2. It is already exact!",
        firstStep: "M_y = 2 and N_x = 2.",
        fullSolution: "**GIVEN:**\n* $M = 2y + x, \\quad N = 2x$\n\n**COMPUTATION:**\n$$M_y = 2, \\quad N_x = 2$$\n$$M_y = N_x = 2 \\implies \\text{Already EXACT!}$$\n$$\\text{No integrating factor is required. Potential function: } 2xy + \\frac{1}{2}x^2 = C$$\n\n**ANSWER:**\n$$\\text{Equation is already exact; } \\mu = 1.$$",
        finalAnswer: "Already exact (mu = 1)"
      },
      {
        id: "p11-3",
        level: "Level 3 — Engineering Problem",
        prompt: "Find an integrating factor mu(x) for (3x^2 y + 2xy) dx + (x^3 + x^2) dy = 0 and solve.",
        hint: "M_y = 3x^2 + 2x, N_x = 3x^2 + 2x. Test M_y = N_x!",
        firstStep: "Notice that M_y = N_x directly!",
        fullSolution: "**GIVEN:**\n* $M = 3x^2 y + 2xy$\n* $N = x^3 + x^2$\n\n**COMPUTATION:**\n$$M_y = 3x^2 + 2x, \\quad N_x = 3x^2 + 2x \\implies \\text{Exact!}$$\n$$\\Psi = \\int (3x^2 y + 2xy)\\,dx = x^3 y + x^2 y + g(y)$$\n$$\\Psi_y = x^3 + x^2 + g'(y) = x^3 + x^2 \\implies g'(y) = 0$$\n$$x^3 y + x^2 y = C \\iff x^2 y(x + 1) = C$$\n\n**ANSWER:**\n$$x^2 y(x + 1) = C$$",
        finalAnswer: "x^2 y (x + 1) = C"
      },
      {
        id: "p11-4",
        level: "Level 4 — Challenge",
        prompt: "Find an integrating factor mu(x) for (2y) dx + (x - y) dy = 0.",
        hint: "M_y = 2, N_x = 1. (M_y - N_x)/N = (2 - 1)/(x - y) depends on both. What about (N_x - M_y)/M = (1 - 2)/(2y) = -1/(2y)?",
        firstStep: "(N_x - M_y)/M = -1/(2y) gives mu(y) = y^{-1/2}.",
        fullSolution: "**GIVEN:**\n* $2y\\,dx + (x - y)\\,dy = 0$\n\n**COMPUTATION:**\n$$M_y = 2, \\quad N_x = 1$$\n$$\\frac{N_x - M_y}{M} = \\frac{1 - 2}{2y} = -\\frac{1}{2y}$$\n$$\\mu(y) = e^{\\int -\\frac{1}{2y}\\,dy} = e^{-\\frac{1}{2}\\ln y} = y^{-1/2} = \\frac{1}{\\sqrt{y}}$$\n$$\\text{Multiply: } 2y^{1/2}\\,dx + (x y^{-1/2} - y^{1/2})\\,dy = 0$$\n$$\\Psi = \\int 2y^{1/2}\\,dx = 2x y^{1/2} + g(y)$$\n$$\\Psi_y = x y^{-1/2} + g'(y) = x y^{-1/2} - y^{1/2} \\implies g'(y) = -y^{1/2} \\implies g(y) = -\\frac{2}{3}y^{3/2}$$\n$$2x\\sqrt{y} - \\frac{2}{3}y^{3/2} = C$$\n\n**ANSWER:**\n$$2x\\sqrt{y} - \\frac{2}{3}y^{3/2} = C$$",
        finalAnswer: "2x sqrt(y) - (2/3) y^(3/2) = C"
      }
    ]
  }
];

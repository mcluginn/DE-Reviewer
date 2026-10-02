/**
 * Differential Equations for Engineers - Interactive Simulations & Diagrams
 * HTML5 Canvas & Vector visualizations for:
 * 1. Interactive Slope / Direction Field with RK4 Trajectory Tracer
 * 2. Orthogonal Trajectories Family Visualizer (Perpendicular Right-Angle Intersections)
 * 3. Exact Equation Potential Field & Contour Streamlines (Psi(x,y) = C)
 */

import { DE_MATH } from "../engine/deMath.js";

export const SIMULATIONS = {
  activeAnimations: {},

  cleanup() {
    Object.values(this.activeAnimations).forEach(id => cancelAnimationFrame(id));
    this.activeAnimations = {};
  },

  /**
   * 1. Interactive Direction Field & RK4 Curve Tracer
   */
  initDirectionFieldSim(canvasId, controlsId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let currentPreset = "linear_decay"; // dy/dx = -y + x
    let trajectories = [
      { x0: 0, y0: 1 }
    ];

    const coordToPixel = (x, y) => {
      // Map [-4, 4] to [0, canvas.width] and [-3, 3] to [canvas.height, 0]
      const px = ((x + 4) / 8) * canvas.width;
      const py = canvas.height - ((y + 3) / 6) * canvas.height;
      return { px, py };
    };

    const pixelToCoord = (px, py) => {
      const x = (px / canvas.width) * 8 - 4;
      const y = ((canvas.height - py) / canvas.height) * 6 - 3;
      return { x, y };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.fillStyle = "#0a0f1d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Coordinate axes
      const origin = coordToPixel(0, 0);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, origin.py);
      ctx.lineTo(canvas.width, origin.py);
      ctx.moveTo(origin.px, 0);
      ctx.lineTo(origin.px, canvas.height);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = "#64748b";
      ctx.font = "11px Inter, sans-serif";
      for (let x = -3; x <= 3; x++) {
        if (x === 0) continue;
        const p = coordToPixel(x, 0);
        ctx.fillText(x.toString(), p.px - 4, origin.py + 14);
      }
      for (let y = -2; y <= 2; y++) {
        if (y === 0) continue;
        const p = coordToPixel(0, y);
        ctx.fillText(y.toString(), origin.px + 6, p.py + 4);
      }

      // Draw direction field tick segments
      const grid = DE_MATH.generateSlopeField(currentPreset, -3.8, 3.8, -2.8, 2.8, 0.4);
      const segLen = 9;

      ctx.lineWidth = 1.2;
      grid.forEach(pt => {
        const p = coordToPixel(pt.x, pt.y);
        const theta = Math.atan(pt.slope);
        const dx = Math.cos(theta) * segLen;
        const dy = -Math.sin(theta) * segLen; // Inverted Y

        // Color code slope slightly by magnitude
        const speed = Math.min(1, Math.abs(pt.slope) / 3);
        ctx.strokeStyle = `rgba(${Math.round(59 + speed * 150)}, ${Math.round(130 + speed * 50)}, 246, 0.65)`;

        ctx.beginPath();
        ctx.moveTo(p.px - dx, p.py - dy);
        ctx.lineTo(p.px + dx, p.py + dy);
        ctx.stroke();
      });

      // Draw RK4 Solution Trajectories
      trajectories.forEach((traj, idx) => {
        const points = DE_MATH.rk4Trajectory(currentPreset, traj.x0, traj.y0, -4, 4, 0.05);
        if (points.length < 2) return;

        ctx.strokeStyle = idx === trajectories.length - 1 ? "#f59e0b" : "#38bdf8";
        ctx.lineWidth = idx === trajectories.length - 1 ? 2.5 : 1.8;
        ctx.beginPath();

        let started = false;
        points.forEach(pt => {
          if (isNaN(pt.y) || Math.abs(pt.y) > 10) {
            started = false;
            return;
          }
          const p = coordToPixel(pt.x, pt.y);
          if (!started) {
            ctx.moveTo(p.px, p.py);
            started = true;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        });
        ctx.stroke();

        // Mark initial condition point
        const p0 = coordToPixel(traj.x0, traj.y0);
        ctx.fillStyle = idx === trajectories.length - 1 ? "#fbbf24" : "#60a5fa";
        ctx.beginPath();
        ctx.arc(p0.px, p0.py, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    };

    // Click canvas to trace new initial condition
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const px = (e.clientX - rect.left) * (canvas.width / rect.width);
      const py = (e.clientY - rect.top) * (canvas.height / rect.height);
      const coord = pixelToCoord(px, py);
      trajectories.push({ x0: coord.x, y0: coord.y });
      render();
    };

    // Mount controls
    const ctrl = document.getElementById(controlsId);
    if (ctrl) {
      ctrl.innerHTML = `
        <div class="sim-ctrl-row">
          <label><strong>DE Equation:</strong></label>
          <select id="sim-df-preset" class="form-select">
            <option value="linear_decay" selected>Linear: dy/dx = -y + x</option>
            <option value="separable_growth">Separable: dy/dx = 2xy</option>
            <option value="homogeneous_ratio">Homogeneous: dy/dx = 2 - y/x</option>
            <option value="exact_linear">Exact: dy/dx = -(4x+5y)/(5x+6y)</option>
            <option value="orthogonal_cubic">Orthogonal Trajectory: dy/dx = -x/(3y)</option>
          </select>
          <button class="btn btn-sm btn-outline" id="sim-df-clear">Clear Curves</button>
        </div>
        <p class="text-xs text-muted" style="margin-top:0.4rem;">💡 Click anywhere on the slope field grid above to trace the exact numerical solution curve $y(x)$ passing through that initial condition point!</p>
      `;

      ctrl.querySelector("#sim-df-preset").onchange = (e) => {
        currentPreset = e.target.value;
        trajectories = [{ x0: 0, y0: 1 }];
        render();
      };

      ctrl.querySelector("#sim-df-clear").onclick = () => {
        trajectories = [];
        render();
      };
    }

    render();
  },

  /**
   * 2. Orthogonal Trajectories Family Visualizer
   */
  initOrthogonalSim(canvasId, controlsId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let familyPower = 3; // y = c x^3 => x^2 + 3y^2 = C
    let selectedC = 1.0;

    const coordToPixel = (x, y) => {
      const px = ((x + 4) / 8) * canvas.width;
      const py = canvas.height - ((y + 3) / 6) * canvas.height;
      return { px, py };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0b1120";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const origin = coordToPixel(0, 0);

      // Draw axes
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, origin.py);
      ctx.lineTo(canvas.width, origin.py);
      ctx.moveTo(origin.px, 0);
      ctx.lineTo(origin.px, canvas.height);
      ctx.stroke();

      // Original family: y = c * x^n (Blue curves)
      const cVals = [-2, -1, -0.4, 0.4, 1, 2];
      ctx.lineWidth = 1.5;
      cVals.forEach(c => {
        ctx.strokeStyle = c === selectedC ? "#38bdf8" : "rgba(56, 189, 248, 0.35)";
        ctx.beginPath();
        let started = false;
        for (let x = -3.5; x <= 3.5; x += 0.05) {
          const y = c * Math.pow(x, familyPower);
          if (Math.abs(y) <= 3) {
            const p = coordToPixel(x, y);
            if (!started) { ctx.moveTo(p.px, p.py); started = true; }
            else { ctx.lineTo(p.px, p.py); }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      });

      // Orthogonal family: x^2 + n * y^2 = C (Ellipses / Hyperbolas in Gold)
      const CVals = [0.8, 1.8, 3.2, 5.0, 7.5];
      ctx.lineWidth = 1.6;
      CVals.forEach(C => {
        ctx.strokeStyle = "rgba(245, 158, 11, 0.65)";
        ctx.beginPath();
        if (familyPower > 0) {
          // Ellipse: x = sqrt(C)*cos(t), y = sqrt(C/n)*sin(t)
          const rx = Math.sqrt(C);
          const ry = Math.sqrt(C / familyPower);
          for (let t = 0; t <= 2 * Math.PI + 0.05; t += 0.05) {
            const x = rx * Math.cos(t);
            const y = ry * Math.sin(t);
            const p = coordToPixel(x, y);
            if (t === 0) ctx.moveTo(p.px, p.py);
            else ctx.lineTo(p.px, p.py);
          }
        }
        ctx.stroke();
      });

      // Label legend
      ctx.fillStyle = "#38bdf8";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(`Original Family: y = c·x^${familyPower}`, 20, 25);

      ctx.fillStyle = "#f59e0b";
      ctx.fillText(`Orthogonal Family: x² + ${familyPower}y² = C (Perpendicular at 90°)`, 20, 45);
    };

    const ctrl = document.getElementById(controlsId);
    if (ctrl) {
      ctrl.innerHTML = `
        <div class="sim-ctrl-row">
          <label><strong>Family Exponent (n):</strong></label>
          <select id="sim-ortho-n" class="form-select">
            <option value="3" selected>Cubic: y = c x³ (Orthogonal: x² + 3y² = C)</option>
            <option value="2">Quadratic: y = c x² (Orthogonal: x² + 2y² = C)</option>
            <option value="1">Linear: y = c x (Orthogonal: x² + y² = C circles)</option>
          </select>
        </div>
      `;

      ctrl.querySelector("#sim-ortho-n").onchange = (e) => {
        familyPower = parseInt(e.target.value);
        render();
      };
    }

    render();
  },

  /**
   * 3. Exact Potential Streamlines Contour Map
   */
  initExactPotentialSim(canvasId, controlsId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Potential function: Psi(x,y) = 2x^2 + 5xy + 3y^2
    const coordToPixel = (x, y) => {
      const px = ((x + 3) / 6) * canvas.width;
      const py = canvas.height - ((y + 3) / 6) * canvas.height;
      return { px, py };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const origin = coordToPixel(0, 0);

      // Axes
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, origin.py);
      ctx.lineTo(canvas.width, origin.py);
      ctx.moveTo(origin.px, 0);
      ctx.lineTo(origin.px, canvas.height);
      ctx.stroke();

      // Draw contour level curves Psi(x,y) = C
      const levels = [-6, -3, -1, 1, 3, 6, 10, 15];
      levels.forEach(C => {
        ctx.strokeStyle = C > 0 ? "rgba(16, 185, 129, 0.7)" : "rgba(239, 68, 68, 0.55)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        // 3y^2 + 5x y + (2x^2 - C) = 0
        // Quadratic formula in y: y = (-5x +- sqrt(25x^2 - 12(2x^2 - C))) / 6
        // Disc = 25x^2 - 24x^2 + 12C = x^2 + 12C
        [-1, 1].forEach(sign => {
          let started = false;
          for (let x = -2.8; x <= 2.8; x += 0.04) {
            const disc = x * x + 12 * C;
            if (disc >= 0) {
              const y = (-5 * x + sign * Math.sqrt(disc)) / 6;
              if (Math.abs(y) <= 3) {
                const p = coordToPixel(x, y);
                if (!started) { ctx.moveTo(p.px, p.py); started = true; }
                else { ctx.lineTo(p.px, p.py); }
              } else {
                started = false;
              }
            } else {
              started = false;
            }
          }
        });
        ctx.stroke();
      });

      ctx.fillStyle = "#10b981";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText("Exact Solution Level Contours: Ψ(x,y) = 2x² + 5xy + 3y² = C", 20, 25);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Along any trajectory, dΨ = M dx + N dy = 0 (Total Differential is Zero)", 20, 45);
    };

    render();
  }
};

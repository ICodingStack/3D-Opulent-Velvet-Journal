/**
 * ================================================================
 *  3D OPULENT VELVET JOURNAL — script.js  v2.0
 *  Author  : Opulent Studio
 *  License : MIT
 *
 *  Architecture:
 *  - ALL pages sit in pagesContainer, anchored at left-spine edge
 *  - Transform-origin: left center  →  rotateY(-180deg) = turned
 *  - z-index rule: unturned page i gets z = (TOTAL - i)
 *    so page 0 is on top of the unturned stack
 *  - currentPage tracks how many pages have been turned
 * ================================================================
 */

/* ── TIMING ────────────────────────────────────────────────────── */
const TURN_MS = 820;
const STAGGER_MS = 200;

/* ── GOLD / PAPER PALETTE + HELPERS ───────────────────────────── */
const G = {
  GOLD: "#C9A84C",
  GOLD_BRIGHT: "#E8C96A",
  GOLD_DIM: "#7A5C1E",
  GOLD_FOIL: "#F5DFA0",
  PAPER: "#F5EFE6",
  PAPER_WARM: "#FAF5EC",
  PAPER_DARK: "#E0D5C5",

  rule(ctx, x, y, w) {
    const g = ctx.createLinearGradient(x, y, x + w, y);
    g.addColorStop(0, "transparent");
    g.addColorStop(0.3, G.GOLD);
    g.addColorStop(0.7, G.GOLD);
    g.addColorStop(1, "transparent");
    ctx.save();
    ctx.strokeStyle = g;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.stroke();
    ctx.restore();
  },

  corner(ctx, x, y, size, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = G.GOLD_DIM;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, size);
    ctx.stroke();
    ctx.restore();
  },

  corners(ctx, w, h, pad = 12, s = 14) {
    G.corner(ctx, pad, pad, s, 0);
    G.corner(ctx, w - pad, pad, s, Math.PI / 2);
    G.corner(ctx, w - pad, h - pad, s, Math.PI);
    G.corner(ctx, pad, h - pad, s, -Math.PI / 2);
  },

  border(ctx, w, h, pad = 10) {
    ctx.save();
    ctx.strokeStyle = G.GOLD_DIM + "44";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
    ctx.restore();
  },

  pageNum(ctx, w, h, text) {
    const cx = w / 2;
    G.rule(ctx, cx - 36, h - 22, 72);
    ctx.save();
    ctx.fillStyle = G.GOLD_DIM;
    ctx.font = '400 9px "Cinzel",serif';
    ctx.textAlign = "center";
    ctx.fillText(text, cx, h - 10);
    ctx.restore();
  },
};

/* ════════════════════════════════════════════════════════════════
   ILLUSTRATIONS
   ════════════════════════════════════════════════════════════════ */

/* 1 — Golden Geometric */
function drawGoldenGeometric(ctx, w, h) {
  ctx.fillStyle = G.PAPER_WARM;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);
  const cx = w / 2,
    cy = h / 2;

  // Radial glow
  const gl = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 0.45);
  gl.addColorStop(0, "rgba(201,168,76,0.11)");
  gl.addColorStop(1, "transparent");
  ctx.fillStyle = gl;
  ctx.fillRect(0, 0, w, h);

  // Concentric hexagons
  [130, 100, 72, 50, 32, 18].forEach((r, i) => {
    ctx.beginPath();
    for (let j = 0; j < 6; j++) {
      const a = (Math.PI / 3) * j + (i % 2 ? Math.PI / 6 : 0);
      j === 0
        ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
        : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.strokeStyle = i < 2 ? G.GOLD : G.GOLD_DIM;
    ctx.lineWidth = i < 2 ? 0.8 : 0.5;
    ctx.stroke();
  });

  // Radial spokes
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI / 6) * i;
    const rg = ctx.createLinearGradient(
      cx,
      cy,
      cx + Math.cos(a) * 130,
      cy + Math.sin(a) * 130,
    );
    rg.addColorStop(0, G.GOLD + "bb");
    rg.addColorStop(1, "transparent");
    ctx.strokeStyle = rg;
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * 130, cy + Math.sin(a) * 130);
    ctx.stroke();
  }

  // Small diamonds at hex ring
  [130, 100].forEach((r) => {
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      ctx.save();
      ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = G.GOLD + "88";
      ctx.fillRect(-2, -2, 4, 4);
      ctx.restore();
    }
  });

  ctx.fillStyle = G.GOLD_BRIGHT;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();
  G.pageNum(ctx, w, h, "I");
}

/* 2 — Marble Reverie */
function drawMarblePage(ctx, w, h) {
  const mg = ctx.createLinearGradient(0, 0, w, h);
  mg.addColorStop(0, "#F0EBE2");
  mg.addColorStop(0.5, "#EDE7DC");
  mg.addColorStop(1, "#E2D8C8");
  ctx.fillStyle = mg;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);

  [
    [0, h * 0.2, w * 0.3, h * 0.1, w * 0.6, h * 0.3, w, h * 0.15, 0.22],
    [0, h * 0.55, w * 0.2, h * 0.7, w * 0.7, h * 0.45, w, h * 0.6, 0.18],
    [w * 0.1, 0, w * 0.4, h * 0.4, w * 0.5, h * 0.6, w * 0.9, h, 0.28],
    [w * 0.4, 0, w * 0.3, h * 0.3, w * 0.6, h * 0.6, w * 0.5, h, 0.15],
  ].forEach(([x1, y1, c1x, c1y, c2x, c2y, x2, y2, al]) => {
    const vg = ctx.createLinearGradient(x1, y1, x2, y2);
    vg.addColorStop(0, "rgba(201,168,76,0)");
    vg.addColorStop(0.3, `rgba(201,168,76,${al})`);
    vg.addColorStop(0.6, `rgba(245,223,160,${al * 1.2})`);
    vg.addColorStop(1, "rgba(201,168,76,0)");
    ctx.strokeStyle = vg;
    ctx.lineWidth = 0.8 + Math.random();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(c1x, c1y, c2x, c2y, x2, y2);
    ctx.stroke();
  });

  const cx = w / 2,
    cy = h / 2;
  ctx.strokeStyle = G.GOLD;
  ctx.lineWidth = 1;
  ctx.strokeRect(w * 0.15, h * 0.25, w * 0.7, h * 0.5);
  ctx.strokeStyle = G.GOLD_DIM + "44";
  ctx.lineWidth = 0.4;
  ctx.strokeRect(w * 0.17, h * 0.27, w * 0.66, h * 0.46);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = G.GOLD_BRIGHT;
  ctx.lineWidth = 0.8;
  ctx.strokeRect(-18, -18, 36, 36);
  ctx.restore();

  ctx.fillStyle = G.GOLD_BRIGHT;
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();
  G.pageNum(ctx, w, h, "II");
}

/* 3 — Celestial Bloom */
function drawFloralPage(ctx, w, h) {
  ctx.fillStyle = "#FAF6F0";
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);
  const cx = w / 2,
    cy = h / 2 - 8;

  function petal(a, len, wid, al) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(a);
    const pg = ctx.createLinearGradient(0, 0, 0, -len);
    pg.addColorStop(0, `rgba(201,168,76,${al})`);
    pg.addColorStop(0.6, `rgba(245,223,160,${al * 0.5})`);
    pg.addColorStop(1, "rgba(201,168,76,0)");
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.ellipse(0, -len / 2, wid, len / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  for (let i = 0; i < 12; i++) petal((Math.PI / 6) * i, 110, 14, 0.25);
  for (let i = 0; i < 8; i++)
    petal((Math.PI / 4) * i + Math.PI / 8, 70, 9, 0.38);
  for (let i = 0; i < 6; i++) petal((Math.PI / 3) * i, 42, 6, 0.55);

  ctx.strokeStyle = G.GOLD_DIM + "55";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * 115, cy + Math.sin(a) * 115);
    ctx.stroke();
  }

  ctx.strokeStyle = G.GOLD;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = G.GOLD_BRIGHT;
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.fillStyle = G.GOLD_DIM;
  ctx.textAlign = "center";
  ctx.font = 'italic 400 8px "Cormorant Garamond",serif';
  ctx.fillText("Celestial Bloom", cx, cy + 140);
  ctx.restore();
  G.pageNum(ctx, w, h, "III");
}

/* 4 — Sacred Geometry */
function drawSacredGeometry(ctx, w, h) {
  ctx.fillStyle = G.PAPER_WARM;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);
  const cx = w / 2,
    cy = h / 2,
    R = Math.min(w, h) * 0.38;

  const pos = [[0, 0]];
  for (let i = 0; i < 6; i++)
    pos.push([
      Math.cos((Math.PI / 3) * i) * R * 0.55,
      Math.sin((Math.PI / 3) * i) * R * 0.55,
    ]);
  for (let i = 0; i < 12; i++)
    pos.push([
      Math.cos((Math.PI / 6) * i) * R * 1.1,
      Math.sin((Math.PI / 6) * i) * R * 1.1,
    ]);

  ctx.strokeStyle = G.GOLD_DIM + "44";
  ctx.lineWidth = 0.4;
  pos.forEach(([ox, oy]) => {
    ctx.beginPath();
    ctx.arc(cx + ox, cy + oy, R * 0.55, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.strokeStyle = G.GOLD;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
  ctx.stroke();

  function tri(angle, r, col, lw) {
    ctx.strokeStyle = col;
    ctx.lineWidth = lw;
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = ((Math.PI * 2) / 3) * i + angle;
      i === 0
        ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
        : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.stroke();
  }
  tri(-Math.PI / 2, R * 1.2, G.GOLD_BRIGHT + "bb", 0.8);
  tri(-Math.PI / 2 + Math.PI, R * 1.2, G.GOLD + "bb", 0.8);
  tri(-Math.PI / 2, R * 0.7, G.GOLD + "88", 0.5);
  tri(-Math.PI / 2 + Math.PI, R * 0.7, G.GOLD_DIM + "88", 0.5);

  ctx.fillStyle = G.GOLD_BRIGHT;
  ctx.beginPath();
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
  ctx.fill();
  G.pageNum(ctx, w, h, "IV");
}

/* 5 — Midnight Aurora */
function drawAuroraPage(ctx, w, h) {
  ctx.fillStyle = "#EEE8DF";
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);

  [
    {
      y: h * 0.12,
      hy: h * 0.28,
      c1: "rgba(140,90,20,0.18)",
      c2: "rgba(201,168,76,0.06)",
    },
    {
      y: h * 0.36,
      hy: h * 0.26,
      c1: "rgba(201,168,76,0.20)",
      c2: "rgba(245,223,160,0.06)",
    },
    {
      y: h * 0.56,
      hy: h * 0.18,
      c1: "rgba(120,80,10,0.12)",
      c2: "transparent",
    },
    {
      y: h * 0.68,
      hy: h * 0.14,
      c1: "rgba(201,168,76,0.14)",
      c2: "transparent",
    },
  ].forEach((b) => {
    const bg = ctx.createLinearGradient(0, b.y, 0, b.y + b.hy);
    bg.addColorStop(0, b.c1);
    bg.addColorStop(1, b.c2);
    ctx.fillStyle = bg;
    ctx.fillRect(0, b.y, w, b.hy);
  });

  ctx.fillStyle = "rgba(60,35,8,0.1)";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.72);
  ctx.lineTo(w * 0.2, h * 0.66);
  ctx.lineTo(w * 0.5, h * 0.62);
  ctx.lineTo(w * 0.75, h * 0.65);
  ctx.lineTo(w, h * 0.7);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(245,223,160,${Math.random() * 0.4 + 0.1})`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * w,
      Math.random() * h * 0.55,
      Math.random() * 1.2 + 0.3,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  G.pageNum(ctx, w, h, "V");
}

/* 6 — Crystal Lattice */
function drawCrystalPage(ctx, w, h) {
  ctx.fillStyle = G.PAPER_WARM;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);
  const cols = 6,
    rows = 8,
    cw = w / cols,
    ch = h / rows;

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const x = c * cw + cw / 2,
        y = r * ch + ch / 2;
      const t = 1 - Math.hypot(x - w / 2, y - h / 2) / Math.hypot(w / 2, h / 2);
      ctx.strokeStyle = `rgba(201,168,76,${t * 0.5 + 0.05})`;
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.moveTo(x, y - ch * 0.45);
      ctx.lineTo(x + cw * 0.45, y);
      ctx.lineTo(x, y + ch * 0.45);
      ctx.lineTo(x - cw * 0.45, y);
      ctx.closePath();
      ctx.stroke();
      if (t > 0.5) {
        ctx.fillStyle = `rgba(201,168,76,${(t - 0.5) * 0.06})`;
        ctx.fill();
      }
    }

  const cx = w / 2,
    cy = h / 2,
    ds = 42;
  function facet(pts, al) {
    ctx.beginPath();
    pts.forEach(([px, py], i) =>
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py),
    );
    ctx.closePath();
    ctx.fillStyle = `rgba(245,223,160,${al})`;
    ctx.fill();
    ctx.strokeStyle = G.GOLD_BRIGHT;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
  facet(
    [
      [cx, cy - ds],
      [cx + ds * 0.7, cy],
      [cx, cy - ds * 0.3],
    ],
    0.12,
  );
  facet(
    [
      [cx, cy - ds],
      [cx - ds * 0.7, cy],
      [cx, cy - ds * 0.3],
    ],
    0.06,
  );
  facet(
    [
      [cx + ds * 0.7, cy],
      [cx, cy + ds],
      [cx, cy - ds * 0.3],
    ],
    0.18,
  );
  facet(
    [
      [cx - ds * 0.7, cy],
      [cx, cy + ds],
      [cx, cy - ds * 0.3],
    ],
    0.09,
  );
  facet(
    [
      [cx - ds * 0.7, cy],
      [cx + ds * 0.7, cy],
      [cx, cy + ds],
    ],
    0.22,
  );
  G.pageNum(ctx, w, h, "VI");
}

/* 7 — Velvet Horizon */
function drawHorizonPage(ctx, w, h) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#F0E8DA");
  bg.addColorStop(0.5, "#E8DCC8");
  bg.addColorStop(1, "#E2D4BE");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);
  const hy = h * 0.52,
    cx = w / 2;

  const hg = ctx.createLinearGradient(0, 0, w, 0);
  hg.addColorStop(0, "transparent");
  hg.addColorStop(0.2, G.GOLD + "aa");
  hg.addColorStop(0.8, G.GOLD_BRIGHT + "ee");
  hg.addColorStop(1, "transparent");
  ctx.fillStyle = hg;
  ctx.fillRect(w * 0.08, hy - 0.75, w * 0.84, 1.5);

  const sg = ctx.createRadialGradient(cx, hy, 0, cx, hy, 36);
  sg.addColorStop(0, G.GOLD_FOIL);
  sg.addColorStop(0.4, G.GOLD_BRIGHT);
  sg.addColorStop(0.8, G.GOLD + "44");
  sg.addColorStop(1, "transparent");
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(cx, hy, 36, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 1; i <= 6; i++) {
    const ry = hy + i * 10,
      rw = w * (0.32 - i * 0.04);
    ctx.strokeStyle = `rgba(201,168,76,${0.22 - i * 0.03})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(cx - rw, ry);
    ctx.lineTo(cx + rw, ry);
    ctx.stroke();
  }
  G.pageNum(ctx, w, h, "VII");
}

/* 8 — Royal Cartouche */
function drawCartouchePage(ctx, w, h) {
  ctx.fillStyle = G.PAPER_WARM;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);
  const cx = w / 2,
    cy = h / 2,
    cw = w * 0.58,
    ch = h * 0.54,
    cr = 26;
  const cl = cx - cw / 2,
    ct = cy - ch / 2;

  ctx.strokeStyle = G.GOLD_BRIGHT;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cl + cr, ct);
  ctx.lineTo(cl + cw - cr, ct);
  ctx.quadraticCurveTo(cl + cw, ct, cl + cw, ct + cr);
  ctx.lineTo(cl + cw, ct + ch - cr);
  ctx.quadraticCurveTo(cl + cw, ct + ch, cl + cw - cr, ct + ch);
  ctx.lineTo(cl + cr, ct + ch);
  ctx.quadraticCurveTo(cl, ct + ch, cl, ct + ch - cr);
  ctx.lineTo(cl, ct + cr);
  ctx.quadraticCurveTo(cl, ct, cl + cr, ct);
  ctx.closePath();
  ctx.stroke();

  ctx.strokeStyle = G.GOLD + "44";
  ctx.lineWidth = 0.4;
  ctx.strokeRect(cl - 7, ct - 7, cw + 14, ch + 14);

  ["✦ OPULENT ✦", "JOURNAL", "— MMXXV —"].forEach((line, i) => {
    ctx.fillStyle = i === 0 ? G.GOLD_BRIGHT : i === 1 ? G.GOLD : G.GOLD_DIM;
    ctx.font =
      i === 1
        ? '500 18px "Cinzel",serif'
        : i === 0
          ? '400 10px "Cinzel",serif'
          : 'italic 400 9px "Cormorant Garamond",serif';
    ctx.textAlign = "center";
    ctx.fillText(line, cx, cy - 16 + i * 22);
  });

  [
    [cl + 14, ct + 14],
    [cl + cw - 14, ct + 14],
    [cl + 14, ct + ch - 14],
    [cl + cw - 14, ct + ch - 14],
  ].forEach(([fx, fy]) => {
    ctx.fillStyle = G.GOLD_DIM + "99";
    ctx.font = "9px serif";
    ctx.textAlign = "center";
    ctx.fillText("◆", fx, fy + 4);
  });
  G.pageNum(ctx, w, h, "VIII");
}

/* 9 — Finale Mandala */
function drawFinalePage(ctx, w, h) {
  const fg = ctx.createRadialGradient(
    w / 2,
    h / 2,
    0,
    w / 2,
    h / 2,
    Math.max(w, h) * 0.7,
  );
  fg.addColorStop(0, "#F5EFE6");
  fg.addColorStop(0.6, "#EDE5D6");
  fg.addColorStop(1, "#E0D4C2");
  ctx.fillStyle = fg;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h);
  G.corners(ctx, w, h);
  const cx = w / 2,
    cy = h / 2 - 15;

  [130, 100, 75, 55, 38, 24].forEach((r, i) => {
    ctx.strokeStyle = i % 2 === 0 ? G.GOLD + "aa" : G.GOLD_DIM + "66";
    ctx.lineWidth = i < 2 ? 0.7 : 0.4;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(a);
    const pg = ctx.createLinearGradient(0, 0, 0, -100);
    pg.addColorStop(0, G.GOLD + "55");
    pg.addColorStop(1, "transparent");
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.ellipse(0, -55, 6, 55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.save();
  ctx.fillStyle = G.GOLD;
  ctx.font = '400 12px "Cinzel",serif';
  ctx.textAlign = "center";
  ctx.fillText("FINIS", cx, cy + 155);
  ctx.restore();
  G.rule(ctx, cx - 28, cy + 163, 56);
  G.pageNum(ctx, w, h, "IX");
}

/* Calligraphy back-face */
function drawCalligraphyPage(ctx, w, h, numeral, quote) {
  ctx.fillStyle = G.PAPER;
  ctx.fillRect(0, 0, w, h);
  const cg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
  cg.addColorStop(0, "rgba(201,168,76,0.04)");
  cg.addColorStop(1, "transparent");
  ctx.fillStyle = cg;
  ctx.fillRect(0, 0, w, h);
  G.border(ctx, w, h, 14);
  G.corners(ctx, w, h, 14, 12);
  const cx = w / 2;

  ctx.save();
  ctx.fillStyle = G.GOLD_DIM + "99";
  ctx.font = '300 28px "Cinzel",serif';
  ctx.textAlign = "center";
  ctx.fillText(numeral, cx, 52);
  ctx.restore();
  G.rule(ctx, cx - 45, 62, 90);

  const lines = quote.split("\n"),
    lineH = 28;
  const startY = h / 2 - ((lines.length - 1) * lineH) / 2;
  lines.forEach((line, i) => {
    ctx.save();
    ctx.fillStyle = G.GOLD_DIM;
    ctx.font = `italic 300 ${i === 0 ? 13 : 11}px "Cormorant Garamond",serif`;
    ctx.textAlign = "center";
    ctx.fillText(line.trim(), cx, startY + i * lineH);
    ctx.restore();
  });
  G.rule(ctx, cx - 28, startY + lines.length * lineH + 10, 56);
  ctx.save();
  ctx.fillStyle = G.GOLD + "88";
  ctx.font = "10px serif";
  ctx.textAlign = "center";
  ctx.fillText("✦", cx, startY + lines.length * lineH + 26);
  ctx.restore();
}

/* ── PAGE DEFINITIONS ──────────────────────────────────────────── */
const PAGES = [
  {
    drawFront: drawGoldenGeometric,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "I",
        "In the beginning\nwas silence\nand gold.",
      ),
  },
  {
    drawFront: drawMarblePage,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "II",
        "Beneath the surface\nlies infinite depth\nwaiting to be found.",
      ),
  },
  {
    drawFront: drawFloralPage,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "III",
        "Every petal\na universe,\nevery thorn a truth.",
      ),
  },
  {
    drawFront: drawSacredGeometry,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "IV",
        "The cosmos folds\ninto perfect angles\nthat the eye cannot forget.",
      ),
  },
  {
    drawFront: drawAuroraPage,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "V",
        "Light bends,\ncolour bleeds,\nnight speaks in colour.",
      ),
  },
  {
    drawFront: drawCrystalPage,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "VI",
        "Precision is its own\nform of poetry\nwritten in sharp lines.",
      ),
  },
  {
    drawFront: drawHorizonPage,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "VII",
        "Where the sky meets\nthe earth,\ngold is the only word.",
      ),
  },
  {
    drawFront: drawCartouchePage,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "VIII",
        "Every name\ndeserves\na gilded frame.",
      ),
  },
  {
    drawFront: drawFinalePage,
    drawBack: (c, w, h) =>
      drawCalligraphyPage(
        c,
        w,
        h,
        "Fin",
        "Carry the beauty\nyou found here\ninto the ordinary world.",
      ),
  },
];
const TOTAL = PAGES.length;

/* ── STATE ─────────────────────────────────────────────────────── */
let currentPage = 0; // number of pages turned (0 = all on right / cover showing)
let animating = false;
let dragStartX = 0;
let dragDeltaX = 0;
let dragging = false;

/* ── DOM REFS ──────────────────────────────────────────────────── */
const particleCanvas = document.getElementById("dust");
const mouseLight = document.getElementById("spotlight");
const journalBook = document.getElementById("book");
const pagesContainer = document.getElementById("pages");
const prevBtn = document.getElementById("btnPrev");
const nextBtn = document.getElementById("btnNext");
const progressDots = document.getElementById("dots");
const currentPageEl = document.getElementById("pgCurrent");
const totalPagesEl = document.getElementById("pgTotal");

/* ── PARTICLE SYSTEM ───────────────────────────────────────────── */
(function startParticles() {
  if (!particleCanvas) {
    console.warn("Particle canvas not found");
    return;
  }
  const ctx = particleCanvas.getContext("2d");
  const N = 70;
  let pts = [];
  function resize() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  function mkPt() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.05,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.3 + 0.08),
      life: Math.random(),
      spd: Math.random() * 0.0015 + 0.0008,
    };
  }
  for (let i = 0; i < N; i++) pts.push(mkPt());
  function loop() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    pts.forEach((p) => {
      p.life += p.spd;
      if (p.life > 1) {
        Object.assign(p, mkPt());
        p.y = particleCanvas.height + 5;
        p.life = 0;
        return;
      }
      const fade =
        p.life < 0.12 ? p.life / 0.12 : p.life > 0.88 ? (1 - p.life) / 0.12 : 1;
      p.x += p.vx + Math.sin(p.life * Math.PI * 3) * 0.12;
      p.y += p.vy;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0, `rgba(245,223,160,${p.alpha * fade})`);
      g.addColorStop(0.4, `rgba(201,168,76,${p.alpha * fade * 0.4})`);
      g.addColorStop(1, "rgba(201,168,76,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  resize();
  window.addEventListener("resize", resize);
  loop();
})();

/* ── MOUSE LIGHT ───────────────────────────────────────────────── */
document.addEventListener("mousemove", (e) => {
  mouseLight.style.left = e.clientX + "px";
  mouseLight.style.top = e.clientY + "px";
});

/* ── GET PAGE SIZE FROM CSS VARS ───────────────────────────────── */
function getPageSize() {
  const cs = getComputedStyle(document.documentElement);
  const w = parseInt(cs.getPropertyValue("--page-w")) || 310;
  const h = parseInt(cs.getPropertyValue("--page-h")) || 420;
  return { w, h };
}

/* ════════════════════════════════════════════════════════════════
   BUILD PAGES
   ════════════════════════════════════════════════════════════════ */
function buildPages() {
  const { w, h } = getPageSize();
  totalPagesEl.textContent = TOTAL;

  // Progress dots
  progressDots.innerHTML = "";
  for (let i = 0; i <= TOTAL; i++) {
    const d = document.createElement("div");
    d.className = "progress-dot" + (i === 0 ? " active" : "");
    d.dataset.idx = i;
    d.addEventListener("click", () => jumpTo(parseInt(d.dataset.idx)));
    progressDots.appendChild(d);
  }

  // Pages: index 0 = top of right stack (first to turn)
  PAGES.forEach((pd, i) => {
    const page = document.createElement("div");
    page.className = "page";
    page.id = "page-" + i;
    // z-index: page 0 is highest (it's on top / first visible)
    page.style.zIndex = TOTAL - i;

    // Front face (right-hand page — visible when unturned)
    const front = document.createElement("div");
    front.className = "page-front";
    const fc = document.createElement("canvas");
    fc.className = "page-canvas";
    fc.width = w;
    fc.height = h;
    pd.drawFront(fc.getContext("2d"), w, h);
    front.appendChild(fc);
    page.appendChild(front);

    // Back face (left-hand page — visible after turn)
    const back = document.createElement("div");
    back.className = "page-back";
    const bc = document.createElement("canvas");
    bc.className = "page-canvas";
    bc.width = w;
    bc.height = h;
    pd.drawBack(bc.getContext("2d"), w, h);
    back.appendChild(bc);
    page.appendChild(back);

    pagesContainer.appendChild(page);
  });

  // Drag hint
  const hint = document.createElement("p");
  hint.className = "drag-hint";
  hint.textContent = "Drag or use arrows to turn pages";
  journalBook.appendChild(hint);

  syncUI();
}

/* ════════════════════════════════════════════════════════════════
   TURN ENGINE
   - All pages share transform-origin: left center (set in CSS)
   - Forward:  rotateY(-180deg)  (page swings left)
   - Backward: rotateY(0deg)     (page swings back right)
   ════════════════════════════════════════════════════════════════ */
function turnForward() {
  if (animating || currentPage >= TOTAL) return;
  animating = true;

  const page = document.getElementById("page-" + currentPage);

  // 1. Float on top
  page.style.zIndex = TOTAL + 20;

  // 2. Add transition, then trigger turn on next paint
  page.style.transition = `transform ${TURN_MS}ms cubic-bezier(0.645,0.045,0.355,1.000)`;

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      page.style.transform = "rotateY(-180deg)";

      setTimeout(() => {
        // Settle into left stack (turned pages have low z)
        page.style.zIndex = currentPage + 1;
        page.style.transition = "";
        currentPage++;
        animating = false;
        syncUI();
      }, TURN_MS + 30);
    }),
  );
}

function turnBackward() {
  if (animating || currentPage <= 0) return;
  animating = true;

  const idx = currentPage - 1;
  const page = document.getElementById("page-" + idx);

  page.style.zIndex = TOTAL + 20;
  page.style.transition = `transform ${TURN_MS}ms cubic-bezier(0.645,0.045,0.355,1.000)`;

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      page.style.transform = ""; // back to 0 = unturned

      setTimeout(() => {
        page.style.zIndex = TOTAL - idx;
        page.style.transition = "";
        currentPage--;
        animating = false;
        syncUI();
      }, TURN_MS + 30);
    }),
  );
}

function jumpTo(target) {
  if (animating) return;
  target = Math.max(0, Math.min(TOTAL, target));
  if (target === currentPage) return;
  const dir = target > currentPage ? 1 : -1;
  const steps = Math.abs(target - currentPage);
  let done = 0;
  function step() {
    if (done >= steps) return;
    dir > 0 ? turnForward() : turnBackward();
    done++;
    if (done < steps) setTimeout(step, STAGGER_MS);
  }
  step();
}

/* ── SYNC UI ───────────────────────────────────────────────────── */
function syncUI() {
  currentPageEl.textContent = currentPage;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === TOTAL;
  document.querySelectorAll(".progress-dot").forEach((d) => {
    d.classList.toggle("active", parseInt(d.dataset.idx) === currentPage);
  });
}

/* ── CONTROLS ──────────────────────────────────────────────────── */
nextBtn.addEventListener("click", () => {
  if (!animating) turnForward();
});
prevBtn.addEventListener("click", () => {
  if (!animating) turnBackward();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown") turnForward();
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") turnBackward();
});

// Click on right half of book = forward; left half = backward
journalBook.addEventListener("click", (e) => {
  if (Math.abs(dragDeltaX) > 8) return; // was a drag
  const rect = journalBook.getBoundingClientRect();
  e.clientX - rect.left > rect.width / 2 ? turnForward() : turnBackward();
});

// Drag / swipe
const DRAG_THR = 45;
function dStart(e) {
  if (animating) return;
  dragging = true;
  dragDeltaX = 0;
  dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
}
function dMove(e) {
  if (!dragging) return;
  dragDeltaX = (e.touches ? e.touches[0].clientX : e.clientX) - dragStartX;
}
function dEnd() {
  if (!dragging) return;
  dragging = false;
  if (dragDeltaX < -DRAG_THR) turnForward();
  else if (dragDeltaX > DRAG_THR) turnBackward();
}

journalBook.addEventListener("mousedown", dStart);
journalBook.addEventListener("touchstart", dStart, { passive: true });
window.addEventListener("mousemove", dMove);
window.addEventListener("touchmove", dMove, { passive: true });
window.addEventListener("mouseup", dEnd);
window.addEventListener("touchend", dEnd);

/* ── INIT ──────────────────────────────────────────────────────── */
(function init() {
  buildPages();

  // Entrance animation
  journalBook.style.opacity = "0";
  journalBook.style.transform = "translateY(24px) rotateX(8deg)";
  journalBook.style.transition =
    "opacity 1.2s ease, transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)";
  setTimeout(() => {
    journalBook.style.opacity = "1";
    journalBook.style.transform = "";
    setTimeout(() => {
      journalBook.style.transition = "";
    }, 1300);
  }, 350);
})();

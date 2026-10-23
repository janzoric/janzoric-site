// Easter egg: "Ujemi šopek" (catch the bouquet).
// Loaded only when someone clicks the JAN. logo 5× on the homepage or "[dolgčas mi je]".
// The bride throws bouquets from the top; move the bridesmaid to catch them.
// Golden bouquet = +5, flying shoe = lose a life. Three misses and it's over.
(() => {
  if (window.openSopek) return;

  const INK = "#121212", PAPER = "#FFFDF7";
  const HAND = '"Shadows Into Light Two", "Bradley Hand", cursive';
  const BLOOMS = ["#F1E5C9", "#E9B9BC", "#F4D9A6", "#FFFFFF"];

  let dialog, canvas, intro, ctx, W, H, dpr, raf = 0, last = 0;
  let state;

  const best = {
    get() { try { return +localStorage.getItem("sopek-rekord") || 0; } catch { return 0; } },
    set(v) { try { localStorage.setItem("sopek-rekord", String(v)); } catch {} },
  };

  function build() {
    dialog = document.createElement("dialog");
    dialog.className = "egg";
    dialog.setAttribute("aria-label", "Igra: Ujemi šopek");
    dialog.innerHTML = `
      <div class="egg__bar">
        <p class="egg__title">UJEMI ŠOPEK</p>
        <button class="egg__close" type="button">[zapri]</button>
      </div>
      <div class="egg__stage">
        <canvas class="egg__canvas" tabindex="0" aria-label="Igralno polje. Premikaj se s puščicama levo in desno, z miško ali prstom."></canvas>
        <div class="egg__intro">
          <p class="egg__lead">Nevesta meče šopke. Ti ujemi čim več.</p>
          <ul class="egg__rules">
            <li>Družico premikaš s puščicama <b>← →</b>, z miško ali s prstom.</li>
            <li><b>Šopek</b> +1</li>
            <li><b>Zlati šopek</b> +5</li>
            <li><b>Čevelj</b> – ne lovi ga. Boli.</li>
            <li>Trije šopki na tleh in je konec.</li>
          </ul>
          <p class="egg__best"></p>
          <button class="egg__start" type="button">ZAČNI</button>
        </div>
      </div>
      <p class="egg__help">← → ali miška / prst. Zlati šopek +5. Čevelj boli.</p>`;
    document.body.append(dialog);
    canvas = dialog.querySelector("canvas");
    intro = dialog.querySelector(".egg__intro");
    dialog.querySelector(".egg__start").addEventListener("click", start);
    ctx = canvas.getContext("2d");
    dialog.querySelector(".egg__close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", stop);

    // Controls
    const keys = new Set();
    dialog.addEventListener("keydown", (e) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) { keys.add(e.key); e.preventDefault(); }
      if ((e.key === " " || e.key === "Enter") && state.started && state.over) { reset(); state.started = true; e.preventDefault(); }
    });
    dialog.addEventListener("keyup", (e) => keys.delete(e.key));
    state = { keys };
    const toX = (clientX) => {
      const r = canvas.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * W;
    };
    canvas.addEventListener("pointermove", (e) => { state.target = toX(e.clientX); });
    canvas.addEventListener("pointerdown", (e) => {
      if (!state.started) return;
      if (state.over) { reset(); state.started = true; return; }
      state.target = toX(e.clientX);
      canvas.setPointerCapture?.(e.pointerId);
    });
    window.addEventListener("resize", () => dialog.open && size());
  }

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.min(720, window.innerWidth - 32);
    H = Math.min(560, window.innerHeight - 150);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function reset() {
    Object.assign(state, {
      x: W / 2, target: null, items: [], score: 0, lives: 3,
      spawnIn: 600, over: false, newBest: false, throwAnim: 0, flash: 0, started: false,
    });
  }

  function spawn() {
    const r = Math.random();
    const type = r < 0.08 ? "gold" : r < 0.24 + Math.min(state.score, 40) * 0.003 ? "shoe" : "bouquet";
    const speedUp = 1 + Math.min(state.score, 60) / 45;
    state.items.push({
      type,
      x: W / 2 + (Math.random() - 0.5) * 30,
      y: 64,
      vx: (Math.random() - 0.5) * W * 0.9,
      vy: -(120 + Math.random() * 160),
      g: 330 * speedUp,
      spin: (Math.random() - 0.5) * 6,
      a: 0,
    });
    state.throwAnim = 1;
    state.spawnIn = Math.max(380, 1150 - state.score * 18) * (0.75 + Math.random() * 0.5);
  }

  function update(dt) {
    const s = state;
    if (!s.started || s.over) return;
    // Bridesmaid movement
    const speed = 520;
    if (s.keys.has("ArrowLeft") || s.keys.has("a")) s.target = null, s.x -= speed * dt;
    if (s.keys.has("ArrowRight") || s.keys.has("d")) s.target = null, s.x += speed * dt;
    if (s.target != null) s.x += (s.target - s.x) * Math.min(1, dt * 14);
    s.x = Math.max(40, Math.min(W - 40, s.x));

    s.spawnIn -= dt * 1000;
    if (s.spawnIn <= 0) spawn();
    s.throwAnim = Math.max(0, s.throwAnim - dt * 3);
    s.flash = Math.max(0, s.flash - dt * 2.5);

    const catchY = H - 92;
    for (const it of s.items) {
      it.vy += it.g * dt; it.x += it.vx * dt; it.y += it.vy * dt; it.a += it.spin * dt;
      if (it.x < 16 || it.x > W - 16) { it.vx *= -0.8; it.x = Math.max(16, Math.min(W - 16, it.x)); }
      if (!it.done && it.vy > 0 && it.y > catchY - 14 && it.y < catchY + 22 && Math.abs(it.x - s.x) < 46) {
        it.done = true;
        if (it.type === "shoe") { s.lives--; s.flash = 1; }
        else s.score += it.type === "gold" ? 5 : 1;
      }
      if (!it.done && it.y > H + 30) {
        it.done = true;
        if (it.type !== "shoe") { s.lives--; s.flash = 1; }
      }
    }
    s.items = s.items.filter((it) => !it.done);
    if (s.lives <= 0) {
      s.over = true;
      if (s.score > best.get()) { best.set(s.score); s.newBest = true; }
    }
  }

  // ----- drawing (ink on paper, like the rest of the site) -----
  function line(w = 2.2) { ctx.strokeStyle = INK; ctx.lineWidth = w; ctx.lineCap = "round"; ctx.lineJoin = "round"; }

  function bride() {
    const x = W / 2, y = 40, t = state.throwAnim;
    line();
    ctx.beginPath(); ctx.arc(x, y - 18, 9, 0, Math.PI * 2); ctx.stroke();          // head
    ctx.beginPath(); ctx.moveTo(x - 4, y - 26); ctx.quadraticCurveTo(x - 30, y - 6, x - 22, y + 30); ctx.stroke(); // veil
    ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.lineTo(x - 18, y + 30); ctx.lineTo(x + 18, y + 30); ctx.closePath();
    ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke();                               // dress
    const arm = -1.2 - t * 1.2;                                                   // throwing arm
    ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x + Math.cos(arm) * 22, y - 4 + Math.sin(arm) * 22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x - 16, y + 8); ctx.stroke();
  }

  function bridesmaid() {
    const x = state.x, y = H - 70;
    line();
    ctx.beginPath(); ctx.arc(x, y - 30, 10, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x - 22, y + 30); ctx.lineTo(x + 22, y + 30); ctx.closePath();
    ctx.fillStyle = "#EFE7D7"; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 4, y - 14); ctx.lineTo(x - 30, y - 42); ctx.moveTo(x + 4, y - 14); ctx.lineTo(x + 30, y - 42); ctx.stroke(); // arms up
    ctx.beginPath(); ctx.moveTo(x - 9, y + 30); ctx.lineTo(x - 11, y + 44); ctx.moveTo(x + 9, y + 30); ctx.lineTo(x + 11, y + 44); ctx.stroke();
  }

  function bouquet(it) {
    ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(it.a);
    line(1.6);
    ctx.beginPath(); ctx.moveTo(-3, 6); ctx.lineTo(-2, 26); ctx.moveTo(3, 6); ctx.lineTo(2, 26); ctx.stroke();  // stems
    ctx.fillStyle = "#8A9873";
    ctx.beginPath(); ctx.ellipse(-12, 6, 8, 4, -0.5, 0, Math.PI * 2); ctx.ellipse(12, 6, 8, 4, 0.5, 0, Math.PI * 2); ctx.fill();
    const gold = it.type === "gold";
    [[-8, -2], [8, -2], [0, -9], [0, 3], [-12, -9], [12, -9]].forEach(([dx, dy], i) => {
      ctx.fillStyle = gold ? "#E2A23B" : BLOOMS[i % BLOOMS.length];
      ctx.beginPath(); ctx.arc(dx, dy, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });
    ctx.restore();
  }

  function shoe(it) {
    ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(it.a);
    line(1.8); ctx.fillStyle = "#FFFFFF";
    ctx.beginPath(); ctx.moveTo(-16, 4); ctx.quadraticCurveTo(-12, -10, 2, -4); ctx.lineTo(16, 2); ctx.quadraticCurveTo(18, 8, 10, 8);
    ctx.lineTo(-14, 8); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, 8); ctx.lineTo(-15, 18); ctx.stroke();       // heel
    ctx.restore();
  }

  function hud() {
    ctx.fillStyle = INK; ctx.font = `26px ${HAND}`; ctx.textAlign = "left";
    ctx.fillText(`UJETIH: ${state.score}`, 18, 34);
    ctx.textAlign = "right";
    ctx.fillText(`REKORD: ${Math.max(best.get(), state.score)}`, W - 18, 34);
    for (let i = 0; i < 3; i++) {                                                 // lives as little circles
      line(1.6); ctx.beginPath(); ctx.arc(W - 26 - i * 18, 52, 6, 0, Math.PI * 2);
      if (i < state.lives) { ctx.fillStyle = INK; ctx.fill(); }
      ctx.stroke();
    }
  }

  function overScreen() {
    ctx.fillStyle = "rgba(255,253,247,.86)"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = INK; ctx.textAlign = "center";
    ctx.font = `40px ${HAND}`;
    ctx.fillText("ŠOPEK JE PRISTAL NA TLEH.", W / 2, H / 2 - 30);
    ctx.font = `28px ${HAND}`;
    ctx.fillText(state.newBest ? `NOV REKORD: ${state.score}!` : `UJETIH: ${state.score}`, W / 2, H / 2 + 12);
    ctx.font = `22px ${HAND}`;
    ctx.fillText("KLIKNI ALI PRITISNI PRESLEDNICO ZA ŠE ENO POROKO.", W / 2, H / 2 + 52);
  }

  function draw() {
    ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
    if (state.flash) { ctx.fillStyle = `rgba(160,44,28,${state.flash * 0.12})`; ctx.fillRect(0, 0, W, H); }
    line(1); ctx.globalAlpha = 0.25;                                              // floor
    ctx.beginPath(); ctx.moveTo(0, H - 24); ctx.lineTo(W, H - 24); ctx.stroke(); ctx.globalAlpha = 1;
    bride();
    state.items.forEach((it) => (it.type === "shoe" ? shoe(it) : bouquet(it)));
    bridesmaid();
    hud();
    if (state.over) overScreen();
  }

  function loop(t) {
    const dt = Math.min(0.033, (t - last) / 1000 || 0);
    last = t;
    update(dt); draw();
    raf = requestAnimationFrame(loop);
  }

  function stop() { cancelAnimationFrame(raf); raf = 0; }

  // Rules screen first; the game waits for ZAČNI.
  function start() {
    reset();
    state.started = true;
    intro.hidden = true;
    canvas.focus();
  }

  window.openSopek = async () => {
    if (!dialog) build();
    try { await document.fonts.load(`26px ${HAND}`); } catch {}
    dialog.showModal();
    size(); reset();
    const rekord = best.get();
    dialog.querySelector(".egg__best").textContent = rekord ? `Tvoj rekord: ${rekord}` : "";
    intro.hidden = false;
    dialog.querySelector(".egg__start").focus();
    last = performance.now();
    if (!raf) raf = requestAnimationFrame(loop);
  };
})();

// Portfolio page: lightbox. (Row layout lives in _includes/justify.njk so it runs immediately.)
(() => {
  // ---------------------------------------------------------------------------
  // Lightbox: click a photo to see it large, arrows / swipe to browse.
  const dialog = document.querySelector(".lightbox");
  const buttons = [...document.querySelectorAll(".g-open")];
  if (!dialog || !buttons.length || typeof dialog.showModal !== "function") return;

  const img = dialog.querySelector(".lightbox__img");
  const count = dialog.querySelector(".lightbox__count");
  let current = 0;
  let opener = null;

  // Use the same responsive files as the page (largest WebP the screen needs).
  const show = (i) => {
    current = (i + buttons.length) % buttons.length;
    const picture = buttons[current].querySelector("picture") || buttons[current];
    const webp = picture.querySelector('source[type="image/webp"]');
    const fallback = picture.querySelector("img");
    img.srcset = webp ? webp.srcset : fallback.srcset;
    img.sizes = "100vw";
    img.src = fallback.src;
    img.alt = fallback.alt;
    count.textContent = `${current + 1} / ${buttons.length}`;
  };

  buttons.forEach((btn, i) => btn.addEventListener("click", () => {
    opener = btn;
    show(i);
    dialog.showModal();
  }));

  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
  dialog.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));
  // Wait a tick: the browser moves focus itself when a dialog closes.
  dialog.addEventListener("close", () => setTimeout(() => opener?.focus(), 0));

  // Click on the empty area closes.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Swipe on phones.
  let startX = null;
  dialog.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();

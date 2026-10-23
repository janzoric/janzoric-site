// Small enhancements for every page. The site works without this file.
(() => {
  // Folder this script was loaded from (works on a temporary /repo/ address too).
  const jsBase = (document.currentScript?.src || "/js/main.js").replace(/main\.js.*$/, "");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile menu ------------------------------------------------------------
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    const setOpen = (open) => {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Gentle reveal on scroll -----------------------------------------------
  // Only elements that start below the first screen fade in.
  const revealables = [...document.querySelectorAll("[data-reveal]")]
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealables.forEach((el) => el.classList.add("will-reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealables.forEach((el) => io.observe(el));
  }

  // Short videos: play silently while visible, [zvok] toggles sound ----------
  document.querySelectorAll(".clip").forEach((clip) => {
    const video = clip.querySelector("video");
    const sound = clip.querySelector(".clip__sound");
    if (!video) return;

    if (reduceMotion) {
      video.controls = true; // no autoplay – let people press play themselves
    } else if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }, { threshold: 0.4 }).observe(video);
    }

    sound?.addEventListener("click", () => {
      video.muted = !video.muted;
      sound.setAttribute("aria-pressed", String(!video.muted));
      if (video.paused) video.play().catch(() => {});
    });
  });

  // Easter egg: 5 clicks on JAN. on the homepage, or "[dolgčas mi je]" ----------
  const playGame = () => {
    if (window.openSopek) return window.openSopek();
    const s = document.createElement("script");
    s.src = jsBase + "sopek.js";
    s.onload = () => window.openSopek?.();
    document.head.append(s);
  };
  document.querySelectorAll("[data-egg]").forEach((b) => b.addEventListener("click", playGame));
  const logo = document.querySelector(".wordmark");
  if (logo && document.body.classList.contains("page-home")) {
    let clicks = 0, timer = 0;
    logo.addEventListener("click", (e) => {
      e.preventDefault(); // already on the homepage – nothing to navigate to
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => (clicks = 0), 2500);
      if (clicks >= 5) { clicks = 0; playGame(); }
    });
  }

  // Contact form -----------------------------------------------------------
  const form = document.querySelector(".contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    const button = form.querySelector(".send-btn");

    // Package chosen on the IZBIRA page (?paket=MIDI) travels with the message.
    const paket = new URLSearchParams(location.search).get("paket");
    if (paket) form.elements.paket.value = paket;

    const messages = {
      ime: "Kako vama je ime?",
      email: "Brez emaila vama težko odpišem.",
      emailFormat: "Ta email naslov ne izgleda čisto prav.",
      sporocilo: "Napišita mi vsaj nekaj.",
      datum: "Datum vpišita kot DD.MM.LLLL.",
    };

    const setError = (field, text) => {
      const err = form.querySelector(`#${field.id}-err`);
      field.setAttribute("aria-invalid", text ? "true" : "false");
      if (text) field.setAttribute("aria-describedby", `${field.id}-err`);
      else field.removeAttribute("aria-describedby");
      if (err) err.textContent = text || "";
    };

    const validate = () => {
      let firstBad = null;
      const check = (field, text) => {
        setError(field, text);
        if (text && !firstBad) firstBad = field;
      };
      const { ime, email, datum, sporocilo } = form.elements;
      check(ime, ime.value.trim() ? "" : messages.ime);
      check(email, !email.value.trim() ? messages.email : email.validity.typeMismatch ? messages.emailFormat : "");
      check(datum, !datum.value.trim() || /^\d{1,2}\.\s?\d{1,2}\.\s?\d{4}$/.test(datum.value.trim()) ? "" : messages.datum);
      check(sporocilo, sporocilo.value.trim() ? "" : messages.sporocilo);
      return firstBad;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      const firstBad = validate();
      if (firstBad) {
        firstBad.focus();
        return;
      }

      if (!form.getAttribute("action")) {
        status.classList.add("form-status--error");
        status.textContent = "Obrazec še ni povezan (manjka formEndpoint v site.json).";
        return;
      }

      button.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.classList.add("form-status--ok");
        status.textContent = "Hvala! Sporočilo je prišlo do mene. Odpišem čim prej.";
      } catch {
        status.classList.add("form-status--error");
        status.textContent = "Nekaj se je zalomilo in sporočilo ni šlo skozi. Poskusita še enkrat čez minutko.";
      } finally {
        button.disabled = false;
      }
    });
  }
})();

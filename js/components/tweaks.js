/* ===============================================
   TWEAKS PANEL — theme / density / frames
   =============================================== */

(function () {
  const panel = document.getElementById("tweaks-panel");
  if (!panel) return;

  const toggle = document.getElementById("tweaks-toggle");
  const close = document.getElementById("tweaks-close");
  const body = document.body;

  const STORAGE = "portfolio.tweaks.v1";

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE)) || {};
    } catch {
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(state));
    } catch {}
  }

  const state = Object.assign(
    { theme: "amber", density: "dense", frame: "device" },
    loadState(),
  );

  function apply() {
    body.setAttribute("data-theme", state.theme);
    body.setAttribute("data-density", state.density);
    body.setAttribute("data-frame", state.frame);

    panel.querySelectorAll(".swatch").forEach((el) => {
      el.classList.toggle("active", el.dataset.theme === state.theme);
      el.setAttribute(
        "aria-checked",
        el.dataset.theme === state.theme ? "true" : "false",
      );
    });
    panel.querySelectorAll(".seg[data-density]").forEach((el) => {
      el.classList.toggle("active", el.dataset.density === state.density);
    });
    panel.querySelectorAll(".seg[data-frame]").forEach((el) => {
      el.classList.toggle("active", el.dataset.frame === state.frame);
    });
  }

  toggle?.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  close?.addEventListener("click", () => {
    panel.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!panel.classList.contains("open")) return;
    if (!panel.contains(e.target)) {
      panel.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });

  // Swatches (theme)
  panel.querySelectorAll(".swatch").forEach((el) => {
    el.addEventListener("click", () => {
      state.theme = el.dataset.theme;
      saveState(state);
      apply();
    });
  });

  // Density
  panel.querySelectorAll(".seg[data-density]").forEach((el) => {
    el.addEventListener("click", () => {
      state.density = el.dataset.density;
      saveState(state);
      apply();
    });
  });

  // Frames
  panel.querySelectorAll(".seg[data-frame]").forEach((el) => {
    el.addEventListener("click", () => {
      state.frame = el.dataset.frame;
      saveState(state);
      apply();
    });
  });

  apply();
})();

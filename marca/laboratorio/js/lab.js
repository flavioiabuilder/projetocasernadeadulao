/**
 * Laboratório marca PCA — nav current, reveal, motion demos.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce) {
    document.documentElement.classList.add("enhance-reveal");
  }

  // Mark current nav item from pathname
  var path = (window.location.pathname || "").replace(/\\/g, "/");
  var file = path.split("/").pop() || "index.html";
  document.querySelectorAll(".lab-nav a[href]").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var target = href.split("/").pop();
    if (target === file || (file === "" && target === "index.html")) {
      a.setAttribute("aria-current", "page");
    }
  });

  // Scroll reveal
  if (!reduce && "IntersectionObserver" in window) {
    var nodes = document.querySelectorAll("[data-reveal]");
    nodes.forEach(function (el) {
      el.classList.add("lab-reveal");
      var i = el.getAttribute("data-i");
      if (i != null) el.style.setProperty("--reveal-i", i);
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  // Motion demo replay
  document.querySelectorAll("[data-replay-enter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sel = btn.getAttribute("data-replay-enter");
      var box = sel ? document.querySelector(sel) : null;
      if (!box) return;
      box.classList.remove("is-enter");
      void box.offsetWidth;
      if (!reduce) box.classList.add("is-enter");
    });
  });
})();

(() => {
  const KNOWN = [
    "THREE",
    "gsap",
    "ScrollTrigger",
    "Lenis",
    "PIXI",
    "OGL",
    "__THREE_DEVTOOLS__",
    "ReactCurrentDispatcher",
    "__REACT_DEVTOOLS_GLOBAL_HOOK__",
    "anime",
    "ScrollMagic",
    "barba",
    "locomotiveScroll",
    "Lottie",
    "createjs",
    "BABYLON",
  ];

  const globalsPresent = [];
  const globalsAbsent = [];
  for (const k of KNOWN) {
    let present = false;
    try {
      present = typeof window[k] !== "undefined" && window[k] != null;
    } catch {
      present = false;
    }
    if (present) globalsPresent.push(k);
    else globalsAbsent.push(k);
  }

  /**
   * Detecta tipo SEM chamar getContext (evita recriar / clobber).
   * Heurísticas: propriedades internas não-padrão, atributos data, className, renderer hints.
   */
  function detectContextWithoutRecreate(canvas) {
    const hints = {
      webglLikely: false,
      canvas2dLikely: false,
      bitmapLikely: false,
      evidence: [],
      method: "no-getContext",
    };
    const cls = String(canvas.className || "");
    const id = String(canvas.id || "");
    const attrs = [...canvas.attributes].map((a) => `${a.name}=${a.value}`).join(" ");
    if (/webgl|three|ogl|babylon|gpu/i.test(`${cls} ${id} ${attrs}`)) {
      hints.webglLikely = true;
      hints.evidence.push("class/id/attr mention webgl|three|…");
    }
    if (/2d|chart|konva|fabric/i.test(`${cls} ${id}`)) {
      hints.canvas2dLikely = true;
      hints.evidence.push("class/id mention 2d|chart|…");
    }
    // drawingBuffer sizing often set by WebGL apps to width*dpr
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width > 0 && canvas.clientWidth > 0) {
      const ratio = canvas.width / canvas.clientWidth;
      if (Math.abs(ratio - dpr) < 0.15 || Math.abs(ratio - Math.round(dpr)) < 0.15) {
        hints.evidence.push(`buffer/css ratio≈dpr (${ratio.toFixed(2)})`);
      }
      if (ratio >= 1.5) {
        hints.webglLikely = hints.webglLikely || true;
        hints.evidence.push("high buffer ratio common in WebGL");
      }
    }
    // If a context was already created, some engines expose captureStream only — not type.
    hints.undetermined = !hints.webglLikely && !hints.canvas2dLikely;
    if (hints.undetermined) {
      hints.evidence.push("NÃO OBSERVADO: tipo exato sem getContext");
    }
    return hints;
  }

  const list = [...document.querySelectorAll("canvas")].map((c, i) => {
    const dpr = window.devicePixelRatio || 1;
    return {
      index: i,
      id: c.id || null,
      className: String(c.className || "").slice(0, 120),
      css: { w: c.clientWidth, h: c.clientHeight },
      drawingBuffer: { width: c.width, height: c.height },
      devicePixelRatio: dpr,
      effectiveDpr:
        c.clientWidth > 0 ? Math.round((c.width / c.clientWidth) * 100) / 100 : null,
      context: detectContextWithoutRecreate(c),
      webglExtensions: [],
      webglExtensionsNote: "NÃO OBSERVADO sem getContext — listar só se MCP/trace fornecer",
      layer: "canvas",
    };
  });

  return {
    probe: "P4-canvas",
    url: location.href,
    canvasCount: list.length,
    canvases: list,
    globalsPresent,
    globalsAbsent,
    evidenceNote:
      "Presença de global é EVIDÊNCIA; ausência NÃO prova ausência da biblioteca (bundler/scope).",
    provenance: "medido-no-render",
  };
})()

/**
 * Gera audit/checks.json (140–200 entradas). Não editar IDs/descrições depois —
 * só passes + evidence.
 */
const fs = require("node:fs");
const path = require("node:path");

const checks = [];

function add(id, category, description, steps) {
  checks.push({
    id,
    category,
    description,
    steps,
    evidence: null,
    passes: false,
  });
}

// --- Harness / setup ---
const setup = [
  ["SETUP-001", "Baseline git limpo ou commitado antes do harness"],
  ["SETUP-002", "audit/PLAN.md escrito com stack e caminhos"],
  ["SETUP-003", "audit/init.sh expõe probe/frames/aggregate/report/gates"],
  ["SETUP-004", "audit/checks.json entre 140 e 200 entradas"],
  ["SETUP-005", "audit/progress.md atualizado"],
  ["SETUP-006", "Sondas P1–P8 presentes em audit/probes/"],
  ["SETUP-007", "Chrome DevTools MCP configurado em .mcp.json"],
  ["SETUP-008", "MCP chrome-devtools carregado na sessão de auditoria"],
  ["SETUP-009", "Diretórios raw/captures/frames criados"],
  ["SETUP-010", "Slug korowa-vic derivado da URL"],
  ["SETUP-011", "Fronteira de ativos documentada (placeholder)"],
  ["SETUP-012", "Nenhuma alteração em programas/discipulando-a-caserna/"],
];
for (const [id, description] of setup) {
  add(id, "setup", description, ["Verificar artefato em disco", "Atualizar evidence"]);
}

// --- Probes ---
const probes = [
  ["PROBE-P1", "P1 styles.js agrega por valor; top 40; peso log×área; ≤30KB"],
  ["PROBE-P2", "P2 cascade.js extrai custom props, media, font-face, keyframes, layers"],
  ["PROBE-P3", "P3 scroll-curve.js amostra frações com 2 rAF e canvas/fixed"],
  ["PROBE-P4", "P4 canvas.js inventaria canvas + globais presentes/ausentes separados"],
  ["PROBE-P5", "P5 motion.js document.getAnimations + transitions declaradas"],
  ["PROBE-P6", "P6 a11y.js headings, foco, contraste, touch, reduced-motion"],
  ["PROBE-P7", "P7 typography.js trios size/lh/tracking + fonts.check"],
  ["PROBE-P8", "P8 frames.js pixelmatch + paleta ΔE2000 grade 32×32"],
];
for (const [id, description] of probes) {
  add(id, "probes", description, ["Injetar/rodar sonda", "Salvar raw/", "Validar tamanho"]);
}

// --- Investigation PASSO 1 ---
const p1 = [
  ["INV1-001", "Varredura grossa 1440×900 P3 em 21 posições (0–100% passo 5%)"],
  ["INV1-002", "Screenshot em cada posição da varredura grossa"],
  ["INV1-003", "P8 emite curva de delta e picos"],
  ["INV1-004", "Refino 0,5% em ±3% de cada pico"],
  ["INV1-005", "Meio de transição capturado por fronteira"],
  ["INV1-006", "Loader e entrada registrados"],
  ["INV1-007", "Introdução registrada"],
  ["INV1-008", "Capítulos/cenas ordenados em NARRATIVE-MAP.md"],
  ["INV1-009", "Transições entre estados descritas"],
  ["INV1-010", "Elementos persistentes inventariados"],
  ["INV1-011", "Navegação global e contextual"],
  ["INV1-012", "Indicadores de progresso"],
  ["INV1-013", "Prompts de interação / scroll"],
  ["INV1-014", "Controles de áudio e descoberta"],
  ["INV1-015", "CTAs identificados"],
  ["INV1-016", "Saída / footer institucional"],
  ["INV1-017", "Header institucional"],
  ["INV1-018", "Overlays / modais / tooltips"],
  ["INV1-019", "Comportamento ao recarregar"],
  ["INV1-020", "Comportamento do botão voltar"],
  ["INV1-021", "CPU 4× + Slow 4G: loader/atraso observado"],
  ["INV1-022", "provenance.jsonl com entradas C1 para varredura"],
  ["INV1-023", "Canvases inventariados (P4) no dry-run"],
];
for (const [id, description] of p1) {
  add(id, "investigation-passo1", description, ["Medir", "Registrar em NARRATIVE-MAP / raw"]);
}

// --- PASSO 2 ---
const viewports = [
  "1440x900",
  "1280x800",
  "1024x768",
  "768x1024",
  "430x932",
  "390x844",
  "360x800",
];
viewports.forEach((vp, i) => {
  add(
    `INV2-VP-${String(i + 1).padStart(2, "0")}`,
    "investigation-passo2",
    `Capturas chave no viewport ${vp}`,
    ["resize", "capturar posições-chave", "manifest.json"],
  );
});
const p2extra = [
  ["INV2-010", "1440×900 cobre varredura refinada completa"],
  ["INV2-011", "Estado inicial capturado em todos os viewports"],
  ["INV2-012", "Primeiro conteúdo capturado"],
  ["INV2-013", "Hover / ativo quando aplicável"],
  ["INV2-014", "Navegação aberta (desktop e mobile)"],
  ["INV2-015", "Meio das transições principais"],
  ["INV2-016", "Último estado / rodapé"],
  ["INV2-017", "Fallback responsivo documentado"],
  ["INV2-018", "Portrait/landscape quando relevante"],
  ["INV2-019", "manifest.json com campos exigidos"],
  ["INV2-020", "captures/ marcado como material de auditoria"],
];
for (const [id, description] of p2extra) {
  add(id, "investigation-passo2", description, ["Capturar", "Atualizar manifest"]);
}

// --- PASSO 3 design extraction ---
const p3 = [
  ["INV3-001", "P1 em cada viewport×posição-chave"],
  ["INV3-002", "P2 em cada viewport×posição-chave"],
  ["INV3-003", "P7 tipografia por viewport"],
  ["INV3-004", "Cores DOM com procedência declarado"],
  ["INV3-005", "Cores canvas via P8 medido-no-render"],
  ["INV3-006", "Tipografia: famílias, stacks, pesos, fluidos"],
  ["INV3-007", "Fontes proprietárias identificadas (não transferidas)"],
  ["INV3-008", "Substitutas open source mapeadas"],
  ["INV3-009", "Espaçamento: unidade-base MDC e escala"],
  ["INV3-010", "Grid, gutters, max-widths medidos"],
  ["INV3-011", "Raios, bordas, sombras, blur"],
  ["INV3-012", "Z-index como pilha nomeada por função"],
  ["INV3-013", "Profundidade DOM↔canvas documentada"],
  ["INV3-014", "Iconografia e estados de controle"],
  ["INV3-015", "Breakpoints só os medidos"],
  ["INV3-016", "clamp/vw/cq detectados ou NÃO OBSERVADO"],
];
for (const [id, description] of p3) {
  add(id, "investigation-passo3", description, ["Rodar sondas", "Normalizar tokens"]);
}

// --- PASSO 4 motion ---
const p4 = [
  ["INV4-001", "P5 motion inventory"],
  ["INV4-002", "performance_start_trace com reload"],
  ["INV4-003", "performance_stop_trace + analyze_insight"],
  ["INV4-004", "Microinterações catalogadas"],
  ["INV4-005", "Transições de componente"],
  ["INV4-006", "Transições de capítulo"],
  ["INV4-007", "Animações ambientais"],
  ["INV4-008", "Câmera / objetos 3D se presentes"],
  ["INV4-009", "Curva scroll→estado canvas"],
  ["INV4-010", "Scrub/pin/snap ou NÃO OBSERVADO"],
  ["INV4-011", "Resposta a cursor/gesto"],
  ["INV4-012", "Teclado e navegação sem pointer"],
  ["INV4-013", "Comportamento reverso / skip rápido"],
  ["INV4-014", "Fallback prefers-reduced-motion na referência"],
  ["INV4-015", "Fallback mobile de movimento"],
];
for (const [id, description] of p4) {
  add(id, "investigation-passo4", description, ["Medir", "Documentar motion-system"]);
}

// --- PASSO 5 technical ---
const p5 = [
  ["INV5-001", "Network filtrado por resourceTypes com paginação"],
  ["INV5-002", "Framework com evidência ou não determinado"],
  ["INV5-003", "Biblioteca 3D com evidência ou não determinado"],
  ["INV5-004", "Biblioteca animação com evidência ou não determinado"],
  ["INV5-005", "Tipos de canvas (2d/webgl/webgl2)"],
  ["INV5-006", "Formatos de modelo/textura se houver"],
  ["INV5-007", "Fontes: rede + @font-face"],
  ["INV5-008", "Lazy/preload/code-splitting observados"],
  ["INV5-009", "Service worker presença/ausência"],
  ["INV5-010", "Scroll smoothing/hijack com evidência"],
  ["INV5-011", "Console messages inventariadas"],
  ["INV5-012", "LCP/CLS/long tasks do trace"],
  ["INV5-013", "Lighthouse a11y/SEO/best-practices"],
  ["INV5-014", "Workers/shaders com evidência ou NÃO OBSERVADO"],
];
for (const [id, description] of p5) {
  add(id, "investigation-passo5", description, ["list_network / trace / lighthouse"]);
}

// --- PASSO 6 a11y ---
const p6 = [
  ["INV6-001", "P6 executada"],
  ["INV6-002", "Lighthouse accessibility"],
  ["INV6-003", "Landmarks e headings"],
  ["INV6-004", "Ordem de foco"],
  ["INV6-005", "Focus-visible medido"],
  ["INV6-006", "Contraste pares texto/fundo"],
  ["INV6-007", "Touch targets <44px listados"],
  ["INV6-008", "Alternativa canvas/áudio"],
  ["INV6-009", "prefers-reduced-motion tratamento"],
  ["INV6-010", "prefers-contrast tratamento"],
  ["INV6-011", "Zoom / sem hover"],
  ["INV6-012", "Fallback sem WebGL na referência"],
  ["INV6-013", "Falhas → itens corrigidos em accessibility.md"],
];
for (const [id, description] of p6) {
  add(id, "investigation-passo6", description, ["P6 + lighthouse", "Documentar"]);
}

// --- Integrity ---
const integ = [
  ["INT-001", "C1: todo valor em provenance.jsonl"],
  ["INT-002", "C2: NÃO OBSERVADO sem analogia"],
  ["INT-003", "C3: bibliotecas só com evidência"],
  ["INT-004", "C4: relatório parcial declara lacunas"],
  ["INT-005", "C5: capítulo ≠ componente"],
  ["INT-006", "C6: bundles não reconstruídos linha a linha"],
  ["INT-007", "Zero hotlink domínio referência (pré-impl)"],
  ["INT-008", "Sondas ≤ ~30KB cada retorno"],
];
for (const [id, description] of integ) {
  add(id, "integrity", description, ["Revisar artefatos", "gates/grep"]);
}

// --- Implementation docs ---
const docs = [
  ["IMPL-DOC-001", "docs/reference-audit/korowa-vic-audit.md"],
  ["IMPL-DOC-002", "design-principles.md"],
  ["IMPL-DOC-003", "foundations.md"],
  ["IMPL-DOC-004", "components.md com evidência por componente"],
  ["IMPL-DOC-005", "motion-system.md"],
  ["IMPL-DOC-006", "responsive-system.md"],
  ["IMPL-DOC-007", "three-dimensional-language.md"],
  ["IMPL-DOC-008", "accessibility.md"],
  ["IMPL-DOC-009", "asset-and-license-boundaries.md"],
  ["IMPL-DOC-010", "implementation-notes.md"],
];
for (const [id, description] of docs) {
  add(id, "implementation-docs", description, ["Escrever após PASSO 3–6"]);
}

// --- Tokens ---
const tokens = [
  ["IMPL-TOK-001", "tokens.json DTCG 2025.10 canônico"],
  ["IMPL-TOK-002", "Cor como colorSpace/components/alpha/hex"],
  ["IMPL-TOK-003", "Dimension {value,unit}"],
  ["IMPL-TOK-004", "Tipos shadow/typography/border/transition/gradient"],
  ["IMPL-TOK-005", "Semânticos via alias"],
  ["IMPL-TOK-006", "$extensions procedência + camada"],
  ["IMPL-TOK-007", "Famílias color…reduced-motion-substitution"],
  ["IMPL-TOK-008", "CSS custom properties semânticas geradas"],
  ["IMPL-TOK-009", "Nenhum valor mágico nos componentes"],
];
for (const [id, description] of tokens) {
  add(id, "implementation-tokens", description, ["Gerar tokens", "Validar schema"]);
}

// --- Foundations / components / motion impl ---
const implUi = [
  ["IMPL-UI-001", "Reset e foundations"],
  ["IMPL-UI-002", "Focus ring e seleção"],
  ["IMPL-UI-003", "Preferências de movimento"],
  ["IMPL-UI-004", "Fallback contraste"],
  ["IMPL-UI-005", "Componentes só com evidência no manifesto"],
  ["IMPL-UI-006", "Hipóteses descartadas documentadas"],
  ["IMPL-UI-007", "Motion primitives listadas no brief"],
  ["IMPL-UI-008", "Separação tokens/cálculo/estado/render/efeito/conteúdo"],
  ["IMPL-UI-009", "Lab route/página interna"],
  ["IMPL-UI-010", "Demo narrativa 3–4 cenas originais"],
  ["IMPL-UI-011", "Fallback sem WebGL na reconstrução"],
  ["IMPL-UI-012", "Sem vazamento de listeners/observers"],
  ["IMPL-UI-013", "Conteúdo neutro sem marca Korowa"],
];
for (const [id, description] of implUi) {
  add(id, "implementation-ui", description, ["Implementar em referencias-devtools/korowa-vic"]);
}

// --- Component hypotheses (confirm/reject) ---
const hyps = [
  "AppShell",
  "ImmersiveViewport",
  "ExperienceLoader",
  "GlobalHeader",
  "ContextMenu",
  "ChapterNavigation",
  "ChapterIndicator",
  "ProgressRail",
  "ScrollPrompt",
  "DiscoverPrompt",
  "AudioControl",
  "EditorialPanel",
  "SceneHeading",
  "SceneBody",
  "Eyebrow",
  "MetadataLabel",
  "PrimaryAction",
  "IconAction",
  "FloatingControl",
  "SceneOverlay",
  "MediaBackdrop",
  "AtmosphericLayer",
  "GradientSurface",
  "NoiseLayer",
  "CanvasFallback",
  "ReducedMotionScene",
  "ExperienceFooter",
];
// Uma entrada por hipótese seria >200; agrupar e listar nomes na description.
add(
  "HYP-BATCH-01",
  "component-hypotheses",
  `Confirmar/descartar com evidência: ${hyps.slice(0, 9).join(", ")}`,
  ["Cruzar manifesto", "Atualizar components.md"],
);
add(
  "HYP-BATCH-02",
  "component-hypotheses",
  `Confirmar/descartar com evidência: ${hyps.slice(9, 18).join(", ")}`,
  ["Cruzar manifesto", "Atualizar components.md"],
);
add(
  "HYP-BATCH-03",
  "component-hypotheses",
  `Confirmar/descartar com evidência: ${hyps.slice(18).join(", ")}`,
  ["Cruzar manifesto", "Atualizar components.md"],
);

// --- Gates ---
const gates = [
  ["GATE-G1", "G1 cobertura token ≥90% área DOM"],
  ["GATE-G2", "G2 SSIM ≥0.85 editorial; ΔE canvas ≤8"],
  ["GATE-G3", "G3 erro médio curva scroll ≤0.05"],
  ["GATE-G4", "G4 contraste WCAG 2.2 AA"],
  ["GATE-G5", "G5 hover/focus-visible/disabled"],
  ["GATE-G6", "G6 reduced-motion: sem transform/opacity entrada >0"],
  ["GATE-G7", "G7 sem WebGL legível, console limpo"],
  ["GATE-G8", "G8 zero hotlink korowa.vic.edu.au"],
  ["GATE-G9", "G9 zero hardcoded nos componentes (AST)"],
  ["GATE-G10", "G10 build/lint/testes + console limpo lab/demo"],
];
for (const [id, description] of gates) {
  add(id, "validation-gates", description, ["./audit/init.sh gates", "Publicar números"]);
}

// --- Report ---
const report = [
  ["RPT-001", "report.html autocontido file://"],
  ["RPT-002", "Dados em script#audit-data"],
  ["RPT-003", "Seção capa com portões e escopo parcial"],
  ["RPT-004", "Mapa narrativo SVG + picos clicáveis"],
  ["RPT-005", "Cor com procedência visível"],
  ["RPT-006", "Matriz de contraste"],
  ["RPT-007", "Tipografia ao vivo + mapeamento fontes"],
  ["RPT-008", "Espaçamento / raio / sombra / blur"],
  ["RPT-009", "Movimento com play + curvas"],
  ["RPT-010", "Grid/breakpoints/z-index"],
  ["RPT-011", "Componentes iframe sandbox + evidência"],
  ["RPT-012", "Slider referência×reconstrução + SSIM"],
  ["RPT-013", "Técnica EVIDÊNCIA|INFERÊNCIA"],
  ["RPT-014", "A11y achados/correções/abertos"],
  ["RPT-015", "Lacunas NÃO OBSERVADO"],
  ["RPT-016", "Nav lateral scroll-spy + busca tecla"],
  ["RPT-017", "Tema relatório neutro / impressão A4"],
];
for (const [id, description] of report) {
  add(id, "report", description, ["Gerar report", "Abrir file://"]);
}

const n = checks.length;
if (n < 140 || n > 200) {
  console.error(`Count ${n} fora de 140–200`);
  process.exit(1);
}

const out = path.join(__dirname, "..", "checks.json");
fs.writeFileSync(out, JSON.stringify(checks, null, 2) + "\n", "utf8");
const byCat = {};
for (const c of checks) byCat[c.category] = (byCat[c.category] || 0) + 1;
console.log(JSON.stringify({ total: n, byCategory: byCat }, null, 2));

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("removes starter UI and keeps Windows-portable scripts", async () => {
  const [packageJson, page, layout] = await Promise.all([
    read("package.json"),
    read("app/page.tsx"),
    read("app/layout.tsx"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /WRANGLER_LOG_PATH=.*vinext/);
  assert.match(packageJson, /"dev": "vinext dev"/);
  assert.match(packageJson, /"build": "vinext build"/);
  assert.match(page, /<TramaSite \/>/);
  assert.doesNotMatch(
    page + layout,
    /codex-preview|SkeletonPreview|Starter Project/,
  );
  await assert.rejects(
    access(new URL("app/_sites-preview/SkeletonPreview.tsx", root)),
  );
});

test("ships an official, dated resource registry without speculative contacts", async () => {
  const content = await read("app/content.ts");
  const registry = content.split("export const resources")[1];
  assert.ok(registry, "resource registry is exported");
  assert.equal((registry.match(/reviewedAt: "2026-08-13"/g) ?? []).length, 10);
  assert.equal((registry.match(/sourceUrl:/g) ?? []).length, 10);
  assert.match(registry, /112 Catalunya/);
  assert.match(registry, /061 Salut Respon/);
  assert.match(registry, /Línea 024/);
  assert.match(registry, /Centre LGTBI de Barcelona/);
  assert.match(registry, /Oficina per la No Discriminació/);
  assert.match(registry, /Xarxa SAI/);
  assert.match(registry, /Trànsit Barcelona/);
  assert.match(registry, /CUESB/);
  assert.doesNotMatch(registry, /example\.com|placeholder/i);
  assert.doesNotMatch(registry, /\bTODO\b/);
});

test("keeps participation local-only and quick exit honest", async () => {
  const [site, content] = await Promise.all([
    read("app/TramaSite.tsx"),
    read("app/content.ts"),
  ]);
  assert.match(site, /event\.shiftKey && event\.key === "Escape"/);
  assert.match(site, /window\.location\.replace\(WEATHER_EXIT\)/);
  assert.match(content, /no borra el historial/);
  assert.doesNotMatch(
    site,
    /<form|localStorage|sessionStorage|document\.cookie|fetch\(/i,
  );
  assert.match(site, /prefers-reduced-motion: reduce/);
  assert.match(site, /gsap\.context/);
  assert.match(site, /animationContext\.revert/);
  assert.match(site, /lenis\.destroy/);
});

test("seals the named story behind identity and an empty-by-default allowlist", async () => {
  const [story, governance, robots, hosting] = await Promise.all([
    read("app/historias/natalia-marinho/page.tsx"),
    read("app/governance.ts"),
    read("app/robots.ts"),
    read(".openai/hosting.json"),
  ]);

  assert.match(
    story,
    /robots: \{ index: false, follow: false, nocache: true \}/,
  );
  assert.match(story, /requireChatGPTUser/);
  assert.match(story, /allowedIds\.size === 0/);
  assert.match(story, /no atribuye a Natalia Marinho ninguna identidad/);
  assert.match(governance, /activeRoleAssignments: readonly \[\] = \[\]/);
  assert.match(governance, /TRAMA_CONSENT_EDITOR_IDS/);
  assert.match(robots, /disallow: \["\/historias\/"\]/);
  assert.deepEqual(JSON.parse(hosting), { d1: null, r2: null });
});

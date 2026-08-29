import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

test("server-renders the complete public product", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    environment,
    context,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html[^>]+lang="es"/i);
  assert.match(
    html,
    /<title>TRAMA TRANS BCN · Apoyo, memoria y cuidados<\/title>/i,
  );
  assert.match(html, /TRAMA/);
  assert.match(html, /Apoyo ahora/);
  assert.match(html, /112 Catalunya/);
  assert.match(html, /Oficina per la No Discriminació/);
  assert.match(html, /Revisado/);
  assert.match(html, /Salida rápida/);
  assert.match(html, /Sin formulario/);
  assert.doesNotMatch(
    html,
    /codex-preview|react-loading-skeleton|Your site is taking shape/,
  );
  assert.doesNotMatch(html, /<form\b/i);
});

test("robots excludes the private story tree", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/robots.txt"),
    environment,
    context,
  );
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Disallow: \/historias\//i);
});

test("private story redirects anonymous users and denies unassigned identities", async () => {
  const worker = await loadWorker();
  const anonymous = await worker.fetch(
    new Request("http://localhost/historias/natalia-marinho", {
      redirect: "manual",
    }),
    environment,
    context,
  );
  assert.ok([302, 303, 307, 308].includes(anonymous.status));
  assert.match(anonymous.headers.get("location") ?? "", /signin-with-chatgpt/);

  const unassigned = await worker.fetch(
    new Request("http://localhost/historias/natalia-marinho", {
      headers: {
        "oai-authenticated-user-id": "unassigned-test-user",
        "oai-authenticated-user-email": "test@example.invalid",
      },
    }),
    environment,
    context,
  );
  assert.equal(unassigned.status, 404);
  assert.doesNotMatch(await unassigned.text(), /Natalia Marinho/);
});

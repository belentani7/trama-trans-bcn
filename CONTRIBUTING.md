# Contribuir

## Flujo

1. Abre un issue describiendo el problema o la propuesta.
2. Crea una rama corta: `feat/...`, `fix/...` o `docs/...`.
3. Aplica el protocolo spec-first y añade tests.
4. Ejecuta la verificación local.
5. Abre un PR completando la checklist de `.github/pull_request_template.md`.

## Comandos

- `dev`: `vinext dev`
- `build`: `vinext build`
- `start`: `vinext start`
- `test`: `node --test tests/product-source.test.mjs`
- `test:rendered`: `node --test tests/rendered-html.test.mjs`
- `lint`: `eslint app tests vite.config.ts next.config.ts eslint.config.mjs drizzle.config.ts db worker --ignore-pattern dist --ignore-pattern .next`
- `db:generate`: `drizzle-kit generate`

## Reglas

- Conventional commits.
- Sin secretos ni credenciales.
- Un cambio reversible por PR.
- Revisión de `@belentani7` y CI verde.

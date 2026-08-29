# TRAMA TRANS BCN

Prototipo local de interés público para encontrar apoyo oficial, conservar memoria con límites y explicar cómo se verifican los datos. Construido con vinext sobre el starter de Sites.

## Superficie actual

- `/`: one-page pública en español con traducciones clave CA/PT/EN, directorio filtrable, salida rápida, metodología, privacidad y participación cerrada.
- `/historias/natalia-marinho`: ruta `noindex` sellada. Exige identidad Sites y un ID incluido explícitamente en `TRAMA_CONSENT_EDITOR_IDS`. Sin allowlist responde 404 a cualquier identidad autenticada.
- `/robots.txt`: excluye todo `/historias/`.

No hay D1, R2, formularios, analítica, cookies propias ni almacenamiento de preferencias. `.openai/hosting.json` conserva ambos bindings en `null`.

## Desarrollo local

Requisito: Node.js `>=22.13.0`.

```powershell
npm install
npm run dev
```

Scripts portables para Windows, macOS y Linux:

- `npm run lint`: análisis estático.
- `npm test`: contrato de producto y privacidad sin compilar.
- `npm run build`: build vinext/Cloudflare.
- `npm run test:rendered`: comprobación SSR después del build.

## Gobernanza preparada, sin poder asignado

`app/governance.ts` define tres roles mínimos:

- `resource-reviewer`: revisar o marcar recursos.
- `consent-editor`: revisar consentimiento o retirada de una historia.
- `publisher`: publicar recursos o historias tras revisión separada.

`activeRoleAssignments` está vacío. No se ha invitado a nadie ni se ha concedido ningún permiso. La allowlist de la historia también está vacía por defecto; copiar `.env.example` a un `.env` local no autoriza a añadir IDs sin verificación previa.

## Política editorial de recursos

Cada entrada conserva finalidad, contacto confirmado, URL primaria oficial, cautelas y `reviewedAt`. La interfaz no puntúa servicios ni transforma ambigüedades en promesas. Las fuentes revisadas pertenecen a Generalitat de Catalunya, CatSalut, Ajuntament de Barcelona y Ministerio de Sanidad.

La salida rápida abre AEMET mediante `location.replace`. Sustituye la entrada actual, pero no borra el historial completo, caché, descargas ni rastros del dispositivo.

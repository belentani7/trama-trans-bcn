import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChatGPTUser, requireChatGPTUser } from "../../chatgpt-auth";
import { consentEditorIds, governanceRoles } from "../../governance";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Archivo de consentimiento en preparación",
  description: "Ruta privada no publicada.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function NataliaMarinhoConsentPage() {
  const existingUser = await getChatGPTUser();
  const user =
    existingUser ?? (await requireChatGPTUser("/historias/natalia-marinho"));
  const allowedIds = consentEditorIds();

  if (allowedIds.size === 0 || !allowedIds.has(user.userId)) notFound();

  return (
    <main className="private-story" aria-labelledby="private-title">
      <p className="eyebrow">Archivo privado · noindex · sin publicación</p>
      <h1 id="private-title">Consentimiento editorial en construcción</h1>
      <p className="private-lead">
        Este espacio no atribuye a Natalia Marinho ninguna identidad,
        experiencia, afiliación o posición pública.
      </p>
      <p>
        Una historia sólo podrá abrirse tras consentimiento explícito, revisión
        de alcance, forma de nombrar, fecha de caducidad y mecanismo de
        retirada.
      </p>
      <dl>
        <div>
          <dt>Rol requerido</dt>
          <dd>{governanceRoles.consentEditor.id}</dd>
        </div>
        <div>
          <dt>Asignaciones activas</dt>
          <dd>Ninguna por defecto</dd>
        </div>
        <div>
          <dt>Estado del contenido</dt>
          <dd>No recibido · no almacenado · no inferido</dd>
        </div>
      </dl>
      <Link href="/">Volver al directorio público</Link>
    </main>
  );
}

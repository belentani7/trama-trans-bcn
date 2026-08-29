export const governanceRoles = {
  resourceReviewer: {
    id: "resource-reviewer",
    permissions: ["resource:review", "resource:flag"] as const,
  },
  consentEditor: {
    id: "consent-editor",
    permissions: ["story:consent-review", "story:withdraw"] as const,
  },
  publisher: {
    id: "publisher",
    permissions: ["resource:publish", "story:publish"] as const,
  },
} as const;

export const activeRoleAssignments: readonly [] = [];

export function consentEditorIds(): ReadonlySet<string> {
  const configuredIds = process.env.TRAMA_CONSENT_EDITOR_IDS ?? "";
  return new Set(
    configuredIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

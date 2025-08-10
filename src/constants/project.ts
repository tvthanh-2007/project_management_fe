export type VisibilityKey = 0 | 1;

export const VISIBILITY_MAP: Record<VisibilityKey, { label: string; color: string }> = {
  0: { label: "Public", color: "green" },
  1: { label: "Private", color: "red" },
}

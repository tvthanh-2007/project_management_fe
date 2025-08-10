export type VisibilityKey = 0 | 1;
export type MemberRole = 0 | 1 | 2;
export const ROLE_NAME = {
  MANAGER: 0,
  WRITE: 1,
  READ: 2,
} as const;

export const VISIBILITY_MAP: Record<VisibilityKey, { label: string; color: string }> = {
  0: { label: "Public", color: "green" },
  1: { label: "Private", color: "red" },
}

export const MEMBER_ROLE_MAP: Record<MemberRole, { label: string }> = {
  0: { label: "Manager" },
  1: { label: "Write" },
  2: { label: "Read" },
}

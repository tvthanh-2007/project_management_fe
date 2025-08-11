export type Role = 0 | 1
export const PERMIS_NAME: Record<number, string> = {
  0: 'ADMIN',
  1: 'MEMBER',
} as const;

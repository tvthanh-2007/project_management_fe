import type { MemberRole } from "../constants/project";

export interface MemberProjectInterface {
  id: number;
  name: string;
  email: string;
  role: MemberRole
}

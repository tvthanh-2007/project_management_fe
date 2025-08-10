import type { VisibilityKey } from "../constants/project";

export interface ProjectInterface {
  id: number;
  name: string;
  description: string;
  visibility: VisibilityKey; // 0 | 1
  user_id: number;
}

import type { VisibilityKey } from "../constants/project";

export interface Project {
  id: number;
  name: string;
  description: string;
  visibility: VisibilityKey; // 0 | 1
}

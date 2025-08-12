import type { VisibilityKey } from "../../constants/project";

export interface ProjectState {
  id: number | null;
  name: string | null;
  description: string | null;
  visibility: VisibilityKey | null;
  user_id: number | null;
}

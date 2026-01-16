export const BADGE_TYPES = [
  "admin",
  "editor",
  "viewer",
  "guest",
  "owner"
] as const;

export type BadgeType = (typeof BADGE_TYPES)[number];

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  position: string;
  team: string;
  details: string;
}

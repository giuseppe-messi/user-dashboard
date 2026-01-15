export const BADGE_TYPES = ["admin", "editor", "viewer"] as const;

export type BadgeType = (typeof BADGE_TYPES)[number];

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  birthDate: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: string;
  university: string;
  company: string;
  address: string;
  crypto?: string;
  email: string;
  role: string;
  team: string;
  createdAt: string;
  badgeType?: BadgeType;
}

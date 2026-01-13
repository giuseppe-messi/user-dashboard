export const BADGE_TYPES = ["admin", "editor", "viewer"] as const;

export type BadgeType = (typeof BADGE_TYPES)[number];

export interface UserData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  birthDate: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  university: string;
  company: {
    title: string;
    name: string;
    department: string;
  };
  address: {
    city: string;
    state: string;
    country: string;
  };
  crypto: {
    coin: string;
    network: string;
  };
  email: string;
  role: string;
  team: string;
  badgeType?: BadgeType;
}

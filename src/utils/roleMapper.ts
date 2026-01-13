import type { BadgeType } from "../types/user";

export const mapRoleToBadge = (role: string): BadgeType => {
  const roleMap: Record<string, BadgeType> = {
    admin: "admin",
    moderator: "editor",
    user: "viewer"
  };

  return roleMap[role.toLowerCase()];
};

export const mapBadgeToRole = (badge: BadgeType): string => {
  const badgeMap: Record<BadgeType, string> = {
    admin: "admin",
    editor: "moderator",
    viewer: "user"
  };

  return badgeMap[badge];
};

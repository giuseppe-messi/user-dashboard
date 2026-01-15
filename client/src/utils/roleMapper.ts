import type { BadgeType } from "../types/user";

export const mapRoleToBadge = (role: string): BadgeType => {
  console.log("Mapping role to badge for role:", role);

  const roleMap: Record<string, BadgeType> = {
    admin: "admin",
    editor: "editor",
    viewer: "viewer",
    guest: "guest",
    owner: "owner"
  };

  return roleMap[role.toLowerCase()];
};

export const mapBadgeToRole = (badge: BadgeType): string => {
  const badgeMap: Record<BadgeType, string> = {
    admin: "ADMIN",
    editor: "EDITOR",
    viewer: "VIEWER",
    guest: "GUEST",
    owner: "OWNER"
  };

  return badgeMap[badge];
};

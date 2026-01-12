export type BadgeType = "admin" | "editor" | "viewer" | "guest" | "owner";

export const mapRoleToBadge = (role: string): BadgeType => {
  const roleMap: Record<string, BadgeType> = {
    admin: "admin",
    moderator: "editor",
    user: "viewer"
  };

  return roleMap[role.toLowerCase()] || "guest";
};

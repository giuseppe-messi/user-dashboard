import * as z from "zod";
import { Prisma, Role } from "../generated/prisma/index.js";
import { prisma } from "../db/prisma.js";
import type { Express } from "express";

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 30;

const GetUsersQuery = z.object({
  search: z.string().trim().optional(),
  roles: z
    .string()
    .transform((v) => v.split(",").map((r) => r.trim().toUpperCase()))
    .optional(),
  team: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE)
});

type GetUsersQueryType = z.infer<typeof GetUsersQuery>;

export const usersController = (app: Express) => {
  app.get("/users", async (req, res) => {
    const parsed = GetUsersQuery.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid query parameters",
        details: parsed.error.issues
      });
    }

    const { search, roles, page, limit } = parsed.data as GetUsersQueryType;

    try {
      const filters: Prisma.UserWhereInput[] = [];

      if (search?.length) {
        filters.push({
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } }
          ]
        });
      }

      if (roles && roles.length > 0) {
        // Validate roles by removing any invalid entries
        const validRoles = roles.filter((r): r is Role =>
          Object.values(Role).includes(r as Role)
        );

        if (validRoles.length > 0) {
          filters.push({
            role: { in: validRoles }
          });
        }
      }

      const where: Prisma.UserWhereInput =
        filters.length > 0 ? { AND: filters } : {};

      const skip = (page - 1) * limit;

      const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: "asc" },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            position: true,
            team: true,
            details: true
          }
        }),
        prisma.user.count({ where })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        data: users,
        pagination: {
          total,
          page,
          limit,
          skip,
          totalPages,
          hasMore: page < totalPages,
          hasPrev: page > 1
        }
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get available roles
  app.get("/roles", (req, res) => {
    res.json({
      roles: Object.values(Role)
    });
  });
};

import * as z from "zod";
import { Prisma } from "../generated/prisma/index.js";
import { prisma } from "../db/prisma.js";
import type { Express } from "express";

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 30;

const GetUsersQuery = z.object({
  search: z.string().trim().optional(),
  role: z.string().trim().optional(),
  team: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
  sortBy: z
    .enum(["firstName", "lastName", "age", "email", "createdAt"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc")
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

    const { search, role, team, page, limit, sortBy, order } =
      parsed.data as GetUsersQueryType;

    try {
      const filters: Prisma.UserWhereInput[] = [];

      if (search) {
        filters.push({
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } }
          ]
        });
      }

      if (role) {
        filters.push({ role: { equals: role, mode: "insensitive" } });
      }

      if (team) {
        filters.push({ team: { equals: team, mode: "insensitive" } });
      }

      const where: Prisma.UserWhereInput =
        filters.length > 0 ? { AND: filters } : {};

      const skip = (page - 1) * limit;

      const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy]: order } as Prisma.UserOrderByWithRelationInput,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            age: true,
            gender: true,
            role: true,
            team: true,
            university: true,
            company: true,
            address: true,
            eyeColor: true,
            hair: true,
            createdAt: true
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
};

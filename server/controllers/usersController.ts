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

const postUserBody = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.email().max(255),
  role: z.enum(Role),
  position: z.string().max(100),
  team: z.string().max(100),
  details: z.string()
});

const putUserBody = postUserBody.extend({
  id: z.string()
});

type PostUserBodyType = z.infer<typeof postUserBody>;
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
        const terms = search.trim().split(/\s+/);

        filters.push({
          AND: terms.map((term) => ({
            OR: [
              { firstName: { contains: term, mode: "insensitive" } },
              { lastName: { contains: term, mode: "insensitive" } },
              { email: { contains: term, mode: "insensitive" } }
            ]
          }))
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

  app.post("/users", async (req, res) => {
    const parsed = postUserBody.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: parsed.error.issues
      });
    }

    const { firstName, lastName, email, role, position, team, details } =
      parsed.data as PostUserBodyType;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          role,
          position,
          team,
          details
        }
      });
      res.status(201).json(newUser);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/users/:id", async (req, res) => {
    const { id } = req.params;

    const parsed = putUserBody.safeParse({ ...req.body, id });

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: parsed.error.issues
      });
    }

    const { firstName, lastName, email, role, position, team, details } =
      parsed.data as z.infer<typeof putUserBody>;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          firstName,
          lastName,
          role,
          position,
          team,
          details
        }
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      await prisma.user.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (err) {
      console.error("Error deleting user:", err);
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

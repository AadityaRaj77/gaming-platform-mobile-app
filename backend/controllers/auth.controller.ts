import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

// POST /auth/register
export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body as {
    email?: string;
    username?: string;
    password?: string;
  };

  if (!email || !username || !password) {
    return res.status(400).json({
      message: "email, username, password required",
    });
  }

  const exists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashed,
    },
  });

  const token = signToken({ userId: user.id });

  return res.status(201).json({ token });
};

 // POST /auth/login
export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body as {
    identifier?: string;
    password?: string;
  };

  if (!identifier || !password) {
    return res.status(400).json({
      message: "identifier and password required",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ userId: user.id });

  return res.json({ token });
};

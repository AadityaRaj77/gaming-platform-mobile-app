import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = Number(req.user.userId);
  if (!Number.isInteger(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      profile: {
        select: { id: true },
      },
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    id: user.id,
    email: user.email,
    username: user.username,
    needsProfile: !user.profile,
    createdAt: user.createdAt,
  });
};

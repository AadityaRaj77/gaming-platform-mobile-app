import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const upsertProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = Number(req.user.userId);
  if (!Number.isInteger(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  const {
    bio,
    avatarUrl,
    games = [],
    genres = [],
    socials = [],
    achievements = [],
  } = req.body;

  for (const g of games) {
    if (g.game === "OTHER" && !g.gameName) {
      return res.status(400).json({ message: "gameName required for OTHER game" });
    }
  }

  for (const s of socials) {
    if (s.platform === "OTHER" && !s.label) {
      return res.status(400).json({ message: "label required for OTHER social" });
    }
  }

  try {
    const profile = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.upsert({
        where: { userId },
        update: { bio, avatarUrl },
        create: { userId, bio, avatarUrl },
      });

      const profileId = profile.id;

      await tx.profileGame.deleteMany({ where: { profileId } });
      await tx.profileGenre.deleteMany({ where: { profileId } });
      await tx.socialLink.deleteMany({ where: { profileId } });
      await tx.achievement.deleteMany({ where: { profileId } });

      if (games.length) {
        await tx.profileGame.createMany({
          data: games.map((g: any) => ({
            profileId,
            game: g.game,
            gameName: g.game === "OTHER" ? g.gameName : null,
            gamingId: g.gamingId,
          })),
        });
      }

      if (genres.length) {
        await tx.profileGenre.createMany({
          data: genres.map((genre: string) => ({
            profileId,
            genre,
          })),
        });
      }

      if (socials.length) {
        await tx.socialLink.createMany({
          data: socials.map((s: any) => ({
            profileId,
            platform: s.platform,
            label: s.platform === "OTHER" ? s.label : null,
            url: s.url,
          })),
        });
      }

      if (achievements.length) {
        await tx.achievement.createMany({
          data: achievements.map((title: string) => ({
            profileId,
            title,
          })),
        });
      }

      return profile;
    });

    res.status(200).json({ success: true, profileId: profile.id });
  } catch (err) {
    console.error("PROFILE UPSERT ERROR:", err);
    res.status(500).json({ message: "Profile save failed" });
  }
};

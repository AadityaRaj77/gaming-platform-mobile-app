/*
  Warnings:

  - You are about to drop the column `gamerTag` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameGenre" AS ENUM ('BATTLE_ROYALE', 'CLASH_ROYALE', 'FIGHTING', 'RACING', 'OPEN_WORLD', 'PLATFORMER', 'SHOOTER', 'PUZZLE', 'FUN', 'OTHER');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('BGMI', 'VALORANT', 'CODM', 'FREE_FIRE', 'CLASH_ROYALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'TWITCH', 'X', 'STEAM', 'OTHER');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "gamerTag",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ProfileGenre" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "genre" "GameGenre" NOT NULL,

    CONSTRAINT "ProfileGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileGame" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "game" "GameType" NOT NULL,
    "gameName" TEXT,
    "gamingId" TEXT NOT NULL,

    CONSTRAINT "ProfileGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "label" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileGenre_profileId_genre_key" ON "ProfileGenre"("profileId", "genre");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileGame_profileId_game_gameName_key" ON "ProfileGame"("profileId", "game", "gameName");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_profileId_platform_label_key" ON "SocialLink"("profileId", "platform", "label");

-- AddForeignKey
ALTER TABLE "ProfileGenre" ADD CONSTRAINT "ProfileGenre_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileGame" ADD CONSTRAINT "ProfileGame_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

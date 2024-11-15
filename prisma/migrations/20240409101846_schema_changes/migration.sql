/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

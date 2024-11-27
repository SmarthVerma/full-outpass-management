/*
  Warnings:

  - A unique constraint covering the columns `[verifyCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Outpass" ADD COLUMN     "otpVerified" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "guardianContactNo" TEXT DEFAULT '7018836872';

-- CreateIndex
CREATE UNIQUE INDEX "User_verifyCode_key" ON "User"("verifyCode");

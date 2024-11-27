/*
  Warnings:

  - You are about to drop the column `hostelNumber` on the `Outpass` table. All the data in the column will be lost.
  - Added the required column `roomNo` to the `Outpass` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `block` on the `Outpass` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BLOCK_OR_BUILDING" AS ENUM ('A', 'B', 'C', 'D', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6');

-- AlterTable
ALTER TABLE "Outpass" DROP COLUMN "hostelNumber",
ADD COLUMN     "roomNo" INTEGER NOT NULL,
DROP COLUMN "block",
ADD COLUMN     "block" "BLOCK_OR_BUILDING" NOT NULL;

-- DropEnum
DROP TYPE "Block";

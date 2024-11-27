/*
  Warnings:

  - You are about to drop the column `block` on the `Outpass` table. All the data in the column will be lost.
  - Added the required column `block_or_building` to the `Outpass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outpass" DROP COLUMN "block",
ADD COLUMN     "block_or_building" "BLOCK_OR_BUILDING" NOT NULL;

/*
  Warnings:

  - Added the required column `hostelName` to the `Outpass` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HostelName" AS ENUM ('azad-hostel', 'parmar-hostel', 'shashtri-hostel', 'geeta-bhawan');

-- AlterTable
ALTER TABLE "Outpass" ADD COLUMN     "hostelName" "HostelName" NOT NULL;

/*
  Warnings:

  - You are about to drop the column `collectionOrder` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "collectionOrder",
ADD COLUMN     "collectionsOrder" TEXT[];

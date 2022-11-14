/*
  Warnings:

  - You are about to drop the column `unitIds` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `itemIds` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionId` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "unitIds",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "unitId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "itemIds",
ADD COLUMN     "collectionId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

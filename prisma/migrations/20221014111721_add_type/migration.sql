-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COLLECTION', 'UNIT', 'ITEM');

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'COLLECTION';

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'ITEM';

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'UNIT';

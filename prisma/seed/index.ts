import { PrismaClient } from "@prisma/client";

// data
import { initialCollections, initialUnits, initialItems } from "./data";

const prisma = new PrismaClient();

const runSeeders = async () => {
  // Collections
  await Promise.all(
    initialCollections.map(async (collection) =>
      prisma.collection.upsert({
        where: { id: collection.id },
        update: {},
        create: collection,
      })
    )
  );

  // Units
  await Promise.all(
    initialUnits.map(async (unit) =>
      prisma.unit.upsert({
        where: { id: unit.id },
        update: {},
        create: unit,
      })
    )
  );

  // Items
  await Promise.all(
    initialItems.map(async (item) =>
      prisma.item.upsert({
        where: { id: item.id },
        update: {},
        create: item,
      })
    )
  );
};

runSeeders().catch((e) => {
  console.error(`There was an error while seeding: ${e}`);
  process.exit(1);
});

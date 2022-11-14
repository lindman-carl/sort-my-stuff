import { Collection, Item, Unit, User } from "@prisma/client";

export const testUser: User = {
  email: "test-user@gmail.com",
  id: "test-user",
  name: "test-user",
  emailVerified: null,
  image: null,
};

export const initialCollections: Collection[] = [
  {
    id: "collection-1",
    name: "Garderob",
    type: "COLLECTION",
    userId: testUser.id,
    unitsOrder: ["unit-1"],
  },
  {
    id: "collection-2",
    name: "Boden",
    type: "COLLECTION",
    userId: testUser.id,
    unitsOrder: ["unit-2", "unit-3"],
  },
];

export const initialUnits: Unit[] = [
  {
    id: "unit-1",
    name: "Låda nr 1",
    userId: testUser.id,
    collectionId: "collection-1",
    type: "UNIT",
    itemsOrder: ["item-1", "item-2"],
  },
  {
    id: "unit-2",
    name: "Låda nr 2",
    userId: testUser.id,
    collectionId: "collection-2",
    type: "UNIT",
    itemsOrder: ["item-3", "item-4"],
  },
  {
    id: "unit-3",
    name: "Lilla skoskåpet",
    userId: testUser.id,
    collectionId: "collection-2",
    type: "UNIT",
    itemsOrder: ["item-6", "item-5"],
  },
];

export const initialItems: Item[] = [
  {
    id: "item-1",
    name: "Blåa skor",
    type: "ITEM",
    userId: testUser.id,
    unitId: "unit-1",
  },
  {
    id: "item-2",
    name: "Verktygslåda",
    type: "ITEM",
    userId: testUser.id,
    unitId: "unit-1",
  },
  {
    id: "item-3",
    name: "Överlevnadskit",
    type: "ITEM",
    userId: testUser.id,
    unitId: "unit-2",
  },
  {
    id: "item-4",
    name: "Kokkärl",
    type: "ITEM",
    userId: testUser.id,
    unitId: "unit-2",
  },
  {
    id: "item-5",
    name: "Slängkappa",
    type: "ITEM",
    userId: testUser.id,
    unitId: "unit-3",
  },
  {
    id: "item-6",
    name: "Harry Potter-bok",
    type: "ITEM",
    userId: testUser.id,
    unitId: "unit-3",
  },
];

export const initialCollectionOrder: string[] = [
  "collection-2",
  "collection-1",
];

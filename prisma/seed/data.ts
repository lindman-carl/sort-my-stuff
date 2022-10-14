import { Collection, Item, Unit } from "@prisma/client";

export const initialCollections: Collection[] = [
  {
    id: "collection-1",
    name: "Hallgarderob",
    unitIds: ["unit-1", "unit-2"],
    type: "COLLECTION",
  },
  {
    id: "collection-2",
    name: "Vinden",
    unitIds: ["unit-3"],
    type: "COLLECTION",
  },
];

export const initialUnits: Unit[] = [
  {
    id: "unit-1",
    name: "Låda nr 1",
    itemIds: ["item-1", "item-2", "item-4"],
    type: "UNIT",
  },
  {
    id: "unit-2",
    name: "Låda nr 2",
    itemIds: ["item-5", "item-6"],
    type: "UNIT",
  },
  {
    id: "unit-3",
    name: "Lilla skoskåpet",
    itemIds: ["item-3"],
    type: "UNIT",
  },
];

export const initialItems: Item[] = [
  { id: "item-1", name: "Blåa skor", type: "ITEM" },
  { id: "item-2", name: "Verktygslåda", type: "ITEM" },
  { id: "item-3", name: "Överlevnadskit", type: "ITEM" },
  { id: "item-4", name: "Kokkärl", type: "ITEM" },
  { id: "item-5", name: "Slängkappa", type: "ITEM" },
  { id: "item-6", name: "Harry Potter-bok", type: "ITEM" },
];

export const initialCollectionOrder: string[] = [
  "collection-2",
  "collection-1",
];
